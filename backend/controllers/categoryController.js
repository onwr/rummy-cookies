const { pool } = require('../config/database');

// Tüm kategorileri getir (dil bazlı)
const getAllCategories = async (req, res) => {
  try {
    const { language = 'tr' } = req.query;
    
    const [categories] = await pool.execute(
      `SELECT 
        c.id, c.slug, c.color, c.is_active, c.sort_order, c.created_at,
        ${language === 'tr' ? 'c.name_tr as name' : 'c.name_en as name'},
        ${language === 'tr' ? 'c.description_tr as description' : 'c.description_en as description'},
        c.image,
        COUNT(p.id) as product_count
       FROM categories c
       LEFT JOIN products p ON c.id = p.category_id AND p.is_active = TRUE
       WHERE c.is_active = TRUE
       GROUP BY c.id
       ORDER BY c.sort_order, c.name_${language}`,
      []
    );
    
    res.json({
      success: true,
      data: {
        categories
      }
    });
  } catch (error) {
    console.error('Get all categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Kategori detayını getir (dil bazlı)
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { language = 'tr' } = req.query;
    
    const [categories] = await pool.execute(
      `SELECT 
        c.id, c.slug, c.color, c.is_active, c.sort_order, c.created_at,
        ${language === 'tr' ? 'c.name_tr as name' : 'c.name_en as name'},
        ${language === 'tr' ? 'c.description_tr as description' : 'c.description_en as description'},
        c.image,
        COUNT(p.id) as product_count
       FROM categories c
       LEFT JOIN products p ON c.id = p.category_id AND p.is_active = TRUE
       WHERE c.id = ? AND c.is_active = TRUE
       GROUP BY c.id`,
      [id]
    );
    
    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Kategori bulunamadı'
      });
    }
    
    const category = categories[0];
    
    // Kategoriye ait ürünleri getir
    const [products] = await pool.execute(
      `SELECT 
        p.id, p.slug, p.price, p.sale_price, p.stock,
        ${language === 'tr' ? 'p.name_tr as name' : 'p.name_en as name'},
        ${language === 'tr' ? 'p.description_tr as description' : 'p.description_en as description'},
        pi.image_url as primary_image
       FROM products p
       LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
       WHERE p.category_id = ? AND p.is_active = TRUE
       ORDER BY p.created_at DESC`,
      [id]
    );
    
    // Her ürün için rozetleri getir
    for (let product of products) {
      const [badges] = await pool.execute(
        'SELECT badge_type FROM product_badges WHERE product_id = ?',
        [product.id]
      );
      product.badges = badges.map(badge => badge.badge_type);
    }
    
    category.products = products;
    
    res.json({
      success: true,
      data: {
        category
      }
    });
  } catch (error) {
    console.error('Get category by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Kategoriyi slug ile getir
const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const { language = 'tr' } = req.query;
    
    const [categories] = await pool.execute(
      `SELECT 
        c.id, c.slug, c.color, c.is_active, c.sort_order, c.created_at,
        ${language === 'tr' ? 'c.name_tr as name' : 'c.name_en as name'},
        ${language === 'tr' ? 'c.description_tr as description' : 'c.description_en as description'},
        c.image,
        COUNT(p.id) as product_count
       FROM categories c
       LEFT JOIN products p ON c.id = p.category_id AND p.is_active = TRUE
       WHERE c.slug = ? AND c.is_active = TRUE
       GROUP BY c.id`,
      [slug]
    );
    
    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Kategori bulunamadı'
      });
    }
    
    const category = categories[0];
    
    // Kategoriye ait ürünleri getir
    const [products] = await pool.execute(
      `SELECT 
        p.id, p.slug, p.price, p.sale_price, p.stock,
        ${language === 'tr' ? 'p.name_tr as name' : 'p.name_en as name'},
        ${language === 'tr' ? 'p.description_tr as description' : 'p.description_en as description'},
        pi.image_url as primary_image
       FROM products p
       LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
       WHERE p.category_id = ? AND p.is_active = TRUE
       ORDER BY p.created_at DESC`,
      [category.id]
    );
    
    // Her ürün için rozetleri getir
    for (let product of products) {
      const [badges] = await pool.execute(
        'SELECT badge_type FROM product_badges WHERE product_id = ?',
        [product.id]
      );
      product.badges = badges.map(badge => badge.badge_type);
    }
    
    category.products = products;
    
    res.json({
      success: true,
      data: {
        category
      }
    });
  } catch (error) {
    console.error('Get category by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Kategoriye ait ürünleri getir (sayfalama ile)
const getCategoryProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { language = 'tr', page = 1, limit = 20, sort = 'created_at', order = 'DESC' } = req.query;
    
    // Kategori bilgisini al
    const [categories] = await pool.execute(
      `SELECT 
        c.id, c.slug, c.color,
        ${language === 'tr' ? 'c.name_tr as name' : 'c.name_en as name'},
        ${language === 'tr' ? 'c.description_tr as description' : 'c.description_en as description'},
        c.image
       FROM categories c
       WHERE c.id = ? AND c.is_active = TRUE`,
      [id]
    );
    
    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Kategori bulunamadı'
      });
    }
    
    const category = categories[0];
    
    // Toplam ürün sayısını al
    const [countResult] = await pool.execute(
      'SELECT COUNT(*) as total FROM products WHERE category_id = ? AND is_active = TRUE',
      [id]
    );
    const totalProducts = countResult[0].total;
    
    // Sayfalama
    const offset = (page - 1) * limit;
    const totalPages = Math.ceil(totalProducts / limit);
    
    // Ürünleri getir
    const [products] = await pool.execute(
      `SELECT 
        p.id, p.slug, p.price, p.sale_price, p.stock,
        ${language === 'tr' ? 'p.name_tr as name' : 'p.name_en as name'},
        ${language === 'tr' ? 'p.description_tr as description' : 'p.description_en as description'},
        pi.image_url as primary_image
       FROM products p
       LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
       WHERE p.category_id = ? AND p.is_active = TRUE
       ORDER BY p.${sort} ${order}
       LIMIT ? OFFSET ?`,
      [id, parseInt(limit), offset]
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
        category,
        products,
        pagination: {
          current_page: parseInt(page),
          total_pages: totalPages,
          total_products: totalProducts,
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get category products error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Ana sayfa için kategori özeti
const getCategorySummary = async (req, res) => {
  try {
    const { language = 'tr' } = req.query;
    
    const [categories] = await pool.execute(
      `SELECT 
        c.id, c.slug, c.color, c.image,
        ${language === 'tr' ? 'c.name_tr as name' : 'c.name_en as name'},
        ${language === 'tr' ? 'c.description_tr as description' : 'c.description_en as description'},
        COUNT(p.id) as product_count
       FROM categories c
       LEFT JOIN products p ON c.id = p.category_id AND p.is_active = TRUE
       WHERE c.is_active = TRUE
       GROUP BY c.id
       ORDER BY c.sort_order, c.name_${language}
       LIMIT 6`,
      []
    );
    
    res.json({
      success: true,
      data: {
        categories
      }
    });
  } catch (error) {
    console.error('Get category summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  getCategoryProducts,
  getCategorySummary
};
