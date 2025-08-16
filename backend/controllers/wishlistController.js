const { pool } = require('../config/database');

// Favorilere ürün ekle
const addToWishlist = async (req, res) => {
  try {
    const { product_id, user_id = null } = req.body;
    
    if (!product_id) {
      return res.status(400).json({
        success: false,
        message: 'Ürün ID gerekli'
      });
    }

    // Ürünün var olup olmadığını kontrol et
    const [products] = await pool.execute(
      'SELECT id FROM products WHERE id = ? AND is_active = TRUE',
      [product_id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Ürün bulunamadı'
      });
    }

    // Kullanıcı ID yoksa session ID kullan (guest user)
    let sessionId = user_id;
    
    if (!sessionId) {
      // Cookie'den session ID'yi oku
      if (req.headers.cookie) {
        const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        }, {});
        
        sessionId = cookies['rummy-session'];
      }
      
      // Hala yoksa req.sessionID kullan
      if (!sessionId) {
        sessionId = req.sessionID;
      }
    }
    
    // Session ID yoksa hata döndür
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID bulunamadı'
      });
    }

    // Zaten favorilerde var mı kontrol et
    const [existingItems] = await pool.execute(
      'SELECT id FROM wishlist WHERE product_id = ? AND (user_id = ? OR (session_id = ? AND user_id IS NULL))',
      [product_id, user_id, sessionId]
    );

    if (existingItems.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Ürün zaten favorilerde'
      });
    }

    // Favorilere ekle
    await pool.execute(
      'INSERT INTO wishlist (product_id, user_id, session_id, created_at) VALUES (?, ?, ?, NOW())',
      [product_id, user_id, sessionId]
    );

    res.json({
      success: true,
      message: 'Ürün favorilere eklendi'
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Favorilerden ürün çıkar
const removeFromWishlist = async (req, res) => {
  try {
    const { product_id, user_id = null } = req.body;
    
    if (!product_id) {
      return res.status(400).json({
        success: false,
        message: 'Ürün ID gerekli'
      });
    }

    const sessionId = user_id || req.sessionID;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID bulunamadı'
      });
    }

    await pool.execute(
      'DELETE FROM wishlist WHERE product_id = ? AND (user_id = ? OR (session_id = ? AND user_id IS NULL))',
      [product_id, user_id, sessionId]
    );

    res.json({
      success: true,
      message: 'Ürün favorilerden çıkarıldı'
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Favorileri listele
const getWishlist = async (req, res) => {
  try {
    const { user_id = null, language = 'tr' } = req.query;
    const sessionId = user_id || req.sessionID;
    
    if (!sessionId) {
      return res.json({
        success: true,
        data: {
          items: [],
          item_count: 0
        }
      });
    }

    const [wishlistItems] = await pool.execute(
      `SELECT w.id, w.created_at,
              p.id as product_id, p.slug, p.price, p.sale_price, p.stock,
              ${language === 'tr' ? 'p.name_tr as name' : 'p.name_en as name'},
              ${language === 'tr' ? 'p.description_tr as description' : 'p.description_en as description'},
              c.id as category_id,
              ${language === 'tr' ? 'c.name_tr as category_name' : 'c.name_en as category_name'},
              c.slug as category_slug,
              c.color as category_color,
              pi.image_url as primary_image
       FROM wishlist w
       JOIN products p ON w.product_id = p.id
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
       WHERE w.user_id = ? OR (w.session_id = ? AND w.user_id IS NULL)
       ORDER BY w.created_at DESC`,
      [user_id, sessionId]
    );

    res.json({
      success: true,
      data: {
        items: wishlistItems,
        item_count: wishlistItems.length
      }
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Favorileri temizle
const clearWishlist = async (req, res) => {
  try {
    const { user_id = null } = req.body;
    const sessionId = user_id || req.sessionID;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID bulunamadı'
      });
    }

    await pool.execute(
      'DELETE FROM wishlist WHERE user_id = ? OR (session_id = ? AND user_id IS NULL)',
      [user_id, sessionId]
    );

    res.json({
      success: true,
      message: 'Favoriler temizlendi'
    });
  } catch (error) {
    console.error('Clear wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Ürün favorilerde mi kontrol et
const checkWishlistStatus = async (req, res) => {
  try {
    const { product_id, user_id = null } = req.query;
    
    if (!product_id) {
      return res.status(400).json({
        success: false,
        message: 'Ürün ID gerekli'
      });
    }

    const sessionId = user_id || req.sessionID;
    
    if (!sessionId) {
      return res.json({
        success: true,
        data: {
          is_in_wishlist: false
        }
      });
    }

    const [items] = await pool.execute(
      'SELECT id FROM wishlist WHERE product_id = ? AND (user_id = ? OR (session_id = ? AND user_id IS NULL))',
      [product_id, user_id, sessionId]
    );

    res.json({
      success: true,
      data: {
        is_in_wishlist: items.length > 0
      }
    });
  } catch (error) {
    console.error('Check wishlist status error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  clearWishlist,
  checkWishlistStatus
};
