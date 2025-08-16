import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { categoryAPI } from '../services/api';

const Categories = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Kategorileri API'den çek
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await categoryAPI.getAll({ language: i18n.language });
        // API'den dönen veri yapısına göre categories array'ini al
        setCategories(response.data?.categories || []);
      } catch (err) {
        console.error('Kategoriler yüklenirken hata:', err);
        setError('Kategoriler yüklenemedi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [i18n.language]);

  // Loading state
  if (isLoading) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='relative bg-white pt-24'
        id='kategori'
      >
        <div className='relative z-10 mx-auto max-w-7xl px-6'>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='mb-20 text-center'
          >
            <h2 className='mb-8 font-serif text-5xl text-[#b5755c]'>{t('categories.title')}</h2>
            <p className='mx-auto max-w-3xl text-xl leading-relaxed text-[#b5755c]'>
              {t('categories.subtitle')}
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
        className='relative bg-white pt-24'
        id='kategori'
      >
        <div className='relative z-10 mx-auto max-w-7xl px-6'>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='mb-20 text-center'
          >
            <h2 className='mb-8 font-serif text-5xl text-[#b5755c]'>{t('categories.title')}</h2>
            <p className='mx-auto max-w-3xl text-xl leading-relaxed text-[#b5755c]'>
              {t('categories.subtitle')}
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

  const handleCategoryClick = (categoryId) => {
    // Kategori detay sayfasına yönlendirme
    navigate(`/kategori/${categoryId}`);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='relative bg-white pt-24'
      id='kategori'
    >
      {/* Arkaplan Resmi */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className='absolute inset-0 z-0'
      >
        <img
          src='/images/arkaplan3.jpg'
          alt={t('categories.background')}
          className='h-full w-full object-cover opacity-10'
        />
        <div className='absolute inset-0 bg-gradient-to-br from-white/90 to-white/70'></div>
      </motion.div>

      <div className='relative z-10 mx-auto max-w-7xl px-6'>
        {/* Section Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className='mb-20 text-center'
        >
          <h2 className='mb-8 font-serif text-5xl text-[#b5755c]'>{t('categories.title')}</h2>
          <p className='mx-auto max-w-3xl text-xl leading-relaxed text-[#b5755c]'>
            {t('categories.subtitle')}
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.8 + index * 0.1,
                  ease: 'easeOut',
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                onClick={() => handleCategoryClick(category.id)}
                className='group transform cursor-pointer transition-all duration-500 hover:scale-105'
              >
                <div className='relative overflow-hidden rounded-3xl bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-500 hover:bg-white/90 hover:shadow-2xl'>
                  {/* Background Image */}
                  <div className='absolute inset-0'>
                    <img
                      src={category.image}
                      alt={category.name}
                      className='h-full w-full scale-125 object-cover transition-transform duration-700 group-hover:scale-110'
                    />
                    <div className='absolute inset-0 bg-gradient-to-br from-black/30 to-black/50'></div>
                  </div>

                  {/* Content Overlay */}
                  <div className='relative z-20 flex h-72 flex-col items-center justify-center p-6 text-white'>
                    {/* Category Name */}
                    <motion.h3
                      whileHover={{ scale: 1.05 }}
                      className='mb-3 text-center text-2xl font-bold tracking-wide text-white drop-shadow-lg transition-all duration-300 group-hover:text-yellow-200'
                    >
                      {category.name}
                    </motion.h3>

                    {/* Product Count */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className='rounded-full bg-white/20 px-6 py-2 backdrop-blur-sm'
                    >
                      <p className='text-center text-sm font-medium text-white'>
                        {category.product_count || 0} {t('products.unit')}
                      </p>
                    </motion.div>

                    {/* Category Description */}
                    <p className='mt-3 max-w-[220px] text-center text-sm leading-relaxed text-white/90'>
                      {category.description}
                    </p>
                  </div>

                  {/* Soft Color Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color || 'from-gray-100/80 to-gray-200/80'} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  ></div>

                  {/* Border Glow Effect */}
                  <div className='absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-br from-[#b5755c]/30 to-[#d4a574]/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100'></div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className='col-span-full py-20 text-center'
            >
              <p className='text-lg text-[#b5755c]'>Henüz kategori bulunmuyor</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default Categories;
