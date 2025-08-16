import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaCheck,
} from 'react-icons/fa';
import { HiOutlineHeart } from 'react-icons/hi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { cartAPI, wishlistAPI } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Mock ürün verisi - gerçek uygulamada API'den gelecek
  const product = {
    id: id,
    name:
      i18n.language === 'tr'
        ? 'Özel Tasarım Baby Shower Kurabiye Seti'
        : 'Custom Design Baby Shower Cookie Set',
    price: '₺85',
    originalPrice: '₺95',
    discount: i18n.language === 'tr' ? '10%' : '10%',
    images: [
      '/images/urun1.jfif',
      '/images/urun2.jfif',
      '/images/urun1.jfif',
      '/images/urun2.jfif',
    ],
    description:
      i18n.language === 'tr'
        ? 'Baby Shower partileri için özel olarak tasarlanmış, el yapımı kurabiye seti. Her kurabiye benzersiz tasarıma sahip ve özel ambalajda sunulur.'
        : 'Specially designed handmade cookie set for Baby Shower parties. Each cookie has a unique design and comes in special packaging.',
    category: i18n.language === 'tr' ? 'Baby Shower' : 'Baby Shower',
    rating: 4.9,
    reviews: 127,
    stock: 25,
    weight: '500g',
    ingredients:
      i18n.language === 'tr'
        ? ['Un', 'Tereyağı', 'Şeker', 'Yumurta', 'Vanilya', 'Doğal Gıda Boyası']
        : ['Flour', 'Butter', 'Sugar', 'Egg', 'Vanilla', 'Natural Food Coloring'],
    allergens: i18n.language === 'tr' ? ['Gluten', 'Süt', 'Yumurta'] : ['Gluten', 'Milk', 'Egg'],
    features:
      i18n.language === 'tr'
        ? [
            'El yapımı',
            'Doğal malzemeler',
            'Özel ambalaj',
            'Kişiselleştirilebilir',
            'Hızlı teslimat',
          ]
        : [
            'Handmade',
            'Natural ingredients',
            'Special packaging',
            'Personalizable',
            'Fast delivery',
          ],
  };

  // Mock yorum verisi
  const reviews = [
    {
      id: 1,
      user: 'Ayşe K.',
      rating: 5,
      date: i18n.language === 'tr' ? '2 gün önce' : '2 days ago',
      comment:
        i18n.language === 'tr'
          ? 'Harika bir ürün! Baby shower partimde çok beğenildi. Kurabiyeler hem lezzetli hem de çok güzel görünüyordu.'
          : 'Amazing product! It was very well received at my baby shower party. The cookies were both delicious and very beautiful.',
      verified: true,
    },
    {
      id: 2,
      user: 'Mehmet S.',
      rating: 5,
      date: i18n.language === 'tr' ? '1 hafta önce' : '1 week ago',
      comment:
        i18n.language === 'tr'
          ? 'Çok kaliteli ve taze kurabiyeler. Teslimat da çok hızlıydı. Kesinlikle tavsiye ederim!'
          : 'Very high quality and fresh cookies. Delivery was also very fast. I definitely recommend it!',
      verified: true,
    },
    {
      id: 3,
      user: 'Zeynep A.',
      rating: 4,
      date: i18n.language === 'tr' ? '2 hafta önce' : '2 weeks ago',
      comment:
        i18n.language === 'tr'
          ? 'Güzel ürün ama biraz daha büyük olabilirdi. Yine de çok memnun kaldım.'
          : 'Nice product but could be a bit bigger. Still, I was very satisfied.',
      verified: false,
    },
  ];

  const addToCart = async () => {
    try {
      const response = await cartAPI.add({ 
        product_id: product.id, 
        quantity: quantity 
      });
      if (response.success) {
        console.log('Ürün sepete eklendi');
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      }
    } catch (error) {
      console.error('Sepete eklenirken hata:', error);
    }
  };

  const toggleWishlist = async () => {
    try {
      if (isInWishlist) {
        const response = await wishlistAPI.remove({ product_id: product.id });
        if (response.success) {
          setIsInWishlist(false);
        }
      } else {
        const response = await wishlistAPI.add({ product_id: product.id });
        if (response.success) {
          setIsInWishlist(true);
        }
      }
    } catch (error) {
      console.error('Favori işlemi hatası:', error);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
    ));
  };

  return (
    <div className='min-h-screen bg-white'>
      <Header />

      <div className='min-h-screen bg-gradient-to-b from-white to-[#fee2ba]/10'>
        {/* Breadcrumb */}
        <div className='border-b border-[#b5755c]/10 bg-white'>
          <div className='mx-auto max-w-7xl px-6 py-4'>
            <nav className='flex items-center space-x-2 text-sm text-[#b5755c]/70'>
              <a href='/' className='transition-colors hover:text-[#b5755c]'>
                {i18n.language === 'tr' ? 'Ana Sayfa' : 'Home'}
              </a>
              <span>/</span>
              <a href='/#kategoriler' className='transition-colors hover:text-[#b5755c]'>
                {i18n.language === 'tr' ? 'Kategoriler' : 'Categories'}
              </a>
              <span>/</span>
              <span className='text-[#b5755c]'>{product.name}</span>
            </nav>
          </div>
        </div>

        <div className='mx-auto max-w-7xl px-6 py-12'>
          {/* Product Main Section */}
          <div className='mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2'>
            {/* Product Images */}
            <div className='space-y-4'>
              <div className='aspect-square overflow-hidden rounded-3xl bg-white shadow-lg'>
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='grid grid-cols-4 gap-3'>
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                      selectedImage === index
                        ? 'border-[#b5755c] shadow-lg'
                        : 'border-gray-200 hover:border-[#b5755c]/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className='h-full w-full object-cover'
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className='space-y-6'>
              {/* Header */}
              <div>
                <div className='mb-3 flex items-center space-x-3'>
                  <span className='rounded-full bg-[#b5755c]/10 px-3 py-1 text-sm font-medium text-[#b5755c]'>
                    {product.category}
                  </span>
                  {product.discount && (
                    <span className='rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white'>
                      {i18n.language === 'tr' ? 'İndirim' : 'Discount'} {product.discount}
                    </span>
                  )}
                </div>

                <h1 className='mb-3 text-4xl font-bold text-[#b5755c]'>{product.name}</h1>

                <div className='mb-4 flex items-center space-x-4'>
                  <div className='flex items-center space-x-1'>
                    {renderStars(product.rating)}
                    <span className='ml-2 text-lg font-semibold text-[#b5755c]'>
                      {product.rating}
                    </span>
                  </div>
                  <span className='text-[#b5755c]/70'>
                    ({product.reviews} {i18n.language === 'tr' ? 'yorum' : 'reviews'})
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className='flex items-center space-x-4'>
                <span className='text-4xl font-bold text-[#b5755c]'>{product.price}</span>
                {product.originalPrice && (
                  <span className='text-2xl text-gray-400 line-through'>
                    {product.originalPrice}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className='text-lg leading-relaxed text-[#b5755c]/80'>{product.description}</p>

              {/* Features */}
              <div className='space-y-3'>
                <h3 className='text-lg font-semibold text-[#b5755c]'>
                  {i18n.language === 'tr' ? 'Özellikler' : 'Features'}
                </h3>
                <div className='grid grid-cols-2 gap-2'>
                  {product.features.map((feature, index) => (
                    <div key={index} className='flex items-center space-x-2'>
                      <FaCheck className='h-4 w-4 text-green-500' />
                      <span className='text-[#b5755c]/80'>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className='space-y-4'>
                <div className='flex items-center space-x-4'>
                  <label className='text-lg font-semibold text-[#b5755c]'>
                    {i18n.language === 'tr' ? 'Miktar:' : 'Quantity:'}
                  </label>
                  <div className='flex items-center rounded-lg border border-[#b5755c]/20'>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className='px-4 py-2 text-[#b5755c] transition-colors hover:bg-[#fee2ba]/50'
                    >
                      -
                    </button>
                    <span className='min-w-[3rem] px-4 py-2 text-center text-lg font-semibold text-[#b5755c]'>
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className='px-4 py-2 text-[#b5755c] transition-colors hover:bg-[#fee2ba]/50'
                    >
                      +
                    </button>
                  </div>
                  <span className='text-[#b5755c]/70'>
                    {i18n.language === 'tr' ? 'Stok:' : 'Stock:'} {product.stock}+
                  </span>
                </div>

                <div className='flex space-x-4'>
                  <button
                    onClick={addToCart}
                    className='flex flex-1 items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-[#b5755c] to-[#b5755c]/90 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:from-[#b5755c]/90 hover:to-[#b5755c] hover:shadow-xl'
                  >
                    <FaShoppingCart className='h-5 w-5' />
                    <span>{i18n.language === 'tr' ? 'Sepete Ekle' : 'Add to Cart'}</span>
                  </button>
                  <button
                    onClick={toggleWishlist}
                    className={`flex h-16 w-16 items-center justify-center rounded-xl border-2 transition-all duration-200 ${
                      isInWishlist
                        ? 'border-[#b5755c] bg-[#b5755c] text-white'
                        : 'border-[#b5755c]/20 text-[#b5755c] hover:border-[#b5755c] hover:bg-[#fee2ba]/50'
                    }`}
                  >
                    <HiOutlineHeart className={`h-6 w-6 ${isInWishlist ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <div className='grid grid-cols-2 gap-4 border-t border-[#b5755c]/10 pt-6'>
                <div className='text-center'>
                  <FaTruck className='mx-auto mb-2 h-8 w-8 text-[#b5755c]' />
                  <p className='text-sm text-[#b5755c]/80'>
                    {i18n.language === 'tr' ? 'Hızlı Teslimat' : 'Fast Delivery'}
                  </p>
                </div>
                <div className='text-center'>
                  <FaShieldAlt className='mx-auto mb-2 h-8 w-8 text-[#b5755c]' />
                  <p className='text-sm text-[#b5755c]/80'>
                    {i18n.language === 'tr' ? 'Güvenli Ödeme' : 'Secure Payment'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className='mb-16 rounded-3xl bg-white p-8 shadow-lg'>
            <h2 className='mb-8 text-3xl font-bold text-[#b5755c]'>
              {i18n.language === 'tr' ? 'Ürün Detayları' : 'Product Details'}
            </h2>

            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
              <div>
                <h3 className='mb-4 text-xl font-semibold text-[#b5755c]'>
                  {i18n.language === 'tr' ? 'İçindekiler' : 'Ingredients'}
                </h3>
                <div className='space-y-2'>
                  {product.ingredients.map((ingredient, index) => (
                    <div key={index} className='flex items-center space-x-2'>
                      <div className='h-2 w-2 rounded-full bg-[#b5755c]'></div>
                      <span className='text-[#b5755c]/80'>{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className='mb-4 text-xl font-semibold text-[#b5755c]'>
                  {i18n.language === 'tr' ? 'Alerjenler' : 'Allergens'}
                </h3>
                <div className='space-y-2'>
                  {product.allergens.map((allergen, index) => (
                    <div key={index} className='flex items-center space-x-2'>
                      <div className='h-2 w-2 rounded-full bg-red-500'></div>
                      <span className='text-[#b5755c]/80'>{allergen}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className='rounded-3xl bg-white p-8 shadow-lg'>
            <div className='mb-8 flex items-center justify-between'>
              <h2 className='text-3xl font-bold text-[#b5755c]'>
                {i18n.language === 'tr' ? 'Müşteri Yorumları' : 'Customer Reviews'}
              </h2>
              <div className='flex items-center space-x-2'>
                <div className='flex items-center space-x-1'>{renderStars(product.rating)}</div>
                <span className='text-lg font-semibold text-[#b5755c]'>{product.rating}</span>
                <span className='text-[#b5755c]/70'>
                  ({product.reviews} {i18n.language === 'tr' ? 'yorum' : 'reviews'})
                </span>
              </div>
            </div>

            <div className='space-y-6'>
              {reviews.map((review) => (
                <div key={review.id} className='border-b border-[#b5755c]/10 pb-6 last:border-b-0'>
                  <div className='mb-3 flex items-start justify-between'>
                    <div className='flex items-center space-x-3'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#fee2ba] to-[#b5755c] font-semibold text-white'>
                        {review.user.charAt(0)}
                      </div>
                      <div>
                        <div className='flex items-center space-x-2'>
                          <span className='font-semibold text-[#b5755c]'>{review.user}</span>
                          {review.verified && (
                            <span className='rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700'>
                              {i18n.language === 'tr' ? 'Doğrulanmış' : 'Verified'}
                            </span>
                          )}
                        </div>
                        <div className='mt-1 flex items-center space-x-1'>
                          {renderStars(review.rating)}
                          <span className='ml-2 text-sm text-[#b5755c]/70'>{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className='leading-relaxed text-[#b5755c]/80'>{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Write Review Button */}
            <div className='mt-8 text-center'>
              <button className='rounded-xl bg-gradient-to-r from-[#b5755c] to-[#b5755c]/90 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-[#b5755c]/90 hover:to-[#b5755c] hover:shadow-xl'>
                {i18n.language === 'tr' ? 'Yorum Yaz' : 'Write Review'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
