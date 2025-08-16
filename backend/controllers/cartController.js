const { pool } = require('../config/database');

// Sepete ürün ekle
const addToCart = async (req, res) => {
  try {
    const { product_id, quantity = 1, user_id = null } = req.body;
    
    if (!product_id) {
      return res.status(400).json({
        success: false,
        message: 'Ürün ID gerekli'
      });
    }

    // Ürünün var olup olmadığını kontrol et
    const [products] = await pool.execute(
      'SELECT id, price, stock FROM products WHERE id = ? AND is_active = TRUE',
      [product_id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Ürün bulunamadı'
      });
    }

    const product = products[0];
    
    // Stok kontrolü
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Yetersiz stok'
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
    
    // Debug: Session ID'yi logla
    console.log('🔍 Cart Add - Session Debug:', {
      user_id,
      sessionID: req.sessionID,
      session: req.session,
      cookies: req.headers.cookie,
      extractedSessionId: sessionId
    });
    
    // Session ID yoksa hata döndür
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID bulunamadı'
      });
    }

    // Sepette zaten var mı kontrol et
    const [existingItems] = await pool.execute(
      'SELECT id, quantity FROM cart WHERE product_id = ? AND (user_id = ? OR (session_id = ? AND user_id IS NULL))',
      [product_id, user_id, sessionId]
    );

    if (existingItems.length > 0) {
      // Miktarı güncelle
      const newQuantity = existingItems[0].quantity + quantity;
      await pool.execute(
        'UPDATE cart SET quantity = ?, updated_at = NOW() WHERE id = ?',
        [newQuantity, existingItems[0].id]
      );
    } else {
      // Yeni ürün ekle
      await pool.execute(
        'INSERT INTO cart (product_id, user_id, session_id, quantity, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
        [product_id, user_id, sessionId, quantity]
      );
    }

    res.json({
      success: true,
      message: 'Ürün sepete eklendi'
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Sepetten ürün çıkar
const removeFromCart = async (req, res) => {
  try {
    const { cart_item_id, user_id = null } = req.body;
    
    if (!cart_item_id) {
      return res.status(400).json({
        success: false,
        message: 'Sepet öğesi ID gerekli'
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
      'DELETE FROM cart WHERE id = ? AND (user_id = ? OR (session_id = ? AND user_id IS NULL))',
      [cart_item_id, user_id, sessionId]
    );

    res.json({
      success: true,
      message: 'Ürün sepetten çıkarıldı'
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Sepet miktarını güncelle
const updateCartQuantity = async (req, res) => {
  try {
    const { cart_item_id, quantity, user_id = null } = req.body;
    
    if (!cart_item_id || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Sepet öğesi ID ve miktar gerekli'
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Miktar 0\'dan büyük olmalı'
      });
    }

    const sessionId = user_id || req.sessionID;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID bulunamadı'
      });
    }

    // Stok kontrolü
    const [cartItems] = await pool.execute(
      `SELECT c.id, p.stock FROM cart c 
       JOIN products p ON c.product_id = p.id 
       WHERE c.id = ? AND (c.user_id = ? OR (c.session_id = ? AND c.user_id IS NULL))`,
      [cart_item_id, user_id, sessionId]
    );

    if (cartItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Sepet öğesi bulunamadı'
      });
    }

    if (cartItems[0].stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Yetersiz stok'
      });
    }

    await pool.execute(
      'UPDATE cart SET quantity = ?, updated_at = NOW() WHERE id = ?',
      [quantity, cart_item_id]
    );

    res.json({
      success: true,
      message: 'Miktar güncellendi'
    });
  } catch (error) {
    console.error('Update cart quantity error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Sepeti listele
const getCart = async (req, res) => {
  try {
    const { user_id = null } = req.query;
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
    
    // Debug: Session ID'yi logla
    console.log('🔍 Cart Get - Session Debug:', {
      user_id,
      sessionID: req.sessionID,
      session: req.session,
      cookies: req.headers.cookie,
      extractedSessionId: sessionId
    });
    
    if (!sessionId) {
      return res.json({
        success: true,
        data: {
          items: [],
          total: "0.00",
          item_count: 0
        }
      });
    }

    const [cartItems] = await pool.execute(
      `SELECT c.id, c.quantity, c.created_at,
              p.id as product_id, p.name_tr, p.name_en, p.slug, p.stock, p.price,
              pi.image_url as primary_image
       FROM cart c
       JOIN products p ON c.product_id = p.id
       LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
       WHERE c.user_id = ? OR (c.session_id = ? AND c.user_id IS NULL)
       ORDER BY c.created_at DESC`,
      [user_id, sessionId]
    );

    // Toplam hesapla
    let total = 0;
    let itemCount = 0;
    
    cartItems.forEach(item => {
      total += parseFloat(item.price) * item.quantity;
      itemCount += item.quantity;
    });

    res.json({
      success: true,
      data: {
        items: cartItems,
        total: total.toFixed(2),
        item_count: itemCount
      }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Sepeti temizle
const clearCart = async (req, res) => {
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
      'DELETE FROM cart WHERE user_id = ? OR (session_id = ? AND user_id IS NULL)',
      [user_id, sessionId]
    );

    res.json({
      success: true,
      message: 'Sepet temizlendi'
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  getCart,
  clearCart
};
