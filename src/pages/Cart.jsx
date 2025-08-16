import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaMapMarkerAlt,
  FaCreditCard,
  FaUpload,
  FaCheckCircle,
  FaArrowRight,
} from 'react-icons/fa';
import { HiOutlineShoppingBag, HiOutlineUser, HiOutlinePhone, HiOutlineMail } from 'react-icons/hi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { cartAPI } from '../services/api';

const Cart = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userCountry, setUserCountry] = useState('TR');
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [cartError, setCartError] = useState(null);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    zipCode: '',
    notes: '',
  });

  const [paymentProof, setPaymentProof] = useState(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // IP tabanlı ülke tespiti
  useEffect(() => {
    const detectUserCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setUserCountry(data.country_code || 'TR');
      } catch (error) {
        console.log('IP detection failed, using default country:', error);
        setUserCountry('TR');
      } finally {
        setIsLoading(false);
      }
    };

    detectUserCountry();
  }, []);

  // Sepet verilerini çek
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsCartLoading(true);
        setCartError(null);
        const response = await cartAPI.get();

        if (response.success) {
          setCartItems(response.data.items || []);
        } else {
          setCartError(response.message || 'Sepet yüklenirken hata oluştu');
        }
      } catch (error) {
        console.error('Sepet yüklenirken hata:', error);
        setCartError('Sepet yüklenirken hata oluştu');
      } finally {
        setIsCartLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Sepet güncellemelerini dinle
  useEffect(() => {
    const handleCartUpdate = () => {
      // Sepet güncellendiğinde yeniden çek
      const fetchCart = async () => {
        try {
          const response = await cartAPI.get();
          if (response.success) {
            setCartItems(response.data.items || []);
          }
        } catch (error) {
          console.error('Sepet güncellenirken hata:', error);
        }
      };
      fetchCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await cartAPI.updateQuantity({
        cart_item_id: id,
        quantity: newQuantity,
      });

      if (response.success) {
        // Sepet güncellendi, yeni verileri çek
        const cartResponse = await cartAPI.get();
        if (cartResponse.success) {
          setCartItems(cartResponse.data.items || []);
        }
      } else {
        alert(response.message || 'Miktar güncellenirken hata oluştu');
      }
    } catch (error) {
      console.error('Miktar güncellenirken hata:', error);
      alert('Miktar güncellenirken hata oluştu');
    }
  };

  const removeItem = async (id) => {
    try {
      const response = await cartAPI.remove({
        cart_item_id: id,
      });

      if (response.success) {
        // Ürün kaldırıldı, yeni verileri çek
        const cartResponse = await cartAPI.get();
        if (cartResponse.success) {
          setCartItems(cartResponse.data.items || []);
        }
      } else {
        alert(response.message || 'Ürün kaldırılırken hata oluştu');
      }
    } catch (error) {
      console.error('Ürün kaldırılırken hata:', error);
      alert('Ürün kaldırılırken hata oluştu');
    }
  };

  const clearCart = async () => {
    if (
      !confirm(
        i18n.language === 'tr'
          ? 'Sepeti temizlemek istediğinizden emin misiniz?'
          : 'Are you sure you want to clear the cart?'
      )
    ) {
      return;
    }

    try {
      const response = await cartAPI.clear();

      if (response.success) {
        setCartItems([]);
        alert(i18n.language === 'tr' ? 'Sepet temizlendi!' : 'Cart cleared!');
      } else {
        alert(response.message || 'Sepet temizlenirken hata oluştu');
      }
    } catch (error) {
      console.error('Sepet temizlenirken hata:', error);
      alert('Sepet temizlenirken hata oluştu');
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price || 0);
      const quantity = parseInt(item.quantity || 0);
      return total + price * quantity;
    }, 0);
  };

  const calculateShipping = () => {
    // Türkiye için ücretsiz, yurtdışı için 15 USD
    if (userCountry === 'TR') {
      return 0;
    } else {
      return 15; // USD
    }
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const getCurrencySymbol = () => {
    return userCountry === 'TR' ? '₺' : '$';
  };

  const getShippingText = () => {
    if (userCountry === 'TR') {
      return t('cart.shipping.free');
    } else {
      return `${t('cart.shipping.paid')}: $15 USD`;
    }
  };

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentProof(file);
    }
  };

  const placeOrder = () => {
    if (!paymentProof) {
      alert(
        i18n.language === 'tr' ? 'Lütfen ödeme dekontunu yükleyin!' : 'Please upload payment proof!'
      );
      return;
    }
    setIsOrderPlaced(true);
    setCurrentStep(4);
  };

  const nextStep = () => {
    if (currentStep === 1 && cartItems.length === 0) {
      alert(i18n.language === 'tr' ? 'Sepetiniz boş!' : 'Your cart is empty!');
      return;
    }
    if (currentStep === 2) {
      const requiredFields = ['fullName', 'phone', 'email', 'address', 'city', 'district'];
      const missingFields = requiredFields.filter((field) => !shippingInfo[field]);
      if (missingFields.length > 0) {
        alert(
          i18n.language === 'tr'
            ? 'Lütfen tüm gerekli alanları doldurun!'
            : 'Please fill all required fields!'
        );
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const renderCartItems = () => {
    if (isCartLoading) {
      return (
        <div className='py-12 text-center'>
          <div className='mx-auto h-16 w-16 animate-spin rounded-full border-b-2 border-[#b5755c]'></div>
          <p className='mt-4 text-[#b5755c]/70'>
            {i18n.language === 'tr' ? 'Sepet yükleniyor...' : 'Loading cart...'}
          </p>
        </div>
      );
    }

    if (cartError) {
      return (
        <div className='py-12 text-center'>
          <div className='mx-auto mb-4 h-16 w-16 rounded-full bg-red-100 p-4'>
            <FaTrash className='h-8 w-8 text-red-500' />
          </div>
          <p className='mb-4 text-red-600'>{cartError}</p>
          <button
            onClick={() => window.location.reload()}
            className='rounded-xl bg-[#b5755c] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#b5755c]/90'
          >
            {i18n.language === 'tr' ? 'Tekrar Dene' : 'Try Again'}
          </button>
        </div>
      );
    }

    if (cartItems.length === 0) {
      return (
        <div className='py-12 text-center'>
          <HiOutlineShoppingBag className='mx-auto mb-4 h-16 w-16 text-[#b5755c]/50' />
          <p className='mb-4 text-[#b5755c]/70'>{t('cart.empty.title')}</p>
          <button
            onClick={() => navigate('/')}
            className='rounded-xl bg-[#b5755c] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#b5755c]/90'
          >
            {t('cart.empty.subtitle')}
          </button>
        </div>
      );
    }

    return (
      <div className='space-y-4'>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className='flex items-center space-x-4 rounded-xl border border-[#b5755c]/10 bg-white p-4 shadow-sm'
          >
            <img
              src={item.primary_image || '/images/urun1.jfif'}
              alt={item.name}
              className='h-20 w-20 rounded-lg object-cover'
              onError={(e) => {
                e.target.src = '/images/urun1.jfif';
              }}
            />
            <div className='flex-1'>
              <h3 className='text-sm font-semibold text-[#b5755c]'>
                {i18n.language === 'tr' ? item.name_tr : item.name_en}
              </h3>
              <p className='text-xs text-[#b5755c]/60'>{item.category_name || 'Kategori'}</p>
              <div className='mt-2 flex items-center space-x-2'>
                <span className='text-lg font-bold text-[#b5755c]'>
                  {parseFloat(item.price).toFixed(2)} {getCurrencySymbol()}
                </span>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className='h-8 w-8 rounded-full bg-[#fee2ba] text-[#b5755c] transition-colors hover:bg-[#b5755c] hover:text-white'
              >
                <FaMinus className='mx-auto h-3 w-3' />
              </button>
              <span className='w-8 text-center font-semibold text-[#b5755c]'>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className='h-8 w-8 rounded-full bg-[#fee2ba] text-[#b5755c] transition-colors hover:bg-[#b5755c] hover:text-white'
              >
                <FaPlus className='mx-auto h-3 w-3' />
              </button>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className='rounded-full p-2 text-red-500 transition-colors hover:bg-red-50'
            >
              <FaTrash className='h-4 w-4' />
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderShippingForm = () => (
    <div className='rounded-xl border border-[#b5755c]/10 bg-white p-6 shadow-sm'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div>
          <label className='mb-2 block text-sm font-medium text-[#b5755c]'>
            {t('cart.shippingInfo.fullName')}
          </label>
          <div className='relative'>
            <HiOutlineUser className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[#b5755c]/50' />
            <input
              type='text'
              name='fullName'
              value={shippingInfo.fullName}
              onChange={handleShippingInfoChange}
              required
              className='w-full rounded-xl border border-[#b5755c]/20 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
              placeholder={i18n.language === 'tr' ? 'Ad Soyad' : 'Full Name'}
            />
          </div>
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium text-[#b5755c]'>
            {t('cart.shippingInfo.phone')}
          </label>
          <div className='relative'>
            <HiOutlinePhone className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[#b5755c]/50' />
            <input
              type='tel'
              name='phone'
              value={shippingInfo.phone}
              onChange={handleShippingInfoChange}
              required
              className='w-full rounded-xl border border-[#b5755c]/20 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
              placeholder='+90 5XX XXX XX XX'
            />
          </div>
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium text-[#b5755c]'>
            {t('cart.shippingInfo.email')}
          </label>
          <div className='relative'>
            <HiOutlineMail className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[#b5755c]/50' />
            <input
              type='email'
              name='email'
              value={shippingInfo.email}
              onChange={handleShippingInfoChange}
              required
              className='w-full rounded-xl border border-[#b5755c]/20 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
              placeholder='ornek@email.com'
            />
          </div>
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium text-[#b5755c]'>
            {t('cart.shippingInfo.city')}
          </label>
          <input
            type='text'
            name='city'
            value={shippingInfo.city}
            onChange={handleShippingInfoChange}
            required
            className='w-full rounded-xl border border-[#b5755c]/20 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
            placeholder={i18n.language === 'tr' ? 'Şehir' : 'City'}
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium text-[#b5755c]'>
            {t('cart.shippingInfo.district')}
          </label>
          <input
            type='text'
            name='district'
            value={shippingInfo.district}
            onChange={handleShippingInfoChange}
            required
            className='w-full rounded-xl border border-[#b5755c]/20 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
            placeholder={i18n.language === 'tr' ? 'İlçe' : 'District'}
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium text-[#b5755c]'>
            {t('cart.shippingInfo.zipCode')}
          </label>
          <input
            type='text'
            name='zipCode'
            value={shippingInfo.zipCode}
            onChange={handleShippingInfoChange}
            className='w-full rounded-xl border border-[#b5755c]/20 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
            placeholder='34000'
          />
        </div>
      </div>

      <div className='mt-4'>
        <label className='mb-2 block text-sm font-medium text-[#b5755c]'>
          {t('cart.shippingInfo.address')}
        </label>
        <textarea
          name='address'
          value={shippingInfo.address}
          onChange={handleShippingInfoChange}
          required
          rows='3'
          className='w-full rounded-xl border border-[#b5755c]/20 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
          placeholder={
            i18n.language === 'tr' ? 'Detaylı adres bilgisi' : 'Detailed address information'
          }
        />
      </div>

      <div className='mt-4'>
        <label className='mb-2 block text-sm font-medium text-[#b5755c]'>
          {t('cart.shippingInfo.notes')}
        </label>
        <textarea
          name='notes'
          value={shippingInfo.notes}
          onChange={handleShippingInfoChange}
          rows='2'
          className='w-full rounded-xl border border-[#b5755c]/20 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#b5755c]/20 focus:outline-none'
          placeholder={
            i18n.language === 'tr'
              ? 'Özel istekler, teslimat notları vb.'
              : 'Special requests, delivery notes, etc.'
          }
        />
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className='rounded-xl border border-[#b5755c]/10 bg-white p-6 shadow-sm'>
      <div className='mb-6 text-center'>
        <FaCreditCard className='mx-auto mb-4 h-16 w-16 text-[#b5755c]' />
        <h3 className='mb-2 text-xl font-bold text-[#b5755c]'>{t('cart.payment.title')}</h3>
        <p className='text-[#b5755c]/70'>{t('cart.payment.subtitle')}</p>
      </div>

      <div className='mb-6 rounded-xl bg-gradient-to-r from-[#fee2ba] to-[#fef3e2] p-6'>
        <div className='text-center'>
          <h4 className='mb-2 font-semibold text-[#b5755c]'>{t('cart.payment.bankInfo')}</h4>
          <div className='inline-block rounded-lg bg-white p-4'>
            <p className='mb-1 text-sm text-[#b5755c]/70'>{t('cart.payment.bankName')}</p>
            <p className='mb-3 font-mono text-lg font-bold text-[#b5755c]'>Ziraat Bankası</p>

            <p className='mb-1 text-sm text-[#b5755c]/70'>{t('cart.payment.iban')}</p>
            <p className='font-mono text-lg font-bold break-all text-[#b5755c]'>
              TR12 0001 0002 3456 7890 1234 56
            </p>

            <p className='mt-3 mb-1 text-sm text-[#b5755c]/70'>{t('cart.payment.recipient')}</p>
            <p className='font-semibold text-[#b5755c]'>RumyCookie</p>
          </div>
        </div>
      </div>

      <div className='text-center'>
        <h4 className='mb-4 font-semibold text-[#b5755c]'>{t('cart.payment.uploadReceipt')}</h4>
        <div className='rounded-xl border-2 border-dashed border-[#b5755c]/30 p-8 transition-colors hover:border-[#b5755c]/50'>
          <FaUpload className='mx-auto mb-4 h-12 w-12 text-[#b5755c]/50' />
          <input
            type='file'
            accept='image/*,.pdf'
            onChange={handleFileUpload}
            className='hidden'
            id='payment-proof'
          />
          <label
            htmlFor='payment-proof'
            className='cursor-pointer rounded-xl bg-[#b5755c] px-6 py-3 text-white transition-colors hover:bg-[#b5755c]/90'
          >
            {t('cart.payment.chooseFile')}
          </label>
          {paymentProof && (
            <div className='mt-4 text-sm text-green-600'>
              <FaCheckCircle className='mr-2 inline h-5 w-5' />
              {paymentProof.name}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderOrderSummary = () => (
    <div className='rounded-xl border border-[#b5755c]/10 bg-white p-6 shadow-sm'>
      <h3 className='mb-4 text-lg font-semibold text-[#b5755c]'>{t('cart.orderSummary.title')}</h3>

      <div className='mb-4 space-y-3'>
        <div className='flex justify-between'>
          <span className='text-[#b5755c]/70'>{t('cart.orderSummary.subtotal')}</span>
          <span className='font-semibold'>
            {calculateSubtotal().toFixed(2)} {getCurrencySymbol()}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-[#b5755c]/70'>{t('cart.orderSummary.shipping')}</span>
          <span className='font-semibold'>
            {userCountry === 'TR' ? t('cart.shipping.free') : `$15 USD`}
          </span>
        </div>
        <div className='border-t border-[#b5755c]/20 pt-3'>
          <div className='flex justify-between text-lg font-bold text-[#b5755c]'>
            <span>{t('cart.orderSummary.total')}</span>
            <span>
              {calculateTotal().toFixed(2)} {getCurrencySymbol()}
            </span>
          </div>
        </div>
      </div>

      {/* Kargo Bilgisi */}
      <div className='mb-4 rounded-lg bg-[#fee2ba] p-3'>
        <div className='flex items-center space-x-2 text-sm'>
          {userCountry === 'TR' ? (
            <>
              <span className='text-green-600'>🇹🇷</span>
              <span className='text-[#b5755c]'>{t('cart.shipping.turkey')}</span>
            </>
          ) : (
            <>
              <span className='text-blue-600'>🌍</span>
              <span className='text-[#b5755c]'>{t('cart.shipping.international')}</span>
            </>
          )}
        </div>
      </div>

      {currentStep === 1 && (
        <button
          onClick={nextStep}
          disabled={cartItems.length === 0}
          className='w-full rounded-xl bg-[#b5755c] py-3 font-semibold text-white transition-colors hover:bg-[#b5755c]/90 disabled:cursor-not-allowed disabled:bg-gray-300'
        >
          {t('cart.continue')}
        </button>
      )}

      {currentStep === 2 && (
        <div className='space-y-3'>
          <button
            onClick={prevStep}
            className='w-full rounded-xl bg-gray-500 py-3 font-semibold text-white transition-colors hover:bg-gray-600'
          >
            {t('cart.back')}
          </button>
          <button
            onClick={nextStep}
            className='w-full rounded-xl bg-[#b5755c] py-3 font-semibold text-white transition-colors hover:bg-[#b5755c]/90'
          >
            {t('cart.proceedToPayment')}
          </button>
        </div>
      )}

      {currentStep === 3 && (
        <div className='space-y-3'>
          <button
            onClick={prevStep}
            className='w-full rounded-xl bg-gray-500 py-3 font-semibold text-white transition-colors hover:bg-gray-600'
          >
            {t('cart.back')}
          </button>
          <button
            onClick={placeOrder}
            disabled={!paymentProof}
            className='w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300'
          >
            {t('cart.completeOrder')}
          </button>
        </div>
      )}
    </div>
  );

  const renderOrderConfirmation = () => (
    <div className='rounded-xl border border-[#b5755c]/10 bg-white p-8 text-center shadow-sm'>
      <FaCheckCircle className='mx-auto mb-6 h-20 w-20 text-green-500' />
      <h2 className='mb-4 text-2xl font-bold text-[#b5755c]'>{t('cart.confirmation.title')}</h2>
      <p className='mb-6 text-[#b5755c]/70'>{t('cart.confirmation.message')}</p>
      <div className='mb-6 rounded-xl bg-[#fee2ba] p-4'>
        <p className='text-sm text-[#b5755c]/70'>{t('cart.confirmation.orderNumber')}</p>
        <p className='font-mono text-lg font-bold text-[#b5755c]'>
          #RUMY-{Date.now().toString().slice(-6)}
        </p>
      </div>
      <button
        onClick={() => navigate('/')}
        className='rounded-xl bg-[#b5755c] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#b5755c]/90'
      >
        {t('cart.confirmation.backToHome')}
      </button>
    </div>
  );

  const steps = [
    { number: 1, title: t('cart.steps.cart'), icon: HiOutlineShoppingBag },
    { number: 2, title: t('cart.steps.shipping'), icon: FaMapMarkerAlt },
    { number: 3, title: t('cart.steps.payment'), icon: FaCreditCard },
    { number: 4, title: t('cart.steps.confirmation'), icon: FaCheckCircle },
  ];

  if (isLoading) {
    return (
      <div className='min-h-screen bg-white'>
        <Header />
        <div className='min-h-screen bg-gradient-to-br from-[#fef3e2] to-[#fee2ba] py-16'>
          <div className='mx-auto max-w-6xl px-6 text-center'>
            <div className='mx-auto h-16 w-16 animate-spin rounded-full border-b-2 border-[#b5755c]'></div>
            <p className='mt-4 text-[#b5755c]/70'>
              {i18n.language === 'tr' ? 'Yükleniyor...' : 'Loading...'}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white'>
      <Header />

      <div className='min-h-screen border-t border-black/40 bg-white pt-16'>
        <div className='mx-auto max-w-6xl px-6'>
          {/* Steps */}
          <div className='mb-8'>
            <div className='flex items-center justify-center space-x-4'>
              {steps.map((step, index) => (
                <div key={step.number} className='flex items-center'>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      currentStep >= step.number
                        ? 'border-[#b5755c] bg-[#b5755c] text-white'
                        : 'border-[#b5755c]/30 text-[#b5755c]/50'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <FaCheckCircle className='h-5 w-5' />
                    ) : (
                      <step.icon className='h-5 w-5' />
                    )}
                  </div>
                  <span
                    className={`ml-2 font-medium ${
                      currentStep >= step.number ? 'text-[#b5755c]' : 'text-[#b5755c]/50'
                    }`}
                  >
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <FaArrowRight
                      className={`mx-4 h-4 w-4 ${
                        currentStep > step.number ? 'text-[#b5755c]' : 'text-[#b5755c]/30'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            {/* Main Content */}
            <div className='lg:col-span-2'>
              {currentStep === 1 && (
                <div>
                  <div className='mb-6 flex items-center justify-between'>
                    <h2 className='text-2xl font-bold text-[#b5755c]'>{t('cart.title')}</h2>
                    {cartItems.length > 0 && (
                      <button
                        onClick={clearCart}
                        className='rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600'
                      >
                        {i18n.language === 'tr' ? 'Sepeti Temizle' : 'Clear Cart'}
                      </button>
                    )}
                  </div>
                  {renderCartItems()}
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className='mb-6 text-2xl font-bold text-[#b5755c]'>
                    {t('cart.shippingInfo.title')}
                  </h2>
                  {renderShippingForm()}
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h2 className='mb-6 text-2xl font-bold text-[#b5755c]'>
                    {t('cart.steps.payment')}
                  </h2>
                  {renderPayment()}
                </div>
              )}

              {currentStep === 4 && <div>{renderOrderConfirmation()}</div>}
            </div>

            {/* Sidebar */}
            <div className='lg:col-span-1'>{currentStep < 4 && renderOrderSummary()}</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
