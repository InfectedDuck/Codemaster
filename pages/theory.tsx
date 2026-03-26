import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import ScrollAnimation from '../components/ScrollAnimation';
import { usePageTranslation } from '../contexts/LanguageContext';

interface TopicMeta {
  id: string;
  duration: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced' | 'Projects';
  icon: string;
  color: string;
  conceptCount: number;
}

const topicMetas: TopicMeta[] = [
  { id: 'variables-datatypes', duration: '45 min', difficulty: 'Foundation', icon: '🔢', color: 'blue', conceptCount: 5 },
  { id: 'control-structures', duration: '60 min', difficulty: 'Foundation', icon: '🔀', color: 'green', conceptCount: 5 },
  { id: 'functions', duration: '50 min', difficulty: 'Foundation', icon: '⚙️', color: 'purple', conceptCount: 5 },
  { id: 'string-manipulation', duration: '40 min', difficulty: 'Foundation', icon: '📝', color: 'orange', conceptCount: 5 },
  { id: 'data-structures', duration: '75 min', difficulty: 'Intermediate', icon: '📦', color: 'blue', conceptCount: 5 },
  { id: 'oop', duration: '90 min', difficulty: 'Intermediate', icon: '🏗️', color: 'green', conceptCount: 5 },
  { id: 'file-handling', duration: '55 min', difficulty: 'Intermediate', icon: '📁', color: 'purple', conceptCount: 5 },
  { id: 'modules', duration: '45 min', difficulty: 'Intermediate', icon: '📚', color: 'orange', conceptCount: 5 },
  { id: 'api-integration', duration: '70 min', difficulty: 'Advanced', icon: '🌐', color: 'blue', conceptCount: 5 },
  { id: 'database-operations', duration: '80 min', difficulty: 'Advanced', icon: '🗃️', color: 'green', conceptCount: 5 },
  { id: 'decorators', duration: '65 min', difficulty: 'Advanced', icon: '🎭', color: 'purple', conceptCount: 5 },
  { id: 'testing-debugging', duration: '75 min', difficulty: 'Advanced', icon: '🔍', color: 'orange', conceptCount: 5 },
  { id: 'web-scraping', duration: '120 min', difficulty: 'Projects', icon: '🕷️', color: 'blue', conceptCount: 5 },
  { id: 'data-analysis', duration: '150 min', difficulty: 'Projects', icon: '📊', color: 'green', conceptCount: 5 },
  { id: 'rest-api', duration: '180 min', difficulty: 'Projects', icon: '🚀', color: 'purple', conceptCount: 5 },
  { id: 'machine-learning', duration: '200 min', difficulty: 'Projects', icon: '🤖', color: 'orange', conceptCount: 5 },
];

const TheoryPage: NextPage = () => {
  const { t } = usePageTranslation('theory-hub');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const difficulties = ['All', 'Foundation', 'Intermediate', 'Advanced', 'Projects'];
  const difficultyKeys: Record<string, string> = {
    'All': 'difficulty.all',
    'Foundation': 'difficulty.foundation',
    'Intermediate': 'difficulty.intermediate',
    'Advanced': 'difficulty.advanced',
    'Projects': 'difficulty.projects',
  };

  const filteredTopics = selectedDifficulty === 'All'
    ? topicMetas
    : topicMetas.filter(topic => topic.difficulty === selectedDifficulty);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', button: 'bg-blue-600 hover:bg-blue-700', icon: 'bg-blue-100 text-blue-600' };
      case 'green':
        return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', button: 'bg-green-600 hover:bg-green-700', icon: 'bg-green-100 text-green-600' };
      case 'purple':
        return { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', button: 'bg-purple-600 hover:bg-purple-700', icon: 'bg-purple-100 text-purple-600' };
      case 'orange':
        return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', button: 'bg-orange-600 hover:bg-orange-700', icon: 'bg-orange-100 text-orange-600' };
      default:
        return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', button: 'bg-gray-600 hover:bg-gray-700', icon: 'bg-gray-100 text-gray-600' };
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Foundation': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      case 'Projects': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout title={t('pageTitle')}>
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animationType="fadeInUp" duration={0.8}>
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                {t('heroTitle')}
                <span className="block text-yellow-400">{t('heroSubtitle')}</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                {t('heroDescription')}
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      <div className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animationType="fadeInUp" duration={0.6}>
            <div className="flex flex-wrap justify-center gap-4">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    selectedDifficulty === difficulty
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t(difficultyKeys[difficulty])}
                </button>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredTopics.map((topic, index) => {
              const colors = getColorClasses(topic.color);
              const topicTitle = t(`topics.${topic.id}.title`);
              const topicDesc = t(`topics.${topic.id}.description`);
              return (
                <ScrollAnimation key={topic.id} animationType="scaleIn" delay={index * 100} duration={0.6}>
                  <div className={`${colors.bg} ${colors.border} border-2 rounded-2xl p-6 h-full flex flex-col transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${colors.icon} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                        {topic.icon}
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
                          {t(difficultyKeys[topic.difficulty])}
                        </span>
                        <div className="text-sm text-gray-500 mt-1">{topic.duration}</div>
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h3 className={`text-xl font-bold ${colors.text} mb-3`}>{topicTitle}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{topicDesc}</p>

                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('whatYouWillLearn')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {Array.from({ length: Math.min(3, topic.conceptCount) }, (_, idx) => (
                            <span key={idx} className="text-xs bg-white bg-opacity-60 px-2 py-1 rounded-md text-gray-700">
                              {t(`topics.${topic.id}.concepts.${idx}`)}
                            </span>
                          ))}
                          {topic.conceptCount > 3 && (
                            <span className="text-xs bg-white bg-opacity-60 px-2 py-1 rounded-md text-gray-700">
                              +{topic.conceptCount - 3} {t('more', { count: String(topic.conceptCount - 3) })}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        className={`w-full ${colors.button} text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md`}
                        onClick={() => window.location.href = `/theory/${topic.id}`}
                      >
                        {t('buttons.startLearning')}
                      </button>
                      <button
                        className="w-full bg-white border-2 border-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg transition-all duration-200 hover:border-gray-400 hover:bg-gray-50"
                        onClick={() => window.location.href = `/test/${topic.id}`}
                      >
                        🎯 {t('buttons.testKnowledge')}
                      </button>
                    </div>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animationType="fadeInUp" duration={0.8}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('learningJourney.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t('learningJourney.subtitle')}
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollAnimation animationType="fadeInUp" delay={200} duration={0.6}>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌱</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('learningJourney.foundation')}</h3>
                <p className="text-gray-600">{t('learningJourney.foundationDesc')}</p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animationType="fadeInUp" delay={400} duration={0.6}>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌿</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('learningJourney.intermediate')}</h3>
                <p className="text-gray-600">{t('learningJourney.intermediateDesc')}</p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animationType="fadeInUp" delay={600} duration={0.6}>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌳</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('learningJourney.advanced')}</h3>
                <p className="text-gray-600">{t('learningJourney.advancedDesc')}</p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animationType="fadeInUp" delay={800} duration={0.6}>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('learningJourney.projects')}</h3>
                <p className="text-gray-600">{t('learningJourney.projectsDesc')}</p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TheoryPage;
