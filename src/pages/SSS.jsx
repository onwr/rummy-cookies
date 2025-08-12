import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  HiOutlineQuestionMarkCircle,
  HiOutlineChevronDown,
  HiOutlineTruck,
  HiOutlineRefresh,
  HiOutlineExclamation,
  HiOutlineClock
} from 'react-icons/hi'
import Header from '../components/Header'
import Footer from '../components/Footer'

const SSS = () => {
  const { t } = useTranslation()
  const [openQuestions, setOpenQuestions] = useState(new Set())

  const toggleQuestion = (questionId) => {
    const newOpenQuestions = new Set(openQuestions)
    if (newOpenQuestions.has(questionId)) {
      newOpenQuestions.delete(questionId)
    } else {
      newOpenQuestions.add(questionId)
    }
    setOpenQuestions(newOpenQuestions)
  }

  const faqData = [
    {
      id: 1,
      icon: <HiOutlineTruck className="w-6 h-6" />,
      question: t('faq.delivery.question'),
      answer: t('faq.delivery.answer')
    },
    {
      id: 2,
      icon: <HiOutlineRefresh className="w-6 h-6" />,
      question: t('faq.return.question'),
      answer: t('faq.return.answer')
    },
    {
      id: 3,
      icon: <HiOutlineExclamation className="w-6 h-6" />,
      question: t('faq.allergens.question'),
      answer: t('faq.allergens.answer')
    },
    {
      id: 4,
      icon: <HiOutlineClock className="w-6 h-6" />,
      question: t('faq.advanceOrder.question'),
      answer: t('faq.advanceOrder.answer')
    },
    {
      id: 5,
      icon: <HiOutlineQuestionMarkCircle className="w-6 h-6" />,
      question: t('faq.customDesign.question'),
      answer: t('faq.customDesign.answer')
    },
    {
      id: 6,
      icon: <HiOutlineQuestionMarkCircle className="w-6 h-6" />,
      question: t('faq.payment.question'),
      answer: t('faq.payment.answer')
    },
    {
      id: 7,
      icon: <HiOutlineQuestionMarkCircle className="w-6 h-6" />,
      question: t('faq.storage.question'),
      answer: t('faq.storage.answer')
    },
    {
      id: 8,
      icon: <HiOutlineQuestionMarkCircle className="w-6 h-6" />,
      question: t('faq.corporate.question'),
      answer: t('faq.corporate.answer')
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-[#fee2ba]/20 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-serif text-[#b5755c] mb-8 leading-tight">
            {t('faq.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-[#b5755c]/80 max-w-4xl mx-auto leading-relaxed">
            {t('faq.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-24 bg-[#fee2ba]/20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#b5755c]/10 p-8 md:p-12">
            <div className="space-y-6">
              {faqData.map((faq) => (
                <div key={faq.id} className="border border-[#b5755c]/10 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleQuestion(faq.id)}
                    className="w-full px-6 py-5 text-left hover:bg-[#fee2ba]/20 transition-colors duration-200 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-[#b5755c]">
                        {faq.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-[#b5755c]">
                        {faq.question}
                      </h3>
                    </div>
                    <HiOutlineChevronDown 
                      className={`w-5 h-5 text-[#b5755c] transition-transform duration-200 ${
                        openQuestions.has(faq.id) ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {openQuestions.has(faq.id) && (
                    <div className="px-6 pb-5 border-t border-[#b5755c]/10">
                      <p className="text-[#b5755c]/80 leading-relaxed mt-4">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-12 pt-8 border-t border-[#b5755c]/10">
              <div className="text-center">
                <h3 className="text-2xl font-serif text-[#b5755c] mb-4">
                  {t('faq.contact.title')}
                </h3>
                <p className="text-[#b5755c]/80 mb-6">
                  {t('faq.contact.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/ozel-siparis"
                    className="bg-gradient-to-r from-[#b5755c] to-[#b5755c]/90 text-white px-8 py-3 rounded-full font-semibold hover:from-[#b5755c]/90 hover:to-[#b5755c] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {t('faq.contact.customOrder')}
                  </a>
                  <a 
                    href="mailto:info@rumycookie.com"
                    className="border-2 border-[#b5755c] text-[#b5755c] px-8 py-3 rounded-full font-semibold hover:bg-[#b5755c] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {t('faq.contact.email')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default SSS