import React, { useEffect, useState, useRef } from 'react';

interface AnimatedProgressBarProps {
  label: string;
  targetValue: number;
  color: string;
  isTriggered: boolean;
  delay?: number;
  duration?: number;
}

const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  label,
  targetValue,
  color,
  isTriggered,
  delay = 0,
  duration = 2000
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

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-600',
          text: 'text-blue-600',
          shadow: '0 4px 15px rgba(37, 99, 235, 0.3)'
        };
      case 'green':
        return {
          bg: 'bg-green-600',
          text: 'text-green-600',
          shadow: '0 4px 15px rgba(34, 197, 94, 0.3)'
        };
      case 'purple':
        return {
          bg: 'bg-purple-600',
          text: 'text-purple-600',
          shadow: '0 4px 15px rgba(147, 51, 234, 0.3)'
        };
      default:
        return {
          bg: 'bg-gray-600',
          text: 'text-gray-600',
          shadow: '0 4px 15px rgba(75, 85, 99, 0.3)'
        };
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-gray-700 font-medium text-sm">{label}</span>
        <span className={`font-bold text-lg ${colorClasses.text} transition-all duration-300`}>
          {currentValue}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <div 
          className={`h-3 rounded-full ${colorClasses.bg} transition-all duration-200 relative`}
          style={{
            width: `${currentValue}%`,
            boxShadow: currentValue > 0 ? colorClasses.shadow : 'none'
          }}
        >
          {/* Animated shine effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            style={{
              animation: currentValue > 0 ? 'shimmer 2s infinite' : 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedProgressBar; 