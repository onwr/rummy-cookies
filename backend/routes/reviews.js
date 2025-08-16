const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { validateReview } = require('../middleware/validation');

// POST /api/reviews - Yorum ekle
router.post('/', validateReview, reviewController.addReview);

// GET /api/reviews/product/:productId - Ürün yorumlarını getir
router.get('/product/:productId', reviewController.getProductReviews);

// GET /api/reviews/user - Kullanıcı yorumlarını getir
router.get('/user', authenticateToken, reviewController.getUserReviews);

// PUT /api/reviews/:id - Yorum güncelle
router.put('/:id', authenticateToken, reviewController.updateReview);

// DELETE /api/reviews/:id - Yorum sil
router.delete('/:id', authenticateToken, reviewController.deleteReview);

// PUT /api/reviews/:id/approve - Yorum onayla (admin)
router.put('/:id/approve', authenticateToken, requireAdmin, reviewController.approveReview);

module.exports = router;
