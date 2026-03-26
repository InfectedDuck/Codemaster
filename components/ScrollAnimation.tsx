import React, { useEffect, useRef, useState } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideInLeft' | 'slideInRight';
  delay?: number;
  duration?: number;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className = '',
  animationType = 'fadeInUp',
  delay = 0,
  duration = 0.8
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay]);

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0 transform';
    
    switch (animationType) {
      case 'fadeInUp':
        return 'opacity-100 transform translate-y-0';
      case 'fadeInDown':
        return 'opacity-100 transform translate-y-0';
      case 'fadeInLeft':
        return 'opacity-100 transform translate-x-0';
      case 'fadeInRight':
        return 'opacity-100 transform translate-x-0';
      case 'scaleIn':
        return 'opacity-100 transform scale-100';
      case 'slideInLeft':
        return 'opacity-100 transform translate-x-0';
      case 'slideInRight':
        return 'opacity-100 transform translate-x-0';
      default:
        return 'opacity-100 transform translate-y-0';
    }
  };

  const getInitialTransform = () => {
    switch (animationType) {
      case 'fadeInUp':
        return 'translate-y-8';
      case 'fadeInDown':
        return '-translate-y-8';
      case 'fadeInLeft':
        return 'translate-x-8';
      case 'fadeInRight':
        return '-translate-x-8';
      case 'scaleIn':
        return 'scale-95';
      case 'slideInLeft':
        return '-translate-x-full';
      case 'slideInRight':
        return 'translate-x-full';
      default:
        return 'translate-y-8';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all ease-out ${className} ${
        isVisible ? getAnimationClass() : `opacity-0 transform ${getInitialTransform()}`
      }`}
      style={{
        transitionDuration: `${duration}s`
      }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation; 