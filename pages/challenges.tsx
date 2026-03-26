import React, { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';
import ScrollAnimation from '../components/ScrollAnimation';
import { challenges, Challenge } from '../data/challenges';
import { usePageTranslation } from '../contexts/LanguageContext';

const ChallengesHubPage: NextPage = () => {
  const { t } = usePageTranslation('challenges');
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const filteredChallenges = challenges.filter((challenge) => {
    const title = t(`challenges.${challenge.id}.title`);
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'All' || challenge.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <Layout>
      <div className="bg-gray-900 min-h-screen text-white">
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <ScrollAnimation animationType="fadeInDown">
              <h1 className="text-5xl font-extrabold text-white tracking-tight">
                {t('pageTitle').split(' ')[0]} <span className="text-cyan-400">{t('pageTitle').split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
                {t('pageSubtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="flex justify-center mb-8 gap-4">
            <input
              type="text"
              placeholder={t('searchChallenges')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option>{t('difficulty.all')}</option>
              <option value="Easy">{t('difficulty.easy')}</option>
              <option value="Medium">{t('difficulty.medium')}</option>
              <option value="Hard">{t('difficulty.hard')}</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChallenges.map((challenge) => (
              <Link href={`/challenge/${challenge.id}`} key={challenge.id}>
                <a className="block bg-gray-800 p-6 rounded-lg hover:bg-gray-700/50 transition-colors hover:border-cyan-500 border-2 border-transparent">
                  <h3 className="text-xl font-bold text-cyan-400">{t(`challenges.${challenge.id}.title`)}</h3>
                  <p className="text-gray-400 mt-2">{t(`challenges.${challenge.id}.description`).substring(0, 100)}...</p>
                  <div className="mt-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      challenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                      challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {t(`difficulty.${challenge.difficulty.toLowerCase()}`)}
                    </span>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default ChallengesHubPage;
