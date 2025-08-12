import React from 'react'
import { useTranslation } from 'react-i18next'
import { 
  HiOutlineHeart, 
  HiOutlineStar, 
  HiOutlineShieldCheck, 
  HiOutlineLightBulb,
  HiOutlineCake,
  HiOutlineUsers,
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail
} from 'react-icons/hi'
import Header from '../components/Header'
import Footer from '../components/Footer'

const About = () => {
  const { t } = useTranslation()

  const values = [
    {
      icon: <HiOutlineHeart className="w-8 h-8" />,
      title: t('about.values.passion.title'),
      description: t('about.values.passion.description')
    },
    {
      icon: <HiOutlineStar className="w-8 h-8" />,
      title: t('about.values.quality.title'),
      description: t('about.values.quality.description')
    },
    {
      icon: <HiOutlineShieldCheck className="w-8 h-8" />,
      title: t('about.values.trust.title'),
      description: t('about.values.trust.description')
    },
    {
      icon: <HiOutlineLightBulb className="w-8 h-8" />,
      title: t('about.values.creativity.title'),
      description: t('about.values.creativity.description')
    }
  ]

  const team = [
    {
      name: 'Ayşe Yılmaz',
      role: t('about.team.founder.role'),
      image: '/images/team1.jpg',
      description: t('about.team.founder.description')
    },
    {
      name: 'Mehmet Demir',
      role: t('about.team.chef.role'),
      image: '/images/team2.jpg',
      description: t('about.team.chef.description')
    },
    {
      name: 'Fatma Kaya',
      role: t('about.team.designer.role'),
      image: '/images/team3.jpg',
      description: t('about.team.designer.description')
    }
  ]

  return (
    <div className="min-h-screen bg-white">
        <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#fee2ba]/40 via-white to-[#fef3e2]/40 py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-serif text-[#b5755c] mb-8 leading-tight">
            {t('about.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-[#b5755c]/80 max-w-4xl mx-auto leading-relaxed mb-12">
            {t('about.hero.subtitle')}
          </p>
          <div className="flex justify-center">
            <img 
              src="/logo.png" 
              alt="RumyCookie Logo" 
              className="h-24 w-auto drop-shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif text-[#b5755c] mb-8">
                {t('about.story.title')}
              </h2>
              <div className="space-y-6 text-[#b5755c]/80 text-lg leading-relaxed">
                <p>{t('about.story.paragraph1')}</p>
                <p>{t('about.story.paragraph2')}</p>
                <p>{t('about.story.paragraph3')}</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#fee2ba] to-[#b5755c] rounded-3xl p-8 shadow-2xl">
                <HiOutlineCake className="w-32 h-32 text-white mx-auto" />
                <h3 className="text-2xl font-serif text-white text-center mt-6">
                  {t('about.story.mission')}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-gradient-to-b from-white to-[#fee2ba]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif text-[#b5755c] mb-8">
              {t('about.values.title')}
            </h2>
            <p className="text-xl text-[#b5755c]/80 max-w-3xl mx-auto">
              {t('about.values.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#fee2ba] to-[#b5755c] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 text-white">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#b5755c] mb-4">
                  {value.title}
                </h3>
                <p className="text-[#b5755c]/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Info */}
      <section className="py-24 bg-gradient-to-br from-[#fee2ba]/20 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif text-[#b5755c] mb-8">
              {t('about.contact.title')}
            </h2>
            <p className="text-xl text-[#b5755c]/80 max-w-3xl mx-auto">
              {t('about.contact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#fee2ba] to-[#b5755c] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <HiOutlineLocationMarker className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#b5755c] mb-3">
                {t('about.contact.address.title')}
              </h3>
              <p className="text-[#b5755c]/70">
                {t('about.contact.address.value')}
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#fee2ba] to-[#b5755c] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <HiOutlinePhone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#b5755c] mb-3">
                {t('about.contact.phone.title')}
              </h3>
              <p className="text-[#b5755c]/70">
                {t('about.contact.phone.value')}
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#fee2ba] to-[#b5755c] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <HiOutlineMail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#b5755c] mb-3">
                {t('about.contact.email.title')}
              </h3>
              <p className="text-[#b5755c]/70">
                {t('about.contact.email.value')}
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default About