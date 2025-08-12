import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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
    }, 15000    ) // 5 saniyede bir değişir

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full">
      {/* Hero Banner with Carousel */}
      <div className="relative bg-gradient-to-br from-[#fee2ba]/40 via-white to-[#fef3e2]/40 py-24 overflow-hidden">
        {/* Carousel Background */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full blur opacity-25 object-cover"
              />
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#b5755c] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        >
          <HiOutlineChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#b5755c] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        >
          <HiOutlineChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-[#b5755c] scale-125' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Content - Fixed and unchanged */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-8xl font-serif text-white mb-8 leading-tight">
              {t('hero.title.main')}<br />
              <span className="text-[#b5755c] font-light">{t('hero.title.sub')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#b5755c] font-light mb-10 max-w-4xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
            <button className="bg-gradient-to-r from-[#b5755c] to-[#b5755c]/90 text-white px-12 py-5 rounded-full font-semibold hover:from-[#b5755c]/90 hover:to-[#b5755c] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg">
              {t('hero.cta.explore')}
            </button>
            <button className="border-2 border-[#b5755c] text-[#b5755c] px-12 py-5 rounded-full font-semibold hover:bg-[#b5755c] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
              {t('hero.cta.customOrder')}
            </button>
          </div>

         
        </div>
      </div>
    </section>
  )
}

export default Hero