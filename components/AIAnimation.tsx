import React from 'react';

const AIAnimation = () => {
  return (
    <div className="relative w-full h-80">
      <svg className="w-full h-full" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --- Nodes --- */}
        {/* Layer 1 */}
        <circle cx="50" cy="100" r="10" fill="url(#ai-gradient)" className="animate-pulse" />
        <circle cx="50" cy="200" r="10" fill="url(#ai-gradient)" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
        <circle cx="50" cy="300" r="10" fill="url(#ai-gradient)" className="animate-pulse" style={{ animationDelay: '0.4s' }} />

        {/* Layer 2 */}
        <circle cx="200" cy="50" r="12" fill="url(#ai-gradient)" className="animate-pulse" style={{ animationDelay: '0.1s' }} />
        <circle cx="200" cy="150" r="12" fill="url(#ai-gradient)" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
        <circle cx="200" cy="250" r="12" fill="url(#ai-gradient)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        <circle cx="200" cy="350" r="12" fill="url(#ai-gradient)" className="animate-pulse" style={{ animationDelay: '0.7s' }} />

        {/* Layer 3 */}
        <circle cx="350" cy="100" r="15" fill="url(#ai-gradient)" className="animate-pulse" style={{ animationDelay: '0.2s' }} filter="url(#glow)" />
        <circle cx="350" cy="200" r="15" fill="url(#ai-gradient)" className="animate-pulse" style={{ animationDelay: '0.4s' }} filter="url(#glow)" />
        <circle cx="350" cy="300" r="15" fill="url(#ai-gradient)" className="animate-pulse" style={{ animationDelay: '0.6s' }} filter="url(#glow)" />

        {/* --- Connections (Lines) --- */}
        <style>
          {`
            .line {
              stroke: #4f46e5;
              stroke-width: 1;
              stroke-opacity: 0.2;
              animation: draw 4s ease-in-out infinite;
            }
            @keyframes draw {
              0% { stroke-dasharray: 0, 1000; }
              50% { stroke-dasharray: 1000, 1000; }
              100% { stroke-dasharray: 1000, 1000; }
            }
          `}
        </style>

        {/* Connections Layer 1 to 2 */}
        <path d="M 50 100 L 200 50" className="line" style={{animationDelay: '0s'}} />
        <path d="M 50 100 L 200 150" className="line" style={{animationDelay: '0.2s'}} />
        <path d="M 50 200 L 200 150" className="line" style={{animationDelay: '0.4s'}} />
        <path d="M 50 200 L 200 250" className="line" style={{animationDelay: '0.6s'}} />
        <path d="M 50 300 L 200 250" className="line" style={{animationDelay: '0.8s'}} />
        <path d="M 50 300 L 200 350" className="line" style={{animationDelay: '1s'}} />

        {/* Connections Layer 2 to 3 */}
        <path d="M 200 50 L 350 100" className="line" style={{animationDelay: '1.2s'}} />
        <path d="M 200 150 L 350 100" className="line" style={{animationDelay: '1.4s'}} />
        <path d="M 200 150 L 350 200" className="line" style={{animationDelay: '1.6s'}} />
        <path d="M 200 250 L 350 200" className="line" style={{animationDelay: '1.8s'}} />
        <path d="M 200 250 L 350 300" className="line" style={{animationDelay: '2s'}} />
        <path d="M 200 350 L 350 300" className="line" style={{animationDelay: '2.2s'}} />
      </svg>
    </div>
  );
};

export default AIAnimation; 