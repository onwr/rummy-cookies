const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { validateOrder } = require('../middleware/validation');

// POST /api/orders - Sipariş oluştur
router.post('/', authenticateToken, validateOrder, orderController.createOrder);

// GET /api/orders - Kullanıcı siparişlerini getir
router.get('/', authenticateToken, orderController.getUserOrders);

// GET /api/orders/:id - Sipariş detayını getir
router.get('/:id', authenticateToken, orderController.getOrderById);

// PUT /api/orders/:id/status - Sipariş durumunu güncelle (admin)
router.put('/:id/status', authenticateToken, requireAdmin, orderController.updateOrderStatus);

// DELETE /api/orders/:id - Sipariş iptal et
router.delete('/:id', authenticateToken, orderController.cancelOrder);

module.exports = router;
