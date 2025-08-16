const express = require('express');
const router = express.Router();
const customOrderController = require('../controllers/customOrderController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { validateCustomOrder } = require('../middleware/validation');

// POST /api/custom-orders - Özel sipariş oluştur
router.post('/', validateCustomOrder, customOrderController.createCustomOrder);

// GET /api/custom-orders - Kullanıcı özel siparişlerini getir
router.get('/', authenticateToken, customOrderController.getUserCustomOrders);

// GET /api/custom-orders/:id - Özel sipariş detayını getir
router.get('/:id', authenticateToken, customOrderController.getCustomOrderById);

// PUT /api/custom-orders/:id/status - Özel sipariş durumunu güncelle (admin)
router.put('/:id/status', authenticateToken, requireAdmin, customOrderController.updateCustomOrderStatus);

module.exports = router;
