import { memo, useState, useEffect } from 'react';

interface StatusIndicatorProps {
  type: 'online' | 'processing' | 'offline';
  label?: string;
  className?: string;
}

const StatusIndicator = memo(({ type, label, className = '' }: StatusIndicatorProps) => {
  const [dots, setDots] = useState<number[]>([]);
  
  // Generate random dots for visualization
  useEffect(() => {
    const newDots = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
    setDots(newDots);
  }, []);

  const getStatusColor = () => {
    switch (type) {
      case 'online':
        return 'bg-green-400';
      case 'processing':
        return 'bg-yellow-400';
      case 'offline':
        return 'bg-red-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusLabel = () => {
    if (label) return label;
    
    switch (type) {
      case 'online':
        return 'System Online';
      case 'processing':
        return 'Processing';
      case 'offline':
        return 'System Offline';
      default:
        return 'Status Unknown';
    }
  };

  return (
    <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-white/5 to-transparent ${className}`}>
      <div className="relative">
        <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor()}`}></div>
        
        {/* Visualization dots */}
        {type === 'online' && (
          <div className="absolute -top-1 -left-1 w-10 h-5">
            {dots.map((position, i) => (
              <div 
                key={i}
                style={{ 
                  left: `${position % 8}px`, 
                  top: `${(position % 4) + 1}px`,
                  animationDelay: `${i * 0.3}s`
                }}
                className="absolute w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse-slow"
              />
            ))}
          </div>
        )}
        
        {/* Pulse effect */}
        {type === 'online' && (
          <div className="absolute -inset-0.5 rounded-full animate-ping opacity-70" style={{ backgroundColor: 'rgba(74, 222, 128, 0.2)' }}></div>
        )}
      </div>
      <span className="text-xs font-medium text-gray-300">{getStatusLabel()}</span>
    </div>
  );
});

export default StatusIndicator; 