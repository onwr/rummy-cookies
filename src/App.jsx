import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import CustomOrder from './pages/CustomOrder';
import SSS from './pages/SSS';
import Galeri from './pages/Galeri';
import ProductDetail from './pages/ProductDetail';
import CategoryDetail from './pages/CategoryDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1 saniye sonra yükleniyor ekranını kapat
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Yükleniyor ekranı
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#fee2ba] via-white to-[#fef3e2]'
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className='text-center'
        >
          {/* Logo */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='mb-6'
          >
            <img src='/logo.png' alt='RumyCookie' className='mx-auto h-24 w-auto drop-shadow-lg' />
          </motion.div>

          {/* Loading spinner */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className='flex justify-center'
          >
            <div className='relative'>
              <div className='h-12 w-12 rounded-full border-4 border-[#b5755c]/20'></div>
              <motion.div
                className='absolute top-0 left-0 h-12 w-12 rounded-full border-4 border-transparent border-t-[#b5755c]'
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key='app'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/hakkimizda' element={<About />} />
            <Route path='/ozel-siparis' element={<CustomOrder />} />
            <Route path='/sss' element={<SSS />} />
            <Route path='/galeri' element={<Galeri />} />
            <Route path='/urun/:id' element={<ProductDetail />} />
            <Route path='/kategori/:id' element={<CategoryDetail />} />
            <Route path='/giris' element={<Login />} />
            <Route path='/kayit' element={<Register />} />
            <Route path='/sepet' element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
