import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import ScrollAnimation from '../components/ScrollAnimation';
import AnimatedDashboard from '../components/AnimatedDashboard';
import AIAnimation from '../components/AIAnimation';
import DarkVeil from '../components/DarkVeil';
import { usePageTranslation } from '../contexts/LanguageContext';

const Home: NextPage = () => {
  const { t } = usePageTranslation('home');

  return (
    <Layout title={t('title')}>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full">
            <DarkVeil
              hueShift={0}
              noiseIntensity={0}
              scanlineIntensity={0}
              speed={1.6}
              scanlineFrequency={0.5}
              warpAmount={1}
              resolutionScale={1}
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 z-20 h-full flex items-center">
          <ScrollAnimation animationType="fadeInUp" duration={1} className="w-full">
            <div className="text-center w-full">
              <h1 className="text-6xl md:text-8xl font-thin text-white mb-2 tracking-tight">
                {t('hero.write')} <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{t('hero.python')}</span>
              </h1>

              <div className="text-5xl md:text-7xl font-thin text-white/70 mb-12">
                {t('hero.likeAPro')}
              </div>

              <p className="text-lg text-white/60 mb-16 max-w-xl mx-auto font-light leading-relaxed">
                {t('hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button className="group bg-white text-gray-900 font-medium py-3 px-8 rounded-md hover:bg-gray-100 transition-all duration-300 shadow-xl backdrop-blur-sm"
                  onClick={() => window.location.href = '/theory'}
                >
                  <span className="flex items-center">
                    {t('hero.startLearning')}
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
                <button className="border border-white/30 text-white hover:bg-white/10 font-medium py-3 px-8 rounded-md transition-all duration-300 backdrop-blur-sm"
                  onClick={() => window.location.href = '/practice'}
                >
                  {t('hero.tryEditor')}
                </button>
              </div>

              <div className="flex gap-12 justify-center text-white/40 text-sm">
                <div>
                  <span className="text-2xl font-light text-white/60">17</span>
                  <span className="ml-2">{t('hero.topics')}</span>
                </div>
                <div>
                  <span className="text-2xl font-light text-white/60">50+</span>
                  <span className="ml-2">{t('hero.exercises')}</span>
                </div>
                <div>
                  <span className="text-2xl font-light text-white/60">&infin;</span>
                  <span className="ml-2">{t('hero.practice')}</span>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="text-white/60 hover:text-white/80 transition-colors"
            aria-label="Scroll down"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </section>

      {/* Features Overview */}
      <div className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animationType="fadeInUp" duration={0.8}>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-thin text-white mb-6">
                {t('features.title')}
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                {t('features.subtitle')}
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <ScrollAnimation animationType="fadeInUp" delay={200} duration={0.6}>
              <div className="text-center group">
                <div className="w-16 h-16 rounded-full border border-gray-800 flex items-center justify-center mx-auto mb-6 group-hover:border-indigo-500 transition-all duration-300">
                  <svg className="w-8 h-8 text-gray-500 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-light text-white mb-3">{t('features.structuredTheory')}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{t('features.structuredTheoryDesc')}</p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animationType="fadeInUp" delay={400} duration={0.6}>
              <div className="text-center group">
                <div className="w-16 h-16 rounded-full border border-gray-800 flex items-center justify-center mx-auto mb-6 group-hover:border-green-500 transition-all duration-300">
                  <svg className="w-8 h-8 text-gray-500 group-hover:text-green-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-light text-white mb-3">{t('features.interactivePractice')}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{t('features.interactivePracticeDesc')}</p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animationType="fadeInUp" delay={600} duration={0.6}>
              <div className="text-center group">
                <div className="w-16 h-16 rounded-full border border-gray-800 flex items-center justify-center mx-auto mb-6 group-hover:border-purple-500 transition-all duration-300">
                  <svg className="w-8 h-8 text-gray-500 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-light text-white mb-3">{t('features.liveCodeEditor')}</h3>
                <p className="text-gray-500 font-light leading-relaxed mb-4">{t('features.liveCodeEditorDesc')}</p>
                <a href="/practice" className="text-purple-400 hover:text-purple-300 text-sm font-light transition-colors">
                  {t('features.tryItNow')}
                </a>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animationType="fadeInUp" delay={800} duration={0.6}>
              <div className="text-center group">
                <div className="w-16 h-16 rounded-full border border-gray-800 flex items-center justify-center mx-auto mb-6 group-hover:border-cyan-500 transition-all duration-300">
                  <svg className="w-8 h-8 text-gray-500 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-light text-white mb-3">{t('features.aiAssistant')}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{t('features.aiAssistantDesc')}</p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>

      {/* Curriculum Section */}
      <div className="py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animationType="fadeInUp" duration={0.8}>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-thin text-white mb-6">
                {t('curriculum.title')}
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                {t('curriculum.subtitle')}
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid lg:grid-cols-2 gap-8">
            <ScrollAnimation animationType="scaleIn" delay={200} duration={0.7}>
              <div className="bg-black border border-gray-800 rounded-lg p-8 hover:border-gray-700 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="text-3xl font-thin text-indigo-400 mr-4">01</div>
                  <h3 className="text-2xl font-light text-white">{t('curriculum.foundation')}</h3>
                </div>
                <ul className="space-y-4">
                  {[0, 1, 2, 3].map((i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-1 h-1 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-400 font-light">{t(`curriculum.foundationItems.${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animationType="scaleIn" delay={400} duration={0.7}>
              <div className="bg-black border border-gray-800 rounded-lg p-8 hover:border-gray-700 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="text-3xl font-thin text-purple-400 mr-4">02</div>
                  <h3 className="text-2xl font-light text-white">{t('curriculum.intermediate')}</h3>
                </div>
                <ul className="space-y-4">
                  {[0, 1, 2, 3].map((i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-1 h-1 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-400 font-light">{t(`curriculum.intermediateItems.${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animationType="scaleIn" delay={600} duration={0.7}>
              <div className="bg-black border border-gray-800 rounded-lg p-8 hover:border-gray-700 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="text-3xl font-thin text-green-400 mr-4">03</div>
                  <h3 className="text-2xl font-light text-white">{t('curriculum.advanced')}</h3>
                </div>
                <ul className="space-y-4">
                  {[0, 1, 2, 3].map((i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-1 h-1 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-400 font-light">{t(`curriculum.advancedItems.${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animationType="scaleIn" delay={800} duration={0.7}>
              <div className="bg-black border border-gray-800 rounded-lg p-8 hover:border-gray-700 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="text-3xl font-thin text-orange-400 mr-4">04</div>
                  <h3 className="text-2xl font-light text-white">{t('curriculum.realProjects')}</h3>
                </div>
                <ul className="space-y-4">
                  {[0, 1, 2, 3].map((i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-1 h-1 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-400 font-light">{t(`curriculum.realProjectsItems.${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>

      {/* Interactive Learning Section */}
      <div className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation animationType="slideInLeft" duration={0.8}>
              <div>
                <h2 className="text-4xl md:text-5xl font-thin text-white mb-8">
                  {t('interactive.title')} <span className="font-normal">{t('interactive.titleBold')}</span>
                </h2>
                <p className="text-xl text-gray-400 mb-12 font-light leading-relaxed">
                  {t('interactive.description')}
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-[1px] bg-indigo-500 mt-3 mr-4"></div>
                    <span className="text-gray-300 font-light">{t('interactive.syntaxHighlighting')}</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-[1px] bg-green-500 mt-3 mr-4"></div>
                    <span className="text-gray-300 font-light">{t('interactive.instantExecution')}</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-[1px] bg-purple-500 mt-3 mr-4"></div>
                    <span className="text-gray-300 font-light">{t('interactive.intelligentCompletion')}</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-[1px] bg-cyan-500 mt-3 mr-4"></div>
                    <span className="text-gray-300 font-light">{t('interactive.immediateFeedback')}</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animationType="slideInRight" duration={0.8} delay={200}>
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-500 text-xs font-light">main.py</span>
                </div>
                <div className="bg-black rounded p-4 font-mono text-sm">
                  <div className="text-gray-600 mb-2"># Calculate factorial</div>
                  <div className="text-indigo-400">def <span className="text-white">factorial</span>(<span className="text-gray-400">n</span>):</div>
                  <div className="ml-4 text-purple-400">if <span className="text-gray-400">n</span> == <span className="text-cyan-400">0</span>:</div>
                  <div className="ml-8 text-purple-400">return <span className="text-cyan-400">1</span></div>
                  <div className="ml-4 text-purple-400">return <span className="text-gray-400">n</span> * <span className="text-white">factorial</span>(<span className="text-gray-400">n</span> - <span className="text-cyan-400">1</span>)</div>
                  <div className="mt-4 text-gray-600"># Test</div>
                  <div className="text-indigo-400">print<span className="text-gray-500">(</span><span className="text-white">factorial</span><span className="text-gray-500">(</span><span className="text-cyan-400">5</span><span className="text-gray-500">))</span></div>
                  <div className="mt-4 border-t border-gray-800 pt-4">
                    <div className="text-gray-500 text-xs">{t('interpreter.output')}:</div>
                    <div className="text-green-400">120</div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>

      {/* Progress Tracking Section */}
      <div className="py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation animationType="slideInLeft" duration={0.8}>
              <AnimatedDashboard />
            </ScrollAnimation>
            <ScrollAnimation animationType="slideInRight" duration={0.8} delay={200}>
              <div>
                <h2 className="text-4xl md:text-5xl font-thin text-white mb-8">
                  {t('progress.title')} <span className="font-normal">{t('progress.titleBold')}</span>
                </h2>
                <p className="text-xl text-gray-400 mb-12 font-light leading-relaxed">
                  {t('progress.description')}
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-transparent mr-4"></div>
                    <span className="text-gray-300 font-light">{t('progress.analytics')}</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-transparent mr-4"></div>
                    <span className="text-gray-300 font-light">{t('progress.recommendations')}</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-transparent mr-4"></div>
                    <span className="text-gray-300 font-light">{t('progress.milestones')}</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-transparent mr-4"></div>
                    <span className="text-gray-300 font-light">{t('progress.streaks')}</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>

      {/* AI Assistant Section */}
      <div className="bg-black py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animationType="fadeInUp">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-thin text-white mb-8">
                  {t('aiSection.title')} <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{t('aiSection.titleHighlight')}</span> {t('aiSection.titleEnd')}
                </h2>
                <p className="text-xl text-gray-400 mb-12 font-light leading-relaxed">
                  {t('aiSection.description')}
                </p>
                <ul className="space-y-8">
                  <li className="flex items-start">
                    <div className="w-8 h-[1px] bg-cyan-500 mt-3 mr-4"></div>
                    <div>
                      <h3 className="text-white font-light mb-2">{t('aiSection.instantHints')}</h3>
                      <p className="text-gray-500 font-light text-sm">{t('aiSection.instantHintsDesc')}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-[1px] bg-blue-500 mt-3 mr-4"></div>
                    <div>
                      <h3 className="text-white font-light mb-2">{t('aiSection.codeReviews')}</h3>
                      <p className="text-gray-500 font-light text-sm">{t('aiSection.codeReviewsDesc')}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-[1px] bg-purple-500 mt-3 mr-4"></div>
                    <div>
                      <h3 className="text-white font-light mb-2">{t('aiSection.debugAssistant')}</h3>
                      <p className="text-gray-500 font-light text-sm">{t('aiSection.debugAssistantDesc')}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-10 lg:mt-0">
                <AIAnimation />
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <ScrollAnimation animationType="fadeInUp" duration={1}>
        <div className="py-32 bg-gray-900 border-t border-gray-800">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl md:text-6xl font-thin text-white mb-8">
              {t('cta.title')} <span className="font-normal">{t('cta.titleBold')}</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 font-light">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 font-medium py-4 px-10 rounded-md hover:bg-gray-100 transition-all duration-300"
                onClick={() => window.location.href = '/theory'}
              >
                {t('cta.startLearning')}
              </button>
              <button className="border border-gray-700 text-gray-400 hover:text-white hover:border-white font-medium py-4 px-10 rounded-md transition-all duration-300"
                onClick={() => window.location.href = '/practice'}
              >
                {t('cta.tryEditor')}
              </button>
            </div>
            <p className="text-gray-600 mt-8 text-sm font-light">{t('cta.freeForever')}</p>
          </div>
        </div>
      </ScrollAnimation>
    </Layout>
  );
};

export default Home;
