const mysql = require('mysql2/promise');
require('dotenv').config({ path: './config.env' });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'rummy_cookies',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Connection pool oluştur
const pool = mysql.createPool(dbConfig);

// Bağlantıyı test et
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL veritabanına başarıyla bağlandı');
    connection.release();
  } catch (error) {
    console.error('❌ MySQL veritabanına bağlanılamadı:', error.message);
    process.exit(1);
  }
};

// Veritabanı tablolarını oluştur
const createTables = async () => {
  try {
    const connection = await pool.getConnection();
    
    // Users tablosu
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        address TEXT,
        city VARCHAR(100),
        district VARCHAR(100),
        zip_code VARCHAR(10),
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Categories tablosu
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT PRIMARY KEY AUTO_INCREMENT,
        slug VARCHAR(100) UNIQUE NOT NULL,
        name_tr VARCHAR(255) NOT NULL,
        name_en VARCHAR(255) NOT NULL,
        description_tr TEXT,
        description_en TEXT,
        image VARCHAR(255),
        color VARCHAR(100),
        is_active BOOLEAN DEFAULT TRUE,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Products tablosu
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        category_id INT,
        slug VARCHAR(255) UNIQUE NOT NULL,
        name_tr VARCHAR(255) NOT NULL,
        name_en VARCHAR(255) NOT NULL,
        description_tr TEXT,
        description_en TEXT,
        price DECIMAL(10,2) NOT NULL,
        sale_price DECIMAL(10,2),
        stock INT DEFAULT 0,
        min_order INT DEFAULT 1,
        max_order INT DEFAULT 100,
        weight DECIMAL(8,2),
        dimensions VARCHAR(100),
        is_active BOOLEAN DEFAULT TRUE,
        is_featured BOOLEAN DEFAULT FALSE,
        is_bestseller BOOLEAN DEFAULT FALSE,
        is_new BOOLEAN DEFAULT FALSE,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
      )
    `);

    // Product Images tablosu
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS product_images (
        id INT PRIMARY KEY AUTO_INCREMENT,
        product_id INT NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        alt_text_tr VARCHAR(255),
        alt_text_en VARCHAR(255),
        is_primary BOOLEAN DEFAULT FALSE,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);

    // Product Badges tablosu
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS product_badges (
        id INT PRIMARY KEY AUTO_INCREMENT,
        product_id INT NOT NULL,
        badge_type ENUM('new', 'popular', 'favorite', 'bestseller', 'custom', 'corporate') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);

    // Cart tablosu
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS cart (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NULL,
        session_id VARCHAR(255) NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        INDEX idx_user (user_id),
        INDEX idx_session (session_id),
        INDEX idx_user_session (user_id, session_id),
        INDEX idx_product (product_id),
        UNIQUE KEY unique_user_product (user_id, product_id),
        UNIQUE KEY unique_session_product (session_id, product_id)
      )
    `);

    // Orders tablosu
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        user_id INT,
        guest_email VARCHAR(255),
        guest_name VARCHAR(255),
        guest_phone VARCHAR(20),
        status ENUM('pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
        total_amount DECIMAL(10,2) NOT NULL,
        shipping_fee DECIMAL(10,2) DEFAULT 0,
        discount_amount DECIMAL(10,2) DEFAULT 0,
        final_amount DECIMAL(10,2) NOT NULL,
        shipping_address TEXT,
        shipping_city VARCHAR(100),
        shipping_district VARCHAR(100),
        shipping_zip_code VARCHAR(10),
        notes TEXT,
        payment_method ENUM('bank_transfer', 'credit_card', 'cash_on_delivery') DEFAULT 'bank_transfer',
        payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);

    // Order Items tablosu
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        order_id INT NOT NULL,
        product_id INT,
        product_name_tr VARCHAR(255) NOT NULL,
        product_name_en VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        total_price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
      )
    `);

    // Custom Orders tablosu
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS custom_orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        guest_email VARCHAR(255),
        guest_name VARCHAR(255),
        guest_phone VARCHAR(20),
        theme VARCHAR(255),
        colors TEXT,
        quantity INT NOT NULL,
        delivery_date DATE,
        message TEXT,
        image_url VARCHAR(255),
        status ENUM('pending', 'reviewing', 'approved', 'rejected', 'completed') DEFAULT 'pending',
        estimated_price DECIMAL(10,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);

    // Reviews tablosu
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        product_id INT,
        guest_name VARCHAR(255),
        guest_email VARCHAR(255),
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment_tr TEXT,
        comment_en TEXT,
        is_approved BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
      )
    `);

    // Admin Users tablosu
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('super_admin', 'admin', 'moderator') DEFAULT 'admin',
        is_active BOOLEAN DEFAULT TRUE,
        last_login TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);



    // Wishlist tablosu
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NULL,
        session_id VARCHAR(255) NULL,
        product_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_product (user_id, product_id),
        UNIQUE KEY unique_session_product (session_id, product_id),
        INDEX idx_user_session (user_id, session_id),
        INDEX idx_product (product_id)
      )
    `);

    connection.release();
    console.log('✅ Veritabanı tabloları başarıyla oluşturuldu');
  } catch (error) {
    console.error('❌ Tablo oluşturma hatası:', error);
    throw error;
  }
};

// Örnek verileri ekle
const insertSampleData = async () => {
  try {
    const connection = await pool.getConnection();
    
    // Kategoriler
    await connection.execute(`
      INSERT IGNORE INTO categories (slug, name_tr, name_en, description_tr, description_en, image, color, sort_order) VALUES
      ('dogum-gunu', 'Doğum Günü', 'Birthday', 'Her yaş için özel tasarlanmış kurabiyeler', 'Special cookies designed for every age', '/images/dogumgunu-kurabiye.jpg', 'from-pink-100/80 to-rose-200/80', 1),
      ('baby-shower', 'Baby Shower', 'Baby Shower', 'Bebek temalı özel kurabiyeler', 'Baby-themed special cookies', '/images/babyshower.jpg', 'from-blue-100/80 to-cyan-200/80', 2),
      ('halloween', 'Halloween', 'Halloween', 'Korkunç ve eğlenceli Halloween kurabiyeleri', 'Scary and fun Halloween cookies', '/images/halloween.jpg', 'from-orange-100/80 to-red-200/80', 3),
      ('yilbasi', 'Yılbaşı', 'New Year', 'Yeni yıl kutlamaları için özel kurabiyeler', 'Special cookies for New Year celebrations', '/images/yilbasi-kurabiye.jpg', 'from-green-100/80 to-emerald-200/80', 4),
      ('sevgililer-gunu', 'Sevgililer Günü', 'Valentine''s Day', 'Aşk ve romantizmin simgesi kurabiyeler', 'Cookies symbolizing love and romance', '/images/sevgililergunu-kurabiye.jpg', 'from-red-100/80 to-pink-200/80', 5),
      ('kurumsal', 'Kurumsal', 'Corporate', 'Kurumsal kimlik ile uyumlu kurabiyeler', 'Cookies compatible with corporate identity', '/images/kurumsal-kurabiye.jpg', 'from-gray-100/80 to-slate-200/80', 6)
    `);

    // Ürünler
    await connection.execute(`
      INSERT IGNORE INTO products (category_id, slug, name_tr, name_en, description_tr, description_en, price, stock, is_featured, is_bestseller) VALUES
      (1, 'cocuk-dogum-gunu-seti', 'Çocuk Doğum Günü Seti', 'Children''s Birthday Set', 'Renkli ve eğlenceli tasarımlarla çocukların hayal gücünü harekete geçiren özel kurabiyeler', 'Special cookies that spark children''s imagination with colorful and fun designs', 89.99, 15, TRUE, TRUE),
      (1, 'yetişkin-dogum-gunu', 'Yetişkin Doğum Günü Seti', 'Adult Birthday Set', 'Yetişkinler için şık ve zarif tasarımlı doğum günü kurabiyeleri', 'Elegant and sophisticated birthday cookies designed for adults', 75.99, 12, TRUE, FALSE),
      (1, 'mini-dogum-gunu', 'Mini Doğum Günü Paketi', 'Mini Birthday Package', 'Küçük kutlamalar için ideal mini doğum günü kurabiyeleri', 'Mini birthday cookies perfect for small celebrations', 45.99, 25, FALSE, FALSE),
      (2, 'bebek-arabasi-kurabiyesi', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 'Baby shower partileri için özel tasarlanmış, pastel renklerde bebek temalı kurabiyeler', 'Baby-themed cookies specially designed for baby shower parties in pastel colors', 45.99, 8, TRUE, TRUE),
      (2, 'bebek-bottles', 'Bebek Biberon Seti', 'Baby Bottles Set', 'Baby shower için sevimli biberon şeklinde kurabiyeler', 'Adorable bottle-shaped cookies for baby showers', 38.99, 15, FALSE, FALSE),
      (2, 'bebek-ayak-izi', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 'Bebek ayak izi şeklinde özel tasarım kurabiyeler', 'Special cookies shaped like baby footprints', 42.99, 10, FALSE, FALSE),
      (3, 'halloween-cadi-kurabiyesi', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 'Korkunç ve eğlenceli Halloween kurabiyeleri', 'Scary and fun Halloween cookies', 32.99, 12, FALSE, TRUE),
      (3, 'halloween-balkabağı', 'Halloween Balkabağı', 'Halloween Pumpkin', 'Balkabağı şeklinde Halloween kurabiyeleri', 'Pumpkin-shaped Halloween cookies', 28.99, 18, FALSE, FALSE),
      (3, 'halloween-skeleton', 'Halloween İskelet', 'Halloween Skeleton', 'İskelet şeklinde korkunç Halloween kurabiyeleri', 'Skeleton-shaped scary Halloween cookies', 35.99, 8, FALSE, FALSE),
      (4, 'yilbasi-cam-agaci', 'Yılbaşı Çam Ağacı', 'New Year Christmas Tree', 'Yeni yıl kutlamaları için özel tasarlanmış kurabiyeler', 'Special cookies designed for New Year celebrations', 67.99, 20, TRUE, TRUE),
      (4, 'yilbasi-yildiz', 'Yılbaşı Yıldız', 'New Year Star', 'Yıldız şeklinde yılbaşı kurabiyeleri', 'Star-shaped New Year cookies', 45.99, 15, FALSE, FALSE),
      (4, 'yilbasi-kar-tanesi', 'Yılbaşı Kar Tanesi', 'New Year Snowflake', 'Kar tanesi şeklinde yılbaşı kurabiyeleri', 'Snowflake-shaped New Year cookies', 52.99, 12, FALSE, FALSE),
      (5, 'kalp-sekilli-sevgililer', 'Kalp Şekilli Sevgililer', 'Heart Shaped Valentine', 'Aşk ve romantizmin simgesi olan kalp şekilli kurabiyeler', 'Heart-shaped cookies symbolizing love and romance', 38.99, 18, TRUE, TRUE),
      (5, 'gül-sekilli-sevgililer', 'Gül Şekilli Sevgililer', 'Rose Shaped Valentine', 'Gül şeklinde romantik sevgililer günü kurabiyeleri', 'Rose-shaped romantic Valentine''s Day cookies', 42.99, 14, FALSE, FALSE),
      (5, 'kupid-ok-sevgililer', 'Kupid Ok Sevgililer', 'Cupid Arrow Valentine', 'Kupid oku şeklinde aşk temalı kurabiyeler', 'Cupid arrow-shaped love-themed cookies', 36.99, 16, FALSE, FALSE),
      (6, 'kurumsal-logo-seti', 'Kurumsal Logo Seti', 'Corporate Logo Set', 'Şirket logoları ve kurumsal kimlik ile uyumlu kurabiyeler', 'Cookies compatible with company logos and corporate identity', 120.99, 5, FALSE, FALSE),
      (6, 'kurumsal-kartvizit', 'Kurumsal Kartvizit', 'Corporate Business Card', 'Kartvizit şeklinde kurumsal kurabiyeler', 'Business card-shaped corporate cookies', 85.99, 8, FALSE, FALSE),
      (6, 'kurumsal-kutlama', 'Kurumsal Kutlama Seti', 'Corporate Celebration Set', 'Kurumsal kutlamalar için özel tasarım kurabiyeler', 'Special design cookies for corporate celebrations', 95.99, 6, FALSE, FALSE)
    `);

    // Ürün resimleri
    await connection.execute(`
      INSERT IGNORE INTO product_images (product_id, image_url, alt_text_tr, alt_text_en, is_primary, sort_order) VALUES
      (1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', TRUE, 1),
      (2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', TRUE, 1),
      (3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', TRUE, 1),
      (4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', TRUE, 1),
      (5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', TRUE, 1),
      (6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', TRUE, 1),
      (7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', TRUE, 1),
      (8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', TRUE, 1),
      (9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', TRUE, 1),
      (10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', TRUE, 1),
      (11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', TRUE, 1),
      (12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', TRUE, 1),
      (13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', TRUE, 1),
      (14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', TRUE, 1),
      (15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', TRUE, 1),
      (16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', TRUE, 1),
      (17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', TRUE, 1),
      (18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', TRUE, 1)
    `);

    // Ürün rozetleri
    await connection.execute(`
      INSERT IGNORE INTO product_badges (product_id, badge_type) VALUES
      (1, 'bestseller'),
      (1, 'popular'),
      (2, 'new'),
      (2, 'custom'),
      (3, 'popular'),
      (4, 'bestseller'),
      (4, 'popular'),
      (5, 'bestseller'),
      (5, 'favorite'),
      (6, 'new'),
      (7, 'custom'),
      (8, 'popular'),
      (9, 'new'),
      (10, 'bestseller'),
      (10, 'popular'),
      (11, 'new'),
      (12, 'custom'),
      (13, 'bestseller'),
      (13, 'favorite'),
      (14, 'new'),
      (15, 'custom'),
      (16, 'corporate'),
      (17, 'corporate'),
      (18, 'corporate')
    `);

    // Admin kullanıcı
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await connection.execute(`
      INSERT IGNORE INTO admin_users (username, email, password, role) VALUES
      ('admin', 'admin@rummycookies.com', ?, 'super_admin')
    `, [hashedPassword]);

    connection.release();
    console.log('✅ Örnek veriler başarıyla eklendi');
  } catch (error) {
    console.error('❌ Örnek veri ekleme hatası:', error);
  }
};

module.exports = {
  pool,
  testConnection,
  createTables,
  insertSampleData
};
