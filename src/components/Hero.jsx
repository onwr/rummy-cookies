import React from 'react'
import { useTranslation } from 'react-i18next'

const Hero = () => {
  const { t } = useTranslation()

  return (
    <section className="w-full">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#fee2ba]/40 via-white to-[#fef3e2]/40 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-8xl font-serif text-[#b5755c] mb-8 leading-tight">
              {t('hero.title.main')}<br />
              <span className="text-[#b5755c]/70 font-light">{t('hero.title.sub')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#b5755c]/60 font-light mb-10 max-w-4xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
            <button className="bg-gradient-to-r from-[#b5755c] to-[#b5755c]/90 text-white px-12 py-5 rounded-full font-semibold hover:from-[#b5755c]/90 hover:to-[#b5755c] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg">
              {t('hero.cta.explore')}
            </button>
            <button className="border-2 border-[#b5755c] text-[#b5755c] px-12 py-5 rounded-full font-semibold hover:bg-[#b5755c] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
              {t('hero.cta.customOrder')}
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#fee2ba] to-[#fef3e2] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <svg className="w-10 h-10 text-[#b5755c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#b5755c] mb-3">{t('hero.trust.handmade')}</h3>
              <p className="text-[#b5755c]/60 text-base leading-relaxed">{t('hero.trust.handmade.desc')}</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#fee2ba] to-[#fef3e2] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <svg className="w-10 h-10 text-[#b5755c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#b5755c] mb-3">{t('hero.trust.delivery')}</h3>
              <p className="text-[#b5755c]/60 text-base leading-relaxed">{t('hero.trust.delivery.desc')}</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#fee2ba] to-[#fef3e2] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <svg className="w-10 h-10 text-[#b5755c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#b5755c] mb-3">{t('hero.trust.satisfaction')}</h3>
              <p className="text-[#b5755c]/60 text-base leading-relaxed">{t('hero.trust.satisfaction.desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero