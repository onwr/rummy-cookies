const { pool } = require('../config/database');

// Yorum ekle
const addReview = async (req, res) => {
  try {
    const {
      product_id,
      rating,
      comment_tr,
      comment_en,
      guest_name,
      guest_email
    } = req.body;
    
    const userId = req.user ? req.user.id : null;
    
    // Guest kullanıcı için gerekli alanları kontrol et
    if (!userId && (!guest_name || !guest_email)) {
      return res.status(400).json({
        success: false,
        message: 'Misafir kullanıcılar için ad ve e-posta gereklidir'
      });
    }
    
    // Ürün kontrolü
    const connection = await pool.getConnection();
    const [products] = await connection.execute(
      'SELECT id FROM products WHERE id = ? AND is_active = TRUE',
      [product_id]
    );
    
    if (products.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Ürün bulunamadı'
      });
    }
    
    // Kullanıcının bu ürün için daha önce yorum yapıp yapmadığını kontrol et
    if (userId) {
      const [existingReviews] = await connection.execute(
        'SELECT id FROM reviews WHERE user_id = ? AND product_id = ?',
        [userId, product_id]
      );
      
      if (existingReviews.length > 0) {
        connection.release();
        return res.status(400).json({
          success: false,
          message: 'Bu ürün için zaten yorum yapmışsınız'
        });
      }
    } else {
      const [existingReviews] = await connection.execute(
        'SELECT id FROM reviews WHERE guest_email = ? AND product_id = ?',
        [guest_email, product_id]
      );
      
      if (existingReviews.length > 0) {
        connection.release();
        return res.status(400).json({
          success: false,
          message: 'Bu ürün için zaten yorum yapmışsınız'
        });
      }
    }
    
    // Yorumu ekle
    const [result] = await connection.execute(
      `INSERT INTO reviews (
        user_id, product_id, guest_name, guest_email,
        rating, comment_tr, comment_en
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        product_id,
        guest_name || null,
        guest_email || null,
        rating,
        comment_tr || null,
        comment_en || null
      ]
    );
    
    const reviewId = result.insertId;
    
    // Oluşturulan yorumu getir
    const [reviews] = await connection.execute(
      'SELECT * FROM reviews WHERE id = ?',
      [reviewId]
    );
    
    connection.release();
    
    res.status(201).json({
      success: true,
      message: 'Yorum başarıyla eklendi',
      data: {
        review: reviews[0]
      }
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Ürün yorumlarını getir
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { language = 'tr', page = 1, limit = 10 } = req.query;
    
    const connection = await pool.getConnection();
    
    // Toplam yorum sayısını al
    const [countResult] = await connection.execute(
      'SELECT COUNT(*) as total FROM reviews WHERE product_id = ? AND is_approved = TRUE',
      [productId]
    );
    const totalReviews = countResult[0].total;
    
    // Sayfalama
    const offset = (page - 1) * limit;
    const totalPages = Math.ceil(totalReviews / limit);
    
    // Onaylanmış yorumları getir
    const [reviews] = await connection.execute(
      `SELECT 
        r.id, r.rating, r.created_at,
        ${language === 'tr' ? 'r.comment_tr as comment' : 'r.comment_en as comment'},
        u.first_name, u.last_name,
        r.guest_name, r.guest_email
       FROM reviews r
       LEFT JOIN users u ON r.user_id = u.id
       WHERE r.product_id = ? AND r.is_approved = TRUE
       ORDER BY r.created_at DESC
       LIMIT ? OFFSET ?`,
      [productId, parseInt(limit), offset]
    );
    
    // Kullanıcı adlarını birleştir
    const formattedReviews = reviews.map(review => ({
      ...review,
      author_name: review.first_name && review.last_name 
        ? `${review.first_name} ${review.last_name}`
        : review.guest_name || 'Misafir'
    }));
    
    connection.release();
    
    res.json({
      success: true,
      data: {
        reviews: formattedReviews,
        pagination: {
          current_page: parseInt(page),
          total_pages: totalPages,
          total_reviews: totalReviews,
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get product reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Kullanıcı yorumlarını getir
const getUserReviews = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    
    const connection = await pool.getConnection();
    
    // Toplam yorum sayısını al
    const [countResult] = await connection.execute(
      'SELECT COUNT(*) as total FROM reviews WHERE user_id = ?',
      [userId]
    );
    const totalReviews = countResult[0].total;
    
    // Sayfalama
    const offset = (page - 1) * limit;
    const totalPages = Math.ceil(totalReviews / limit);
    
    // Kullanıcı yorumlarını getir
    const [reviews] = await connection.execute(
      `SELECT 
        r.id, r.rating, r.comment_tr, r.comment_en, r.is_approved, r.created_at,
        p.id as product_id, p.name_tr as product_name_tr, p.name_en as product_name_en
       FROM reviews r
       JOIN products p ON r.product_id = p.id
       WHERE r.user_id = ?
       ORDER BY r.created_at DESC
       LIMIT ? OFFSET ?`,
      [userId, parseInt(limit), offset]
    );
    
    connection.release();
    
    res.json({
      success: true,
      data: {
        reviews,
        pagination: {
          current_page: parseInt(page),
          total_pages: totalPages,
          total_reviews: totalReviews,
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get user reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Yorum güncelle
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment_tr, comment_en } = req.body;
    const userId = req.user.id;
    
    const connection = await pool.getConnection();
    
    // Yorumu kontrol et
    const [reviews] = await connection.execute(
      'SELECT id FROM reviews WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    
    if (reviews.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Yorum bulunamadı'
      });
    }
    
    // Yorumu güncelle
    await connection.execute(
      `UPDATE reviews SET 
       rating = ?, comment_tr = ?, comment_en = ?, 
       updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [rating, comment_tr, comment_en, id]
    );
    
    connection.release();
    
    res.json({
      success: true,
      message: 'Yorum güncellendi'
    });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Yorum sil
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const connection = await pool.getConnection();
    
    // Yorumu kontrol et ve sil
    const [result] = await connection.execute(
      'DELETE FROM reviews WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    
    connection.release();
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Yorum bulunamadı'
      });
    }
    
    res.json({
      success: true,
      message: 'Yorum silindi'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Yorum onayla (admin)
const approveReview = async (req, res) => {
  try {
    const { id } = req.params;
    
    const connection = await pool.getConnection();
    
    // Yorumu kontrol et
    const [reviews] = await connection.execute(
      'SELECT id FROM reviews WHERE id = ?',
      [id]
    );
    
    if (reviews.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Yorum bulunamadı'
      });
    }
    
    // Yorumu onayla
    await connection.execute(
      'UPDATE reviews SET is_approved = TRUE, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [id]
    );
    
    connection.release();
    
    res.json({
      success: true,
      message: 'Yorum onaylandı'
    });
  } catch (error) {
    console.error('Approve review error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

module.exports = {
  addReview,
  getProductReviews,
  getUserReviews,
  updateReview,
  deleteReview,
  approveReview
};
