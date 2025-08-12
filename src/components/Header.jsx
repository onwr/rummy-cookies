import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  HiOutlineTruck, 
  HiOutlineHeart, 
  HiOutlineUser, 
  HiOutlineShoppingBag, 
  HiOutlineSearch,
  HiOutlineGlobe,
  HiOutlineMenu,
  HiOutlineX
} from 'react-icons/hi'
import { FaCircle } from 'react-icons/fa'

const Header = () => {
  const { t, i18n } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="w-full shadow-sm">
      {/* Utility Bar */}
      <div className="bg-gradient-to-r from-[#fee2ba] to-[#fef3e2] border-b border-[#b5755c]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            {/* Left side - Delivery info */}
            <div className="flex items-center space-x-2">
              <HiOutlineTruck className="w-4 h-4 text-[#b5755c]/70" />
              <span className="font-medium text-xs sm:text-sm">{t('header.utility.delivery')}</span>
            </div>
            
            {/* Right side - Links and language */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="hidden sm:flex items-center space-x-4">
                <a href="#" className="hover:text-[#b5755c] transition-colors duration-200 font-medium text-xs sm:text-sm">{t('header.utility.about')}</a>
                <a href="#" className="hover:text-[#b5755c] transition-colors duration-200 font-medium text-xs sm:text-sm">{t('header.utility.support')}</a>
                <span className="font-semibold text-xs sm:text-sm">{t('header.utility.phone')}</span>
              </div>
              
              {/* Language Switcher */}
              <div className="flex items-center space-x-2">
                <HiOutlineGlobe className="w-4 h-4 text-[#b5755c]/70" />
                <button
                  onClick={() => changeLanguage('tr')}
                  className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    i18n.language === 'tr' 
                      ? 'bg-[#b5755c] text-white shadow-md' 
                      : 'hover:bg-[#b5755c]/10 hover:text-[#b5755c]'
                  }`}
                >
                  TR
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    i18n.language === 'en' 
                      ? 'bg-[#b5755c] text-white shadow-md' 
                      : 'hover:bg-[#b5755c]/10 hover:text-[#b5755c]'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-[#b5755c]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              <div className="flex items-center">
                <img src="/logo.png" alt="RumyCookie" className="h-12 w-auto sm:h-16 md:h-20 drop-shadow-sm" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#b5755c] font-bold mb-1">RumyCookie</h1>
                <span className="text-[#b5755c]/60 text-xs sm:text-sm font-medium">{t('header.logo.subtitle')}</span>
              </div>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-10">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={t('header.search.placeholder')}
                  className="w-full px-5 py-4 pl-14 bg-white/80 border border-[#b5755c]/15 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#b5755c]/20 focus:border-transparent placeholder-[#b5755c]/50 shadow-sm hover:shadow-md transition-all duration-200"
                />
                <HiOutlineSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#b5755c]/50" />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="p-2 sm:p-3 hover:bg-[#fee2ba]/50 rounded-full transition-all duration-200 hover:scale-110">
                <HiOutlineHeart className="w-5 h-5 sm:w-6 sm:h-6 text-[#b5755c]" />
              </button>
              <button className="p-2 sm:p-3 hover:bg-[#fee2ba]/50 rounded-full transition-all duration-200 hover:scale-110">
                <HiOutlineUser className="w-5 h-5 sm:w-6 sm:h-6 text-[#b5755c]" />
              </button>
              <button className="p-2 sm:p-3 hover:bg-[#fee2ba]/50 rounded-full transition-all duration-200 hover:scale-110 relative">
                <HiOutlineShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-[#b5755c]" />
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2">
                  <FaCircle className="w-4 h-4 sm:w-6 sm:h-6 text-[#b5755c]" />
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold">0</span>
                </div>
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 hover:bg-[#fee2ba]/50 rounded-full transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <HiOutlineX className="w-6 h-6 text-[#b5755c]" />
                ) : (
                  <HiOutlineMenu className="w-6 h-6 text-[#b5755c]" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder={t('header.search.placeholder')}
                className="w-full px-4 py-3 pl-12 bg-white/80 border border-[#b5755c]/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b5755c]/20 focus:border-transparent placeholder-[#b5755c]/50 shadow-sm"
              />
              <HiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#b5755c]/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm border-b border-[#b5755c]/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12 py-5">
            <a href="#" className="text-[#b5755c]/70 font-medium hover:text-[#b5755c] transition-colors duration-200">
              Anasayfa
            </a>
            <a href="#" className="text-[#b5755c]/70 font-medium hover:text-[#b5755c] transition-colors duration-200">
              Kurumsal
            </a>
            <a href="#" className="text-[#b5755c]/70 font-medium hover:text-[#b5755c] transition-colors duration-200">
              Galeri
            </a>
            <a href="#" className="text-[#b5755c]/70 font-medium hover:text-[#b5755c] transition-colors duration-200">
              Yorumlarımız
            </a>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="py-4 space-y-3">
              <a href="#" className="block py-2 text-[#b5755c]/70 hover:text-[#b5755c] transition-colors duration-200 font-medium">
                Anasayfa
              </a>
              <a href="#" className="block py-2 text-[#b5755c]/70 hover:text-[#b5755c] transition-colors duration-200 font-medium">
                Kurumsal
              </a>
              <a href="#" className="block py-2 text-[#b5755c]/70 hover:text-[#b5755c] transition-colors duration-200 font-medium">
                Galeri
              </a>
              <a href="#" className="block py-2 text-[#b5755c]/70 hover:text-[#b5755c] transition-colors duration-200 font-medium">
                Yorumlarımız
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header