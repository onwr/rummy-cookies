import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Kategori verileri
  const categories = [
    {
      id: 'dogum-gunu',
      name: 'Doğum Günü',
      nameEn: 'Birthday',
      productCount: 24,
      image: '/images/dogumgunu-kurabiye.jpg',
      color: 'from-pink-100/80 to-rose-200/80',
      description:
        'Her yaş için özel tasarlanmış, unutulmaz doğum günü kurabiyeleri. Renkli ve eğlenceli tasarımlarla özel gününüzü taçlandırın.',
      descriptionEn:
        'Special birthday cookies designed for every age. Crown your special day with colorful and fun designs.',
    },
    {
      id: 'baby-shower',
      name: 'Baby Shower',
      nameEn: 'Baby Shower',
      productCount: 18,
      image: '/images/babyshower',
      color: 'from-blue-100/80 to-cyan-200/80',
      description:
        'Bebek bekleyen anne adayları için özel tasarlanmış, pastel renklerde bebek temalı kurabiyeler. Bu özel günü unutulmaz kılın.',
      descriptionEn:
        'Specially designed baby-themed cookies in pastel colors for expectant mothers. Make this special day unforgettable.',
    },
    {
      id: 'halloween',
      name: 'Halloween',
      nameEn: 'Halloween',
      productCount: 15,
      image: '/images/hallowen.jpg',
      color: 'from-orange-100/80 to-red-200/80',
      description:
        'Korkunç ve eğlenceli Halloween kurabiyeleri. Cadı, balkabağı, hayalet ve diğer korkunç figürlerle partinizi canlandırın.',
      descriptionEn:
        'Scary and fun Halloween cookies. Bring your party to life with witches, pumpkins, ghosts and other scary figures.',
    },
    {
      id: 'yilbasi',
      name: 'Yılbaşı',
      nameEn: 'New Year',
      productCount: 22,
      image: '/images/yilbasi-kurabiye.jpg',
      color: 'from-green-100/80 to-emerald-200/80',
      description:
        'Yeni yıl kutlamaları için özel tasarlanmış, kış temalı kurabiyeler. Kar taneleri, çam ağaçları ve yılbaşı süsleriyle yılbaşınızı şenlendirin.',
      descriptionEn:
        'Special winter-themed cookies designed for New Year celebrations. Celebrate your New Year with snowflakes, pine trees and New Year decorations.',
    },
    {
      id: 'sevgililer-gunu',
      name: 'Sevgililer Günü',
      nameEn: "Valentine's Day",
      productCount: 20,
      image: '/images/sevgililergunu-kurabiye.jpg',
      color: 'from-red-100/80 to-pink-200/80',
      description:
        'Aşk ve romantizmin simgesi olan kalp şekilli kurabiyeler. Sevgilinize özel tasarım kurabiyelerle aşkınızı ifade edin.',
      descriptionEn:
        'Heart-shaped cookies symbolizing love and romance. Express your love with specially designed cookies for your loved one.',
    },
    {
      id: 'kurumsal',
      name: 'Kurumsal',
      nameEn: 'Corporate',
      productCount: 12,
      image: '/images/kurumsal-kurabiye.jpg',
      color: 'from-gray-100/80 to-slate-200/80',
      description:
        'Şirket logoları ve kurumsal kimlik ile uyumlu, profesyonel kurabiye tasarımları. İş toplantıları ve kurumsal etkinlikler için ideal.',
      descriptionEn:
        'Professional cookie designs compatible with company logos and corporate identity. Ideal for business meetings and corporate events.',
    },
  ];

  // Örnek ürün verileri
  const allProducts = [
    {
      id: 1,
      name: 'Çocuk Doğum Günü Seti',
      nameEn: "Children's Birthday Set",
      price: 89.99,
      image: '/images/urun1.jfif',
      category: 'dogum-gunu',
      badge: 'popular',
      stock: 15,
    },
    {
      id: 2,
      name: 'Bebek Arabası Kurabiyesi',
      nameEn: 'Baby Carriage Cookie',
      price: 45.99,
      image: '/images/urun2.jfif',
      category: 'baby-shower',
      badge: 'new',
      stock: 8,
    },
    {
      id: 3,
      name: 'Halloween Cadı Kurabiyesi',
      nameEn: 'Halloween Witch Cookie',
      price: 32.99,
      image: '/images/urun1.jfif',
      category: 'halloween',
      badge: 'custom',
      stock: 12,
    },
    {
      id: 4,
      name: 'Yılbaşı Çam Ağacı',
      nameEn: 'New Year Christmas Tree',
      price: 67.99,
      image: '/images/urun2.jfif',
      category: 'yilbasi',
      badge: 'bestseller',
      stock: 20,
    },
    {
      id: 5,
      name: 'Kalp Şekilli Sevgililer',
      nameEn: 'Heart Shaped Valentine',
      price: 38.99,
      image: '/images/urun1.jfif',
      category: 'sevgililer-gunu',
      badge: 'favorite',
      stock: 18,
    },
    {
      id: 6,
      name: 'Kurumsal Logo Seti',
      nameEn: 'Corporate Logo Set',
      price: 120.99,
      image: '/images/urun2.jfif',
      category: 'kurumsal',
      badge: 'corporate',
      stock: 5,
    },
  ];

  useEffect(() => {
    const currentCategory = categories.find((cat) => cat.id === id);
    if (currentCategory) {
      setCategory(currentCategory);
      const categoryProducts = allProducts.filter((product) => product.category === id);
      setProducts(categoryProducts);
    }
    setIsLoading(false);
  }, [id]);

  const handleProductClick = (productId) => {
    navigate(`/urun/${productId}`);
  };

  const getBadgeColor = (badge) => {
    const colors = {
      new: 'bg-emerald-500',
      popular: 'bg-blue-500',
      favorite: 'bg-rose-500',
      bestseller: 'bg-amber-500',
      custom: 'bg-violet-500',
      corporate: 'bg-slate-600',
    };
    return colors[badge] || 'bg-slate-500';
  };

  const getBadgeText = (badge) => {
    const texts = {
      new: t('products.badge.new'),
      popular: t('products.badge.popular'),
      favorite: t('products.badge.favorite'),
      bestseller: t('products.badge.bestseller'),
      custom: t('products.badge.custom'),
      corporate: t('products.badge.corporate'),
    };
    return texts[badge] || badge;
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50'>
          <div className='text-center'>
            <div className='mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-2 border-amber-400'></div>
            <p className='text-lg font-medium text-amber-600'>{t('categoryDetail.loading')}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!category) {
    return (
      <>
        <Header />
        <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50'>
          <div className='text-center'>
            <div className='mb-6 text-6xl'>🍪</div>
            <h1 className='mb-6 text-3xl font-bold text-amber-700'>
              {t('categoryDetail.notFound.title')}
            </h1>
            <button
              onClick={() => navigate('/')}
              className='rounded-full bg-amber-500 px-8 py-3 font-medium text-white shadow-lg transition-colors hover:bg-amber-600 hover:shadow-xl'
            >
              {t('categoryDetail.notFound.backToHome')}
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className='min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50'>
        {/* Hero Section */}
        <section className='relative pt-32 pb-20'>
          <div className='absolute inset-0 z-0'>
            <img
              src={category.image}
              alt={i18n.language === 'tr' ? category.name : category.nameEn}
              className='h-full w-full object-cover opacity-15'
            />
            <div className='absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85'></div>
          </div>

          <div className='relative z-10 mx-auto max-w-6xl px-6'>
            <div className='text-center'>
              <h1 className='mb-8 font-serif text-7xl font-light text-amber-700'>
                {i18n.language === 'tr' ? category.name : category.nameEn}
              </h1>
              <p className='mx-auto mb-10 max-w-4xl text-xl leading-relaxed font-medium text-amber-600'>
                {i18n.language === 'tr' ? category.description : category.descriptionEn}
              </p>
              <div className='inline-flex items-center rounded-full border border-amber-100 bg-white/90 px-8 py-4 shadow-xl backdrop-blur-sm'>
                <span className='text-xl font-semibold text-amber-700'>
                  {category.productCount} {t('products.unit')}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className='relative pb-24'>
          <div className='mx-auto max-w-7xl px-6'>
            <div className='mb-16 text-center'>
              <h2 className='mb-6 text-4xl font-light text-amber-700'>
                {i18n.language === 'tr' ? category.name : category.nameEn}{' '}
                {t('categoryDetail.products.title')}
              </h2>
              <p className='text-lg font-medium text-amber-600/80'>
                {t('categoryDetail.products.found', { count: products.length })}
              </p>
            </div>

            {products.length > 0 ? (
              <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className='group transform cursor-pointer transition-all duration-700 hover:-translate-y-3 hover:scale-105'
                  >
                    <div className='relative overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-xl transition-all duration-700 hover:shadow-2xl'>
                      {/* Product Image */}
                      <div className='relative h-72 overflow-hidden'>
                        <img
                          src={product.image}
                          alt={i18n.language === 'tr' ? product.name : product.nameEn}
                          className='h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110'
                        />

                        {/* Badge */}
                        {product.badge && (
                          <div
                            className={`absolute top-4 left-4 ${getBadgeColor(product.badge)} rounded-full px-4 py-2 text-xs font-bold text-white shadow-lg`}
                          >
                            {getBadgeText(product.badge)}
                          </div>
                        )}

                        {/* Stock Badge */}
                        <div className='absolute top-4 right-4 rounded-full border border-amber-200 bg-white/95 px-3 py-2 text-xs font-semibold text-amber-700 shadow-lg'>
                          {t('products.stock')}: {product.stock}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className='p-8'>
                        <h3 className='mb-4 line-clamp-2 text-xl leading-tight font-semibold text-amber-800'>
                          {i18n.language === 'tr' ? product.name : product.nameEn}
                        </h3>

                        <div className='flex items-center justify-between'>
                          <span className='text-3xl font-bold text-amber-600'>
                            {product.price} {t('products.currency.try')}
                          </span>

                          <button className='transform rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-amber-600 hover:shadow-lg'>
                            {t('products.addToCart')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='py-20 text-center'>
                <div className='mb-8 text-8xl'>🍪</div>
                <h3 className='mb-4 text-3xl font-light text-amber-700'>
                  {t('categoryDetail.products.empty.title')}
                </h3>
                <p className='mx-auto mb-8 max-w-2xl text-lg text-amber-600/80'>
                  {t('categoryDetail.products.empty.message')}
                </p>
                <button
                  onClick={() => navigate('/')}
                  className='transform rounded-full bg-amber-500 px-8 py-4 font-medium text-white shadow-lg transition-colors hover:scale-105 hover:bg-amber-600 hover:shadow-xl'
                >
                  {t('categoryDetail.products.empty.backToHome')}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Back to Home Button */}
        <div className='fixed right-8 bottom-8 z-50'>
          <button
            onClick={() => navigate('/')}
            className='hover:shadow-3xl rounded-full bg-amber-500 p-5 text-white shadow-2xl transition-all duration-500 hover:scale-110 hover:bg-amber-600'
          >
            <svg className='h-7 w-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryDetail;
