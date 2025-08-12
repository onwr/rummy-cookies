import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  HiOutlineTruck, 
  HiOutlineHeart, 
  HiOutlineUser, 
  HiOutlineShoppingBag, 
  HiOutlineSearch,
  HiOutlineGlobe,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineChevronDown,
  HiOutlineCake,
  HiOutlineHome,
  HiOutlineFire,
  HiOutlineStar,
  HiOutlineHeart as HiOutlineValentine,
  HiOutlineOfficeBuilding
} from 'react-icons/hi'
import { FaCircle } from 'react-icons/fa'

const Header = () => {
  const { t, i18n } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const dropdownRef = useRef(null)

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const categories = [
    {
      name: 'Doğum Günü',
      icon: <HiOutlineCake className="w-5 h-5" />,
      subcategories: ['Çocuk Doğum Günü', 'Yetişkin Doğum Günü', 'Doğum Günü Paketi']
    },
    {
      name: 'Baby Shower',
      icon: <HiOutlineHome className="w-5 h-5" />,
      subcategories: ['Bebek Arabası', 'Bebek Çıngırağı', 'Baby Shower Seti']
    },
    {
      name: 'Halloween',
      icon: <HiOutlineFire className="w-5 h-5" />,
      subcategories: ['Cadı Kurabiyesi', 'Balkabağı', 'Korkunç Set']
    },
    {
      name: 'Yılbaşı',
      icon: <HiOutlineStar className="w-5 h-5" />,
      subcategories: ['Noel Ağacı', 'Hediye Paketi', 'Yılbaşı Seti']
    },
    {
      name: 'Sevgililer Günü',
      icon: <HiOutlineValentine className="w-5 h-5" />,
      subcategories: ['Kalp Kurabiyesi', 'Romantik Set', 'Özel Tasarım']
    },
    {
      name: 'Kurumsal',
      icon: <HiOutlineOfficeBuilding className="w-5 h-5" />,
      subcategories: ['Şirket Logosu', 'Kurumsal Hediye', 'Toplantı Seti']
    }
  ]

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
                <span className="text-[#b5755c]/80 text-xs sm:text-sm font-medium">{t('header.logo.subtitle')}</span>
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

      {/* Navigation with Categories */}
      <nav className="bg-white border-b border-[#b5755c]/5 shadow-lg relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 py-5">
            <a href="/" className="text-[#b5755c]/80 font-medium hover:text-[#b5755c] transition-colors duration-200">
              {t('header.nav.home')}
            </a>
            
            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => toggleDropdown('categories')}
                className="flex items-center space-x-1 text-[#b5755c]/80 font-medium hover:text-[#b5755c] transition-colors duration-200"
              >
                <span>{t('header.nav.categories')}</span>
                <HiOutlineChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'categories' ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Categories Menu */}
              <div className={`absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-[#b5755c]/20 transition-all duration-300 transform ${
                activeDropdown === 'categories' 
                  ? 'opacity-100 visible translate-y-0' 
                  : 'opacity-0 invisible translate-y-2'
              } z-[99999]`}>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <div key={category.name} className="group/item">
                        <div className="flex items-center space-x-2 p-3 rounded-xl hover:bg-[#fee2ba]/50 transition-colors duration-200 cursor-pointer">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#fee2ba] to-[#b5755c] rounded-lg flex items-center justify-center text-white text-sm font-bold">
                            {category.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#b5755c] text-sm">{category.name}</h4>
                            <p className="text-xs text-[#b5755c]/60">{category.subcategories.length} {t('header.nav.products')}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <a href="/hakkimizda" className="text-[#b5755c]/80 font-medium hover:text-[#b5755c] transition-colors duration-200">
              {t('header.nav.about')}
            </a>
            <a href="/ozel-siparis" className="text-[#b5755c]/80 font-medium hover:text-[#b5755c] transition-colors duration-200">
              {t('header.nav.customOrder')}
            </a>
            <a href="/galeri" className="text-[#b5755c]/80 font-medium hover:text-[#b5755c] transition-colors duration-200">
              {t('header.nav.gallery')}
            </a>
            <a href="/sss" className="text-[#b5755c]/80 font-medium hover:text-[#b5755c] transition-colors duration-200">
              {t('header.nav.faq')}
            </a>
            <a href="/#yorumlar" className="text-[#b5755c]/80 font-medium hover:text-[#b5755c] transition-colors duration-200">
              {t('header.nav.reviews')}
            </a>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="py-4 space-y-3">
              <a href="#" className="block py-2 text-[#b5755c]/80 hover:text-[#b5755c] transition-colors duration-200 font-medium">
                {t('header.nav.home')}
              </a>
              
              {/* Mobile Categories */}
              <div>
                <button 
                  onClick={() => toggleDropdown('categories')}
                  className="flex items-center justify-between w-full py-2 text-[#b5755c]/80 hover:text-[#b5755c] transition-colors duration-200 font-medium"
                >
                  <span>{t('header.nav.categories')}</span>
                  <HiOutlineChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'categories' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'categories' && (
                  <div className="ml-4 mt-2 space-y-2">
                    {categories.map((category) => (
                      <a 
                        key={category.name} 
                        href="#" 
                        className="flex items-center space-x-2 py-2 text-[#b5755c]/60 hover:text-[#b5755c] transition-colors duration-200 text-sm"
                      >
                        <div className="w-5 h-5 text-[#b5755c]/60">
                          {category.icon}
                        </div>
                        <span>{category.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
              
              <a href="#" className="block py-2 text-[#b5755c]/80 hover:text-[#b5755c] transition-colors duration-200 font-medium">
                {t('header.nav.about')}
              </a>
              <a href="/ozel-siparis" className="block py-2 text-[#b5755c]/80 hover:text-[#b5755c] transition-colors duration-200 font-medium">
                {t('header.nav.customOrder')}
              </a>
              <a href="/galeri" className="block py-2 text-[#b5755c]/80 hover:text-[#b5755c] transition-colors duration-200 font-medium">
                {t('header.nav.gallery')}
              </a>
              <a href="/sss" className="block py-2 text-[#b5755c]/80 hover:text-[#b5755c] transition-colors duration-200 font-medium">
                {t('header.nav.faq')}
              </a>
              <a href="#" className="block py-2 text-[#b5755c]/80 hover:text-[#b5755c] transition-colors duration-200 font-medium">
                {t('header.nav.reviews')}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header