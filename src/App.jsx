import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import CustomOrder from './pages/CustomOrder';
import SSS from './pages/SSS';
import Galeri from './pages/Galeri';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/hakkimizda' element={<About />} />
      <Route path='/ozel-siparis' element={<CustomOrder />} />
      <Route path='/sss' element={<SSS />} />
      <Route path='/galeri' element={<Galeri />} />
    </Routes>
  </BrowserRouter>
);

export default App;
