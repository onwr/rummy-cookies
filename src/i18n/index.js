import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Dil dosyaları
const resources = {
  tr: {
    translation: {
      // Header
      'header.utility.cookies': 'Kurabiyeler, Tatlılar, Lezzetler',
      'header.utility.delivery': 'Türkiye Geneli Taze Teslimat',
      'header.utility.about': 'Hakkımızda',
      'header.utility.support': 'Destek',
      'header.utility.phone': '+90 555 555 55 55',
      'header.logo.subtitle': 'El Yapımı Kurabiyeler',
      'header.search.placeholder': 'Kurabiye ara...',
      'header.nav.specialDays': 'Özel Günler',
      'header.nav.holidays': 'Tatiller',
      'header.nav.corporate': 'Kurumsal',
      'header.nav.customDesign': 'Özel Tasarım',
      'header.nav.gallery': 'Galeri',
      'header.nav.flavors': 'Lezzetler',
      
      // Hero
      'hero.title.main': 'El Yapımı Tasarım',
      'hero.title.sub': 'Kurabiyeler',
      'hero.subtitle': 'Her özel an için özel lezzetler. Özenle hazırlanmış, sevgiyle şekillendirilmiş benzersiz kurabiye tasarımlarımızla unutulmaz anlar yaratın.',
      'hero.cta.explore': 'Ürünleri Keşfet',
      'hero.cta.customOrder': 'Özel Sipariş Ver',
      'hero.trust.handmade': '%100 El Yapımı',
      'hero.trust.handmade.desc': 'Taze ve doğal malzemelerle hazırlanır',
      'hero.trust.delivery': 'Hızlı Teslimat',
      'hero.trust.delivery.desc': 'Türkiye geneli aynı gün kargo',
      'hero.trust.satisfaction': 'Müşteri Memnuniyeti',
      'hero.trust.satisfaction.desc': '%100 memnuniyet garantisi',
      
      // Products
      'products.title': 'Tüm Ürünlerimiz',
      'products.subtitle': 'Özel günleriniz için hazırladığımız benzersiz kurabiye tasarımlarımızı keşfedin. Her biri özenle hazırlanmış, benzersiz lezzetler.',
      'products.addToCart': 'Sepete Ekle',
      'products.stock': 'Stok',
      'products.badge.new': 'Yeni',
      'products.badge.popular': 'Popüler',
      'products.badge.favorite': 'Favori',
      'products.badge.bestseller': 'Çok Satan',
      'products.badge.custom': 'Özel',
      'products.badge.corporate': 'Kurumsal',
      'products.badge.package': 'Paket',
      'products.badge.mini': 'Mini',
      
      // Reviews
      'reviews.title': 'Müşteri Yorumlarımız',
      'reviews.subtitle': 'Müşterilerimizin deneyimleri ve memnuniyetleri bizim için en değerli geri bildirimdir. Her yorum, kalitemizi artırmamıza yardımcı oluyor.',
      'reviews.addReview': 'Yorum Yap',
      'reviews.daysAgo': 'gün önce',
      'reviews.weekAgo': 'hafta önce',
      
      // Footer
      'footer.company.description': 'Özel günleriniz için benzersiz kurabiye tasarımları hazırlıyoruz. Her kurabiye, sevgi ve özenle el yapımı olarak üretilir.',
      'footer.quickLinks.title': 'Hızlı Linkler',
      'footer.quickLinks.home': 'Anasayfa',
      'footer.quickLinks.products': 'Ürünlerimiz',
      'footer.quickLinks.customOrder': 'Özel Sipariş',
      'footer.quickLinks.about': 'Hakkımızda',
      'footer.quickLinks.contact': 'İletişim',
      'footer.contact.title': 'İletişim',
      'footer.contact.address': 'İstanbul, Türkiye',
      'footer.contact.phone': '+90 (212) 555 0123',
      'footer.contact.email': 'info@rumycookie.com',
      'footer.contact.hours': 'Pzt-Cmt: 09:00-18:00',
      'footer.copyright': 'Tüm hakları saklıdır.',
      'footer.privacy': 'Gizlilik Politikası',
      'footer.terms': 'Kullanım Şartları',
      
      // Product Names
      'product.babyCarriage': 'Bebek Arabası Kurabiyesi',
      'product.babyRattle': 'Bebek Çıngırağı',
      'product.birthday': 'Doğum Günü Kurabiyesi',
      'product.heart': 'Kalp Şekilli Kurabiye',
      'product.customDesign': 'Özel Tasarım Kurabiye',
      'product.corporateSet': 'Kurumsal Kurabiye Seti',
      'product.birthdayPackage': 'Doğum Günü Paketi',
      'product.miniSet': 'Mini Kurabiye Seti'
    }
  },
  en: {
    translation: {
      // Header
      'header.utility.cookies': 'Cookies, Sweets, Flavors',
      'header.utility.delivery': 'Fresh Delivery Across Turkey',
      'header.utility.about': 'About Us',
      'header.utility.support': 'Support',
      'header.utility.phone': '+90 555 555 55 55',
      'header.logo.subtitle': 'Handmade Cookies',
      'header.search.placeholder': 'Search cookies...',
      'header.nav.specialDays': 'Special Days',
      'header.nav.holidays': 'Holidays',
      'header.nav.corporate': 'Corporate',
      'header.nav.customDesign': 'Custom Design',
      'header.nav.gallery': 'Gallery',
      'header.nav.flavors': 'Flavors',
      
      // Hero
      'hero.title.main': 'Handmade Design',
      'hero.title.sub': 'Cookies',
      'hero.subtitle': 'Special flavors for every special moment. Create unforgettable memories with our carefully prepared, lovingly shaped unique cookie designs.',
      'hero.cta.explore': 'Explore Products',
      'hero.cta.customOrder': 'Place Custom Order',
      'hero.trust.handmade': '100% Handmade',
      'hero.trust.handmade.desc': 'Prepared with fresh and natural ingredients',
      'hero.trust.delivery': 'Fast Delivery',
      'hero.trust.delivery.desc': 'Same day shipping across Turkey',
      'hero.trust.satisfaction': 'Customer Satisfaction',
      'hero.trust.satisfaction.desc': '100% satisfaction guarantee',
      
      // Products
      'products.title': 'All Our Products',
      'products.subtitle': 'Discover our unique cookie designs prepared for your special days. Each one is carefully prepared with unique flavors.',
      'products.addToCart': 'Add to Cart',
      'products.stock': 'Stock',
      'products.badge.new': 'New',
      'products.badge.popular': 'Popular',
      'products.badge.favorite': 'Favorite',
      'products.badge.bestseller': 'Bestseller',
      'products.badge.custom': 'Custom',
      'products.badge.corporate': 'Corporate',
      'products.badge.package': 'Package',
      'products.badge.mini': 'Mini',
      
      // Reviews
      'reviews.title': 'Customer Reviews',
      'reviews.subtitle': 'Our customers\' experiences and satisfaction are the most valuable feedback for us. Each review helps us improve our quality.',
      'reviews.addReview': 'Add Review',
      'reviews.daysAgo': 'days ago',
      'reviews.weekAgo': 'week ago',
      
      // Footer
      'footer.company.description': 'We prepare unique cookie designs for your special days. Each cookie is produced handmade with love and care.',
      'footer.quickLinks.title': 'Quick Links',
      'footer.quickLinks.home': 'Home',
      'footer.quickLinks.products': 'Our Products',
      'footer.quickLinks.customOrder': 'Custom Order',
      'footer.quickLinks.about': 'About Us',
      'footer.quickLinks.contact': 'Contact',
      'footer.contact.title': 'Contact',
      'footer.contact.address': 'Istanbul, Turkey',
      'footer.contact.phone': '+90 (212) 555 0123',
      'footer.contact.email': 'info@rumycookie.com',
      'footer.contact.hours': 'Mon-Sat: 09:00-18:00',
      'footer.copyright': 'All rights reserved.',
      'footer.privacy': 'Privacy Policy',
      'footer.terms': 'Terms of Use',
      
      // Product Names
      'product.babyCarriage': 'Baby Carriage Cookie',
      'product.babyRattle': 'Baby Rattle Cookie',
      'product.birthday': 'Birthday Cookie',
      'product.heart': 'Heart Shaped Cookie',
      'product.customDesign': 'Custom Design Cookie',
      'product.corporateSet': 'Corporate Cookie Set',
      'product.birthdayPackage': 'Birthday Package',
      'product.miniSet': 'Mini Cookie Set'
    }
  }
}

// IP tabanlı dil tespiti
const detectLanguageByIP = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    
    // Türkiye'den gelen kullanıcılar için Türkçe
    if (data.country_code === 'TR') {
      return 'tr'
    }
    
    // Diğer ülkeler için İngilizce
    return 'en'
  } catch (error) {
    console.log('IP detection failed, using browser language:', error)
    // Hata durumunda tarayıcı dilini kullan
    return null
  }
}

// i18n konfigürasyonu
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    detection: {
      order: ['custom', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      
      // Özel dil tespiti
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      
      // IP tabanlı tespit
      customDetector: {
        name: 'ipDetector',
        lookup: async () => {
          return await detectLanguageByIP()
        }
      }
    },
    
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
