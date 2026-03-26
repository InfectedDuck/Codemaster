import React, { useState } from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Layout from '../../components/Layout';
import PythonInterpreter from '../../components/PythonInterpreter';
import ReactMarkdown from 'react-markdown';
import { challenges, Challenge } from '../../data/challenges';
import { useRouter } from 'next/router';
import { usePageTranslation } from '../../contexts/LanguageContext';
import AIChatPanel from '../../components/AIChatPanel';

interface ChallengePageProps {
  challenge: Challenge;
}

const ChallengeSolverPage: NextPage<ChallengePageProps> = ({ challenge }) => {
  const router = useRouter();
  const { t } = usePageTranslation('challenges');
  const [code, setCode] = useState(challenge?.starterCode || '');

  if (router.isFallback || !challenge) {
    return (
      <Layout>
        <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
          <div className="text-2xl">{t('loadingChallenge')}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-900 min-h-screen text-white">
        <main className="container mx-auto px-4 py-8">
          {/* Challenge Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-3">{t(`challenges.${challenge.id}.title`)}</h1>
            <div className="prose prose-invert max-w-none text-gray-400 prose-sm">
              <ReactMarkdown>{t(`challenges.${challenge.id}.description`)}</ReactMarkdown>
            </div>
          </div>

          {/* Main Layout: Editor + AI */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Code Editor - takes 2/3 */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-xl overflow-hidden">
                <PythonInterpreter
                  initialCode={code}
                  onCodeChange={(newCode) => setCode(newCode)}
                  height="60vh"
                />
              </div>
            </div>

            {/* AI Chat - takes 1/3 */}
            <div className="lg:col-span-1">
              <AIChatPanel
                codeContext={code}
                challengeContext={`Challenge: ${challenge.title}\nDescription: ${challenge.description}`}
                className="h-[60vh]"
              />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = challenges.map((challenge) => ({
    params: { id: challenge.id },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const challenge = challenges.find((c) => c.id === params?.id);
  if (!challenge) {
    return { notFound: true };
  }
  return { props: { challenge } };
};

export default ChallengeSolverPage;
