const express = require('express');
const router = express.Router();
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  clearWishlist,
  checkWishlistStatus
} = require('../controllers/wishlistController');

// Favorilere ürün ekle
router.post('/add', addToWishlist);

// Favorilerden ürün çıkar
router.post('/remove', removeFromWishlist);

// Favorileri listele
router.get('/', getWishlist);

// Favorileri temizle
router.post('/clear', clearWishlist);

// Ürün favorilerde mi kontrol et
router.get('/check', checkWishlistStatus);

module.exports = router;
