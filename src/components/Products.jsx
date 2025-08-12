import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa'

const Products = () => {
  const { t } = useTranslation()

  const products = [
    {
      id: 1,
      name: t('product.babyCarriage'),
      price: "₺45",
      image: "/images/urun1.jfif",
      badge: t('products.badge.new'),
      rating: 4.8,
      reviews: 24,
      stock: 15
    },
    {
      id: 2,
      name: t('product.babyRattle'),
      price: "₺38",
      image: "/images/urun2.jfif",
      badge: t('products.badge.popular'),
      rating: 4.9,
      reviews: 31,
      stock: 20
    },
    {
      id: 3,
      name: t('product.birthday'),
      price: "₺42",
      image: "/images/urun1.jfif",
      badge: t('products.badge.favorite'),
      rating: 4.7,
      reviews: 18,
      stock: 12
    },
    {
      id: 4,
      name: t('product.heart'),
      price: "₺35",
      image: "/images/urun2.jfif",
      badge: t('products.badge.bestseller'),
      rating: 4.9,
      reviews: 42,
      stock: 25
    },
    {
      id: 5,
      name: t('product.customDesign'),
      price: "₺55",
      image: "/images/urun1.jfif",
      badge: t('products.badge.custom'),
      rating: 5.0,
      reviews: 15,
      stock: 8
    },
    {
      id: 6,
      name: t('product.corporateSet'),
      price: "₺120",
      image: "/images/urun2.jfif",
      badge: t('products.badge.corporate'),
      rating: 4.8,
      reviews: 28,
      stock: 10
    },
    {
      id: 7,
      name: t('product.birthdayPackage'),
      price: "₺85",
      image: "/images/urun1.jfif",
      badge: t('products.badge.package'),
      rating: 4.9,
      reviews: 35,
      stock: 18
    },
    {
      id: 8,
      name: t('product.miniSet'),
      price: "₺28",
      image: "/images/urun2.jfif",
      badge: t('products.badge.mini'),
      rating: 4.6,
      reviews: 22,
      stock: 30
    }
  ]

  const addToCart = (productId) => {
    console.log(`Ürün sepete eklendi: ${productId}`)
    // Sepete ekleme fonksiyonu burada implement edilecek
  }

  const addToWishlist = (productId) => {
    console.log(`Ürün favorilere eklendi: ${productId}`)
    // Favorilere ekleme fonksiyonu burada implement edilecek
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#fee2ba]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-serif text-[#b5755c] mb-8">{t('products.title')}</h2>
          <p className="text-[#b5755c] max-w-3xl mx-auto text-xl leading-relaxed">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#b5755c]/5 overflow-hidden">
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-[#b5755c] to-[#b5755c]/80 text-white text-xs px-3 py-2 rounded-full font-semibold shadow-lg">
                    {product.badge}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <button 
                    onClick={() => addToWishlist(product.id)}
                    className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-[#fee2ba] transition-colors duration-200"
                  >
                    <FaHeart className="w-5 h-5 text-[#b5755c]" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-[#b5755c]/80 ml-2">({product.reviews})</span>
                </div>
                
                <h3 className="font-bold text-[#b5755c] mb-3 text-lg leading-tight">{product.name}</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <p className="text-2xl font-bold text-[#b5755c]">{product.price}</p>
                  <span className="text-sm text-[#b5755c]/80">{t('products.stock')}: {product.stock}+</span>
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={() => addToCart(product.id)}
                  className="w-full bg-gradient-to-r from-[#b5755c] to-[#b5755c]/90 text-white py-3 px-4 rounded-xl font-semibold hover:from-[#b5755c]/90 hover:to-[#b5755c] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group-hover:scale-105"
                >
                  <FaShoppingCart className="w-4 h-4" />
                  <span>{t('products.addToCart')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products