import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  targetValue: number;
  label: string;
  color: string;
  isTriggered: boolean;
  delay?: number;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  targetValue,
  label,
  color,
  isTriggered,
  delay = 0,
  duration = 1500
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const animationRef = useRef<number>();
  const hasStarted = useRef(false);

  useEffect(() => {
    if (isTriggered && !hasStarted.current) {
      hasStarted.current = true;
      setTimeout(() => {
        startAnimation();
      }, delay);
    }
  }, [isTriggered, delay]);

  const startAnimation = () => {
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const newValue = targetValue * easeOut;
      
      setCurrentValue(Math.round(newValue));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case 'blue':
        return 'text-blue-600';
      case 'green':
        return 'text-green-600';
      case 'purple':
        return 'text-purple-600';
      case 'orange':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="text-center p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
      <div className={`text-3xl font-bold transition-all duration-300 ${getColorClass(color)}`}>
        {currentValue}
      </div>
      <div className="text-sm text-gray-600 mt-2 font-medium">{label}</div>
    </div>
  );
};

export default AnimatedCounter; 