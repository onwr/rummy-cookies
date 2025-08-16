const { pool } = require('../config/database');

// Sipariş oluştur
const createOrder = async (req, res) => {
  try {
    const {
      shipping_address,
      shipping_city,
      shipping_district,
      shipping_zip_code,
      notes,
      payment_method
    } = req.body;
    
    const userId = req.user ? req.user.id : null;
    const sessionId = req.user ? null : req.headers['session-id'];
    
    if (!userId && !sessionId) {
      return res.status(401).json({
        success: false,
        message: 'Oturum gerekli'
      });
    }
    
    const connection = await pool.getConnection();
    
    try {
      // Transaction başlat
      await connection.beginTransaction();
      
      // Sepet ürünlerini al
      let cartItems;
      if (userId) {
        [cartItems] = await connection.execute(
          `SELECT 
            c.id, c.quantity,
            p.id as product_id, p.price, p.sale_price, p.stock,
            p.name_tr, p.name_en
           FROM cart c
           JOIN products p ON c.product_id = p.id
           WHERE c.user_id = ? AND p.is_active = TRUE`,
          [userId]
        );
      } else {
        [cartItems] = await connection.execute(
          `SELECT 
            c.id, c.quantity,
            p.id as product_id, p.price, p.sale_price, p.stock,
            p.name_tr, p.name_en
           FROM cart c
           JOIN products p ON c.product_id = p.id
           WHERE c.session_id = ? AND p.is_active = TRUE`,
          [sessionId]
        );
      }
      
      if (cartItems.length === 0) {
        await connection.rollback();
        connection.release();
        return res.status(400).json({
          success: false,
          message: 'Sepet boş'
        });
      }
      
      // Stok kontrolü
      for (const item of cartItems) {
        if (item.stock < item.quantity) {
          await connection.rollback();
          connection.release();
          return res.status(400).json({
            success: false,
            message: `${item.name_tr} için yetersiz stok`
          });
        }
      }
      
      // Toplam tutarı hesapla
      const totalAmount = cartItems.reduce((sum, item) => {
        const price = item.sale_price || item.price;
        return sum + (price * item.quantity);
      }, 0);
      
      // Kargo ücreti (Türkiye için ücretsiz)
      const shippingFee = totalAmount >= 100 ? 0 : 15;
      const finalAmount = totalAmount + shippingFee;
      
      // Sipariş numarası oluştur
      const orderNumber = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
      
      // Siparişi oluştur
      const [orderResult] = await connection.execute(
        `INSERT INTO orders (
          order_number, user_id, guest_email, guest_name, guest_phone,
          total_amount, shipping_fee, final_amount,
          shipping_address, shipping_city, shipping_district, shipping_zip_code,
          notes, payment_method
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderNumber,
          userId,
          req.user ? null : req.body.guest_email,
          req.user ? null : req.body.guest_name,
          req.user ? null : req.body.guest_phone,
          totalAmount,
          shippingFee,
          finalAmount,
          shipping_address,
          shipping_city,
          shipping_district,
          shipping_zip_code,
          notes,
          payment_method
        ]
      );
      
      const orderId = orderResult.insertId;
      
      // Sipariş ürünlerini ekle
      for (const item of cartItems) {
        const unitPrice = item.sale_price || item.price;
        const totalPrice = unitPrice * item.quantity;
        
        await connection.execute(
          `INSERT INTO order_items (
            order_id, product_id, product_name_tr, product_name_en,
            quantity, unit_price, total_price
          ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            orderId,
            item.product_id,
            item.name_tr,
            item.name_en,
            item.quantity,
            unitPrice,
            totalPrice
          ]
        );
        
        // Stok güncelle
        await connection.execute(
          'UPDATE products SET stock = stock - ? WHERE id = ?',
          [item.quantity, item.product_id]
        );
      }
      
      // Sepeti temizle
      if (userId) {
        await connection.execute('DELETE FROM cart WHERE user_id = ?', [userId]);
      } else {
        await connection.execute('DELETE FROM cart WHERE session_id = ?', [sessionId]);
      }
      
      // Transaction'ı tamamla
      await connection.commit();
      
      // Sipariş bilgilerini getir
      const [orders] = await connection.execute(
        `SELECT 
          o.*,
          oi.product_id, oi.product_name_tr, oi.product_name_en,
          oi.quantity, oi.unit_price, oi.total_price
         FROM orders o
         JOIN order_items oi ON o.id = oi.order_id
         WHERE o.id = ?`,
        [orderId]
      );
      
      connection.release();
      
      res.status(201).json({
        success: true,
        message: 'Sipariş başarıyla oluşturuldu',
        data: {
          order: {
            id: orderId,
            order_number: orderNumber,
            total_amount: totalAmount,
            shipping_fee: shippingFee,
            final_amount: finalAmount,
            items: orders.map(item => ({
              product_id: item.product_id,
              name_tr: item.product_name_tr,
              name_en: item.product_name_en,
              quantity: item.quantity,
              unit_price: item.unit_price,
              total_price: item.total_price
            }))
          }
        }
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Kullanıcı siparişlerini getir
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    
    const connection = await pool.getConnection();
    
    // Toplam sipariş sayısını al
    const [countResult] = await connection.execute(
      'SELECT COUNT(*) as total FROM orders WHERE user_id = ?',
      [userId]
    );
    const totalOrders = countResult[0].total;
    
    // Sayfalama
    const offset = (page - 1) * limit;
    const totalPages = Math.ceil(totalOrders / limit);
    
    // Siparişleri getir
    const [orders] = await connection.execute(
      `SELECT 
        o.id, o.order_number, o.status, o.total_amount, o.shipping_fee,
        o.final_amount, o.payment_method, o.payment_status, o.created_at,
        o.shipping_address, o.shipping_city, o.shipping_district
       FROM orders o
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC
       LIMIT ? OFFSET ?`,
      [userId, parseInt(limit), offset]
    );
    
    // Her sipariş için ürünleri getir
    for (let order of orders) {
      const [items] = await connection.execute(
        `SELECT 
          oi.product_id, oi.product_name_tr, oi.product_name_en,
          oi.quantity, oi.unit_price, oi.total_price
         FROM order_items oi
         WHERE oi.order_id = ?`,
        [order.id]
      );
      order.items = items;
    }
    
    connection.release();
    
    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          current_page: parseInt(page),
          total_pages: totalPages,
          total_orders: totalOrders,
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Sipariş detayını getir
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const connection = await pool.getConnection();
    
    // Siparişi getir
    const [orders] = await connection.execute(
      `SELECT 
        o.*
       FROM orders o
       WHERE o.id = ? AND o.user_id = ?`,
      [id, userId]
    );
    
    if (orders.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Sipariş bulunamadı'
      });
    }
    
    const order = orders[0];
    
    // Sipariş ürünlerini getir
    const [items] = await connection.execute(
      `SELECT 
        oi.product_id, oi.product_name_tr, oi.product_name_en,
        oi.quantity, oi.unit_price, oi.total_price
       FROM order_items oi
       WHERE oi.order_id = ?`,
      [id]
    );
    
    order.items = items;
    
    connection.release();
    
    res.json({
      success: true,
      data: {
        order
      }
    });
  } catch (error) {
    console.error('Get order by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Sipariş durumunu güncelle (admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, payment_status } = req.body;
    
    const connection = await pool.getConnection();
    
    // Siparişi kontrol et
    const [orders] = await connection.execute(
      'SELECT id FROM orders WHERE id = ?',
      [id]
    );
    
    if (orders.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Sipariş bulunamadı'
      });
    }
    
    // Sipariş durumunu güncelle
    const updateFields = [];
    const updateValues = [];
    
    if (status) {
      updateFields.push('status = ?');
      updateValues.push(status);
    }
    
    if (payment_status) {
      updateFields.push('payment_status = ?');
      updateValues.push(payment_status);
    }
    
    if (updateFields.length > 0) {
      updateFields.push('updated_at = CURRENT_TIMESTAMP');
      updateValues.push(id);
      
      await connection.execute(
        `UPDATE orders SET ${updateFields.join(', ')} WHERE id = ?`,
        updateValues
      );
    }
    
    connection.release();
    
    res.json({
      success: true,
      message: 'Sipariş durumu güncellendi'
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Sipariş iptal et
const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const connection = await pool.getConnection();
    
    try {
      // Transaction başlat
      await connection.beginTransaction();
      
      // Siparişi kontrol et
      const [orders] = await connection.execute(
        'SELECT id, status, payment_status FROM orders WHERE id = ? AND user_id = ?',
        [id, userId]
      );
      
      if (orders.length === 0) {
        await connection.rollback();
        connection.release();
        return res.status(404).json({
          success: false,
          message: 'Sipariş bulunamadı'
        });
      }
      
      const order = orders[0];
      
      // Sadece bekleyen siparişler iptal edilebilir
      if (order.status !== 'pending') {
        await connection.rollback();
        connection.release();
        return res.status(400).json({
          success: false,
          message: 'Bu sipariş iptal edilemez'
        });
      }
      
      // Sipariş durumunu güncelle
      await connection.execute(
        'UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        ['cancelled', id]
      );
      
      // Stokları geri ekle
      const [items] = await connection.execute(
        'SELECT product_id, quantity FROM order_items WHERE order_id = ?',
        [id]
      );
      
      for (const item of items) {
        await connection.execute(
          'UPDATE products SET stock = stock + ? WHERE id = ?',
          [item.quantity, item.product_id]
        );
      }
      
      // Transaction'ı tamamla
      await connection.commit();
      
      connection.release();
      
      res.json({
        success: true,
        message: 'Sipariş iptal edildi'
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder
};
