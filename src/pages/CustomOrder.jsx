import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  HiOutlineCake, 
  HiOutlinePhotograph,
  HiOutlineChat,
  HiOutlineUser,
  HiOutlineCheckCircle
} from 'react-icons/hi'
import Header from '../components/Header'
import Footer from '../components/Footer'

const CustomOrder = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    theme: '',
    colors: '',
    quantity: '',
    deliveryDate: '',
    message: '',
    imageUpload: null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    setFormData(prev => ({
      ...prev,
      imageUpload: file
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        theme: '',
        colors: '',
        quantity: '',
        deliveryDate: '',
        message: '',
        imageUpload: null
      })
    }, 3000)
  }

  const themes = [
    'Doğum Günü',
    'Baby Shower',
    'Nişan',
    'Düğün',
    'Yılbaşı',
    'Sevgililer Günü',
    'Halloween',
    'Kurumsal',
    'Özel Tasarım'
  ]

  const colorOptions = [
    'Pembe',
    'Mavi',
    'Yeşil',
    'Mor',
    'Turuncu',
    'Kırmızı',
    'Sarı',
    'Kahverengi',
    'Siyah',
    'Beyaz'
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <HiOutlineCheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-serif text-[#b5755c] mb-4">
              {t('customOrder.success.title')}
            </h1>
            <p className="text-xl text-[#b5755c]/80 mb-8">
              {t('customOrder.success.message')}
            </p>
            <div className="bg-gradient-to-r from-[#fee2ba] to-[#b5755c] rounded-2xl p-6 text-white">
              <p className="text-lg font-medium">
                {t('customOrder.success.contact')}
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-[#fee2ba]/20 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-serif text-[#b5755c] mb-8 leading-tight">
            {t('customOrder.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-[#b5755c]/80 max-w-4xl mx-auto leading-relaxed">
            {t('customOrder.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24 bg-[#fee2ba]/20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#b5755c]/10 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-[#b5755c] flex items-center">
                  <HiOutlineUser className="w-6 h-6 mr-3" />
                  {t('customOrder.form.personalInfo')}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#b5755c] font-medium mb-2">
                      {t('customOrder.form.name')} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#b5755c]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b5755c]/20 focus:border-transparent"
                      placeholder={t('customOrder.form.namePlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#b5755c] font-medium mb-2">
                      {t('customOrder.form.email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#b5755c]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b5755c]/20 focus:border-transparent"
                      placeholder={t('customOrder.form.emailPlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#b5755c] font-medium mb-2">
                      {t('customOrder.form.phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#b5755c]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b5755c]/20 focus:border-transparent"
                      placeholder={t('customOrder.form.phonePlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#b5755c] font-medium mb-2">
                      {t('customOrder.form.address')}
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#b5755c]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b5755c]/20 focus:border-transparent"
                      placeholder={t('customOrder.form.addressPlaceholder')}
                    />
                  </div>
                </div>
              </div>

              {/* Cookie Details */}
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-[#b5755c] flex items-center">
                  <HiOutlineCake className="w-6 h-6 mr-3" />
                  {t('customOrder.form.cookieDetails')}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#b5755c] font-medium mb-2">
                      {t('customOrder.form.theme')} *
                    </label>
                    <select
                      name="theme"
                      value={formData.theme}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#b5755c]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b5755c]/20 focus:border-transparent"
                    >
                      <option value="">{t('customOrder.form.themePlaceholder')}</option>
                      {themes.map((theme) => (
                        <option key={theme} value={theme}>{theme}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-[#b5755c] font-medium mb-2">
                      {t('customOrder.form.colors')}
                    </label>
                    <input
                      type="text"
                      name="colors"
                      value={formData.colors}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#b5755c]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b5755c]/20 focus:border-transparent"
                      placeholder={t('customOrder.form.colorsPlaceholder')}
                    />
                    <p className="text-sm text-[#b5755c]/60 mt-2">
                      {t('customOrder.form.colorsHelp')}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-[#b5755c] font-medium mb-2">
                      {t('customOrder.form.quantity')} *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="w-full px-4 py-3 border border-[#b5755c]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b5755c]/20 focus:border-transparent"
                      placeholder={t('customOrder.form.quantityPlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#b5755c] font-medium mb-2">
                      {t('customOrder.form.deliveryDate')} *
                    </label>
                    <input
                      type="date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#b5755c]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b5755c]/20 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-[#b5755c] flex items-center">
                  <HiOutlinePhotograph className="w-6 h-6 mr-3" />
                  {t('customOrder.form.imageUpload')}
                </h2>
                
                <div className="border-2 border-dashed border-[#b5755c]/30 rounded-xl p-8 text-center hover:border-[#b5755c]/50 transition-colors duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label htmlFor="imageUpload" className="cursor-pointer">
                    <div className="space-y-4">
                      <HiOutlinePhotograph className="w-16 h-16 text-[#b5755c]/50 mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-[#b5755c]">
                          {t('customOrder.form.imageUploadText')}
                        </p>
                        <p className="text-[#b5755c]/60 mt-2">
                          {t('customOrder.form.imageUploadHelp')}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
                
                {formData.imageUpload && (
                  <div className="bg-[#fee2ba]/20 rounded-xl p-4">
                    <p className="text-[#b5755c] font-medium">
                      {t('customOrder.form.selectedImage')}: {formData.imageUpload.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-[#b5755c] flex items-center">
                  <HiOutlineChat className="w-6 h-6 mr-3" />
                  {t('customOrder.form.message')}
                </h2>
                
                <div>
                  <label className="block text-[#b5755c] font-medium mb-2">
                    {t('customOrder.form.messageLabel')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full px-4 py-3 border border-[#b5755c]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b5755c]/20 focus:border-transparent resize-none"
                    placeholder={t('customOrder.form.messagePlaceholder')}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#b5755c] to-[#b5755c]/90 text-white px-16 py-4 rounded-full font-semibold hover:from-[#b5755c]/90 hover:to-[#b5755c] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('customOrder.form.submitting') : t('customOrder.form.submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default CustomOrder
