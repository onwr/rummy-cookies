const express = require('express');
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  getCart,
  clearCart
} = require('../controllers/cartController');

// Sepete ürün ekle
router.post('/add', addToCart);

// Sepetten ürün çıkar
router.post('/remove', removeFromCart);

// Sepet miktarını güncelle
router.post('/update-quantity', updateCartQuantity);

// Sepeti listele
router.get('/', getCart);

// Sepeti temizle
router.post('/clear', clearCart);

module.exports = router;
