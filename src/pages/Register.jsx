import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlinePhone } from 'react-icons/hi';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Register = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    newsletter: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert(i18n.language === 'tr' ? 'Şifreler eşleşmiyor!' : 'Passwords do not match!');
      return;
    }
    console.log('Register attempt:', formData);
    // Burada kayıt API çağrısı yapılacak
    navigate('/giris');
  };

  const handleSocialRegister = (provider) => {
    console.log(`${provider} ile kayıt olunuyor`);
    // Sosyal medya kaydı implementasyonu
  };

  return (
    <div className='min-h-screen bg-white'>
      <Header />

      <div className='min-h-screen bg-gradient-to-br from-[#fef3e2] to-[#fee2ba] py-16'>
        <div className='mx-auto max-w-lg px-6'>
          {/* Register Card */}
          <div className='rounded-3xl bg-white p-8 shadow-2xl'>
            {/* Header */}
            <div className='mb-8 text-center'>
              <h1 className='mb-2 text-3xl font-bold text-[#b5755c]'>
                {i18n.language === 'tr' ? 'Hesap Oluşturun' : 'Create Account'}
              </h1>
              <p className='text-[#b5755c]/70'>
                {i18n.language === 'tr'
                  ? 'Hemen ücretsiz hesap oluşturun'
                  : 'Create a free account now'}
              </p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Name Fields */}
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='mb-2 block text-sm font-medium text-[#b5755c]'>
                    {i18n.language === 'tr' ? 'Ad' : 'First Name'}
                  </label>
                  <div className='relative'>
                    <HiOutlineUser className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[#b5755c]/50' />
                    <input
                      type='text'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className='w-full rounded-xl border border-[#b5755c]/20 py-3 pr-4 pl-10 placeholder-[#b5755c]/50 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
                      placeholder={i18n.language === 'tr' ? 'Adınız' : 'First name'}
                    />
                  </div>
                </div>

                <div>
                  <label className='mb-2 block text-sm font-medium text-[#b5755c]'>
                    {i18n.language === 'tr' ? 'Soyad' : 'Last Name'}
                  </label>
                  <div className='relative'>
                    <HiOutlineUser className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[#b5755c]/50' />
                    <input
                      type='text'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className='w-full rounded-xl border border-[#b5755c]/20 py-3 pr-4 pl-10 placeholder-[#b5755c]/50 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
                      placeholder={i18n.language === 'tr' ? 'Soyadınız' : 'Last name'}
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className='mb-2 block text-sm font-medium text-[#b5755c]'>
                  {i18n.language === 'tr' ? 'E-posta' : 'Email'}
                </label>
                <div className='relative'>
                  <HiOutlineMail className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[#b5755c]/50' />
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className='w-full rounded-xl border border-[#b5755c]/20 py-3 pr-4 pl-10 placeholder-[#b5755c]/50 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
                    placeholder={i18n.language === 'tr' ? 'ornek@email.com' : 'example@email.com'}
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className='mb-2 block text-sm font-medium text-[#b5755c]'>
                  {i18n.language === 'tr' ? 'Telefon' : 'Phone'}
                </label>
                <div className='relative'>
                  <HiOutlinePhone className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[#b5755c]/50' />
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className='w-full rounded-xl border border-[#b5755c]/20 py-3 pr-4 pl-10 placeholder-[#b5755c]/50 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
                    placeholder={i18n.language === 'tr' ? '+90 5XX XXX XX XX' : '+90 5XX XXX XX XX'}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className='mb-2 block text-sm font-medium text-[#b5755c]'>
                  {i18n.language === 'tr' ? 'Şifre' : 'Password'}
                </label>
                <div className='relative'>
                  <HiOutlineLockClosed className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[#b5755c]/50' />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className='w-full rounded-xl border border-[#b5755c]/20 py-3 pr-12 pl-10 placeholder-[#b5755c]/50 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
                    placeholder={
                      i18n.language === 'tr' ? 'En az 8 karakter' : 'At least 8 characters'
                    }
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute top-1/2 right-3 -translate-y-1/2 transform text-[#b5755c]/50 transition-colors hover:text-[#b5755c]'
                  >
                    {showPassword ? (
                      <FaEyeSlash className='h-5 w-5' />
                    ) : (
                      <FaEye className='h-5 w-5' />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className='mb-2 block text-sm font-medium text-[#b5755c]'>
                  {i18n.language === 'tr' ? 'Şifre Tekrar' : 'Confirm Password'}
                </label>
                <div className='relative'>
                  <HiOutlineLockClosed className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[#b5755c]/50' />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className='w-full rounded-xl border border-[#b5755c]/20 py-3 pr-12 pl-10 placeholder-[#b5755c]/50 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
                    placeholder={
                      i18n.language === 'tr' ? 'Şifrenizi tekrar girin' : 'Confirm your password'
                    }
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute top-1/2 right-3 -translate-y-1/2 transform text-[#b5755c]/50 transition-colors hover:text-[#b5755c]'
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className='h-5 w-5' />
                    ) : (
                      <FaEye className='h-5 w-5' />
                    )}
                  </button>
                </div>
              </div>

              {/* Checkboxes */}
              <div className='space-y-3'>
                <label className='flex items-start space-x-3'>
                  <input
                    type='checkbox'
                    name='agreeToTerms'
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    required
                    className='mt-1 h-4 w-4 rounded border-[#b5755c]/20 text-[#b5755c] focus:ring-[#b5755c]/20'
                  />
                  <span className='text-sm text-[#b5755c]/70'>
                    {i18n.language === 'tr'
                      ? 'Kullanım şartlarını ve gizlilik politikasını kabul ediyorum'
                      : 'I agree to the terms of service and privacy policy'}
                  </span>
                </label>

                <label className='flex items-start space-x-3'>
                  <input
                    type='checkbox'
                    name='newsletter'
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className='mt-1 h-4 w-4 rounded border-[#b5755c]/20 text-[#b5755c] focus:ring-[#b5755c]/20'
                  />
                  <span className='text-sm text-[#b5755c]/70'>
                    {i18n.language === 'tr'
                      ? 'E-posta ile özel teklifler ve güncellemeler almak istiyorum'
                      : 'I want to receive special offers and updates via email'}
                  </span>
                </label>
              </div>

              {/* Register Button */}
              <button
                type='submit'
                className='w-full transform rounded-xl bg-gradient-to-r from-[#b5755c] to-[#b5755c]/90 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-[#b5755c]/90 hover:to-[#b5755c] hover:shadow-xl'
              >
                {i18n.language === 'tr' ? 'Hesap Oluştur' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className='my-6 flex items-center'>
              <div className='flex-1 border-t border-[#b5755c]/20'></div>
              <span className='px-4 text-sm text-[#b5755c]/50'>
                {i18n.language === 'tr' ? 'veya' : 'or'}
              </span>
              <div className='flex-1 border-t border-[#b5755c]/20'></div>
            </div>

            {/* Social Register Buttons */}
            <div className='space-y-3'>
              <button
                onClick={() => handleSocialRegister('Google')}
                className='flex w-full items-center justify-center space-x-3 rounded-xl border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50'
              >
                <FaGoogle className='h-5 w-5 text-red-500' />
                <span>
                  {i18n.language === 'tr' ? 'Google ile kayıt ol' : 'Continue with Google'}
                </span>
              </button>

              <button
                onClick={() => handleSocialRegister('Facebook')}
                className='flex w-full items-center justify-center space-x-3 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700'
              >
                <FaFacebook className='h-5 w-5' />
                <span>
                  {i18n.language === 'tr' ? 'Facebook ile kayıt ol' : 'Continue with Facebook'}
                </span>
              </button>

              <button
                onClick={() => handleSocialRegister('Apple')}
                className='flex w-full items-center justify-center space-x-3 rounded-xl bg-black px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-gray-800'
              >
                <FaApple className='h-5 w-5' />
                <span>{i18n.language === 'tr' ? 'Apple ile kayıt ol' : 'Continue with Apple'}</span>
              </button>
            </div>

            {/* Login Link */}
            <div className='mt-8 text-center'>
              <p className='text-[#b5755c]/70'>
                {i18n.language === 'tr' ? 'Zaten hesabınız var mı?' : 'Already have an account?'}
                <Link
                  to='/giris'
                  className='ml-1 font-medium text-[#b5755c] transition-colors hover:text-[#b5755c]/80'
                >
                  {i18n.language === 'tr' ? 'Giriş yapın' : 'Sign in'}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
