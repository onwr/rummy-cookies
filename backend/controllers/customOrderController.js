const { pool } = require('../config/database');

// Özel sipariş oluştur
const createCustomOrder = async (req, res) => {
  try {
    const {
      theme,
      colors,
      quantity,
      delivery_date,
      message,
      guest_name,
      guest_email,
      guest_phone
    } = req.body;
    
    const userId = req.user ? req.user.id : null;
    
    // Guest kullanıcı için gerekli alanları kontrol et
    if (!userId && (!guest_name || !guest_email || !guest_phone)) {
      return res.status(400).json({
        success: false,
        message: 'Misafir kullanıcılar için ad, e-posta ve telefon gereklidir'
      });
    }
    
    const connection = await pool.getConnection();
    
    // Özel siparişi oluştur
    const [result] = await connection.execute(
      `INSERT INTO custom_orders (
        user_id, guest_email, guest_name, guest_phone,
        theme, colors, quantity, delivery_date, message
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        guest_email || null,
        guest_name || null,
        guest_phone || null,
        theme,
        colors,
        quantity,
        delivery_date,
        message
      ]
    );
    
    const customOrderId = result.insertId;
    
    // Oluşturulan özel siparişi getir
    const [customOrders] = await connection.execute(
      'SELECT * FROM custom_orders WHERE id = ?',
      [customOrderId]
    );
    
    connection.release();
    
    res.status(201).json({
      success: true,
      message: 'Özel sipariş başarıyla oluşturuldu',
      data: {
        custom_order: customOrders[0]
      }
    });
  } catch (error) {
    console.error('Create custom order error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Kullanıcı özel siparişlerini getir
const getUserCustomOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    
    const connection = await pool.getConnection();
    
    // Toplam özel sipariş sayısını al
    const [countResult] = await connection.execute(
      'SELECT COUNT(*) as total FROM custom_orders WHERE user_id = ?',
      [userId]
    );
    const totalCustomOrders = countResult[0].total;
    
    // Sayfalama
    const offset = (page - 1) * limit;
    const totalPages = Math.ceil(totalCustomOrders / limit);
    
    // Özel siparişleri getir
    const [customOrders] = await connection.execute(
      `SELECT 
        id, theme, colors, quantity, delivery_date, message,
        status, estimated_price, created_at, updated_at
       FROM custom_orders
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [userId, parseInt(limit), offset]
    );
    
    connection.release();
    
    res.json({
      success: true,
      data: {
        custom_orders: customOrders,
        pagination: {
          current_page: parseInt(page),
          total_pages: totalPages,
          total_custom_orders: totalCustomOrders,
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get user custom orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Özel sipariş detayını getir
const getCustomOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const connection = await pool.getConnection();
    
    // Özel siparişi getir
    const [customOrders] = await connection.execute(
      'SELECT * FROM custom_orders WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    
    if (customOrders.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Özel sipariş bulunamadı'
      });
    }
    
    connection.release();
    
    res.json({
      success: true,
      data: {
        custom_order: customOrders[0]
      }
    });
  } catch (error) {
    console.error('Get custom order by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Özel sipariş durumunu güncelle (admin)
const updateCustomOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, estimated_price } = req.body;
    
    const connection = await pool.getConnection();
    
    // Özel siparişi kontrol et
    const [customOrders] = await connection.execute(
      'SELECT id FROM custom_orders WHERE id = ?',
      [id]
    );
    
    if (customOrders.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Özel sipariş bulunamadı'
      });
    }
    
    // Durumu güncelle
    const updateFields = [];
    const updateValues = [];
    
    if (status) {
      updateFields.push('status = ?');
      updateValues.push(status);
    }
    
    if (estimated_price !== undefined) {
      updateFields.push('estimated_price = ?');
      updateValues.push(estimated_price);
    }
    
    if (updateFields.length > 0) {
      updateFields.push('updated_at = CURRENT_TIMESTAMP');
      updateValues.push(id);
      
      await connection.execute(
        `UPDATE custom_orders SET ${updateFields.join(', ')} WHERE id = ?`,
        updateValues
      );
    }
    
    connection.release();
    
    res.json({
      success: true,
      message: 'Özel sipariş durumu güncellendi'
    });
  } catch (error) {
    console.error('Update custom order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

module.exports = {
  createCustomOrder,
  getUserCustomOrders,
  getCustomOrderById,
  updateCustomOrderStatus
};
