import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'

const Hero = () => {
  const { t } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      image: "/images/arkaplan.png",
      alt: "El yapımı kurabiyeler"
    },
    {
      id: 2,
      image: "/images/arkaplan2.avif", 
      alt: "Özel tasarım kurabiyeler"
    },
    {
      id: 3,
      image: "/images/arkaplan3.jpg",
      alt: "Doğum günü kurabiyeleri"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 15000) // 15 saniyede bir değişir

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="w-full"
    >
      {/* Hero Banner with Carousel */}
      <div className="relative bg-gradient-to-br from-[#fee2ba]/40 via-white to-[#fef3e2]/40 py-24 overflow-hidden">
        {/* Carousel Background */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            {slides.map((slide, index) => (
              index === currentSlide && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 bg-black/20"></div>
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full blur opacity-25 object-cover"
                  />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Carousel Controls */}
        <motion.button
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#b5755c] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <HiOutlineChevronLeft className="w-6 h-6" />
        </motion.button>
        
        <motion.button
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#b5755c] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <HiOutlineChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Carousel Indicators */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3"
        >
          {slides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-[#b5755c] scale-125' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
            />
          ))}
        </motion.div>

        {/* Content - Fixed and unchanged */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-serif text-white mb-8 leading-tight"
            >
              {t('hero.title.main')}<br />
              <motion.span 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
                className="text-[#b5755c] font-light"
              >
                {t('hero.title.sub')}
              </motion.span>
            </motion.h1>
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
              className="text-xl md:text-2xl text-[#b5755c] font-light mb-10 max-w-4xl mx-auto leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#b5755c] to-[#b5755c]/90 text-white px-12 py-5 rounded-full font-semibold hover:from-[#b5755c]/90 hover:to-[#b5755c] transition-all duration-300 shadow-xl hover:shadow-2xl text-lg"
            >
              {t('hero.cta.explore')}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-[#b5755c] text-[#b5755c] px-12 py-5 rounded-full font-semibold hover:bg-[#b5755c] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              {t('hero.cta.customOrder')}
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.6 }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#b5755c]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🍪</span>
              </div>
              <h3 className="text-lg font-semibold text-[#b5755c] mb-1">{t('hero.trust.handmade')}</h3>
              <p className="text-sm text-[#b5755c]/70">{t('hero.trust.handmade.desc')}</p>
            </motion.div>

            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.8 }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#b5755c]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-lg font-semibold text-[#b5755c] mb-1">{t('hero.trust.delivery')}</h3>
              <p className="text-sm text-[#b5755c]/70">{t('hero.trust.delivery.desc')}</p>
            </motion.div>

            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 3 }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#b5755c]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-lg font-semibold text-[#b5755c] mb-1">{t('hero.trust.satisfaction')}</h3>
              <p className="text-sm text-[#b5755c]/70">{t('hero.trust.satisfaction.desc')}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Hero