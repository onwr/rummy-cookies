import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaHeart, FaStar, FaFilter, FaSearch } from 'react-icons/fa';
import { productAPI, cartAPI, wishlistAPI } from '../services/api';

const Products = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [userCountry, setUserCountry] = useState('TR');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // IP tabanlı ülke tespiti
  useEffect(() => {
    const detectUserCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setUserCountry(data.country_code || 'TR');
      } catch (error) {
        console.log('IP detection failed, using default country:', error);
        setUserCountry('TR');
      }
    };

    detectUserCountry();
  }, []);

  // Ürünleri API'den çek
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await productAPI.getAll({
          language: i18n.language,
          ...(selectedCategory && { category_id: selectedCategory }),
          ...(searchTerm && { search: searchTerm }),
          sort: sortBy,
          order: sortOrder,
          page: currentPage,
          limit: 12,
        });

        setProducts(response.data?.products || []);
        setFilteredProducts(response.data?.products || []);
        setTotalPages(response.data?.pagination?.total_pages || 1);
        setTotalProducts(response.data?.pagination?.total_products || 0);
      } catch (err) {
        console.error('Ürünler yüklenirken hata:', err);
        setError(err.message || 'Ürünler yüklenemedi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [i18n.language, selectedCategory, searchTerm, sortBy, sortOrder, currentPage]);

  // Türkiye ve yurtdışı için farklı fiyatlar
  const getProductPrice = (product) => {
    if (userCountry === 'TR') {
      return {
        price: `${product.price} ₺`,
        currency: '₺',
        originalPrice:
          product.sale_price && product.sale_price < product.price
            ? `${product.sale_price} ₺`
            : null,
        discount:
          product.sale_price && product.sale_price < product.price
            ? Math.round(((product.price - product.sale_price) / product.price) * 100)
            : null,
      };
    } else {
      // USD dönüşümü (basit hesaplama)
      const usdPrice = Math.round((product.price / 30) * 100) / 100;
      const usdSalePrice = product.sale_price
        ? Math.round((product.sale_price / 30) * 100) / 100
        : null;

      return {
        price: `$${usdPrice}`,
        currency: '$',
        originalPrice: usdSalePrice && usdSalePrice < usdPrice ? `$${usdSalePrice}` : null,
        discount:
          usdSalePrice && usdSalePrice < usdPrice
            ? Math.round(((usdPrice - usdSalePrice) / usdPrice) * 100)
            : null,
      };
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await cartAPI.add({ product_id: productId, quantity: 1 });
      if (response.success) {
        // Başarılı mesajı göster
        console.log('Ürün sepete eklendi');
        // Sepet sayısını güncelle (Header'da)
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
        // Favori durumunu güncelle
        setProducts((prevProducts) =>
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

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(newSortBy);
      setSortOrder('DESC');
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Sadece component'in başına scroll yap, sayfanın en üstüne değil
    const productsSection = document.querySelector('[data-products-section]');
    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  };

  // Loading state
  if (isLoading && products.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='bg-gradient-to-b from-white to-[#fee2ba]/10 py-16'
      >
        <div className='mx-auto max-w-7xl px-6'>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='text-center'
          >
            <h2 className='mb-8 font-serif text-5xl text-[#b5755c]'>{t('products.title')}</h2>
            <p className='mx-auto max-w-3xl text-xl leading-relaxed text-[#b5755c]'>
              {t('products.subtitle')}
            </p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='mt-12 flex items-center justify-center'
            >
              <div className='h-16 w-16 animate-spin rounded-full border-b-2 border-[#b5755c]'></div>
            </motion.div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='mt-4 text-[#b5755c]/70'
            >
              {i18n.language === 'tr' ? 'Ürünler yükleniyor...' : 'Loading products...'}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  // Error state
  if (error && products.length === 0) {
    return (
      <section className='bg-gradient-to-b from-white to-[#fee2ba]/10 py-16'>
        <div className='mx-auto max-w-7xl px-6'>
          <div className='text-center'>
            <h2 className='mb-8 font-serif text-5xl text-[#b5755c]'>{t('products.title')}</h2>
            <p className='mx-auto max-w-3xl text-xl leading-relaxed text-[#b5755c]'>
              {t('products.subtitle')}
            </p>
            <div className='mt-8 py-20 text-center'>
              <p className='text-lg text-red-500'>{error}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className='mt-4 rounded-lg bg-[#b5755c] px-6 py-2 text-white transition-colors hover:bg-[#a0654c]'
              >
                Tekrar Dene
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      data-products-section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='bg-gradient-to-b from-white to-[#fee2ba]/10 py-16'
    >
      <div className='mx-auto max-w-7xl px-6'>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='mb-20 text-center'
        >
          <h2 className='mb-8 font-serif text-5xl text-[#b5755c]'>{t('products.title')}</h2>
          <p className='mx-auto max-w-3xl text-xl leading-relaxed text-[#b5755c]'>
            {t('products.subtitle')}
          </p>

          {/* Kargo Bilgisi */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mt-6 inline-flex items-center space-x-2 rounded-full bg-[#fee2ba] px-4 py-2'
          >
            <span className='text-sm font-medium text-[#b5755c]'>
              {userCountry === 'TR' ? t('products.shipping.free') : t('products.shipping.paid')}
            </span>
            {userCountry === 'TR' && <span className='text-xs text-[#b5755c]/70'>🇹🇷 Türkiye</span>}
            {userCountry !== 'TR' && (
              <span className='text-xs text-[#b5755c]/70'>🌍 International</span>
            )}
          </motion.div>
        </motion.div>

        {/* Filtreler ve Arama */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='mb-12 flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0'
        >
          {/* Arama */}
          <form onSubmit={handleSearch} className='max-w-md flex-1'>
            <div className='relative'>
              <input
                type='text'
                placeholder={i18n.language === 'tr' ? 'Ürün ara...' : 'Search products...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full rounded-lg border border-[#b5755c]/20 bg-white px-4 py-2 pr-10 text-[#b5755c] placeholder-[#b5755c]/50 focus:border-[#b5755c] focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
              />
              <button
                type='submit'
                className='absolute top-1/2 right-2 -translate-y-1/2 text-[#b5755c] hover:text-[#b5755c]/80'
              >
                <FaSearch className='h-4 w-4' />
              </button>
            </div>
          </form>

          {/* Sıralama */}
          <div className='flex items-center space-x-4'>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('-');
                setSortBy(newSortBy);
                setSortOrder(newSortOrder);
              }}
              className='rounded-lg border border-[#b5755c]/20 bg-white px-3 py-2 text-[#b5755c] focus:border-[#b5755c] focus:outline-none'
            >
              <option value='created_at-DESC'>
                {i18n.language === 'tr' ? 'En Yeni' : 'Newest'}
              </option>
              <option value='price-ASC'>
                {i18n.language === 'tr' ? 'Fiyat: Düşükten Yükseğe' : 'Price: Low to High'}
              </option>
              <option value='price-DESC'>
                {i18n.language === 'tr' ? 'Fiyat: Yüksekten Düşüğe' : 'Price: High to Low'}
              </option>
              <option value='name-ASC'>{i18n.language === 'tr' ? 'İsim: A-Z' : 'Name: A-Z'}</option>
            </select>
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product, index) => {
              const priceInfo = getProductPrice(product);

              return (
                <motion.div
                  key={product.id}
                  initial={{ y: 50, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 1 + index * 0.1,
                    ease: 'easeOut',
                  }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 },
                  }}
                  className='group overflow-hidden rounded-3xl border border-[#b5755c]/5 bg-white shadow-lg transition-all duration-500 hover:shadow-2xl'
                >
                  {/* Product Image */}
                  <div
                    className='relative h-64 cursor-pointer overflow-hidden'
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

                    {/* Badge */}
                    <div className='absolute top-4 left-4'>
                      <span className='rounded-full bg-gradient-to-r from-[#b5755c] to-[#b5755c]/80 px-3 py-2 text-xs font-semibold text-white shadow-lg'>
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
                    <div className='absolute top-4 right-4'>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToWishlist(product.id);
                        }}
                        className='flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg transition-colors duration-200 hover:bg-[#fee2ba]'
                      >
                        <FaHeart className='h-5 w-5 text-[#b5755c]' />
                      </motion.button>
                    </div>

                    {/* Discount Badge */}
                    {priceInfo.discount && (
                      <div className='absolute bottom-4 left-4'>
                        <span className='rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg'>
                          -{priceInfo.discount}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className='p-6'>
                    {/* Category */}
                    <div className='mb-2'>
                      <span className='text-xs font-medium tracking-wide text-[#b5755c]/60 uppercase'>
                        {product.category_name || 'Kurabiye'}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className='mb-3 flex items-center'>
                      <div className='flex items-center space-x-1'>{renderStars(4.8)}</div>
                      <span className='ml-2 text-sm text-[#b5755c]/80'>
                        {i18n.language === 'tr' ? 'Değerlendirme' : 'Rating'}
                      </span>
                    </div>

                    {/* Product Name */}
                    <motion.h3
                      whileHover={{ scale: 1.02 }}
                      className='mb-3 cursor-pointer text-lg leading-tight font-bold text-[#b5755c] transition-colors hover:text-[#b5755c]/80'
                      onClick={() => goToProductDetail(product.id)}
                    >
                      {product.name}
                    </motion.h3>

                    {/* Price and Stock */}
                    <div className='mb-4 flex items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <p className='text-2xl font-bold text-[#b5755c]'>{priceInfo.price}</p>
                        {priceInfo.originalPrice && (
                          <span className='text-sm text-gray-400 line-through'>
                            {priceInfo.originalPrice}
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-sm font-medium ${
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

                    {/* Add to Cart Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(product.id)}
                      disabled={product.stock === 0}
                      className={`flex w-full items-center justify-center space-x-2 rounded-xl px-4 py-3 font-semibold text-white shadow-lg transition-all duration-200 ${
                        product.stock === 0
                          ? 'cursor-not-allowed bg-gray-400'
                          : 'bg-gradient-to-r from-[#b5755c] to-[#b5755c]/90 group-hover:scale-105 hover:from-[#b5755c]/90 hover:to-[#b5755c] hover:shadow-xl'
                      }`}
                    >
                      <FaShoppingCart className='h-4 w-4' />
                      <span>
                        {product.stock === 0
                          ? i18n.language === 'tr'
                            ? 'Stokta Yok'
                            : 'Out of Stock'
                          : i18n.language === 'tr'
                            ? 'Sepete Ekle'
                            : 'Add to Cart'}
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className='col-span-full py-20 text-center'
            >
              <p className='text-lg text-[#b5755c]'>
                {i18n.language === 'tr' ? 'Ürün bulunamadı' : 'No products found'}
              </p>
            </motion.div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className='mt-16 flex justify-center'
          >
            <div className='flex items-center space-x-2'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? 'cursor-not-allowed bg-gray-200 text-gray-500'
                    : 'bg-[#b5755c] text-white hover:bg-[#a0654c]'
                }`}
              >
                {i18n.language === 'tr' ? 'Önceki' : 'Previous'}
              </motion.button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;

                return (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(page)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#b5755c] text-white'
                        : 'border border-[#b5755c]/20 bg-white text-[#b5755c] hover:bg-[#b5755c]/10'
                    }`}
                  >
                    {page}
                  </motion.button>
                );
              })}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? 'cursor-not-allowed bg-gray-200 text-gray-500'
                    : 'bg-[#b5755c] text-white hover:bg-[#a0654c]'
                }`}
              >
                {i18n.language === 'tr' ? 'Sonraki' : 'Next'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Products;
