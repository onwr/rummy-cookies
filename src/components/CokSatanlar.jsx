import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaHeart, FaStar, FaFire } from 'react-icons/fa';
import { productAPI, cartAPI, wishlistAPI } from '../services/api';

const CokSatanlar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [bestSellers, setBestSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Çok satan ürünleri API'den çek
  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await productAPI.getBestsellers({
          language: i18n.language,
          limit: 5,
        });
        setBestSellers(response.data?.products || []);
      } catch (err) {
        console.error('Çok satanlar yüklenirken hata:', err);
        setError('Çok satanlar yüklenemedi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestSellers();
  }, [i18n.language]);

  const addToCart = async (productId) => {
    try {
      const response = await cartAPI.add({ product_id: productId, quantity: 1 });
      if (response.success) {
        console.log('Ürün sepete eklendi');
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      }
    } catch (error) {
      console.error('Sepete eklenirken hata:', error);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const response = await wishlistAPI.add({ product_id: productId });
      if (response.success) {
        console.log('Ürün favorilere eklendi');
        setBestSellers((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? { ...product, isInWishlist: true } : product
          )
        );
      }
    } catch (error) {
      console.error('Favorilere eklenirken hata:', error);
    }
  };

  const goToProductDetail = (productId) => {
    navigate(`/urun/${productId}`);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  // Loading state
  if (isLoading) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='bg-white pt-16'
        id='cok-satanlar'
      >
        <div className='mx-auto max-w-7xl px-6'>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='mb-12 text-center'
          >
            <div className='mb-4 flex items-center justify-center space-x-3'>
              <FaFire className='h-8 w-8 text-red-500' />
              <h2 className='font-serif text-4xl font-bold text-[#b5755c]'>
                {i18n.language === 'tr' ? 'Haftanın Çok Satanları' : "This Week's Best Sellers"}
              </h2>
              <FaFire className='h-8 w-8 text-red-500' />
            </div>
            <p className='mx-auto max-w-2xl text-lg text-[#b5755c]/80'>
              {i18n.language === 'tr'
                ? 'En çok tercih edilen ve en yüksek puan alan kurabiye setlerimizi keşfedin'
                : 'Discover our most preferred and highest-rated cookie sets'}
            </p>
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='flex items-center justify-center py-20'
          >
            <div className='h-16 w-16 animate-spin rounded-full border-b-2 border-[#b5755c]'></div>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='bg-white pt-16'
        id='cok-satanlar'
      >
        <div className='mx-auto max-w-7xl px-6'>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='mb-12 text-center'
          >
            <div className='mb-4 flex items-center justify-center space-x-3'>
              <FaFire className='h-8 w-8 text-red-500' />
              <h2 className='font-serif text-4xl font-bold text-[#b5755c]'>
                {i18n.language === 'tr' ? 'Haftanın Çok Satanları' : "This Week's Best Sellers"}
              </h2>
              <FaFire className='h-8 w-8 text-red-500' />
            </div>
            <p className='mx-auto max-w-2xl text-lg text-[#b5755c]/80'>
              {i18n.language === 'tr'
                ? 'En çok tercih edilen ve en yüksek puan alan kurabiye setlerimizi keşfedin'
                : 'Discover our most preferred and highest-rated cookie sets'}
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='py-20 text-center'
          >
            <p className='text-lg text-red-500'>{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className='mt-4 rounded-lg bg-[#b5755c] px-6 py-2 text-white transition-colors hover:bg-[#a0654c]'
            >
              Tekrar Dene
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='bg-white pt-16'
      id='cok-satanlar'
    >
      <div className='mx-auto max-w-7xl px-6'>
        {/* Section Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='mb-12 text-center'
        >
          <div className='mb-4 flex items-center justify-center space-x-3'>
            <FaFire className='h-8 w-8 text-red-500' />
            <h2 className='font-serif text-4xl font-bold text-[#b5755c]'>
              {i18n.language === 'tr' ? 'Haftanın Çok Satanları' : "This Week's Best Sellers"}
            </h2>
            <FaFire className='h-8 w-8 text-red-500' />
          </div>
          <p className='mx-auto max-w-2xl text-lg text-[#b5755c]/80'>
            {i18n.language === 'tr'
              ? 'En çok tercih edilen ve en yüksek puan alan kurabiye setlerimizi keşfedin'
              : 'Discover our most preferred and highest-rated cookie sets'}
          </p>
        </motion.div>

        {/* Best Sellers Grid */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
          {Array.isArray(bestSellers) && bestSellers.length > 0 ? (
            bestSellers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + index * 0.1,
                  ease: 'easeOut',
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className='group relative overflow-hidden rounded-2xl border border-[#b5755c]/5 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl'
              >
                {/* Hot Badge */}
                <div className='absolute top-3 left-3 z-20'>
                  <span className='rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg'>
                    {product.badges && product.badges.includes('bestseller')
                      ? i18n.language === 'tr'
                        ? 'Çok Satan'
                        : 'Best Seller'
                      : product.badges && product.badges.includes('popular')
                        ? i18n.language === 'tr'
                          ? 'Popüler'
                          : 'Popular'
                        : product.badges && product.badges.includes('new')
                          ? i18n.language === 'tr'
                            ? 'Yeni'
                            : 'New'
                          : product.badges && product.badges.includes('favorite')
                            ? i18n.language === 'tr'
                              ? 'Favori'
                              : 'Favorite'
                            : i18n.language === 'tr'
                              ? 'Özel'
                              : 'Special'}
                  </span>
                </div>

                {/* Wishlist Button */}
                <div className='absolute top-3 right-3 z-20'>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWishlist(product.id);
                    }}
                    className='flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-lg transition-colors duration-200 hover:bg-[#fee2ba]'
                  >
                    <FaHeart className='h-4 w-4 text-[#b5755c]' />
                  </motion.button>
                </div>

                {/* Product Image */}
                <div
                  className='relative h-48 cursor-pointer overflow-hidden'
                  onClick={() => goToProductDetail(product.id)}
                >
                  <img
                    src={product.primary_image || '/images/urun1.jfif'}
                    alt={product.name}
                    className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110'
                    onError={(e) => {
                      e.target.src = '/images/urun1.jfif';
                    }}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                </div>

                {/* Product Info */}
                <div className='p-4'>
                  {/* Category */}
                  <div className='mb-2'>
                    <span className='text-xs font-medium tracking-wide text-[#b5755c]/60 uppercase'>
                      {product.category_name || 'Kurabiye'}
                    </span>
                  </div>

                  {/* Product Name */}
                  <motion.h3
                    whileHover={{ scale: 1.02 }}
                    className='mb-2 line-clamp-2 cursor-pointer text-sm leading-tight font-bold text-[#b5755c] transition-colors hover:text-[#b5755c]/80'
                    onClick={() => goToProductDetail(product.id)}
                  >
                    {product.name}
                  </motion.h3>

                  {/* Rating */}
                  <div className='mb-2 flex items-center space-x-1'>
                    {renderStars(4.8)}
                    <span className='ml-1 text-xs text-[#b5755c]/70'>
                      {i18n.language === 'tr' ? 'Değerlendirme' : 'Rating'}
                    </span>
                  </div>

                  {/* Stock Status */}
                  <div className='mb-3'>
                    <span
                      className={`text-xs font-medium ${
                        product.stock > 10
                          ? 'text-green-600'
                          : product.stock > 0
                            ? 'text-orange-600'
                            : 'text-red-600'
                      }`}
                    >
                      {product.stock > 10
                        ? i18n.language === 'tr'
                          ? 'Stokta'
                          : 'In Stock'
                        : product.stock > 0
                          ? i18n.language === 'tr'
                            ? 'Son ' + product.stock + ' adet'
                            : 'Last ' + product.stock + ' items'
                          : i18n.language === 'tr'
                            ? 'Stokta yok'
                            : 'Out of Stock'}
                    </span>
                  </div>

                  {/* Price */}
                  <div className='mb-3 flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                      <span className='text-lg font-bold text-[#b5755c]'>₺{product.price}</span>
                      {product.sale_price && product.sale_price < product.price && (
                        <span className='text-sm text-gray-400 line-through'>
                          ₺{product.sale_price}
                        </span>
                      )}
                    </div>
                    {product.sale_price && product.sale_price < product.price && (
                      <span className='rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-500'>
                        -{Math.round(((product.price - product.sale_price) / product.price) * 100)}%
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product.id)}
                    className='flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-[#b5755c] to-[#b5755c]/90 px-3 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 group-hover:scale-105 hover:from-[#b5755c]/90 hover:to-[#b5755c] hover:shadow-xl'
                  >
                    <FaShoppingCart className='h-3 w-3' />
                    <span>{i18n.language === 'tr' ? 'Sepete Ekle' : 'Add to Cart'}</span>
                  </motion.button>
                </div>

                {/* Hover Effect Overlay */}
                <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-[#b5755c]/5 to-[#d4a574]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className='col-span-full py-20 text-center'
            >
              <p className='text-lg text-[#b5755c]'>
                {i18n.language === 'tr'
                  ? 'Henüz çok satan ürün bulunmuyor'
                  : 'No bestseller products yet'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default CokSatanlar;
