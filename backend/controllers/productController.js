const { pool } = require('../config/database');

// Tüm ürünleri getir (dil bazlı)
const getAllProducts = async (req, res) => {
  try {
    const { language = 'tr', category_id, search, sort = 'created_at', order = 'DESC', page = 1, limit = 20 } = req.query;
    
    console.log('getAllProducts called with:', { language, category_id, search, sort, order, page, limit });
    
    // Veritabanı bağlantı kontrolü
    const connection = await pool.getConnection();
    if (!connection) {
      throw new Error('Veritabanı bağlantısı kurulamadı');
    }
    
    let whereClause = 'WHERE p.is_active = TRUE';
    let params = [];
    
    // Kategori filtresi
    if (category_id) {
      whereClause += ' AND p.category_id = ?';
      params.push(category_id);
    }
    
    // Arama filtresi
    if (search) {
      const searchTerm = `%${search}%`;
      if (language === 'tr') {
        whereClause += ' AND (p.name_tr LIKE ? OR p.description_tr LIKE ?)';
      } else {
        whereClause += ' AND (p.name_en LIKE ? OR p.description_en LIKE ?)';
      }
      params.push(searchTerm, searchTerm);
    }
    
    // Toplam ürün sayısını al
    const [countResult] = await connection.execute(
      `SELECT COUNT(*) as total FROM products p ${whereClause}`,
      params
    );
    const totalProducts = countResult[0].total;
    
    // Sayfalama
    const offset = (page - 1) * limit;
    const totalPages = Math.ceil(totalProducts / limit);
    
    // Sıralama için güvenli alan kontrolü
    const allowedSortFields = ['created_at', 'price', 'name', 'stock', 'is_featured', 'is_bestseller'];
    const safeSortField = allowedSortFields.includes(sort) ? sort : 'created_at';
    
    // Order için güvenli değer kontrolü
    const safeOrder = ['ASC', 'DESC'].includes(order.toUpperCase()) ? order.toUpperCase() : 'DESC';
    
    // Ürünleri getir
    let orderByClause;
    if (safeSortField === 'name') {
      orderByClause = language === 'tr' ? 'p.name_tr' : 'p.name_en';
    } else {
      orderByClause = `p.${safeSortField}`;
    }
    
    const sqlQuery = `SELECT DISTINCT
      p.id, p.slug, p.price, p.sale_price, p.stock, p.min_order, p.max_order,
      p.weight, p.dimensions, p.is_featured, p.is_bestseller, p.is_new,
      p.created_at,
      ${language === 'tr' ? 'p.name_tr as name' : 'p.name_en as name'},
      ${language === 'tr' ? 'p.description_tr as description' : 'p.description_en as description'},
      c.id as category_id,
      ${language === 'tr' ? 'c.name_tr as category_name' : 'c.name_en as category_name'},
      c.slug as category_slug,
      c.color as category_color,
      pi.image_url as primary_image
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
     ${whereClause}
     ORDER BY ${orderByClause} ${safeOrder}
     LIMIT ? OFFSET ?`;
    
    console.log('SQL Query:', sqlQuery);
    console.log('SQL Params:', [...params, parseInt(limit), offset]);
    
    const [products] = await connection.execute(sqlQuery, [...params, parseInt(limit), offset]);
    
    // Her ürün için rozetleri getir
    for (let product of products) {
      const [badges] = await connection.execute(
        'SELECT badge_type FROM product_badges WHERE product_id = ?',
        [product.id]
      );
      product.badges = badges.map(badge => badge.badge_type);
      
      // Ürün resimlerini getir
      const [images] = await connection.execute(
        'SELECT image_url, alt_text_tr, alt_text_en FROM product_images WHERE product_id = ? ORDER BY sort_order, is_primary DESC',
        [product.id]
      );
      product.images = images;
    }
    
    res.json({
      success: true,
      data: {
        products,
        pagination: {
          current_page: parseInt(page),
          total_pages: totalPages,
          total_products: totalProducts,
          limit: parseInt(limit)
        }
      }
    });
    
    // Connection'ı release et
    if (connection) {
      connection.release();
    }
  } catch (error) {
    console.error('Get all products error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      sqlMessage: error.sqlMessage,
      sqlState: error.sqlState,
      errno: error.errno
    });
    
    // Connection'ı release et
    if (connection) {
      connection.release();
    }
    
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Tek ürün getir (dil bazlı)
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { language = 'tr' } = req.query;
    
    const [products] = await pool.execute(
      `SELECT 
        p.*,
        ${language === 'tr' ? 'p.name_tr as name' : 'p.name_en as name'},
        ${language === 'tr' ? 'p.description_tr as description' : 'p.description_en as description'},
        c.id as category_id,
        ${language === 'tr' ? 'c.name_tr as category_name' : 'c.name_en as category_name'},
        c.slug as category_slug,
        c.color as category_color
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = ? AND p.is_active = TRUE`,
      [id]
    );
    
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Ürün bulunamadı'
      });
    }
    
    const product = products[0];
    
    // Ürün rozetlerini getir
    const [badges] = await pool.execute(
      'SELECT badge_type FROM product_badges WHERE product_id = ?',
      [id]
    );
    product.badges = badges.map(badge => badge.badge_type);
    
    // Ürün resimlerini getir
    const [images] = await pool.execute(
      'SELECT image_url, alt_text_tr, alt_text_en, is_primary FROM product_images WHERE product_id = ? ORDER BY sort_order, is_primary DESC',
      [id]
    );
    product.images = images;
    
    // Benzer ürünleri getir
    const [similarProducts] = await pool.execute(
      `SELECT 
        p.id, p.slug, p.price, p.sale_price,
        ${language === 'tr' ? 'p.name_tr as name' : 'p.name_en as name'},
        pi.image_url as primary_image
       FROM products p
       LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
       WHERE p.category_id = ? AND p.id != ? AND p.is_active = TRUE
       LIMIT 4`,
      [product.category_id, id]
    );
    product.similar_products = similarProducts;
    
    res.json({
      success: true,
      data: {
        product
      }
    });
  } catch (error) {
    console.error('Get product by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Ürünü slug ile getir
const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const { language = 'tr' } = req.query;
    
    const [products] = await pool.execute(
      `SELECT 
        p.*,
        ${language === 'tr' ? 'p.name_tr as name' : 'p.name_en as name'},
        ${language === 'tr' ? 'p.description_tr as description' : 'p.description_en as description'},
        c.id as category_id,
        ${language === 'tr' ? 'c.name_tr as category_name' : 'c.name_en as category_name'},
        c.slug as category_slug,
        c.color as category_color
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.slug = ? AND p.is_active = TRUE`,
      [slug]
    );
    
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Ürün bulunamadı'
      });
    }
    
    const product = products[0];
    
    // Ürün rozetlerini getir
    const [badges] = await pool.execute(
      'SELECT badge_type FROM product_badges WHERE product_id = ?',
      [product.id]
    );
    product.badges = badges.map(badge => badge.badge_type);
    
    // Ürün resimlerini getir
    const [images] = await pool.execute(
      'SELECT image_url, alt_text_tr, alt_text_en, is_primary FROM product_images WHERE product_id = ? ORDER BY sort_order, is_primary DESC',
      [product.id]
    );
    product.images = images;
    
    res.json({
      success: true,
      data: {
        product
      }
    });
  } catch (error) {
    console.error('Get product by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Öne çıkan ürünleri getir
const getFeaturedProducts = async (req, res) => {
  try {
    const { language = 'tr', limit = 8 } = req.query;
    
    const [products] = await pool.execute(
      `SELECT 
        p.id, p.slug, p.price, p.sale_price, p.stock,
        ${language === 'tr' ? 'p.name_tr as name' : 'p.name_en as name'},
        ${language === 'tr' ? 'p.description_tr as description' : 'p.description_en as description'},
        c.slug as category_slug,
        pi.image_url as primary_image
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
       WHERE p.is_featured = TRUE AND p.is_active = TRUE
       ORDER BY p.created_at DESC
       LIMIT ?`,
      [parseInt(limit)]
    );
    
    // Her ürün için rozetleri getir
    for (let product of products) {
      const [badges] = await pool.execute(
        'SELECT badge_type FROM product_badges WHERE product_id = ?',
        [product.id]
      );
      product.badges = badges.map(badge => badge.badge_type);
    }
    
    res.json({
      success: true,
      data: {
        products
      }
    });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Çok satan ürünleri getir
const getBestsellerProducts = async (req, res) => {
  try {
    const { language = 'tr', limit = 8 } = req.query;
    
    const [products] = await pool.execute(
      `SELECT 
        p.id, p.slug, p.price, p.sale_price, p.stock, p.min_order, p.max_order,
        p.weight, p.dimensions, p.is_featured, p.is_bestseller, p.is_new,
        p.created_at,
        ${language === 'tr' ? 'p.name_tr as name' : 'p.name_en as name'},
        ${language === 'tr' ? 'p.description_tr as description' : 'p.description_en as description'},
        c.id as category_id,
        ${language === 'tr' ? 'c.name_tr as category_name' : 'c.name_en as category_name'},
        c.slug as category_slug,
        c.color as category_color,
        pi.image_url as primary_image
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
       WHERE p.is_bestseller = TRUE AND p.is_active = TRUE
       ORDER BY p.created_at DESC
       LIMIT ?`,
      [parseInt(limit)]
    );
    
    // Her ürün için rozetleri getir
    for (let product of products) {
      const [badges] = await pool.execute(
        'SELECT badge_type FROM product_badges WHERE product_id = ?',
        [product.id]
      );
      product.badges = badges.map(badge => badge.badge_type);
      
      // Ürün resimlerini getir
      const [images] = await pool.execute(
        'SELECT image_url, alt_text_tr, alt_text_en FROM product_images WHERE product_id = ? ORDER BY sort_order, is_primary DESC',
        [product.id]
      );
      product.images = images;
    }
    
    res.json({
      success: true,
      data: {
        products
      }
    });
  } catch (error) {
    console.error('Get bestseller products error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Yeni ürünleri getir
const getNewProducts = async (req, res) => {
  try {
    const { language = 'tr', limit = 8 } = req.query;
    
    const [products] = await pool.execute(
      `SELECT 
        p.id, p.slug, p.price, p.sale_price, p.stock,
        ${language === 'tr' ? 'p.name_tr as name' : 'p.name_en as name'},
        ${language === 'tr' ? 'p.description_tr as description' : 'p.description_en as description'},
        c.slug as category_slug,
        pi.image_url as primary_image
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
       WHERE p.is_new = TRUE AND p.is_active = TRUE
       ORDER BY p.created_at DESC
       LIMIT ?`,
      [parseInt(limit)]
    );
    
    // Her ürün için rozetleri getir
    for (let product of products) {
      const [badges] = await pool.execute(
        'SELECT badge_type FROM product_badges WHERE product_id = ?',
        [product.id]
      );
      product.badges = badges.map(badge => badge.badge_type);
    }
    
    res.json({
      success: true,
      data: {
        products
      }
    });
  } catch (error) {
    console.error('Get new products error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductBySlug,
  getFeaturedProducts,
  getBestsellerProducts,
  getNewProducts
};
