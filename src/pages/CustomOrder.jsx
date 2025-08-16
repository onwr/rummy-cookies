import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  HiOutlineCake,
  HiOutlinePhotograph,
  HiOutlineChat,
  HiOutlineUser,
  HiOutlineCheckCircle,
} from 'react-icons/hi';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CustomOrder = () => {
  const { t } = useTranslation();
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
    imageUpload: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      imageUpload: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
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
        imageUpload: null,
      });
    }, 3000);
  };

  const themes = [
    'Doğum Günü',
    'Baby Shower',
    'Nişan',
    'Düğün',
    'Yılbaşı',
    'Sevgililer Günü',
    'Halloween',
    'Kurumsal',
    'Özel Tasarım',
  ];

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
    'Beyaz',
  ];

  if (isSubmitted) {
    return (
      <div className='min-h-screen bg-white'>
        <Header />
        <div className='flex min-h-[60vh] items-center justify-center'>
          <div className='text-center'>
            <HiOutlineCheckCircle className='mx-auto mb-6 h-24 w-24 text-green-500' />
            <h1 className='mb-4 font-serif text-4xl text-[#b5755c]'>
              {t('customOrder.success.title')}
            </h1>
            <p className='mb-8 text-xl text-[#b5755c]/80'>{t('customOrder.success.message')}</p>
            <div className='rounded-2xl bg-gradient-to-r from-[#fee2ba] to-[#b5755c] p-6 text-white'>
              <p className='text-lg font-medium'>{t('customOrder.success.contact')}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white'>
      <Header />

      {/* Hero Section */}
      <section className='bg-[#fee2ba]/20 py-16'>
        <div className='mx-auto max-w-7xl px-6 text-center'>
          <h1 className='mb-8 font-serif text-5xl leading-tight text-[#b5755c] md:text-7xl'>
            {t('customOrder.hero.title')}
          </h1>
          <p className='mx-auto max-w-4xl text-xl leading-relaxed text-[#b5755c]/80 md:text-2xl'>
            {t('customOrder.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className='bg-[#fee2ba]/20 pb-24'>
        <div className='mx-auto max-w-4xl px-6'>
          <div className='rounded-3xl border border-[#b5755c]/10 bg-white p-8 shadow-2xl md:p-12'>
            <form onSubmit={handleSubmit} className='space-y-8'>
              {/* Personal Information */}
              <div className='space-y-6'>
                <h2 className='flex items-center font-serif text-2xl text-[#b5755c]'>
                  <HiOutlineUser className='mr-3 h-6 w-6' />
                  {t('customOrder.form.personalInfo')}
                </h2>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <div>
                    <label className='mb-2 block font-medium text-[#b5755c]'>
                      {t('customOrder.form.name')} *
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className='w-full rounded-xl border border-[#b5755c]/20 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
                      placeholder={t('customOrder.form.namePlaceholder')}
                    />
                  </div>

                  <div>
                    <label className='mb-2 block font-medium text-[#b5755c]'>
                      {t('customOrder.form.email')} *
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className='w-full rounded-xl border border-[#b5755c]/20 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
                      placeholder={t('customOrder.form.emailPlaceholder')}
                    />
                  </div>

                  <div>
                    <label className='mb-2 block font-medium text-[#b5755c]'>
                      {t('customOrder.form.phone')}
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      className='w-full rounded-xl border border-[#b5755c]/20 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
                      placeholder={t('customOrder.form.phonePlaceholder')}
                    />
                  </div>

                  <div>
                    <label className='mb-2 block font-medium text-[#b5755c]'>
                      {t('customOrder.form.address')}
                    </label>
                    <input
                      type='text'
                      name='address'
                      value={formData.address}
                      onChange={handleInputChange}
                      className='w-full rounded-xl border border-[#b5755c]/20 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
                      placeholder={t('customOrder.form.addressPlaceholder')}
                    />
                  </div>
                </div>
              </div>

              {/* Cookie Details */}
              <div className='space-y-6'>
                <h2 className='flex items-center font-serif text-2xl text-[#b5755c]'>
                  <HiOutlineCake className='mr-3 h-6 w-6' />
                  {t('customOrder.form.cookieDetails')}
                </h2>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <div>
                    <label className='mb-2 block font-medium text-[#b5755c]'>
                      {t('customOrder.form.theme')} *
                    </label>
                    <select
                      name='theme'
                      value={formData.theme}
                      onChange={handleInputChange}
                      required
                      className='w-full rounded-xl border border-[#b5755c]/20 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
                    >
                      <option value=''>{t('customOrder.form.themePlaceholder')}</option>
                      {themes.map((theme) => (
                        <option key={theme} value={theme}>
                          {theme}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className='mb-2 block font-medium text-[#b5755c]'>
                      {t('customOrder.form.colors')}
                    </label>
                    <input
                      type='text'
                      name='colors'
                      value={formData.colors}
                      onChange={handleInputChange}
                      className='w-full rounded-xl border border-[#b5755c]/20 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
                      placeholder={t('customOrder.form.colorsPlaceholder')}
                    />
                    <p className='mt-2 text-sm text-[#b5755c]/60'>
                      {t('customOrder.form.colorsHelp')}
                    </p>
                  </div>

                  <div>
                    <label className='mb-2 block font-medium text-[#b5755c]'>
                      {t('customOrder.form.quantity')} *
                    </label>
                    <input
                      type='number'
                      name='quantity'
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                      min='1'
                      className='w-full rounded-xl border border-[#b5755c]/20 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
                      placeholder={t('customOrder.form.quantityPlaceholder')}
                    />
                  </div>

                  <div>
                    <label className='mb-2 block font-medium text-[#b5755c]'>
                      {t('customOrder.form.deliveryDate')} *
                    </label>
                    <input
                      type='date'
                      name='deliveryDate'
                      value={formData.deliveryDate}
                      onChange={handleInputChange}
                      required
                      className='w-full rounded-xl border border-[#b5755c]/20 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className='space-y-6'>
                <h2 className='flex items-center font-serif text-2xl text-[#b5755c]'>
                  <HiOutlinePhotograph className='mr-3 h-6 w-6' />
                  {t('customOrder.form.imageUpload')}
                </h2>

                <div className='rounded-xl border-2 border-dashed border-[#b5755c]/30 p-8 text-center transition-colors duration-200 hover:border-[#b5755c]/50'>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    className='hidden'
                    id='imageUpload'
                  />
                  <label htmlFor='imageUpload' className='cursor-pointer'>
                    <div className='space-y-4'>
                      <HiOutlinePhotograph className='mx-auto h-16 w-16 text-[#b5755c]/50' />
                      <div>
                        <p className='text-lg font-medium text-[#b5755c]'>
                          {t('customOrder.form.imageUploadText')}
                        </p>
                        <p className='mt-2 text-[#b5755c]/60'>
                          {t('customOrder.form.imageUploadHelp')}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                {formData.imageUpload && (
                  <div className='rounded-xl bg-[#fee2ba]/20 p-4'>
                    <p className='font-medium text-[#b5755c]'>
                      {t('customOrder.form.selectedImage')}: {formData.imageUpload.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Message */}
              <div className='space-y-6'>
                <h2 className='flex items-center font-serif text-2xl text-[#b5755c]'>
                  <HiOutlineChat className='mr-3 h-6 w-6' />
                  {t('customOrder.form.message')}
                </h2>

                <div>
                  <label className='mb-2 block font-medium text-[#b5755c]'>
                    {t('customOrder.form.messageLabel')}
                  </label>
                  <textarea
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    rows='6'
                    className='w-full resize-none rounded-xl border border-[#b5755c]/20 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
                    placeholder={t('customOrder.form.messagePlaceholder')}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className='pt-8 text-center'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='transform rounded-full bg-gradient-to-r from-[#b5755c] to-[#b5755c]/90 px-16 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-[#b5755c]/90 hover:to-[#b5755c] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50'
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
  );
};

export default CustomOrder;
