import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
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
    console.log('Login attempt:', formData);
    // Burada login API çağrısı yapılacak
    navigate('/');
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} ile giriş yapılıyor`);
    // Sosyal medya girişi implementasyonu
  };

  return (
    <div className='min-h-screen bg-white'>
      <Header />

      <div className='min-h-screen bg-gradient-to-br from-[#fef3e2] to-[#fee2ba] py-16'>
        <div className='mx-auto max-w-md px-6'>
          {/* Login Card */}
          <div className='rounded-3xl bg-white p-8 shadow-2xl'>
            {/* Header */}
            <div className='mb-8 text-center'>
              <h1 className='mb-2 text-3xl font-bold text-[#b5755c]'>
                {i18n.language === 'tr' ? 'Hoş Geldiniz' : 'Welcome Back'}
              </h1>
              <p className='text-[#b5755c]/70'>
                {i18n.language === 'tr' ? 'Hesabınıza giriş yapın' : 'Sign in to your account'}
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
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
                    placeholder={i18n.language === 'tr' ? 'Şifrenizi girin' : 'Enter your password'}
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

              {/* Remember Me & Forgot Password */}
              <div className='flex items-center justify-between'>
                <label className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    name='rememberMe'
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className='h-4 w-4 rounded border-[#b5755c]/20 text-[#b5755c] focus:ring-[#b5755c]/20'
                  />
                  <span className='text-sm text-[#b5755c]/70'>
                    {i18n.language === 'tr' ? 'Beni hatırla' : 'Remember me'}
                  </span>
                </label>
                <Link
                  to='/sifremi-unuttum'
                  className='text-sm text-[#b5755c] transition-colors hover:text-[#b5755c]/80'
                >
                  {i18n.language === 'tr' ? 'Şifremi unuttum' : 'Forgot password?'}
                </Link>
              </div>

              {/* Login Button */}
              <button
                type='submit'
                className='w-full transform rounded-xl bg-gradient-to-r from-[#b5755c] to-[#b5755c]/90 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-[#b5755c]/90 hover:to-[#b5755c] hover:shadow-xl'
              >
                {i18n.language === 'tr' ? 'Giriş Yap' : 'Sign In'}
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

            {/* Social Login Buttons */}
            <div className='space-y-3'>
              <button
                onClick={() => handleSocialLogin('Google')}
                className='flex w-full items-center justify-center space-x-3 rounded-xl border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50'
              >
                <FaGoogle className='h-5 w-5 text-red-500' />
                <span>
                  {i18n.language === 'tr' ? 'Google ile giriş yap' : 'Continue with Google'}
                </span>
              </button>

              <button
                onClick={() => handleSocialLogin('Facebook')}
                className='flex w-full items-center justify-center space-x-3 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700'
              >
                <FaFacebook className='h-5 w-5' />
                <span>
                  {i18n.language === 'tr' ? 'Facebook ile giriş yap' : 'Continue with Facebook'}
                </span>
              </button>

              <button
                onClick={() => handleSocialLogin('Apple')}
                className='flex w-full items-center justify-center space-x-3 rounded-xl bg-black px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-gray-800'
              >
                <FaApple className='h-5 w-5' />
                <span>
                  {i18n.language === 'tr' ? 'Apple ile giriş yap' : 'Continue with Apple'}
                </span>
              </button>
            </div>

            {/* Register Link */}
            <div className='mt-8 text-center'>
              <p className='text-[#b5755c]/70'>
                {i18n.language === 'tr' ? 'Hesabınız yok mu?' : "Don't have an account?"}
                <Link
                  to='/kayit'
                  className='ml-1 font-medium text-[#b5755c] transition-colors hover:text-[#b5755c]/80'
                >
                  {i18n.language === 'tr' ? 'Kayıt olun' : 'Sign up'}
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

export default Login;
