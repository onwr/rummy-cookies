import React from 'react'
import { useTranslation } from 'react-i18next'
import { 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker,
  HiOutlineClock
} from 'react-icons/hi'
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaWhatsapp 
} from 'react-icons/fa'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-[#fee2ba]/30 to-[#b5755c]/20 border-t border-[#b5755c]/10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img src="/logo.png" alt="RumyCookie" className="h-16 w-auto mr-4" />
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#b5755c]">RumyCookie</h3>
                <p className="text-[#b5755c]/70 text-sm">{t('header.logo.subtitle')}</p>
              </div>
            </div>
            <p className="text-[#b5755c]/80 mb-6 leading-relaxed max-w-md">
              {t('footer.company.description')}
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-[#b5755c]/10 rounded-full flex items-center justify-center hover:bg-[#b5755c] hover:text-white transition-all duration-300 text-[#b5755c]">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#b5755c]/10 rounded-full flex items-center justify-center hover:bg-[#b5755c] hover:text-white transition-all duration-300 text-[#b5755c]">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#b5755c]/10 rounded-full flex items-center justify-center hover:bg-[#b5755c] hover:text-white transition-all duration-300 text-[#b5755c]">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#b5755c]/10 rounded-full flex items-center justify-center hover:bg-[#b5755c] hover:text-white transition-all duration-300 text-[#b5755c]">
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#b5755c]">{t('footer.quickLinks.title')}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#b5755c]/70 hover:text-[#b5755c] transition-colors duration-200">{t('footer.quickLinks.home')}</a></li>
              <li><a href="#" className="text-[#b5755c]/70 hover:text-[#b5755c] transition-colors duration-200">{t('footer.quickLinks.products')}</a></li>
              <li><a href="#" className="text-[#b5755c]/70 hover:text-[#b5755c] transition-colors duration-200">{t('footer.quickLinks.customOrder')}</a></li>
              <li><a href="#" className="text-[#b5755c]/70 hover:text-[#b5755c] transition-colors duration-200">{t('footer.quickLinks.about')}</a></li>
              <li><a href="#" className="text-[#b5755c]/70 hover:text-[#b5755c] transition-colors duration-200">{t('footer.quickLinks.contact')}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#b5755c]">{t('footer.contact.title')}</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <HiOutlineLocationMarker className="w-5 h-5 text-[#b5755c]/60 mt-1 flex-shrink-0" />
                <p className="text-[#b5755c]/70 text-sm">{t('footer.contact.address')}</p>
              </div>
              <div className="flex items-center space-x-3">
                <HiOutlinePhone className="w-5 h-5 text-[#b5755c]/60 flex-shrink-0" />
                <p className="text-[#b5755c]/70 text-sm">{t('footer.contact.phone')}</p>
              </div>
              <div className="flex items-center space-x-3">
                <HiOutlineMail className="w-5 h-5 text-[#b5755c]/60 flex-shrink-0" />
                <p className="text-[#b5755c]/70 text-sm">{t('footer.contact.email')}</p>
              </div>
              <div className="flex items-center space-x-3">
                <HiOutlineClock className="w-5 h-5 text-[#b5755c]/60 flex-shrink-0" />
                <p className="text-[#b5755c]/70 text-sm">{t('footer.contact.hours')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#b5755c]/10 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-[#b5755c]/70 text-sm">
                © {currentYear} RumyCookie. {t('footer.copyright')}
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-xs text-[#b5755c]/60">
              <a href="#" className="hover:text-[#b5755c] transition-colors duration-200">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-[#b5755c] transition-colors duration-200">{t('footer.terms')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer