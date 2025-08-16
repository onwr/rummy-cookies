import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Products from '../components/Products';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import CokSatanlar from '../components/CokSatanlar';

const Home = () => {
  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <Hero />
      <Categories />
      <CokSatanlar />
      <Products />
      <Footer />
    </div>
  );
};

export default Home;
