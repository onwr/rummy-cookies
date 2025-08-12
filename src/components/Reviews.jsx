import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'

const Reviews = () => {
  const { t } = useTranslation()

  const reviews = [
    {
      id: 1,
      name: "Ayşe K.",
      rating: 5,
      comment: "Doğum günü kurabiyelerimiz harika oldu! Çocuklarım çok beğendi. Kesinlikle tekrar sipariş vereceğim.",
      avatar: "AK",
      date: "2 gün önce"
    },
    {
      id: 2,
      name: "Mehmet Y.",
      rating: 5,
      comment: "Kurumsal siparişimiz için mükemmel kurabiyeler hazırladılar. Profesyonel yaklaşımları için teşekkürler.",
      avatar: "MY",
      date: "1 hafta önce"
    },
    {
      id: 3,
      name: "Fatma S.",
      rating: 5,
      comment: "Özel tasarım kurabiyelerimiz hayal ettiğimizden daha güzel çıktı. Çok teşekkür ederiz!",
      avatar: "FS",
      date: "3 gün önce"
    },
    {
      id: 4,
      name: "Ali R.",
      rating: 5,
      comment: "Hızlı teslimat ve mükemmel kalite. Arkadaşlarım da çok beğendi, hepsi sipariş verdi.",
      avatar: "AR",
      date: "5 gün önce"
    },
    {
      id: 5,
      name: "Zeynep M.",
      rating: 5,
      comment: "Nişan törenimiz için özel kurabiyeler yaptırdık. Herkes çok beğendi, çok teşekkürler!",
      avatar: "ZM",
      date: "1 hafta önce"
    },
    {
      id: 6,
      name: "Can D.",
      rating: 5,
      comment: "Kurumsal hediye olarak sipariş verdik. Müşterilerimiz çok memnun kaldı. Teşekkürler!",
      avatar: "CD",
      date: "4 gün önce"
    }
  ]

  return (
    <section id="yorumlar" className="py-24 bg-gradient-to-br from-[#fee2ba]/20 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-serif text-[#b5755c] mb-8">{t('reviews.title')}</h2>
          <p className="text-[#b5755c]/60 max-w-3xl mx-auto text-xl leading-relaxed">
            {t('reviews.subtitle')}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#b5755c]/5 group hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fee2ba] to-[#b5755c] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  {review.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[#b5755c] text-lg">{review.name}</h4>
                  <div className="flex items-center space-x-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-[#b5755c]/40">{review.date}</span>
                </div>
              </div>
              <div className="relative">
                <FaQuoteLeft className="absolute -top-2 -left-2 text-[#b5755c]/20 w-6 h-6" />
                <p className="text-[#b5755c]/70 leading-relaxed text-base italic">
                  "{review.comment}"
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Reviews
