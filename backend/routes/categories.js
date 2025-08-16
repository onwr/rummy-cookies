const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// GET /api/categories - Tüm kategorileri getir
router.get('/', categoryController.getAllCategories);

// GET /api/categories/summary - Ana sayfa için kategori özeti
router.get('/summary', categoryController.getCategorySummary);

// GET /api/categories/:id - ID ile kategori getir
router.get('/:id', categoryController.getCategoryById);

// GET /api/categories/slug/:slug - Slug ile kategori getir
router.get('/slug/:slug', categoryController.getCategoryBySlug);

// GET /api/categories/:id/products - Kategoriye ait ürünleri getir
router.get('/:id/products', categoryController.getCategoryProducts);

module.exports = router;
