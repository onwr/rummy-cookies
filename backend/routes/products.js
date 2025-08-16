const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products - Tüm ürünleri getir
router.get('/', productController.getAllProducts);

// GET /api/products/featured - Öne çıkan ürünleri getir
router.get('/featured', productController.getFeaturedProducts);

// GET /api/products/bestsellers - Çok satan ürünleri getir
router.get('/bestsellers', productController.getBestsellerProducts);

// GET /api/products/new - Yeni ürünleri getir
router.get('/new', productController.getNewProducts);

// GET /api/products/:id - ID ile ürün getir
router.get('/:id', productController.getProductById);

// GET /api/products/slug/:slug - Slug ile ürün getir
router.get('/slug/:slug', productController.getProductBySlug);

module.exports = router;
