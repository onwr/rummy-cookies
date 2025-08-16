-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 16 Ağu 2025, 12:09:36
-- Sunucu sürümü: 10.4.32-MariaDB
-- PHP Sürümü: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `rummy_cookies`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('super_admin','admin','moderator') DEFAULT 'admin',
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `email`, `password`, `role`, `is_active`, `last_login`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@rummycookies.com', '$2a$10$w2avIeljyzFPPlxJAFxPD.kqkf.Kk8DnF06SnTdeVH/6AOUjG29dO', 'super_admin', 1, NULL, '2025-08-16 08:17:03', '2025-08-16 08:17:03');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `session_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(7, NULL, 's%3Aki1MHIUh9e-V1Q9n6LB5LepIz0rfXVyc.ZBf2geLmh2%2FCZX25OMpJyv0sjUVqwH6OVsnJgDE5Ojo', 2, 1, '2025-08-16 09:04:27', '2025-08-16 09:04:27');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `name_tr` varchar(255) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `description_tr` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `color` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `categories`
--

INSERT INTO `categories` (`id`, `slug`, `name_tr`, `name_en`, `description_tr`, `description_en`, `image`, `color`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'dogum-gunu', 'Doğum Günü', 'Birthday', 'Her yaş için özel tasarlanmış kurabiyeler', 'Special cookies designed for every age', '/images/dogumgunu-kurabiye.jpg', 'from-pink-100/80 to-rose-200/80', 1, 1, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(2, 'baby-shower', 'Baby Shower', 'Baby Shower', 'Bebek temalı özel kurabiyeler', 'Baby-themed special cookies', '/images/babyshower.jpg', 'from-blue-100/80 to-cyan-200/80', 1, 2, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(3, 'halloween', 'Halloween', 'Halloween', 'Korkunç ve eğlenceli Halloween kurabiyeleri', 'Scary and fun Halloween cookies', '/images/halloween.jpg', 'from-orange-100/80 to-red-200/80', 1, 3, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(4, 'yilbasi', 'Yılbaşı', 'New Year', 'Yeni yıl kutlamaları için özel kurabiyeler', 'Special cookies for New Year celebrations', '/images/yilbasi-kurabiye.jpg', 'from-green-100/80 to-emerald-200/80', 1, 4, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(5, 'sevgililer-gunu', 'Sevgililer Günü', 'Valentine\'s Day', 'Aşk ve romantizmin simgesi kurabiyeler', 'Cookies symbolizing love and romance', '/images/sevgililergunu-kurabiye.jpg', 'from-red-100/80 to-pink-200/80', 1, 5, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(6, 'kurumsal', 'Kurumsal', 'Corporate', 'Kurumsal kimlik ile uyumlu kurabiyeler', 'Cookies compatible with corporate identity', '/images/kurumsal-kurabiye.jpg', 'from-gray-100/80 to-slate-200/80', 1, 6, '2025-08-16 08:17:03', '2025-08-16 08:17:03');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `custom_orders`
--

CREATE TABLE `custom_orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `guest_email` varchar(255) DEFAULT NULL,
  `guest_name` varchar(255) DEFAULT NULL,
  `guest_phone` varchar(20) DEFAULT NULL,
  `theme` varchar(255) DEFAULT NULL,
  `colors` text DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `delivery_date` date DEFAULT NULL,
  `message` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `status` enum('pending','reviewing','approved','rejected','completed') DEFAULT 'pending',
  `estimated_price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `guest_email` varchar(255) DEFAULT NULL,
  `guest_name` varchar(255) DEFAULT NULL,
  `guest_phone` varchar(20) DEFAULT NULL,
  `status` enum('pending','confirmed','preparing','shipped','delivered','cancelled') DEFAULT 'pending',
  `total_amount` decimal(10,2) NOT NULL,
  `shipping_fee` decimal(10,2) DEFAULT 0.00,
  `discount_amount` decimal(10,2) DEFAULT 0.00,
  `final_amount` decimal(10,2) NOT NULL,
  `shipping_address` text DEFAULT NULL,
  `shipping_city` varchar(100) DEFAULT NULL,
  `shipping_district` varchar(100) DEFAULT NULL,
  `shipping_zip_code` varchar(10) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `payment_method` enum('bank_transfer','credit_card','cash_on_delivery') DEFAULT 'bank_transfer',
  `payment_status` enum('pending','paid','failed') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_name_tr` varchar(255) NOT NULL,
  `product_name_en` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `name_tr` varchar(255) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `description_tr` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT 0,
  `min_order` int(11) DEFAULT 1,
  `max_order` int(11) DEFAULT 100,
  `weight` decimal(8,2) DEFAULT NULL,
  `dimensions` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `is_featured` tinyint(1) DEFAULT 0,
  `is_bestseller` tinyint(1) DEFAULT 0,
  `is_new` tinyint(1) DEFAULT 0,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `products`
--

INSERT INTO `products` (`id`, `category_id`, `slug`, `name_tr`, `name_en`, `description_tr`, `description_en`, `price`, `sale_price`, `stock`, `min_order`, `max_order`, `weight`, `dimensions`, `is_active`, `is_featured`, `is_bestseller`, `is_new`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'cocuk-dogum-gunu-seti', 'Çocuk Doğum Günü Seti', 'Children\'s Birthday Set', 'Renkli ve eğlenceli tasarımlarla çocukların hayal gücünü harekete geçiren özel kurabiyeler', 'Special cookies that spark children\'s imagination with colorful and fun designs', 89.99, NULL, 15, 1, 100, NULL, NULL, 1, 1, 1, 0, 0, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(2, 1, 'yetişkin-dogum-gunu', 'Yetişkin Doğum Günü Seti', 'Adult Birthday Set', 'Yetişkinler için şık ve zarif tasarımlı doğum günü kurabiyeleri', 'Elegant and sophisticated birthday cookies designed for adults', 75.99, NULL, 12, 1, 100, NULL, NULL, 1, 1, 0, 0, 0, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(3, 1, 'mini-dogum-gunu', 'Mini Doğum Günü Paketi', 'Mini Birthday Package', 'Küçük kutlamalar için ideal mini doğum günü kurabiyeleri', 'Mini birthday cookies perfect for small celebrations', 45.99, NULL, 25, 1, 100, NULL, NULL, 1, 0, 0, 0, 0, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(4, 2, 'bebek-arabasi-kurabiyesi', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 'Baby shower partileri için özel tasarlanmış, pastel renklerde bebek temalı kurabiyeler', 'Baby-themed cookies specially designed for baby shower parties in pastel colors', 45.99, NULL, 8, 1, 100, NULL, NULL, 1, 1, 1, 0, 0, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(5, 2, 'bebek-bottles', 'Bebek Biberon Seti', 'Baby Bottles Set', 'Baby shower için sevimli biberon şeklinde kurabiyeler', 'Adorable bottle-shaped cookies for baby showers', 38.99, NULL, 15, 1, 100, NULL, NULL, 1, 0, 0, 0, 0, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(6, 2, 'bebek-ayak-izi', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 'Bebek ayak izi şeklinde özel tasarım kurabiyeler', 'Special cookies shaped like baby footprints', 42.99, NULL, 10, 1, 100, NULL, NULL, 1, 0, 0, 0, 0, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(7, 3, 'halloween-cadi-kurabiyesi', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 'Korkunç ve eğlenceli Halloween kurabiyeleri', 'Scary and fun Halloween cookies', 32.99, NULL, 12, 1, 100, NULL, NULL, 1, 0, 1, 0, 0, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(8, 3, 'halloween-balkabağı', 'Halloween Balkabağı', 'Halloween Pumpkin', 'Balkabağı şeklinde Halloween kurabiyeleri', 'Pumpkin-shaped Halloween cookies', 28.99, NULL, 18, 1, 100, NULL, NULL, 1, 0, 0, 0, 0, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(9, 3, 'halloween-skeleton', 'Halloween İskelet', 'Halloween Skeleton', 'İskelet şeklinde korkunç Halloween kurabiyeleri', 'Skeleton-shaped scary Halloween cookies', 35.99, NULL, 8, 1, 100, NULL, NULL, 1, 0, 0, 0, 0, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(10, 4, 'yilbasi-cam-agaci', 'Yılbaşı Çam Ağacı', 'New Year Christmas Tree', 'Yeni yıl kutlamaları için özel tasarlanmış kurabiyeler', 'Special cookies designed for New Year celebrations', 67.99, NULL, 20, 1, 100, NULL, NULL, 1, 1, 1, 0, 0, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(11, 4, 'yilbasi-yildiz', 'Yılbaşı Yıldız', 'New Year Star', 'Yıldız şeklinde yılbaşı kurabiyeleri', 'Star-shaped New Year cookies', 45.99, NULL, 15, 1, 100, NULL, NULL, 1, 0, 0, 0, 0, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(12, 4, 'yilbasi-kar-tanesi', 'Yılbaşı Kar Tanesi', 'New Year Snowflake', 'Kar tanesi şeklinde yılbaşı kurabiyeleri', 'Snowflake-shaped New Year cookies', 52.99, NULL, 12, 1, 100, NULL, NULL, 1, 0, 0, 0, 0, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(13, 5, 'kalp-sekilli-sevgililer', 'Kalp Şekilli Sevgililer', 'Heart Shaped Valentine', 'Aşk ve romantizmin simgesi olan kalp şekilli kurabiyeler', 'Heart-shaped cookies symbolizing love and romance', 38.99, NULL, 18, 1, 100, NULL, NULL, 1, 1, 1, 0, 0, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(14, 5, 'gül-sekilli-sevgililer', 'Gül Şekilli Sevgililer', 'Rose Shaped Valentine', 'Gül şeklinde romantik sevgililer günü kurabiyeleri', 'Rose-shaped romantic Valentine\'s Day cookies', 42.99, NULL, 14, 1, 100, NULL, NULL, 1, 0, 0, 0, 0, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(15, 5, 'kupid-ok-sevgililer', 'Kupid Ok Sevgililer', 'Cupid Arrow Valentine', 'Kupid oku şeklinde aşk temalı kurabiyeler', 'Cupid arrow-shaped love-themed cookies', 36.99, NULL, 16, 1, 100, NULL, NULL, 1, 0, 0, 0, 0, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(16, 6, 'kurumsal-logo-seti', 'Kurumsal Logo Seti', 'Corporate Logo Set', 'Şirket logoları ve kurumsal kimlik ile uyumlu kurabiyeler', 'Cookies compatible with company logos and corporate identity', 120.99, NULL, 5, 1, 100, NULL, NULL, 1, 0, 0, 0, 0, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(17, 6, 'kurumsal-kartvizit', 'Kurumsal Kartvizit', 'Corporate Business Card', 'Kartvizit şeklinde kurumsal kurabiyeler', 'Business card-shaped corporate cookies', 85.99, NULL, 8, 1, 100, NULL, NULL, 1, 0, 0, 0, 0, '2025-08-16 08:17:03', '2025-08-16 08:17:03'),
(18, 6, 'kurumsal-kutlama', 'Kurumsal Kutlama Seti', 'Corporate Celebration Set', 'Kurumsal kutlamalar için özel tasarım kurabiyeler', 'Special design cookies for corporate celebrations', 95.99, NULL, 6, 1, 100, NULL, NULL, 1, 0, 0, 0, 0, '2025-08-16 08:17:03', '2025-08-16 08:17:03');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `product_badges`
--

CREATE TABLE `product_badges` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `badge_type` enum('new','popular','favorite','bestseller','custom','corporate') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `product_badges`
--

INSERT INTO `product_badges` (`id`, `product_id`, `badge_type`, `created_at`) VALUES
(1, 1, 'bestseller', '2025-08-16 08:17:03'),
(2, 1, 'popular', '2025-08-16 08:17:03'),
(3, 2, 'new', '2025-08-16 08:17:03'),
(4, 2, 'custom', '2025-08-16 08:17:03'),
(5, 3, 'popular', '2025-08-16 08:17:03'),
(6, 4, 'bestseller', '2025-08-16 08:17:03'),
(7, 4, 'popular', '2025-08-16 08:17:03'),
(8, 5, 'bestseller', '2025-08-16 08:17:03'),
(9, 5, 'favorite', '2025-08-16 08:17:03'),
(10, 6, 'new', '2025-08-16 08:17:03'),
(11, 7, 'custom', '2025-08-16 08:17:03'),
(12, 8, 'popular', '2025-08-16 08:17:03'),
(13, 9, 'new', '2025-08-16 08:17:03'),
(14, 10, 'bestseller', '2025-08-16 08:17:03'),
(15, 10, 'popular', '2025-08-16 08:17:03'),
(16, 11, 'new', '2025-08-16 08:17:03'),
(17, 12, 'custom', '2025-08-16 08:17:03'),
(18, 13, 'bestseller', '2025-08-16 08:17:03'),
(19, 13, 'favorite', '2025-08-16 08:17:03'),
(20, 14, 'new', '2025-08-16 08:17:03'),
(21, 15, 'custom', '2025-08-16 08:17:03'),
(22, 16, 'corporate', '2025-08-16 08:17:03'),
(23, 17, 'corporate', '2025-08-16 08:17:03'),
(24, 18, 'corporate', '2025-08-16 08:17:03'),
(25, 1, 'bestseller', '2025-08-16 08:17:14'),
(26, 1, 'popular', '2025-08-16 08:17:14'),
(27, 2, 'new', '2025-08-16 08:17:14'),
(28, 2, 'custom', '2025-08-16 08:17:14'),
(29, 3, 'popular', '2025-08-16 08:17:14'),
(30, 4, 'bestseller', '2025-08-16 08:17:14'),
(31, 4, 'popular', '2025-08-16 08:17:14'),
(32, 5, 'bestseller', '2025-08-16 08:17:14'),
(33, 5, 'favorite', '2025-08-16 08:17:14'),
(34, 6, 'new', '2025-08-16 08:17:14'),
(35, 7, 'custom', '2025-08-16 08:17:14'),
(36, 8, 'popular', '2025-08-16 08:17:14'),
(37, 9, 'new', '2025-08-16 08:17:14'),
(38, 10, 'bestseller', '2025-08-16 08:17:14'),
(39, 10, 'popular', '2025-08-16 08:17:14'),
(40, 11, 'new', '2025-08-16 08:17:14'),
(41, 12, 'custom', '2025-08-16 08:17:14'),
(42, 13, 'bestseller', '2025-08-16 08:17:14'),
(43, 13, 'favorite', '2025-08-16 08:17:14'),
(44, 14, 'new', '2025-08-16 08:17:14'),
(45, 15, 'custom', '2025-08-16 08:17:14'),
(46, 16, 'corporate', '2025-08-16 08:17:14'),
(47, 17, 'corporate', '2025-08-16 08:17:14'),
(48, 18, 'corporate', '2025-08-16 08:17:14'),
(49, 1, 'bestseller', '2025-08-16 08:17:18'),
(50, 1, 'popular', '2025-08-16 08:17:18'),
(51, 2, 'new', '2025-08-16 08:17:18'),
(52, 2, 'custom', '2025-08-16 08:17:18'),
(53, 3, 'popular', '2025-08-16 08:17:18'),
(54, 4, 'bestseller', '2025-08-16 08:17:18'),
(55, 4, 'popular', '2025-08-16 08:17:18'),
(56, 5, 'bestseller', '2025-08-16 08:17:18'),
(57, 5, 'favorite', '2025-08-16 08:17:18'),
(58, 6, 'new', '2025-08-16 08:17:18'),
(59, 7, 'custom', '2025-08-16 08:17:18'),
(60, 8, 'popular', '2025-08-16 08:17:18'),
(61, 9, 'new', '2025-08-16 08:17:18'),
(62, 10, 'bestseller', '2025-08-16 08:17:18'),
(63, 10, 'popular', '2025-08-16 08:17:18'),
(64, 11, 'new', '2025-08-16 08:17:18'),
(65, 12, 'custom', '2025-08-16 08:17:18'),
(66, 13, 'bestseller', '2025-08-16 08:17:18'),
(67, 13, 'favorite', '2025-08-16 08:17:18'),
(68, 14, 'new', '2025-08-16 08:17:18'),
(69, 15, 'custom', '2025-08-16 08:17:18'),
(70, 16, 'corporate', '2025-08-16 08:17:18'),
(71, 17, 'corporate', '2025-08-16 08:17:18'),
(72, 18, 'corporate', '2025-08-16 08:17:18'),
(73, 1, 'bestseller', '2025-08-16 08:28:34'),
(74, 1, 'popular', '2025-08-16 08:28:34'),
(75, 2, 'new', '2025-08-16 08:28:34'),
(76, 2, 'custom', '2025-08-16 08:28:34'),
(77, 3, 'popular', '2025-08-16 08:28:34'),
(78, 4, 'bestseller', '2025-08-16 08:28:34'),
(79, 4, 'popular', '2025-08-16 08:28:34'),
(80, 5, 'bestseller', '2025-08-16 08:28:34'),
(81, 5, 'favorite', '2025-08-16 08:28:34'),
(82, 6, 'new', '2025-08-16 08:28:34'),
(83, 7, 'custom', '2025-08-16 08:28:34'),
(84, 8, 'popular', '2025-08-16 08:28:34'),
(85, 9, 'new', '2025-08-16 08:28:34'),
(86, 10, 'bestseller', '2025-08-16 08:28:34'),
(87, 10, 'popular', '2025-08-16 08:28:34'),
(88, 11, 'new', '2025-08-16 08:28:34'),
(89, 12, 'custom', '2025-08-16 08:28:34'),
(90, 13, 'bestseller', '2025-08-16 08:28:34'),
(91, 13, 'favorite', '2025-08-16 08:28:34'),
(92, 14, 'new', '2025-08-16 08:28:34'),
(93, 15, 'custom', '2025-08-16 08:28:34'),
(94, 16, 'corporate', '2025-08-16 08:28:34'),
(95, 17, 'corporate', '2025-08-16 08:28:34'),
(96, 18, 'corporate', '2025-08-16 08:28:34'),
(97, 1, 'bestseller', '2025-08-16 08:28:53'),
(98, 1, 'popular', '2025-08-16 08:28:53'),
(99, 2, 'new', '2025-08-16 08:28:53'),
(100, 2, 'custom', '2025-08-16 08:28:53'),
(101, 3, 'popular', '2025-08-16 08:28:53'),
(102, 4, 'bestseller', '2025-08-16 08:28:53'),
(103, 4, 'popular', '2025-08-16 08:28:53'),
(104, 5, 'bestseller', '2025-08-16 08:28:53'),
(105, 5, 'favorite', '2025-08-16 08:28:53'),
(106, 6, 'new', '2025-08-16 08:28:53'),
(107, 7, 'custom', '2025-08-16 08:28:53'),
(108, 8, 'popular', '2025-08-16 08:28:53'),
(109, 9, 'new', '2025-08-16 08:28:53'),
(110, 10, 'bestseller', '2025-08-16 08:28:53'),
(111, 10, 'popular', '2025-08-16 08:28:53'),
(112, 11, 'new', '2025-08-16 08:28:53'),
(113, 12, 'custom', '2025-08-16 08:28:53'),
(114, 13, 'bestseller', '2025-08-16 08:28:53'),
(115, 13, 'favorite', '2025-08-16 08:28:53'),
(116, 14, 'new', '2025-08-16 08:28:53'),
(117, 15, 'custom', '2025-08-16 08:28:53'),
(118, 16, 'corporate', '2025-08-16 08:28:53'),
(119, 17, 'corporate', '2025-08-16 08:28:53'),
(120, 18, 'corporate', '2025-08-16 08:28:53'),
(121, 1, 'bestseller', '2025-08-16 08:29:17'),
(122, 1, 'popular', '2025-08-16 08:29:17'),
(123, 2, 'new', '2025-08-16 08:29:17'),
(124, 2, 'custom', '2025-08-16 08:29:17'),
(125, 3, 'popular', '2025-08-16 08:29:17'),
(126, 4, 'bestseller', '2025-08-16 08:29:17'),
(127, 4, 'popular', '2025-08-16 08:29:17'),
(128, 5, 'bestseller', '2025-08-16 08:29:17'),
(129, 5, 'favorite', '2025-08-16 08:29:17'),
(130, 6, 'new', '2025-08-16 08:29:17'),
(131, 7, 'custom', '2025-08-16 08:29:17'),
(132, 8, 'popular', '2025-08-16 08:29:17'),
(133, 9, 'new', '2025-08-16 08:29:17'),
(134, 10, 'bestseller', '2025-08-16 08:29:17'),
(135, 10, 'popular', '2025-08-16 08:29:17'),
(136, 11, 'new', '2025-08-16 08:29:17'),
(137, 12, 'custom', '2025-08-16 08:29:17'),
(138, 13, 'bestseller', '2025-08-16 08:29:17'),
(139, 13, 'favorite', '2025-08-16 08:29:17'),
(140, 14, 'new', '2025-08-16 08:29:17'),
(141, 15, 'custom', '2025-08-16 08:29:17'),
(142, 16, 'corporate', '2025-08-16 08:29:17'),
(143, 17, 'corporate', '2025-08-16 08:29:17'),
(144, 18, 'corporate', '2025-08-16 08:29:17'),
(145, 1, 'bestseller', '2025-08-16 08:29:29'),
(146, 1, 'popular', '2025-08-16 08:29:29'),
(147, 2, 'new', '2025-08-16 08:29:29'),
(148, 2, 'custom', '2025-08-16 08:29:29'),
(149, 3, 'popular', '2025-08-16 08:29:29'),
(150, 4, 'bestseller', '2025-08-16 08:29:29'),
(151, 4, 'popular', '2025-08-16 08:29:29'),
(152, 5, 'bestseller', '2025-08-16 08:29:29'),
(153, 5, 'favorite', '2025-08-16 08:29:29'),
(154, 6, 'new', '2025-08-16 08:29:29'),
(155, 7, 'custom', '2025-08-16 08:29:29'),
(156, 8, 'popular', '2025-08-16 08:29:29'),
(157, 9, 'new', '2025-08-16 08:29:29'),
(158, 10, 'bestseller', '2025-08-16 08:29:29'),
(159, 10, 'popular', '2025-08-16 08:29:29'),
(160, 11, 'new', '2025-08-16 08:29:29'),
(161, 12, 'custom', '2025-08-16 08:29:29'),
(162, 13, 'bestseller', '2025-08-16 08:29:29'),
(163, 13, 'favorite', '2025-08-16 08:29:29'),
(164, 14, 'new', '2025-08-16 08:29:29'),
(165, 15, 'custom', '2025-08-16 08:29:29'),
(166, 16, 'corporate', '2025-08-16 08:29:29'),
(167, 17, 'corporate', '2025-08-16 08:29:29'),
(168, 18, 'corporate', '2025-08-16 08:29:29'),
(169, 1, 'bestseller', '2025-08-16 08:29:37'),
(170, 1, 'popular', '2025-08-16 08:29:37'),
(171, 2, 'new', '2025-08-16 08:29:37'),
(172, 2, 'custom', '2025-08-16 08:29:37'),
(173, 3, 'popular', '2025-08-16 08:29:37'),
(174, 4, 'bestseller', '2025-08-16 08:29:37'),
(175, 4, 'popular', '2025-08-16 08:29:37'),
(176, 5, 'bestseller', '2025-08-16 08:29:37'),
(177, 5, 'favorite', '2025-08-16 08:29:37'),
(178, 6, 'new', '2025-08-16 08:29:37'),
(179, 7, 'custom', '2025-08-16 08:29:37'),
(180, 8, 'popular', '2025-08-16 08:29:37'),
(181, 9, 'new', '2025-08-16 08:29:37'),
(182, 10, 'bestseller', '2025-08-16 08:29:37'),
(183, 10, 'popular', '2025-08-16 08:29:37'),
(184, 11, 'new', '2025-08-16 08:29:37'),
(185, 12, 'custom', '2025-08-16 08:29:37'),
(186, 13, 'bestseller', '2025-08-16 08:29:37'),
(187, 13, 'favorite', '2025-08-16 08:29:37'),
(188, 14, 'new', '2025-08-16 08:29:37'),
(189, 15, 'custom', '2025-08-16 08:29:37'),
(190, 16, 'corporate', '2025-08-16 08:29:37'),
(191, 17, 'corporate', '2025-08-16 08:29:37'),
(192, 18, 'corporate', '2025-08-16 08:29:37'),
(193, 1, 'bestseller', '2025-08-16 08:29:48'),
(194, 1, 'popular', '2025-08-16 08:29:48'),
(195, 2, 'new', '2025-08-16 08:29:48'),
(196, 2, 'custom', '2025-08-16 08:29:48'),
(197, 3, 'popular', '2025-08-16 08:29:48'),
(198, 4, 'bestseller', '2025-08-16 08:29:48'),
(199, 4, 'popular', '2025-08-16 08:29:48'),
(200, 5, 'bestseller', '2025-08-16 08:29:48'),
(201, 5, 'favorite', '2025-08-16 08:29:48'),
(202, 6, 'new', '2025-08-16 08:29:48'),
(203, 7, 'custom', '2025-08-16 08:29:48'),
(204, 8, 'popular', '2025-08-16 08:29:48'),
(205, 9, 'new', '2025-08-16 08:29:48'),
(206, 10, 'bestseller', '2025-08-16 08:29:48'),
(207, 10, 'popular', '2025-08-16 08:29:48'),
(208, 11, 'new', '2025-08-16 08:29:48'),
(209, 12, 'custom', '2025-08-16 08:29:48'),
(210, 13, 'bestseller', '2025-08-16 08:29:48'),
(211, 13, 'favorite', '2025-08-16 08:29:48'),
(212, 14, 'new', '2025-08-16 08:29:48'),
(213, 15, 'custom', '2025-08-16 08:29:48'),
(214, 16, 'corporate', '2025-08-16 08:29:48'),
(215, 17, 'corporate', '2025-08-16 08:29:48'),
(216, 18, 'corporate', '2025-08-16 08:29:48'),
(217, 1, 'bestseller', '2025-08-16 08:30:13'),
(218, 1, 'popular', '2025-08-16 08:30:13'),
(219, 2, 'new', '2025-08-16 08:30:13'),
(220, 2, 'custom', '2025-08-16 08:30:13'),
(221, 3, 'popular', '2025-08-16 08:30:13'),
(222, 4, 'bestseller', '2025-08-16 08:30:13'),
(223, 4, 'popular', '2025-08-16 08:30:13'),
(224, 5, 'bestseller', '2025-08-16 08:30:13'),
(225, 5, 'favorite', '2025-08-16 08:30:13'),
(226, 6, 'new', '2025-08-16 08:30:13'),
(227, 7, 'custom', '2025-08-16 08:30:13'),
(228, 8, 'popular', '2025-08-16 08:30:13'),
(229, 9, 'new', '2025-08-16 08:30:13'),
(230, 10, 'bestseller', '2025-08-16 08:30:13'),
(231, 10, 'popular', '2025-08-16 08:30:13'),
(232, 11, 'new', '2025-08-16 08:30:13'),
(233, 12, 'custom', '2025-08-16 08:30:13'),
(234, 13, 'bestseller', '2025-08-16 08:30:13'),
(235, 13, 'favorite', '2025-08-16 08:30:13'),
(236, 14, 'new', '2025-08-16 08:30:13'),
(237, 15, 'custom', '2025-08-16 08:30:13'),
(238, 16, 'corporate', '2025-08-16 08:30:13'),
(239, 17, 'corporate', '2025-08-16 08:30:13'),
(240, 18, 'corporate', '2025-08-16 08:30:13'),
(241, 1, 'bestseller', '2025-08-16 08:30:55'),
(242, 1, 'popular', '2025-08-16 08:30:55'),
(243, 2, 'new', '2025-08-16 08:30:55'),
(244, 2, 'custom', '2025-08-16 08:30:55'),
(245, 3, 'popular', '2025-08-16 08:30:55'),
(246, 4, 'bestseller', '2025-08-16 08:30:55'),
(247, 4, 'popular', '2025-08-16 08:30:55'),
(248, 5, 'bestseller', '2025-08-16 08:30:55'),
(249, 5, 'favorite', '2025-08-16 08:30:55'),
(250, 6, 'new', '2025-08-16 08:30:55'),
(251, 7, 'custom', '2025-08-16 08:30:55'),
(252, 8, 'popular', '2025-08-16 08:30:55'),
(253, 9, 'new', '2025-08-16 08:30:55'),
(254, 10, 'bestseller', '2025-08-16 08:30:55'),
(255, 10, 'popular', '2025-08-16 08:30:55'),
(256, 11, 'new', '2025-08-16 08:30:55'),
(257, 12, 'custom', '2025-08-16 08:30:55'),
(258, 13, 'bestseller', '2025-08-16 08:30:55'),
(259, 13, 'favorite', '2025-08-16 08:30:55'),
(260, 14, 'new', '2025-08-16 08:30:55'),
(261, 15, 'custom', '2025-08-16 08:30:55'),
(262, 16, 'corporate', '2025-08-16 08:30:55'),
(263, 17, 'corporate', '2025-08-16 08:30:55'),
(264, 18, 'corporate', '2025-08-16 08:30:55'),
(265, 1, 'bestseller', '2025-08-16 08:31:04'),
(266, 1, 'popular', '2025-08-16 08:31:04'),
(267, 2, 'new', '2025-08-16 08:31:04'),
(268, 2, 'custom', '2025-08-16 08:31:04'),
(269, 3, 'popular', '2025-08-16 08:31:04'),
(270, 4, 'bestseller', '2025-08-16 08:31:04'),
(271, 4, 'popular', '2025-08-16 08:31:04'),
(272, 5, 'bestseller', '2025-08-16 08:31:04'),
(273, 5, 'favorite', '2025-08-16 08:31:04'),
(274, 6, 'new', '2025-08-16 08:31:04'),
(275, 7, 'custom', '2025-08-16 08:31:04'),
(276, 8, 'popular', '2025-08-16 08:31:04'),
(277, 9, 'new', '2025-08-16 08:31:04'),
(278, 10, 'bestseller', '2025-08-16 08:31:04'),
(279, 10, 'popular', '2025-08-16 08:31:04'),
(280, 11, 'new', '2025-08-16 08:31:04'),
(281, 12, 'custom', '2025-08-16 08:31:04'),
(282, 13, 'bestseller', '2025-08-16 08:31:04'),
(283, 13, 'favorite', '2025-08-16 08:31:04'),
(284, 14, 'new', '2025-08-16 08:31:04'),
(285, 15, 'custom', '2025-08-16 08:31:04'),
(286, 16, 'corporate', '2025-08-16 08:31:04'),
(287, 17, 'corporate', '2025-08-16 08:31:04'),
(288, 18, 'corporate', '2025-08-16 08:31:04'),
(289, 1, 'bestseller', '2025-08-16 08:31:14'),
(290, 1, 'popular', '2025-08-16 08:31:14'),
(291, 2, 'new', '2025-08-16 08:31:14'),
(292, 2, 'custom', '2025-08-16 08:31:14'),
(293, 3, 'popular', '2025-08-16 08:31:14'),
(294, 4, 'bestseller', '2025-08-16 08:31:14'),
(295, 4, 'popular', '2025-08-16 08:31:14'),
(296, 5, 'bestseller', '2025-08-16 08:31:14'),
(297, 5, 'favorite', '2025-08-16 08:31:14'),
(298, 6, 'new', '2025-08-16 08:31:14'),
(299, 7, 'custom', '2025-08-16 08:31:14'),
(300, 8, 'popular', '2025-08-16 08:31:14'),
(301, 9, 'new', '2025-08-16 08:31:14'),
(302, 10, 'bestseller', '2025-08-16 08:31:14'),
(303, 10, 'popular', '2025-08-16 08:31:14'),
(304, 11, 'new', '2025-08-16 08:31:14'),
(305, 12, 'custom', '2025-08-16 08:31:14'),
(306, 13, 'bestseller', '2025-08-16 08:31:14'),
(307, 13, 'favorite', '2025-08-16 08:31:14'),
(308, 14, 'new', '2025-08-16 08:31:14'),
(309, 15, 'custom', '2025-08-16 08:31:14'),
(310, 16, 'corporate', '2025-08-16 08:31:14'),
(311, 17, 'corporate', '2025-08-16 08:31:14'),
(312, 18, 'corporate', '2025-08-16 08:31:14'),
(313, 1, 'bestseller', '2025-08-16 08:31:29'),
(314, 1, 'popular', '2025-08-16 08:31:29'),
(315, 2, 'new', '2025-08-16 08:31:29'),
(316, 2, 'custom', '2025-08-16 08:31:29'),
(317, 3, 'popular', '2025-08-16 08:31:29'),
(318, 4, 'bestseller', '2025-08-16 08:31:29'),
(319, 4, 'popular', '2025-08-16 08:31:29'),
(320, 5, 'bestseller', '2025-08-16 08:31:29'),
(321, 5, 'favorite', '2025-08-16 08:31:29'),
(322, 6, 'new', '2025-08-16 08:31:29'),
(323, 7, 'custom', '2025-08-16 08:31:29'),
(324, 8, 'popular', '2025-08-16 08:31:29'),
(325, 9, 'new', '2025-08-16 08:31:29'),
(326, 10, 'bestseller', '2025-08-16 08:31:29'),
(327, 10, 'popular', '2025-08-16 08:31:29'),
(328, 11, 'new', '2025-08-16 08:31:29'),
(329, 12, 'custom', '2025-08-16 08:31:29'),
(330, 13, 'bestseller', '2025-08-16 08:31:29'),
(331, 13, 'favorite', '2025-08-16 08:31:29'),
(332, 14, 'new', '2025-08-16 08:31:29'),
(333, 15, 'custom', '2025-08-16 08:31:29'),
(334, 16, 'corporate', '2025-08-16 08:31:29'),
(335, 17, 'corporate', '2025-08-16 08:31:29'),
(336, 18, 'corporate', '2025-08-16 08:31:29'),
(337, 1, 'bestseller', '2025-08-16 08:41:22'),
(338, 1, 'popular', '2025-08-16 08:41:22'),
(339, 2, 'new', '2025-08-16 08:41:22'),
(340, 2, 'custom', '2025-08-16 08:41:22'),
(341, 3, 'popular', '2025-08-16 08:41:22'),
(342, 4, 'bestseller', '2025-08-16 08:41:22'),
(343, 4, 'popular', '2025-08-16 08:41:22'),
(344, 5, 'bestseller', '2025-08-16 08:41:22'),
(345, 5, 'favorite', '2025-08-16 08:41:22'),
(346, 6, 'new', '2025-08-16 08:41:22'),
(347, 7, 'custom', '2025-08-16 08:41:22'),
(348, 8, 'popular', '2025-08-16 08:41:22'),
(349, 9, 'new', '2025-08-16 08:41:22'),
(350, 10, 'bestseller', '2025-08-16 08:41:22'),
(351, 10, 'popular', '2025-08-16 08:41:22'),
(352, 11, 'new', '2025-08-16 08:41:22'),
(353, 12, 'custom', '2025-08-16 08:41:22'),
(354, 13, 'bestseller', '2025-08-16 08:41:22'),
(355, 13, 'favorite', '2025-08-16 08:41:22'),
(356, 14, 'new', '2025-08-16 08:41:22'),
(357, 15, 'custom', '2025-08-16 08:41:22'),
(358, 16, 'corporate', '2025-08-16 08:41:22'),
(359, 17, 'corporate', '2025-08-16 08:41:22'),
(360, 18, 'corporate', '2025-08-16 08:41:22'),
(361, 1, 'bestseller', '2025-08-16 08:41:39'),
(362, 1, 'popular', '2025-08-16 08:41:39'),
(363, 2, 'new', '2025-08-16 08:41:39'),
(364, 2, 'custom', '2025-08-16 08:41:39'),
(365, 3, 'popular', '2025-08-16 08:41:39'),
(366, 4, 'bestseller', '2025-08-16 08:41:39'),
(367, 4, 'popular', '2025-08-16 08:41:39'),
(368, 5, 'bestseller', '2025-08-16 08:41:39'),
(369, 5, 'favorite', '2025-08-16 08:41:39'),
(370, 6, 'new', '2025-08-16 08:41:39'),
(371, 7, 'custom', '2025-08-16 08:41:39'),
(372, 8, 'popular', '2025-08-16 08:41:39'),
(373, 9, 'new', '2025-08-16 08:41:39'),
(374, 10, 'bestseller', '2025-08-16 08:41:39'),
(375, 10, 'popular', '2025-08-16 08:41:39'),
(376, 11, 'new', '2025-08-16 08:41:39'),
(377, 12, 'custom', '2025-08-16 08:41:39'),
(378, 13, 'bestseller', '2025-08-16 08:41:39'),
(379, 13, 'favorite', '2025-08-16 08:41:39'),
(380, 14, 'new', '2025-08-16 08:41:39'),
(381, 15, 'custom', '2025-08-16 08:41:39'),
(382, 16, 'corporate', '2025-08-16 08:41:39'),
(383, 17, 'corporate', '2025-08-16 08:41:39'),
(384, 18, 'corporate', '2025-08-16 08:41:39'),
(385, 1, 'bestseller', '2025-08-16 08:43:54'),
(386, 1, 'popular', '2025-08-16 08:43:54'),
(387, 2, 'new', '2025-08-16 08:43:54'),
(388, 2, 'custom', '2025-08-16 08:43:54'),
(389, 3, 'popular', '2025-08-16 08:43:54'),
(390, 4, 'bestseller', '2025-08-16 08:43:54'),
(391, 4, 'popular', '2025-08-16 08:43:54'),
(392, 5, 'bestseller', '2025-08-16 08:43:54'),
(393, 5, 'favorite', '2025-08-16 08:43:54'),
(394, 6, 'new', '2025-08-16 08:43:54'),
(395, 7, 'custom', '2025-08-16 08:43:54'),
(396, 8, 'popular', '2025-08-16 08:43:54'),
(397, 9, 'new', '2025-08-16 08:43:54'),
(398, 10, 'bestseller', '2025-08-16 08:43:54'),
(399, 10, 'popular', '2025-08-16 08:43:54'),
(400, 11, 'new', '2025-08-16 08:43:54'),
(401, 12, 'custom', '2025-08-16 08:43:54'),
(402, 13, 'bestseller', '2025-08-16 08:43:54'),
(403, 13, 'favorite', '2025-08-16 08:43:54'),
(404, 14, 'new', '2025-08-16 08:43:54'),
(405, 15, 'custom', '2025-08-16 08:43:54'),
(406, 16, 'corporate', '2025-08-16 08:43:54'),
(407, 17, 'corporate', '2025-08-16 08:43:54'),
(408, 18, 'corporate', '2025-08-16 08:43:54'),
(409, 1, 'bestseller', '2025-08-16 08:44:02'),
(410, 1, 'popular', '2025-08-16 08:44:02'),
(411, 2, 'new', '2025-08-16 08:44:02'),
(412, 2, 'custom', '2025-08-16 08:44:02'),
(413, 3, 'popular', '2025-08-16 08:44:02'),
(414, 4, 'bestseller', '2025-08-16 08:44:02'),
(415, 4, 'popular', '2025-08-16 08:44:02'),
(416, 5, 'bestseller', '2025-08-16 08:44:02'),
(417, 5, 'favorite', '2025-08-16 08:44:02'),
(418, 6, 'new', '2025-08-16 08:44:02'),
(419, 7, 'custom', '2025-08-16 08:44:02'),
(420, 8, 'popular', '2025-08-16 08:44:02'),
(421, 9, 'new', '2025-08-16 08:44:02'),
(422, 10, 'bestseller', '2025-08-16 08:44:02'),
(423, 10, 'popular', '2025-08-16 08:44:02'),
(424, 11, 'new', '2025-08-16 08:44:02'),
(425, 12, 'custom', '2025-08-16 08:44:02'),
(426, 13, 'bestseller', '2025-08-16 08:44:02'),
(427, 13, 'favorite', '2025-08-16 08:44:02'),
(428, 14, 'new', '2025-08-16 08:44:02'),
(429, 15, 'custom', '2025-08-16 08:44:02'),
(430, 16, 'corporate', '2025-08-16 08:44:02'),
(431, 17, 'corporate', '2025-08-16 08:44:02'),
(432, 18, 'corporate', '2025-08-16 08:44:02'),
(433, 1, 'bestseller', '2025-08-16 08:44:09'),
(434, 1, 'popular', '2025-08-16 08:44:09'),
(435, 2, 'new', '2025-08-16 08:44:09'),
(436, 2, 'custom', '2025-08-16 08:44:09'),
(437, 3, 'popular', '2025-08-16 08:44:09'),
(438, 4, 'bestseller', '2025-08-16 08:44:09'),
(439, 4, 'popular', '2025-08-16 08:44:09'),
(440, 5, 'bestseller', '2025-08-16 08:44:09'),
(441, 5, 'favorite', '2025-08-16 08:44:09'),
(442, 6, 'new', '2025-08-16 08:44:09'),
(443, 7, 'custom', '2025-08-16 08:44:09'),
(444, 8, 'popular', '2025-08-16 08:44:09'),
(445, 9, 'new', '2025-08-16 08:44:09'),
(446, 10, 'bestseller', '2025-08-16 08:44:09'),
(447, 10, 'popular', '2025-08-16 08:44:09'),
(448, 11, 'new', '2025-08-16 08:44:09'),
(449, 12, 'custom', '2025-08-16 08:44:09'),
(450, 13, 'bestseller', '2025-08-16 08:44:09'),
(451, 13, 'favorite', '2025-08-16 08:44:09'),
(452, 14, 'new', '2025-08-16 08:44:09'),
(453, 15, 'custom', '2025-08-16 08:44:09'),
(454, 16, 'corporate', '2025-08-16 08:44:09'),
(455, 17, 'corporate', '2025-08-16 08:44:09'),
(456, 18, 'corporate', '2025-08-16 08:44:09'),
(457, 1, 'bestseller', '2025-08-16 08:50:43'),
(458, 1, 'popular', '2025-08-16 08:50:43'),
(459, 2, 'new', '2025-08-16 08:50:43'),
(460, 2, 'custom', '2025-08-16 08:50:43'),
(461, 3, 'popular', '2025-08-16 08:50:43'),
(462, 4, 'bestseller', '2025-08-16 08:50:43'),
(463, 4, 'popular', '2025-08-16 08:50:43'),
(464, 5, 'bestseller', '2025-08-16 08:50:43'),
(465, 5, 'favorite', '2025-08-16 08:50:43'),
(466, 6, 'new', '2025-08-16 08:50:43'),
(467, 7, 'custom', '2025-08-16 08:50:43'),
(468, 8, 'popular', '2025-08-16 08:50:43'),
(469, 9, 'new', '2025-08-16 08:50:43'),
(470, 10, 'bestseller', '2025-08-16 08:50:43'),
(471, 10, 'popular', '2025-08-16 08:50:43'),
(472, 11, 'new', '2025-08-16 08:50:43'),
(473, 12, 'custom', '2025-08-16 08:50:43'),
(474, 13, 'bestseller', '2025-08-16 08:50:43'),
(475, 13, 'favorite', '2025-08-16 08:50:43'),
(476, 14, 'new', '2025-08-16 08:50:43'),
(477, 15, 'custom', '2025-08-16 08:50:43'),
(478, 16, 'corporate', '2025-08-16 08:50:43'),
(479, 17, 'corporate', '2025-08-16 08:50:43'),
(480, 18, 'corporate', '2025-08-16 08:50:43'),
(481, 1, 'bestseller', '2025-08-16 08:50:45'),
(482, 1, 'popular', '2025-08-16 08:50:45'),
(483, 2, 'new', '2025-08-16 08:50:45'),
(484, 2, 'custom', '2025-08-16 08:50:45'),
(485, 3, 'popular', '2025-08-16 08:50:45'),
(486, 4, 'bestseller', '2025-08-16 08:50:45'),
(487, 4, 'popular', '2025-08-16 08:50:45'),
(488, 5, 'bestseller', '2025-08-16 08:50:45'),
(489, 5, 'favorite', '2025-08-16 08:50:45'),
(490, 6, 'new', '2025-08-16 08:50:45'),
(491, 7, 'custom', '2025-08-16 08:50:45'),
(492, 8, 'popular', '2025-08-16 08:50:45'),
(493, 9, 'new', '2025-08-16 08:50:45'),
(494, 10, 'bestseller', '2025-08-16 08:50:45'),
(495, 10, 'popular', '2025-08-16 08:50:45'),
(496, 11, 'new', '2025-08-16 08:50:45'),
(497, 12, 'custom', '2025-08-16 08:50:45'),
(498, 13, 'bestseller', '2025-08-16 08:50:45'),
(499, 13, 'favorite', '2025-08-16 08:50:45'),
(500, 14, 'new', '2025-08-16 08:50:45'),
(501, 15, 'custom', '2025-08-16 08:50:45'),
(502, 16, 'corporate', '2025-08-16 08:50:45'),
(503, 17, 'corporate', '2025-08-16 08:50:45'),
(504, 18, 'corporate', '2025-08-16 08:50:45'),
(505, 1, 'bestseller', '2025-08-16 08:50:49'),
(506, 1, 'popular', '2025-08-16 08:50:49'),
(507, 2, 'new', '2025-08-16 08:50:49'),
(508, 2, 'custom', '2025-08-16 08:50:49'),
(509, 3, 'popular', '2025-08-16 08:50:49'),
(510, 4, 'bestseller', '2025-08-16 08:50:49'),
(511, 4, 'popular', '2025-08-16 08:50:49'),
(512, 5, 'bestseller', '2025-08-16 08:50:49'),
(513, 5, 'favorite', '2025-08-16 08:50:49'),
(514, 6, 'new', '2025-08-16 08:50:49'),
(515, 7, 'custom', '2025-08-16 08:50:49'),
(516, 8, 'popular', '2025-08-16 08:50:49'),
(517, 9, 'new', '2025-08-16 08:50:49'),
(518, 10, 'bestseller', '2025-08-16 08:50:49'),
(519, 10, 'popular', '2025-08-16 08:50:49'),
(520, 11, 'new', '2025-08-16 08:50:49'),
(521, 12, 'custom', '2025-08-16 08:50:49'),
(522, 13, 'bestseller', '2025-08-16 08:50:49'),
(523, 13, 'favorite', '2025-08-16 08:50:49'),
(524, 14, 'new', '2025-08-16 08:50:49'),
(525, 15, 'custom', '2025-08-16 08:50:49'),
(526, 16, 'corporate', '2025-08-16 08:50:49'),
(527, 17, 'corporate', '2025-08-16 08:50:49'),
(528, 18, 'corporate', '2025-08-16 08:50:49'),
(529, 1, 'bestseller', '2025-08-16 08:50:54'),
(530, 1, 'popular', '2025-08-16 08:50:54'),
(531, 2, 'new', '2025-08-16 08:50:54'),
(532, 2, 'custom', '2025-08-16 08:50:54'),
(533, 3, 'popular', '2025-08-16 08:50:54'),
(534, 4, 'bestseller', '2025-08-16 08:50:54'),
(535, 4, 'popular', '2025-08-16 08:50:54'),
(536, 5, 'bestseller', '2025-08-16 08:50:54'),
(537, 5, 'favorite', '2025-08-16 08:50:54'),
(538, 6, 'new', '2025-08-16 08:50:54'),
(539, 7, 'custom', '2025-08-16 08:50:54'),
(540, 8, 'popular', '2025-08-16 08:50:54'),
(541, 9, 'new', '2025-08-16 08:50:54'),
(542, 10, 'bestseller', '2025-08-16 08:50:54'),
(543, 10, 'popular', '2025-08-16 08:50:54'),
(544, 11, 'new', '2025-08-16 08:50:54'),
(545, 12, 'custom', '2025-08-16 08:50:54'),
(546, 13, 'bestseller', '2025-08-16 08:50:54'),
(547, 13, 'favorite', '2025-08-16 08:50:54'),
(548, 14, 'new', '2025-08-16 08:50:54'),
(549, 15, 'custom', '2025-08-16 08:50:54'),
(550, 16, 'corporate', '2025-08-16 08:50:54'),
(551, 17, 'corporate', '2025-08-16 08:50:54'),
(552, 18, 'corporate', '2025-08-16 08:50:54'),
(553, 1, 'bestseller', '2025-08-16 08:54:46'),
(554, 1, 'popular', '2025-08-16 08:54:46'),
(555, 2, 'new', '2025-08-16 08:54:46'),
(556, 2, 'custom', '2025-08-16 08:54:46'),
(557, 3, 'popular', '2025-08-16 08:54:46'),
(558, 4, 'bestseller', '2025-08-16 08:54:46'),
(559, 4, 'popular', '2025-08-16 08:54:46'),
(560, 5, 'bestseller', '2025-08-16 08:54:46'),
(561, 5, 'favorite', '2025-08-16 08:54:46'),
(562, 6, 'new', '2025-08-16 08:54:46'),
(563, 7, 'custom', '2025-08-16 08:54:46'),
(564, 8, 'popular', '2025-08-16 08:54:46'),
(565, 9, 'new', '2025-08-16 08:54:46'),
(566, 10, 'bestseller', '2025-08-16 08:54:46'),
(567, 10, 'popular', '2025-08-16 08:54:46'),
(568, 11, 'new', '2025-08-16 08:54:46'),
(569, 12, 'custom', '2025-08-16 08:54:46'),
(570, 13, 'bestseller', '2025-08-16 08:54:46'),
(571, 13, 'favorite', '2025-08-16 08:54:46'),
(572, 14, 'new', '2025-08-16 08:54:46'),
(573, 15, 'custom', '2025-08-16 08:54:46'),
(574, 16, 'corporate', '2025-08-16 08:54:46'),
(575, 17, 'corporate', '2025-08-16 08:54:46'),
(576, 18, 'corporate', '2025-08-16 08:54:46'),
(577, 1, 'bestseller', '2025-08-16 08:54:53'),
(578, 1, 'popular', '2025-08-16 08:54:53'),
(579, 2, 'new', '2025-08-16 08:54:53'),
(580, 2, 'custom', '2025-08-16 08:54:53'),
(581, 3, 'popular', '2025-08-16 08:54:53'),
(582, 4, 'bestseller', '2025-08-16 08:54:53'),
(583, 4, 'popular', '2025-08-16 08:54:53'),
(584, 5, 'bestseller', '2025-08-16 08:54:53'),
(585, 5, 'favorite', '2025-08-16 08:54:53'),
(586, 6, 'new', '2025-08-16 08:54:53'),
(587, 7, 'custom', '2025-08-16 08:54:53'),
(588, 8, 'popular', '2025-08-16 08:54:53'),
(589, 9, 'new', '2025-08-16 08:54:53'),
(590, 10, 'bestseller', '2025-08-16 08:54:53'),
(591, 10, 'popular', '2025-08-16 08:54:53'),
(592, 11, 'new', '2025-08-16 08:54:53'),
(593, 12, 'custom', '2025-08-16 08:54:53'),
(594, 13, 'bestseller', '2025-08-16 08:54:53'),
(595, 13, 'favorite', '2025-08-16 08:54:53'),
(596, 14, 'new', '2025-08-16 08:54:53'),
(597, 15, 'custom', '2025-08-16 08:54:53'),
(598, 16, 'corporate', '2025-08-16 08:54:53'),
(599, 17, 'corporate', '2025-08-16 08:54:53'),
(600, 18, 'corporate', '2025-08-16 08:54:53'),
(601, 1, 'bestseller', '2025-08-16 08:55:06'),
(602, 1, 'popular', '2025-08-16 08:55:06'),
(603, 2, 'new', '2025-08-16 08:55:06'),
(604, 2, 'custom', '2025-08-16 08:55:06'),
(605, 3, 'popular', '2025-08-16 08:55:06'),
(606, 4, 'bestseller', '2025-08-16 08:55:06'),
(607, 4, 'popular', '2025-08-16 08:55:06'),
(608, 5, 'bestseller', '2025-08-16 08:55:06'),
(609, 5, 'favorite', '2025-08-16 08:55:06'),
(610, 6, 'new', '2025-08-16 08:55:06'),
(611, 7, 'custom', '2025-08-16 08:55:06'),
(612, 8, 'popular', '2025-08-16 08:55:06'),
(613, 9, 'new', '2025-08-16 08:55:06'),
(614, 10, 'bestseller', '2025-08-16 08:55:06'),
(615, 10, 'popular', '2025-08-16 08:55:06'),
(616, 11, 'new', '2025-08-16 08:55:06'),
(617, 12, 'custom', '2025-08-16 08:55:06'),
(618, 13, 'bestseller', '2025-08-16 08:55:06'),
(619, 13, 'favorite', '2025-08-16 08:55:06'),
(620, 14, 'new', '2025-08-16 08:55:06'),
(621, 15, 'custom', '2025-08-16 08:55:06'),
(622, 16, 'corporate', '2025-08-16 08:55:06'),
(623, 17, 'corporate', '2025-08-16 08:55:06'),
(624, 18, 'corporate', '2025-08-16 08:55:06'),
(625, 1, 'bestseller', '2025-08-16 08:55:17'),
(626, 1, 'popular', '2025-08-16 08:55:17'),
(627, 2, 'new', '2025-08-16 08:55:17'),
(628, 2, 'custom', '2025-08-16 08:55:17'),
(629, 3, 'popular', '2025-08-16 08:55:17'),
(630, 4, 'bestseller', '2025-08-16 08:55:17'),
(631, 4, 'popular', '2025-08-16 08:55:17'),
(632, 5, 'bestseller', '2025-08-16 08:55:17'),
(633, 5, 'favorite', '2025-08-16 08:55:17'),
(634, 6, 'new', '2025-08-16 08:55:17'),
(635, 7, 'custom', '2025-08-16 08:55:17'),
(636, 8, 'popular', '2025-08-16 08:55:17'),
(637, 9, 'new', '2025-08-16 08:55:17'),
(638, 10, 'bestseller', '2025-08-16 08:55:17'),
(639, 10, 'popular', '2025-08-16 08:55:17'),
(640, 11, 'new', '2025-08-16 08:55:17'),
(641, 12, 'custom', '2025-08-16 08:55:17'),
(642, 13, 'bestseller', '2025-08-16 08:55:17'),
(643, 13, 'favorite', '2025-08-16 08:55:17'),
(644, 14, 'new', '2025-08-16 08:55:17'),
(645, 15, 'custom', '2025-08-16 08:55:17'),
(646, 16, 'corporate', '2025-08-16 08:55:17'),
(647, 17, 'corporate', '2025-08-16 08:55:17'),
(648, 18, 'corporate', '2025-08-16 08:55:17'),
(649, 1, 'bestseller', '2025-08-16 08:55:27'),
(650, 1, 'popular', '2025-08-16 08:55:27'),
(651, 2, 'new', '2025-08-16 08:55:27'),
(652, 2, 'custom', '2025-08-16 08:55:27'),
(653, 3, 'popular', '2025-08-16 08:55:27'),
(654, 4, 'bestseller', '2025-08-16 08:55:27'),
(655, 4, 'popular', '2025-08-16 08:55:27'),
(656, 5, 'bestseller', '2025-08-16 08:55:27'),
(657, 5, 'favorite', '2025-08-16 08:55:27'),
(658, 6, 'new', '2025-08-16 08:55:27'),
(659, 7, 'custom', '2025-08-16 08:55:27'),
(660, 8, 'popular', '2025-08-16 08:55:27'),
(661, 9, 'new', '2025-08-16 08:55:27'),
(662, 10, 'bestseller', '2025-08-16 08:55:27'),
(663, 10, 'popular', '2025-08-16 08:55:27'),
(664, 11, 'new', '2025-08-16 08:55:27'),
(665, 12, 'custom', '2025-08-16 08:55:27'),
(666, 13, 'bestseller', '2025-08-16 08:55:27'),
(667, 13, 'favorite', '2025-08-16 08:55:27'),
(668, 14, 'new', '2025-08-16 08:55:27'),
(669, 15, 'custom', '2025-08-16 08:55:27'),
(670, 16, 'corporate', '2025-08-16 08:55:27'),
(671, 17, 'corporate', '2025-08-16 08:55:27'),
(672, 18, 'corporate', '2025-08-16 08:55:27'),
(673, 1, 'bestseller', '2025-08-16 08:55:37'),
(674, 1, 'popular', '2025-08-16 08:55:37'),
(675, 2, 'new', '2025-08-16 08:55:37'),
(676, 2, 'custom', '2025-08-16 08:55:37'),
(677, 3, 'popular', '2025-08-16 08:55:37'),
(678, 4, 'bestseller', '2025-08-16 08:55:37'),
(679, 4, 'popular', '2025-08-16 08:55:37'),
(680, 5, 'bestseller', '2025-08-16 08:55:37'),
(681, 5, 'favorite', '2025-08-16 08:55:37'),
(682, 6, 'new', '2025-08-16 08:55:37'),
(683, 7, 'custom', '2025-08-16 08:55:37'),
(684, 8, 'popular', '2025-08-16 08:55:37'),
(685, 9, 'new', '2025-08-16 08:55:37'),
(686, 10, 'bestseller', '2025-08-16 08:55:37'),
(687, 10, 'popular', '2025-08-16 08:55:37'),
(688, 11, 'new', '2025-08-16 08:55:37'),
(689, 12, 'custom', '2025-08-16 08:55:37'),
(690, 13, 'bestseller', '2025-08-16 08:55:37'),
(691, 13, 'favorite', '2025-08-16 08:55:37'),
(692, 14, 'new', '2025-08-16 08:55:37'),
(693, 15, 'custom', '2025-08-16 08:55:37'),
(694, 16, 'corporate', '2025-08-16 08:55:37'),
(695, 17, 'corporate', '2025-08-16 08:55:37'),
(696, 18, 'corporate', '2025-08-16 08:55:37'),
(697, 1, 'bestseller', '2025-08-16 08:57:24'),
(698, 1, 'popular', '2025-08-16 08:57:24'),
(699, 2, 'new', '2025-08-16 08:57:24'),
(700, 2, 'custom', '2025-08-16 08:57:24'),
(701, 3, 'popular', '2025-08-16 08:57:24'),
(702, 4, 'bestseller', '2025-08-16 08:57:24'),
(703, 4, 'popular', '2025-08-16 08:57:24'),
(704, 5, 'bestseller', '2025-08-16 08:57:24'),
(705, 5, 'favorite', '2025-08-16 08:57:24'),
(706, 6, 'new', '2025-08-16 08:57:24'),
(707, 7, 'custom', '2025-08-16 08:57:24'),
(708, 8, 'popular', '2025-08-16 08:57:24'),
(709, 9, 'new', '2025-08-16 08:57:24'),
(710, 10, 'bestseller', '2025-08-16 08:57:24'),
(711, 10, 'popular', '2025-08-16 08:57:24'),
(712, 11, 'new', '2025-08-16 08:57:24'),
(713, 12, 'custom', '2025-08-16 08:57:24'),
(714, 13, 'bestseller', '2025-08-16 08:57:24'),
(715, 13, 'favorite', '2025-08-16 08:57:24'),
(716, 14, 'new', '2025-08-16 08:57:24'),
(717, 15, 'custom', '2025-08-16 08:57:24'),
(718, 16, 'corporate', '2025-08-16 08:57:24'),
(719, 17, 'corporate', '2025-08-16 08:57:24'),
(720, 18, 'corporate', '2025-08-16 08:57:24'),
(721, 1, 'bestseller', '2025-08-16 08:57:39'),
(722, 1, 'popular', '2025-08-16 08:57:39'),
(723, 2, 'new', '2025-08-16 08:57:39'),
(724, 2, 'custom', '2025-08-16 08:57:39'),
(725, 3, 'popular', '2025-08-16 08:57:39'),
(726, 4, 'bestseller', '2025-08-16 08:57:39'),
(727, 4, 'popular', '2025-08-16 08:57:39'),
(728, 5, 'bestseller', '2025-08-16 08:57:39'),
(729, 5, 'favorite', '2025-08-16 08:57:39'),
(730, 6, 'new', '2025-08-16 08:57:39'),
(731, 7, 'custom', '2025-08-16 08:57:39'),
(732, 8, 'popular', '2025-08-16 08:57:39'),
(733, 9, 'new', '2025-08-16 08:57:39'),
(734, 10, 'bestseller', '2025-08-16 08:57:39'),
(735, 10, 'popular', '2025-08-16 08:57:39'),
(736, 11, 'new', '2025-08-16 08:57:39'),
(737, 12, 'custom', '2025-08-16 08:57:39'),
(738, 13, 'bestseller', '2025-08-16 08:57:39'),
(739, 13, 'favorite', '2025-08-16 08:57:39'),
(740, 14, 'new', '2025-08-16 08:57:39'),
(741, 15, 'custom', '2025-08-16 08:57:39'),
(742, 16, 'corporate', '2025-08-16 08:57:39'),
(743, 17, 'corporate', '2025-08-16 08:57:39'),
(744, 18, 'corporate', '2025-08-16 08:57:39'),
(745, 1, 'bestseller', '2025-08-16 08:58:55'),
(746, 1, 'popular', '2025-08-16 08:58:55'),
(747, 2, 'new', '2025-08-16 08:58:55'),
(748, 2, 'custom', '2025-08-16 08:58:55'),
(749, 3, 'popular', '2025-08-16 08:58:55'),
(750, 4, 'bestseller', '2025-08-16 08:58:55'),
(751, 4, 'popular', '2025-08-16 08:58:55'),
(752, 5, 'bestseller', '2025-08-16 08:58:55'),
(753, 5, 'favorite', '2025-08-16 08:58:55'),
(754, 6, 'new', '2025-08-16 08:58:55'),
(755, 7, 'custom', '2025-08-16 08:58:55'),
(756, 8, 'popular', '2025-08-16 08:58:55'),
(757, 9, 'new', '2025-08-16 08:58:55'),
(758, 10, 'bestseller', '2025-08-16 08:58:55'),
(759, 10, 'popular', '2025-08-16 08:58:55'),
(760, 11, 'new', '2025-08-16 08:58:55'),
(761, 12, 'custom', '2025-08-16 08:58:55'),
(762, 13, 'bestseller', '2025-08-16 08:58:55'),
(763, 13, 'favorite', '2025-08-16 08:58:55'),
(764, 14, 'new', '2025-08-16 08:58:55'),
(765, 15, 'custom', '2025-08-16 08:58:55'),
(766, 16, 'corporate', '2025-08-16 08:58:55'),
(767, 17, 'corporate', '2025-08-16 08:58:55'),
(768, 18, 'corporate', '2025-08-16 08:58:55'),
(769, 1, 'bestseller', '2025-08-16 09:04:51'),
(770, 1, 'popular', '2025-08-16 09:04:51'),
(771, 2, 'new', '2025-08-16 09:04:51'),
(772, 2, 'custom', '2025-08-16 09:04:51'),
(773, 3, 'popular', '2025-08-16 09:04:51'),
(774, 4, 'bestseller', '2025-08-16 09:04:51'),
(775, 4, 'popular', '2025-08-16 09:04:51'),
(776, 5, 'bestseller', '2025-08-16 09:04:51'),
(777, 5, 'favorite', '2025-08-16 09:04:51'),
(778, 6, 'new', '2025-08-16 09:04:51'),
(779, 7, 'custom', '2025-08-16 09:04:51'),
(780, 8, 'popular', '2025-08-16 09:04:51'),
(781, 9, 'new', '2025-08-16 09:04:51'),
(782, 10, 'bestseller', '2025-08-16 09:04:51'),
(783, 10, 'popular', '2025-08-16 09:04:51'),
(784, 11, 'new', '2025-08-16 09:04:51'),
(785, 12, 'custom', '2025-08-16 09:04:51'),
(786, 13, 'bestseller', '2025-08-16 09:04:51'),
(787, 13, 'favorite', '2025-08-16 09:04:51'),
(788, 14, 'new', '2025-08-16 09:04:51'),
(789, 15, 'custom', '2025-08-16 09:04:51'),
(790, 16, 'corporate', '2025-08-16 09:04:51'),
(791, 17, 'corporate', '2025-08-16 09:04:51'),
(792, 18, 'corporate', '2025-08-16 09:04:51');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `alt_text_tr` varchar(255) DEFAULT NULL,
  `alt_text_en` varchar(255) DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT 0,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `alt_text_tr`, `alt_text_en`, `is_primary`, `sort_order`, `created_at`) VALUES
(1, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:17:03'),
(2, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:17:03'),
(3, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:17:03'),
(4, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:17:03'),
(5, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:17:03'),
(6, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:17:03'),
(7, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:17:03'),
(8, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:17:03'),
(9, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:17:03'),
(10, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:17:03'),
(11, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:17:03'),
(12, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:17:03'),
(13, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:17:03'),
(14, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:17:03'),
(15, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:17:03'),
(16, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:17:03'),
(17, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:17:03'),
(18, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:17:03'),
(19, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:17:14'),
(20, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:17:14'),
(21, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:17:14'),
(22, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:17:14'),
(23, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:17:14'),
(24, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:17:14'),
(25, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:17:14'),
(26, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:17:14'),
(27, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:17:14'),
(28, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:17:14'),
(29, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:17:14'),
(30, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:17:14'),
(31, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:17:14'),
(32, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:17:14'),
(33, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:17:14'),
(34, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:17:14'),
(35, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:17:14'),
(36, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:17:14'),
(37, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:17:18'),
(38, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:17:18'),
(39, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:17:18'),
(40, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:17:18'),
(41, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:17:18'),
(42, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:17:18'),
(43, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:17:18'),
(44, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:17:18'),
(45, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:17:18'),
(46, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:17:18'),
(47, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:17:18'),
(48, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:17:18'),
(49, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:17:18'),
(50, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:17:18'),
(51, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:17:18'),
(52, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:17:18'),
(53, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:17:18'),
(54, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:17:18'),
(55, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:28:34'),
(56, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:28:34'),
(57, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:28:34'),
(58, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:28:34'),
(59, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:28:34'),
(60, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:28:34'),
(61, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:28:34'),
(62, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:28:34'),
(63, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:28:34'),
(64, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:28:34'),
(65, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:28:34'),
(66, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:28:34'),
(67, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:28:34'),
(68, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:28:34'),
(69, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:28:34'),
(70, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:28:34'),
(71, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:28:34'),
(72, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:28:34'),
(73, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:28:53'),
(74, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:28:53'),
(75, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:28:53'),
(76, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:28:53'),
(77, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:28:53'),
(78, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:28:53'),
(79, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:28:53'),
(80, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:28:53'),
(81, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:28:53'),
(82, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:28:53'),
(83, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:28:53'),
(84, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:28:53'),
(85, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:28:53'),
(86, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:28:53'),
(87, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:28:53'),
(88, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:28:53'),
(89, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:28:53'),
(90, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:28:53'),
(91, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:29:17'),
(92, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:29:17'),
(93, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:29:17'),
(94, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:29:17'),
(95, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:29:17'),
(96, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:29:17'),
(97, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:29:17'),
(98, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:29:17'),
(99, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:29:17'),
(100, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:29:17'),
(101, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:29:17'),
(102, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:29:17'),
(103, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:29:17'),
(104, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:29:17'),
(105, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:29:17'),
(106, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:29:17'),
(107, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:29:17'),
(108, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:29:17'),
(109, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:29:29'),
(110, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:29:29'),
(111, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:29:29'),
(112, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:29:29'),
(113, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:29:29'),
(114, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:29:29'),
(115, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:29:29'),
(116, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:29:29'),
(117, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:29:29'),
(118, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:29:29'),
(119, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:29:29'),
(120, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:29:29'),
(121, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:29:29'),
(122, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:29:29'),
(123, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:29:29'),
(124, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:29:29'),
(125, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:29:29'),
(126, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:29:29'),
(127, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:29:37'),
(128, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:29:37'),
(129, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:29:37'),
(130, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:29:37'),
(131, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:29:37'),
(132, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:29:37'),
(133, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:29:37'),
(134, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:29:37'),
(135, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:29:37'),
(136, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:29:37'),
(137, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:29:37'),
(138, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:29:37'),
(139, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:29:37'),
(140, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:29:37'),
(141, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:29:37'),
(142, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:29:37'),
(143, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:29:37'),
(144, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:29:37'),
(145, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:29:48'),
(146, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:29:48'),
(147, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:29:48'),
(148, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:29:48'),
(149, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:29:48'),
(150, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:29:48'),
(151, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:29:48'),
(152, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:29:48'),
(153, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:29:48'),
(154, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:29:48'),
(155, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:29:48'),
(156, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:29:48'),
(157, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:29:48'),
(158, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:29:48'),
(159, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:29:48'),
(160, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:29:48'),
(161, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:29:48'),
(162, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:29:48'),
(163, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:30:13'),
(164, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:30:13'),
(165, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:30:13'),
(166, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:30:13'),
(167, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:30:13'),
(168, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:30:13'),
(169, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:30:13'),
(170, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:30:13'),
(171, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:30:13'),
(172, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:30:13'),
(173, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:30:13'),
(174, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:30:13'),
(175, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:30:13'),
(176, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:30:13'),
(177, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:30:13'),
(178, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:30:13'),
(179, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:30:13'),
(180, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:30:13'),
(181, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:30:55'),
(182, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:30:55'),
(183, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:30:55'),
(184, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:30:55'),
(185, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:30:55'),
(186, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:30:55'),
(187, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:30:55'),
(188, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:30:55'),
(189, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:30:55'),
(190, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:30:55'),
(191, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:30:55'),
(192, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:30:55'),
(193, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:30:55'),
(194, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:30:55'),
(195, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:30:55'),
(196, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:30:55'),
(197, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:30:55'),
(198, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:30:55'),
(199, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:31:04'),
(200, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:31:04'),
(201, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:31:04'),
(202, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:31:04'),
(203, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:31:04'),
(204, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:31:04'),
(205, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:31:04'),
(206, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:31:04'),
(207, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:31:04'),
(208, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:31:04'),
(209, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:31:04'),
(210, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:31:04'),
(211, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:31:04'),
(212, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:31:04'),
(213, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:31:04'),
(214, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:31:04'),
(215, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:31:04'),
(216, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:31:04'),
(217, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:31:14'),
(218, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:31:14'),
(219, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:31:14'),
(220, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:31:14'),
(221, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:31:14'),
(222, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:31:14'),
(223, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:31:14'),
(224, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:31:14'),
(225, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:31:14'),
(226, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:31:14'),
(227, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:31:14'),
(228, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:31:14'),
(229, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:31:14'),
(230, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:31:14'),
(231, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:31:14'),
(232, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:31:14'),
(233, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:31:14'),
(234, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:31:14'),
(235, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:31:29'),
(236, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:31:29'),
(237, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:31:29'),
(238, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:31:29'),
(239, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:31:29'),
(240, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:31:29'),
(241, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:31:29'),
(242, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:31:29'),
(243, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:31:29'),
(244, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:31:29'),
(245, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:31:29'),
(246, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:31:29'),
(247, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:31:29'),
(248, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:31:29'),
(249, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:31:29'),
(250, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:31:29'),
(251, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:31:29'),
(252, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:31:29'),
(253, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:41:22'),
(254, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:41:22'),
(255, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:41:22'),
(256, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:41:22'),
(257, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:41:22'),
(258, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:41:22'),
(259, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:41:22'),
(260, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:41:22'),
(261, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:41:22'),
(262, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:41:22'),
(263, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:41:22'),
(264, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:41:22'),
(265, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:41:22'),
(266, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:41:22'),
(267, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:41:22'),
(268, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:41:22'),
(269, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:41:22'),
(270, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:41:22'),
(271, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:41:39'),
(272, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:41:39'),
(273, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:41:39'),
(274, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:41:39'),
(275, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:41:39'),
(276, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:41:39'),
(277, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:41:39'),
(278, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:41:39'),
(279, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:41:39'),
(280, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:41:39'),
(281, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:41:39'),
(282, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:41:39'),
(283, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:41:39'),
(284, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:41:39'),
(285, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:41:39'),
(286, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:41:39'),
(287, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:41:39'),
(288, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:41:39'),
(289, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:43:54'),
(290, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:43:54'),
(291, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:43:54'),
(292, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:43:54'),
(293, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:43:54'),
(294, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:43:54'),
(295, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:43:54'),
(296, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:43:54'),
(297, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:43:54'),
(298, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:43:54'),
(299, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:43:54'),
(300, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:43:54'),
(301, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:43:54'),
(302, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:43:54'),
(303, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:43:54'),
(304, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:43:54'),
(305, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:43:54'),
(306, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:43:54'),
(307, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:44:02'),
(308, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:44:02'),
(309, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:44:02'),
(310, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:44:02'),
(311, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:44:02'),
(312, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:44:02'),
(313, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:44:02'),
(314, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:44:02'),
(315, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:44:02'),
(316, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:44:02'),
(317, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:44:02'),
(318, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:44:02'),
(319, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:44:02'),
(320, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:44:02'),
(321, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:44:02'),
(322, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:44:02'),
(323, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:44:02'),
(324, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:44:02'),
(325, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:44:09'),
(326, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:44:09'),
(327, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:44:09'),
(328, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:44:09'),
(329, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:44:09'),
(330, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:44:09'),
(331, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:44:09'),
(332, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:44:09'),
(333, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:44:09'),
(334, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:44:09'),
(335, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:44:09'),
(336, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:44:09'),
(337, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:44:09'),
(338, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:44:09'),
(339, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:44:09'),
(340, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:44:09'),
(341, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:44:09'),
(342, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:44:09'),
(343, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:50:43'),
(344, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:50:43'),
(345, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:50:43'),
(346, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:50:43'),
(347, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:50:43'),
(348, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:50:43'),
(349, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:50:43'),
(350, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:50:43'),
(351, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:50:43'),
(352, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:50:43'),
(353, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:50:43'),
(354, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:50:43'),
(355, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:50:43'),
(356, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:50:43'),
(357, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:50:43'),
(358, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:50:43'),
(359, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:50:43'),
(360, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:50:43'),
(361, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:50:45'),
(362, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:50:45'),
(363, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:50:45'),
(364, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:50:45'),
(365, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:50:45'),
(366, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:50:45'),
(367, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:50:45'),
(368, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:50:45'),
(369, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:50:45'),
(370, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:50:45'),
(371, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:50:45'),
(372, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:50:45'),
(373, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:50:45'),
(374, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:50:45'),
(375, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:50:45'),
(376, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:50:45'),
(377, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:50:45'),
(378, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:50:45'),
(379, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:50:49'),
(380, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:50:49'),
(381, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:50:49'),
(382, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:50:49'),
(383, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:50:49'),
(384, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:50:49'),
(385, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:50:49'),
(386, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:50:49'),
(387, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:50:49'),
(388, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:50:49'),
(389, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:50:49'),
(390, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:50:49'),
(391, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:50:49'),
(392, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:50:49'),
(393, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:50:49'),
(394, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:50:49'),
(395, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:50:49'),
(396, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:50:49'),
(397, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:50:54'),
(398, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:50:54'),
(399, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:50:54'),
(400, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:50:54'),
(401, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:50:54'),
(402, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:50:54'),
(403, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:50:54'),
(404, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:50:54'),
(405, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:50:54'),
(406, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:50:54'),
(407, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:50:54'),
(408, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:50:54'),
(409, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:50:54'),
(410, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:50:54'),
(411, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:50:54'),
(412, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:50:54'),
(413, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:50:54'),
(414, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:50:54'),
(415, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:54:46'),
(416, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:54:46'),
(417, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:54:46'),
(418, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:54:46');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `alt_text_tr`, `alt_text_en`, `is_primary`, `sort_order`, `created_at`) VALUES
(419, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:54:46'),
(420, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:54:46'),
(421, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:54:46'),
(422, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:54:46'),
(423, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:54:46'),
(424, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:54:46'),
(425, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:54:46'),
(426, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:54:46'),
(427, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:54:46'),
(428, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:54:46'),
(429, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:54:46'),
(430, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:54:46'),
(431, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:54:46'),
(432, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:54:46'),
(433, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:54:53'),
(434, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:54:53'),
(435, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:54:53'),
(436, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:54:53'),
(437, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:54:53'),
(438, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:54:53'),
(439, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:54:53'),
(440, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:54:53'),
(441, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:54:53'),
(442, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:54:53'),
(443, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:54:53'),
(444, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:54:53'),
(445, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:54:53'),
(446, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:54:53'),
(447, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:54:53'),
(448, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:54:53'),
(449, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:54:53'),
(450, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:54:53'),
(451, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:55:06'),
(452, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:55:06'),
(453, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:55:06'),
(454, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:55:06'),
(455, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:55:06'),
(456, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:55:06'),
(457, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:55:06'),
(458, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:55:06'),
(459, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:55:06'),
(460, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:55:06'),
(461, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:55:06'),
(462, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:55:06'),
(463, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:55:06'),
(464, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:55:06'),
(465, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:55:06'),
(466, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:55:06'),
(467, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:55:06'),
(468, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:55:06'),
(469, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:55:17'),
(470, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:55:17'),
(471, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:55:17'),
(472, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:55:17'),
(473, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:55:17'),
(474, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:55:17'),
(475, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:55:17'),
(476, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:55:17'),
(477, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:55:17'),
(478, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:55:17'),
(479, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:55:17'),
(480, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:55:17'),
(481, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:55:17'),
(482, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:55:17'),
(483, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:55:17'),
(484, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:55:17'),
(485, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:55:17'),
(486, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:55:17'),
(487, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:55:27'),
(488, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:55:27'),
(489, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:55:27'),
(490, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:55:27'),
(491, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:55:27'),
(492, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:55:27'),
(493, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:55:27'),
(494, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:55:27'),
(495, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:55:27'),
(496, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:55:27'),
(497, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:55:27'),
(498, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:55:27'),
(499, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:55:27'),
(500, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:55:27'),
(501, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:55:27'),
(502, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:55:27'),
(503, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:55:27'),
(504, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:55:27'),
(505, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:55:37'),
(506, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:55:37'),
(507, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:55:37'),
(508, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:55:37'),
(509, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:55:37'),
(510, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:55:37'),
(511, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:55:37'),
(512, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:55:37'),
(513, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:55:37'),
(514, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:55:37'),
(515, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:55:37'),
(516, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:55:37'),
(517, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:55:37'),
(518, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:55:37'),
(519, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:55:37'),
(520, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:55:37'),
(521, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:55:37'),
(522, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:55:37'),
(523, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:57:24'),
(524, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:57:24'),
(525, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:57:24'),
(526, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:57:24'),
(527, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:57:24'),
(528, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:57:24'),
(529, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:57:24'),
(530, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:57:24'),
(531, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:57:24'),
(532, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:57:24'),
(533, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:57:24'),
(534, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:57:24'),
(535, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:57:24'),
(536, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:57:24'),
(537, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:57:24'),
(538, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:57:24'),
(539, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:57:24'),
(540, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:57:24'),
(541, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:57:39'),
(542, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:57:39'),
(543, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:57:39'),
(544, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:57:39'),
(545, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:57:39'),
(546, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:57:39'),
(547, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:57:39'),
(548, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:57:39'),
(549, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:57:39'),
(550, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:57:39'),
(551, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:57:39'),
(552, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:57:39'),
(553, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:57:39'),
(554, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:57:39'),
(555, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:57:39'),
(556, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:57:39'),
(557, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:57:39'),
(558, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:57:39'),
(559, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 08:58:55'),
(560, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 08:58:55'),
(561, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 08:58:55'),
(562, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 08:58:55'),
(563, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 08:58:55'),
(564, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 08:58:55'),
(565, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 08:58:55'),
(566, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 08:58:55'),
(567, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 08:58:55'),
(568, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 08:58:55'),
(569, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 08:58:55'),
(570, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 08:58:55'),
(571, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 08:58:55'),
(572, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 08:58:55'),
(573, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 08:58:55'),
(574, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 08:58:55'),
(575, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 08:58:55'),
(576, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 08:58:55'),
(577, 1, '/images/urun1.jfif', 'Çocuk Doğum Günü Kurabiyesi', 'Children Birthday Cookie', 1, 1, '2025-08-16 09:04:51'),
(578, 2, '/images/urun2.jfif', 'Yetişkin Doğum Günü Kurabiyesi', 'Adult Birthday Cookie', 1, 1, '2025-08-16 09:04:51'),
(579, 3, '/images/urun1.jfif', 'Mini Doğum Günü Kurabiyesi', 'Mini Birthday Cookie', 1, 1, '2025-08-16 09:04:51'),
(580, 4, '/images/urun2.jfif', 'Bebek Arabası Kurabiyesi', 'Baby Carriage Cookie', 1, 1, '2025-08-16 09:04:51'),
(581, 5, '/images/urun1.jfif', 'Bebek Biberon Kurabiyesi', 'Baby Bottles Cookie', 1, 1, '2025-08-16 09:04:51'),
(582, 6, '/images/urun2.jfif', 'Bebek Ayak İzi Kurabiyesi', 'Baby Footprint Cookie', 1, 1, '2025-08-16 09:04:51'),
(583, 7, '/images/urun1.jfif', 'Halloween Cadı Kurabiyesi', 'Halloween Witch Cookie', 1, 1, '2025-08-16 09:04:51'),
(584, 8, '/images/urun2.jfif', 'Halloween Balkabağı Kurabiyesi', 'Halloween Pumpkin Cookie', 1, 1, '2025-08-16 09:04:51'),
(585, 9, '/images/urun1.jfif', 'Halloween İskelet Kurabiyesi', 'Halloween Skeleton Cookie', 1, 1, '2025-08-16 09:04:51'),
(586, 10, '/images/urun2.jfif', 'Yılbaşı Çam Ağacı Kurabiyesi', 'New Year Christmas Tree Cookie', 1, 1, '2025-08-16 09:04:51'),
(587, 11, '/images/urun1.jfif', 'Yılbaşı Yıldız Kurabiyesi', 'New Year Star Cookie', 1, 1, '2025-08-16 09:04:51'),
(588, 12, '/images/urun2.jfif', 'Yılbaşı Kar Tanesi Kurabiyesi', 'New Year Snowflake Cookie', 1, 1, '2025-08-16 09:04:51'),
(589, 13, '/images/urun1.jfif', 'Kalp Şekilli Sevgililer Kurabiyesi', 'Heart Shaped Valentine Cookie', 1, 1, '2025-08-16 09:04:51'),
(590, 14, '/images/urun2.jfif', 'Gül Şekilli Sevgililer Kurabiyesi', 'Rose Shaped Valentine Cookie', 1, 1, '2025-08-16 09:04:51'),
(591, 15, '/images/urun1.jfif', 'Kupid Ok Sevgililer Kurabiyesi', 'Cupid Arrow Valentine Cookie', 1, 1, '2025-08-16 09:04:51'),
(592, 16, '/images/urun2.jfif', 'Kurumsal Logo Kurabiyesi', 'Corporate Logo Cookie', 1, 1, '2025-08-16 09:04:51'),
(593, 17, '/images/urun1.jfif', 'Kurumsal Kartvizit Kurabiyesi', 'Corporate Business Card Cookie', 1, 1, '2025-08-16 09:04:51'),
(594, 18, '/images/urun2.jfif', 'Kurumsal Kutlama Kurabiyesi', 'Corporate Celebration Cookie', 1, 1, '2025-08-16 09:04:51');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `guest_name` varchar(255) DEFAULT NULL,
  `guest_email` varchar(255) DEFAULT NULL,
  `rating` int(11) NOT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `comment_tr` text DEFAULT NULL,
  `comment_en` text DEFAULT NULL,
  `is_approved` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Tablo için indeksler `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_product` (`user_id`,`product_id`),
  ADD UNIQUE KEY `unique_session_product` (`session_id`,`product_id`),
  ADD KEY `idx_user` (`user_id`),
  ADD KEY `idx_session` (`session_id`),
  ADD KEY `idx_user_session` (`user_id`,`session_id`),
  ADD KEY `idx_product` (`product_id`);

--
-- Tablo için indeksler `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Tablo için indeksler `custom_orders`
--
ALTER TABLE `custom_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Tablo için indeksler `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_number` (`order_number`),
  ADD KEY `user_id` (`user_id`);

--
-- Tablo için indeksler `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Tablo için indeksler `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `category_id` (`category_id`);

--
-- Tablo için indeksler `product_badges`
--
ALTER TABLE `product_badges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Tablo için indeksler `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Tablo için indeksler `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Tablo için indeksler `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_product` (`user_id`,`product_id`),
  ADD UNIQUE KEY `unique_session_product` (`session_id`,`product_id`),
  ADD KEY `idx_user_session` (`user_id`,`session_id`),
  ADD KEY `idx_product` (`product_id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Tablo için AUTO_INCREMENT değeri `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Tablo için AUTO_INCREMENT değeri `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=199;

--
-- Tablo için AUTO_INCREMENT değeri `custom_orders`
--
ALTER TABLE `custom_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=595;

--
-- Tablo için AUTO_INCREMENT değeri `product_badges`
--
ALTER TABLE `product_badges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=793;

--
-- Tablo için AUTO_INCREMENT değeri `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=595;

--
-- Tablo için AUTO_INCREMENT değeri `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `custom_orders`
--
ALTER TABLE `custom_orders`
  ADD CONSTRAINT `custom_orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Tablo kısıtlamaları `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Tablo kısıtlamaları `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL;

--
-- Tablo kısıtlamaları `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Tablo kısıtlamaları `product_badges`
--
ALTER TABLE `product_badges`
  ADD CONSTRAINT `product_badges_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL;

--
-- Tablo kısıtlamaları `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
