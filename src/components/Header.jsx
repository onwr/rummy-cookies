import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cartAPI, wishlistAPI } from '../services/api';
import {
  HiOutlineTruck,
  HiOutlineHeart,
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiOutlineSearch,
  HiOutlineGlobe,
  HiOutlineMenu,
  HiOutlineX,
} from 'react-icons/hi';
import { FaCircle, FaHeart, FaTimes } from 'react-icons/fa';

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  // Sepet sayısını al
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await cartAPI.get();
        if (response.success) {
          setCartItemCount(response.data.item_count || 0);
        }
      } catch (error) {
        console.error('Sepet sayısı alınamadı:', error);
      }
    };

    fetchCartCount();

    // Sepet güncellemelerini dinle
    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Wishlist'i getir
  const fetchWishlist = async () => {
    try {
      setIsWishlistLoading(true);
      const response = await wishlistAPI.get();
      if (response.success) {
        setWishlistItems(response.data.items || []);
      }
    } catch (error) {
      console.error('Wishlist alınamadı:', error);
    } finally {
      setIsWishlistLoading(false);
    }
  };

  // Wishlist modal'ını aç
  const openWishlist = () => {
    setIsWishlistOpen(true);
    fetchWishlist();
  };

  // Wishlist'ten ürün çıkar
  const removeFromWishlist = async (productId) => {
    try {
      const response = await wishlistAPI.remove({ product_id: productId });
      if (response.success) {
        fetchWishlist(); // Listeyi yenile
      }
    } catch (error) {
      console.error("Wishlist'ten çıkarılamadı:", error);
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const goToLogin = () => {
    navigate('/giris');
  };

  const goToCart = () => {
    navigate('/sepet');
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className='w-full shadow-sm'
    >
      {/* Utility Bar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className='border-b border-[#b5755c]/10 bg-gradient-to-r from-[#fee2ba] to-[#fef3e2]'
      >
        <div className='mx-auto max-w-7xl px-4 py-3 sm:px-6'>
          <div className='flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0'>
            {/* Left side - Delivery info */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='flex items-center space-x-2'
            >
              <HiOutlineTruck className='h-4 w-4 text-[#b5755c]/70' />
              <span className='text-xs font-medium sm:text-sm'>{t('header.utility.delivery')}</span>
            </motion.div>

            {/* Right side - Links and language */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='flex items-center space-x-4 sm:space-x-6'
            >
              <div className='hidden items-center space-x-4 sm:flex'>
                <span className='text-xs font-semibold sm:text-sm'>
                  {t('header.utility.phone')}
                </span>
              </div>

              {/* Language Switcher */}
              <div className='flex items-center space-x-2'>
                <HiOutlineGlobe className='h-4 w-4 text-[#b5755c]/70' />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => changeLanguage('tr')}
                  className={`rounded-lg px-2 py-1 text-xs font-semibold transition-all duration-200 sm:px-3 sm:py-1.5 ${
                    i18n.language === 'tr'
                      ? 'bg-[#b5755c] text-white shadow-md'
                      : 'hover:bg-[#b5755c]/10 hover:text-[#b5755c]'
                  }`}
                >
                  TR
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => changeLanguage('en')}
                  className={`rounded-lg px-2 py-1 text-xs font-semibold transition-all duration-200 sm:px-3 sm:py-1.5 ${
                    i18n.language === 'en'
                      ? 'bg-[#b5755c] text-white shadow-md'
                      : 'hover:bg-[#b5755c]/10 hover:text-[#b5755c]'
                  }`}
                >
                  EN
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        className='border-b border-[#b5755c]/5 bg-white/95 backdrop-blur-sm'
      >
        <div className='mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className='flex items-center space-x-3 sm:space-x-5'
            >
              <motion.div whileHover={{ scale: 1.05 }} className='flex items-center'>
                <img
                  src='/logo.png'
                  alt='RumyCookie'
                  className='h-12 w-auto drop-shadow-sm sm:h-16 md:h-20'
                />
              </motion.div>
              <div className='hidden sm:block'>
                <h1 className='mb-1 font-serif text-xl font-bold text-[#b5755c] sm:text-2xl md:text-3xl'>
                  RumyCookie
                </h1>
                <span className='text-xs font-medium text-[#b5755c]/80 sm:text-sm'>
                  {t('header.logo.subtitle')}
                </span>
              </div>
            </motion.div>

            {/* Search Bar - Hidden on mobile */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className='mx-10 hidden max-w-lg flex-1 lg:flex'
            >
              <div className='relative w-full'>
                <input
                  type='text'
                  placeholder={t('header.search.placeholder')}
                  className='w-full rounded-2xl border border-[#b5755c]/15 bg-white/80 px-5 py-4 pl-14 placeholder-[#b5755c]/50 shadow-sm transition-all duration-200 hover:shadow-md focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
                />
                <HiOutlineSearch className='absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 transform text-[#b5755c]/50' />
              </div>
            </motion.div>

            {/* Icons */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className='flex items-center space-x-2 sm:space-x-4'
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={openWishlist}
                className='rounded-full p-2 transition-all duration-200 hover:scale-110 hover:bg-[#fee2ba]/50 sm:p-3'
              >
                <HiOutlineHeart className='h-5 w-5 text-[#b5755c] sm:h-6 sm:w-6' />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToLogin}
                className='rounded-full p-2 transition-all duration-200 hover:scale-110 hover:bg-[#fee2ba]/50 sm:p-3'
              >
                <HiOutlineUser className='h-5 w-5 text-[#b5755c] sm:h-6 sm:w-6' />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToCart}
                className='relative rounded-full p-2 transition-all duration-200 hover:scale-110 hover:bg-[#fee2ba]/50 sm:p-3'
              >
                <HiOutlineShoppingBag className='h-5 w-5 text-[#b5755c] sm:h-6 sm:w-6' />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 1 }}
                  className='absolute -top-1 -right-1 sm:-top-2 sm:-right-2'
                >
                  <FaCircle className='h-4 w-4 text-[#b5755c] sm:h-6 sm:w-6' />
                  <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xs font-bold text-[#b5755c]'>
                    {cartItemCount}
                  </span>
                </motion.div>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMobileMenu}
                className='rounded-full p-2 transition-all duration-200 hover:bg-[#fee2ba]/50 lg:hidden'
              >
                <AnimatePresence mode='wait'>
                  {isMobileMenuOpen ? (
                    <motion.div
                      key='close'
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiOutlineX className='h-6 w-6 text-[#b5755c]' />
                    </motion.div>
                  ) : (
                    <motion.div
                      key='menu'
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiOutlineMenu className='h-6 w-6 text-[#b5755c]' />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile Search Bar */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className='mt-4 lg:hidden'
          >
            <div className='relative'>
              <input
                type='text'
                placeholder={t('header.search.placeholder')}
                className='w-full rounded-xl border border-[#b5755c]/15 bg-white/80 px-4 py-3 pl-12 placeholder-[#b5755c]/50 shadow-sm focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
              />
              <HiOutlineSearch className='absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform text-[#b5755c]/50' />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
        className='border-b border-[#b5755c]/5 bg-white shadow-lg'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
          {/* Desktop Navigation */}
          <div className='hidden items-center space-x-8 py-5 lg:flex'>
            {[
              { href: '/', label: t('header.nav.home') },
              { href: '/hakkimizda', label: t('header.nav.about') },
              { href: '/#kategori', label: t('header.nav.categories') },
              { href: '/ozel-siparis', label: t('header.nav.customOrder') },
              { href: '/galeri', label: t('header.nav.gallery') },
              { href: '/sss', label: t('header.nav.faq') },
            ].map((item, index) => (
              <motion.a
                key={item.href}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                whileHover={{ y: -2 }}
                href={item.href}
                className='font-medium text-[#b5755c]/80 transition-colors duration-200 hover:text-[#b5755c]'
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='overflow-hidden lg:hidden'
              >
                <div className='space-y-3 py-4'>
                  {[
                    { href: '/', label: t('header.nav.home') },
                    { href: '/hakkimizda', label: t('header.nav.about') },
                    { href: '/ozel-siparis', label: t('header.nav.customOrder') },
                    { href: '/galeri', label: t('header.nav.gallery') },
                    { href: '/sss', label: t('header.nav.faq') },
                    { href: '/#yorumlar', label: t('header.nav.reviews') },
                  ].map((item, index) => (
                    <motion.a
                      key={item.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      href={item.href}
                      className='block py-2 font-medium text-[#b5755c]/80 transition-colors duration-200 hover:text-[#b5755c]'
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Wishlist Modal */}
      <AnimatePresence>
        {isWishlistOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
            onClick={() => setIsWishlistOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl'
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className='mb-6 flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-[#b5755c]'>
                  {i18n.language === 'tr' ? 'Favorilerim' : 'My Wishlist'}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsWishlistOpen(false)}
                  className='rounded-full p-2 text-[#b5755c] hover:bg-[#fee2ba]/50'
                >
                  <FaTimes className='h-5 w-5' />
                </motion.button>
              </div>

              {/* Content */}
              {isWishlistLoading ? (
                <div className='flex items-center justify-center py-12'>
                  <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-[#b5755c]'></div>
                </div>
              ) : wishlistItems.length > 0 ? (
                <div className='space-y-4'>
                  {wishlistItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className='flex items-center space-x-4 rounded-lg border border-[#b5755c]/10 p-4'
                    >
                      {/* Product Image */}
                      <div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg'>
                        <img
                          src={item.primary_image || '/images/urun1.jfif'}
                          alt={item.name}
                          className='h-full w-full object-cover'
                        />
                      </div>

                      {/* Product Info */}
                      <div className='flex-1'>
                        <h3 className='font-semibold text-[#b5755c]'>{item.name}</h3>
                        <p className='text-sm text-[#b5755c]/70'>
                          {i18n.language === 'tr' ? 'Kategori' : 'Category'}: {item.category_name}
                        </p>
                        <p className='text-lg font-bold text-[#b5755c]'>₺{item.price}</p>
                      </div>

                      {/* Actions */}
                      <div className='flex space-x-2'>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeFromWishlist(item.product_id)}
                          className='rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600'
                        >
                          {i18n.language === 'tr' ? 'Kaldır' : 'Remove'}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className='py-12 text-center'>
                  <FaHeart className='mx-auto mb-4 h-16 w-16 text-[#b5755c]/30' />
                  <p className='text-lg text-[#b5755c]/70'>
                    {i18n.language === 'tr'
                      ? 'Henüz favori ürününüz yok'
                      : "You don't have any favorite products yet"}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
