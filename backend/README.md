# Rummy Cookies Backend API

Bu proje, Rummy Cookies e-ticaret sitesi için Node.js, Express ve MySQL kullanılarak geliştirilmiş RESTful API'dir.

## 🚀 Özellikler

- **Kullanıcı Yönetimi**: Kayıt, giriş, profil yönetimi
- **Ürün Yönetimi**: Kategoriler, ürünler, arama ve filtreleme
- **Sepet İşlemleri**: Ürün ekleme, güncelleme, silme
- **Sipariş Yönetimi**: Sipariş oluşturma, takip, durum güncelleme
- **Özel Siparişler**: Kişiye özel kurabiye siparişleri
- **Yorum Sistemi**: Ürün değerlendirmeleri ve yorumlar
- **Çoklu Dil Desteği**: Türkçe ve İngilizce
- **JWT Authentication**: Güvenli kullanıcı doğrulama
- **Rate Limiting**: API kullanım sınırlaması
- **Validation**: Giriş verilerinin doğrulanması

## 🛠️ Teknolojiler

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL2** - MySQL veritabanı sürücüsü
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Şifre hashleme
- **express-validator** - Giriş doğrulama
- **cors** - Cross-origin resource sharing
- **helmet** - Güvenlik middleware
- **compression** - Response sıkıştırma
- **morgan** - HTTP request logging

## 📋 Gereksinimler

- Node.js (v14 veya üzeri)
- MySQL (v8.0 veya üzeri)
- npm veya yarn

## 🔧 Kurulum

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd rummy-cookies-main/backend
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Veritabanını yapılandırın:**
   - MySQL'de `rummy_cookies` adında bir veritabanı oluşturun
   - `config.env` dosyasındaki veritabanı bilgilerini güncelleyin

4. **Environment variables'ları ayarlayın:**
```bash
cp config.env.example config.env
# config.env dosyasını düzenleyin
```

5. **Server'ı başlatın:**
```bash
# Development
npm run dev

# Production
npm start
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Kullanıcı kayıt
- `POST /api/auth/login` - Kullanıcı giriş
- `GET /api/auth/profile` - Profil getir
- `PUT /api/auth/profile` - Profil güncelle
- `PUT /api/auth/change-password` - Şifre değiştir
- `POST /api/auth/logout` - Çıkış

### Products
- `GET /api/products` - Tüm ürünler
- `GET /api/products/featured` - Öne çıkan ürünler
- `GET /api/products/bestsellers` - Çok satan ürünler
- `GET /api/products/new` - Yeni ürünler
- `GET /api/products/:id` - Ürün detayı
- `GET /api/products/slug/:slug` - Slug ile ürün

### Categories
- `GET /api/categories` - Tüm kategoriler
- `GET /api/categories/summary` - Kategori özeti
- `GET /api/categories/:id` - Kategori detayı
- `GET /api/categories/slug/:slug` - Slug ile kategori
- `GET /api/categories/:id/products` - Kategori ürünleri

### Cart
- `POST /api/cart/add` - Sepete ürün ekle
- `GET /api/cart` - Sepeti getir
- `PUT /api/cart/:id` - Ürün miktarını güncelle
- `DELETE /api/cart/:id` - Ürünü sepetten kaldır
- `DELETE /api/cart` - Sepeti temizle

### Orders
- `POST /api/orders` - Sipariş oluştur
- `GET /api/orders` - Kullanıcı siparişleri
- `GET /api/orders/:id` - Sipariş detayı
- `PUT /api/orders/:id/status` - Sipariş durumu güncelle (admin)
- `DELETE /api/orders/:id` - Sipariş iptal et

### Custom Orders
- `POST /api/custom-orders` - Özel sipariş oluştur
- `GET /api/custom-orders` - Kullanıcı özel siparişleri
- `GET /api/custom-orders/:id` - Özel sipariş detayı
- `PUT /api/custom-orders/:id/status` - Durum güncelle (admin)

### Reviews
- `POST /api/reviews` - Yorum ekle
- `GET /api/reviews/product/:productId` - Ürün yorumları
- `GET /api/reviews/user` - Kullanıcı yorumları
- `PUT /api/reviews/:id` - Yorum güncelle
- `DELETE /api/reviews/:id` - Yorum sil
- `PUT /api/reviews/:id/approve` - Yorum onayla (admin)

## 🗄️ Veritabanı Yapısı

### Ana Tablolar
- **users** - Kullanıcı bilgileri
- **categories** - Ürün kategorileri
- **products** - Ürün bilgileri
- **product_images** - Ürün resimleri
- **product_badges** - Ürün rozetleri
- **cart** - Sepet ürünleri
- **orders** - Siparişler
- **order_items** - Sipariş ürünleri
- **custom_orders** - Özel siparişler
- **reviews** - Ürün yorumları
- **admin_users** - Admin kullanıcılar

### Çoklu Dil Desteği
- Tüm ürün ve kategori isimleri Türkçe ve İngilizce olarak saklanır
- `name_tr`, `name_en`, `description_tr`, `description_en` alanları
- API'de `language` query parametresi ile dil seçimi

## 🔐 Güvenlik

- **JWT Token** - Güvenli kullanıcı doğrulama
- **Password Hashing** - bcrypt ile şifre hashleme
- **Input Validation** - Tüm giriş verilerinin doğrulanması
- **Rate Limiting** - API abuse koruması
- **CORS** - Cross-origin request kontrolü
- **Helmet** - Güvenlik header'ları

## 📱 Frontend Entegrasyonu

Frontend'de API'yi kullanmak için:

```javascript
// Örnek API çağrısı
const response = await fetch('http://localhost:5000/api/products?language=tr');
const data = await response.json();

// Authentication header
const response = await fetch('http://localhost:5000/api/auth/profile', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

## 🚀 Deployment

1. **Production environment variables'ları ayarlayın**
2. **MySQL veritabanını production'da oluşturun**
3. **PM2 veya benzeri process manager kullanın**
4. **Nginx reverse proxy yapılandırın**
5. **SSL sertifikası ekleyin**

## 📝 Environment Variables

```env
# Server
PORT=5000
NODE_ENV=production

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=rummy_cookies
DB_PORT=3306

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Proje Sahibi**: Rummy Cookies
- **E-posta**: info@rummycookies.com
- **Website**: https://rummycookies.com

## 🙏 Teşekkürler

Bu projeyi geliştirmemize yardımcı olan tüm katkıda bulunanlara teşekkürler!
