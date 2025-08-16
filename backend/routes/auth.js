const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const { validateUserRegistration, validateUserLogin } = require('../middleware/validation');

// POST /api/auth/register - Kullanıcı kayıt
router.post('/register', validateUserRegistration, authController.register);

// POST /api/auth/login - Kullanıcı giriş
router.post('/login', validateUserLogin, authController.login);

// GET /api/auth/profile - Kullanıcı profili getir
router.get('/profile', authenticateToken, authController.getProfile);

// PUT /api/auth/profile - Kullanıcı profili güncelle
router.put('/profile', authenticateToken, authController.updateProfile);

// PUT /api/auth/change-password - Şifre değiştir
router.put('/change-password', authenticateToken, authController.changePassword);

// POST /api/auth/logout - Kullanıcı çıkış
router.post('/logout', authenticateToken, authController.logout);

module.exports = router;
