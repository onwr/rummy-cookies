const { body, validationResult } = require('express-validator');

// Validation sonuçlarını kontrol et
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Kullanıcı kayıt validasyonu
const validateUserRegistration = [
  body('email')
    .isEmail()
    .withMessage('Geçerli bir e-posta adresi giriniz')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Şifre en az 6 karakter olmalıdır'),
  body('first_name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Ad en az 2, en fazla 100 karakter olmalıdır'),
  body('last_name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Soyad en az 2, en fazla 100 karakter olmalıdır'),
  body('phone')
    .optional()
    .matches(/^[\+]?[0-9\s\-\(\)]{10,}$/)
    .withMessage('Geçerli bir telefon numarası giriniz'),
  handleValidationErrors
];

// Kullanıcı giriş validasyonu
const validateUserLogin = [
  body('email')
    .isEmail()
    .withMessage('Geçerli bir e-posta adresi giriniz')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Şifre gereklidir'),
  handleValidationErrors
];

// Ürün ekleme/güncelleme validasyonu
const validateProduct = [
  body('name_tr')
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage('Türkçe ürün adı en az 3, en fazla 255 karakter olmalıdır'),
  body('name_en')
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage('İngilizce ürün adı en az 3, en fazla 255 karakter olmalıdır'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Geçerli bir fiyat giriniz'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stok miktarı 0 veya daha büyük olmalıdır'),
  body('category_id')
    .isInt({ min: 1 })
    .withMessage('Geçerli bir kategori seçiniz'),
  handleValidationErrors
];

// Kategori ekleme/güncelleme validasyonu
const validateCategory = [
  body('name_tr')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Türkçe kategori adı en az 2, en fazla 255 karakter olmalıdır'),
  body('name_en')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('İngilizce kategori adı en az 2, en fazla 255 karakter olmalıdır'),
  body('slug')
    .trim()
    .isLength({ min: 2, max: 100 })
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug sadece küçük harf, rakam ve tire içerebilir'),
  handleValidationErrors
];

// Sepet ürün ekleme validasyonu
const validateCartItem = [
  body('product_id')
    .isInt({ min: 1 })
    .withMessage('Geçerli bir ürün seçiniz'),
  body('quantity')
    .isInt({ min: 1, max: 100 })
    .withMessage('Miktar 1-100 arasında olmalıdır'),
  handleValidationErrors
];

// Sipariş oluşturma validasyonu
const validateOrder = [
  body('shipping_address')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Teslimat adresi en az 10 karakter olmalıdır'),
  body('shipping_city')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Şehir en az 2, en fazla 100 karakter olmalıdır'),
  body('shipping_district')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('İlçe en az 2, en fazla 100 karakter olmalıdır'),
  body('payment_method')
    .isIn(['bank_transfer', 'credit_card', 'cash_on_delivery'])
    .withMessage('Geçerli bir ödeme yöntemi seçiniz'),
  handleValidationErrors
];

// Özel sipariş validasyonu
const validateCustomOrder = [
  body('theme')
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage('Tema en az 3, en fazla 255 karakter olmalıdır'),
  body('quantity')
    .isInt({ min: 1, max: 1000 })
    .withMessage('Miktar 1-1000 arasında olmalıdır'),
  body('delivery_date')
    .isISO8601()
    .withMessage('Geçerli bir teslimat tarihi giriniz'),
  body('guest_name')
    .if(body('guest_name').exists())
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Ad en az 2, en fazla 255 karakter olmalıdır'),
  body('guest_email')
    .if(body('guest_email').exists())
    .isEmail()
    .withMessage('Geçerli bir e-posta adresi giriniz')
    .normalizeEmail(),
  handleValidationErrors
];

// Yorum ekleme validasyonu
const validateReview = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Puan 1-5 arasında olmalıdır'),
  body('comment_tr')
    .if(body('comment_tr').exists())
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Türkçe yorum en az 10, en fazla 1000 karakter olmalıdır'),
  body('comment_en')
    .if(body('comment_en').exists())
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('İngilizce yorum en az 10, en fazla 1000 karakter olmalıdır'),
  handleValidationErrors
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateProduct,
  validateCategory,
  validateCartItem,
  validateOrder,
  validateCustomOrder,
  validateReview
};
