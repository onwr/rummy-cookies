import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  HiOutlinePhotograph,
  HiOutlineCake,
  HiOutlineHeart,
  HiOutlineStar,
  HiOutlineEye,
  HiOutlineFilter,
  HiOutlineSearch
} from 'react-icons/hi'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Galeri = () => {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: t('gallery.categories.all'), icon: <HiOutlinePhotograph className="w-5 h-5" /> },
    { id: 'birthday', name: t('gallery.categories.birthday'), icon: <HiOutlineCake className="w-5 h-5" /> },
    { id: 'babyshower', name: t('gallery.categories.babyshower'), icon: <HiOutlineHeart className="w-5 h-5" /> },
    { id: 'wedding', name: t('gallery.categories.wedding'), icon: <HiOutlineStar className="w-5 h-5" /> },
    { id: 'corporate', name: t('gallery.categories.corporate'), icon: <HiOutlineEye className="w-5 h-5" /> }
  ]

  const galleryItems = [
    {
      id: 1,
      category: 'birthday',
      name: t('gallery.items.birthday1.name'),
      description: t('gallery.items.birthday1.description'),
      image: '/images/urun1.jfif',
      tags: ['Doğum Günü', 'Çocuk', 'Renkli']
    },
    {
      id: 2,
      category: 'babyshower',
      name: t('gallery.items.babyshower1.name'),
      description: t('gallery.items.babyshower1.description'),
      image: '/images/urun2.jfif',
      tags: ['Baby Shower', 'Bebek', 'Pastel']
    },
    {
      id: 3,
      category: 'wedding',
      name: t('gallery.items.wedding1.name'),
      description: t('gallery.items.wedding1.description'),
      image: '/images/urun1.jfif',
      tags: ['Düğün', 'Romantik', 'Beyaz']
    },
    {
      id: 4,
      category: 'corporate',
      name: t('gallery.items.corporate1.name'),
      description: t('gallery.items.corporate1.description'),
      image: '/images/urun2.jfif',
      tags: ['Kurumsal', 'Logo', 'Profesyonel']
    },
    {
      id: 5,
      category: 'birthday',
      name: t('gallery.items.birthday2.name'),
      description: t('gallery.items.birthday2.description'),
      image: '/images/urun1.jfif',
      tags: ['Doğum Günü', 'Yetişkin', 'Özel']
    },
    {
      id: 6,
      category: 'babyshower',
      name: t('gallery.items.babyshower2.name'),
      description: t('gallery.items.babyshower2.description'),
      image: '/images/urun2.jfif',
      tags: ['Baby Shower', 'Set', 'Hediye']
    },
    {
      id: 7,
      category: 'wedding',
      name: t('gallery.items.wedding2.name'),
      description: t('gallery.items.wedding2.description'),
      image: '/images/urun1.jfif',
      tags: ['Nişan', 'Özel', 'Tasarım']
    },
    {
      id: 8,
      category: 'corporate',
      name: t('gallery.items.corporate2.name'),
      description: t('gallery.items.corporate2.description'),
      image: '/images/urun2.jfif',
      tags: ['Toplantı', 'Hediye', 'Kurumsal']
    }
  ]

  const filteredItems = galleryItems.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory
    const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return categoryMatch && searchMatch
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-[#fee2ba]/20 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-serif text-[#b5755c] mb-8 leading-tight">
            {t('gallery.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-[#b5755c]/80 max-w-4xl mx-auto leading-relaxed">
            {t('gallery.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="pb-24 bg-[#fee2ba]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#b5755c]/10 p-8 md:p-12">
            
            {/* Filters and Search */}
            <div className="mb-12">
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                
                {/* Category Filter */}
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-[#b5755c] text-white shadow-lg'
                          : 'bg-[#fee2ba]/30 text-[#b5755c] hover:bg-[#fee2ba]/50'
                      }`}
                    >
                      {category.icon}
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#b5755c]/50" />
                  <input
                    type="text"
                    placeholder={t('gallery.search.placeholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-[#b5755c]/20 rounded-full focus:outline-none focus:ring-2 focus:ring-[#b5755c]/20 focus:border-transparent w-64"
                  />
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-8">
              <p className="text-[#b5755c]/70">
                {t('gallery.results.count', { count: filteredItems.length })}
              </p>
            </div>

            {/* Gallery Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <div key={item.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#b5755c]/5 overflow-hidden hover:-translate-y-2">
                    
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button className="bg-white/90 text-[#b5755c] px-4 py-2 rounded-full font-medium hover:bg-white transition-colors duration-200">
                          {t('gallery.items.view')}
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-[#b5755c] mb-2 text-lg">
                        {item.name}
                      </h3>
                      <p className="text-[#b5755c]/70 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-[#fee2ba]/30 text-[#b5755c] text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <HiOutlinePhotograph className="w-16 h-16 text-[#b5755c]/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#b5755c] mb-2">
                  {t('gallery.noResults.title')}
                </h3>
                <p className="text-[#b5755c]/70">
                  {t('gallery.noResults.message')}
                </p>
              </div>
            )}

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-serif text-[#b5755c] mb-6">
                {t('gallery.cta.title')}
              </h3>
              <p className="text-[#b5755c]/80 mb-8 max-w-2xl mx-auto">
                {t('gallery.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/ozel-siparis"
                  className="bg-gradient-to-r from-[#b5755c] to-[#b5755c]/90 text-white px-8 py-3 rounded-full font-semibold hover:from-[#b5755c]/90 hover:to-[#b5755c] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {t('gallery.cta.customOrder')}
                </a>
                <a 
                  href="mailto:info@rumycookie.com"
                  className="border-2 border-[#b5755c] text-[#b5755c] px-8 py-3 rounded-full font-semibold hover:bg-[#b5755c] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t('gallery.cta.contact')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Galeri