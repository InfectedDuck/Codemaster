import React, { useEffect, useRef, useState } from 'react';
import AnimatedProgressBar from './AnimatedProgressBar';
import AnimatedCounter from './AnimatedCounter';
import { useTranslation } from '../contexts/LanguageContext';

const AnimatedDashboard: React.FC = () => {
  const [isTriggered, setIsTriggered] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isTriggered) {
          setIsTriggered(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const currentElement = dashboardRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [isTriggered]);

  return (
    <div ref={dashboardRef} className="bg-white rounded-2xl p-8 shadow-lg floating">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('dashboard.title')}</h3>
      <div className="space-y-6">
        <AnimatedProgressBar
          label={t('dashboard.pythonBasics')}
          targetValue={85}
          color="blue"
          isTriggered={isTriggered}
          delay={500}
          duration={2000}
        />
        <AnimatedProgressBar
          label={t('dashboard.dataStructures')}
          targetValue={92}
          color="green"
          isTriggered={isTriggered}
          delay={500}
          duration={2000}
        />
        <AnimatedProgressBar
          label={t('dashboard.oopConcepts')}
          targetValue={67}
          color="purple"
          isTriggered={isTriggered}
          delay={500}
          duration={2000}
        />
        <div className="grid grid-cols-3 gap-4 mt-8">
          <AnimatedCounter
            targetValue={24}
            label={t('dashboard.lessonsCompleted')}
            color="blue"
            isTriggered={isTriggered}
            delay={2600}
            duration={1500}
          />
          <AnimatedCounter
            targetValue={18}
            label={t('dashboard.challengesSolved')}
            color="green"
            isTriggered={isTriggered}
            delay={2600}
            duration={1500}
          />
          <AnimatedCounter
            targetValue={7}
            label={t('dashboard.daysStreak')}
            color="purple"
            isTriggered={isTriggered}
            delay={2600}
            duration={1500}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedDashboard;
