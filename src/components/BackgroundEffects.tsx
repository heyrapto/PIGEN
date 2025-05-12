import { memo, useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

const BackgroundEffects = memo(() => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  // Generate initial particles with good performance (limited number)
  useEffect(() => {
    const generateParticles = () => {
      // Use fewer particles on smaller screens for performance
      const particleCount = windowSize.width < 768 ? 10 : 20;
      
      const newParticles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * windowSize.width,
          y: Math.random() * windowSize.height,
          size: Math.random() * 2 + 1, // 1-3px
          opacity: Math.random() * 0.5 + 0.1, // 0.1-0.6
          speed: Math.random() * 0.2 + 0.1, // 0.1-0.3
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    // Handle window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width, windowSize.height]);

  // Instead of using requestAnimationFrame (which can be performance intensive),
  // use a more efficient approach with setTimeout and only re-render occasionally
  useEffect(() => {
    const moveParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Move particles upward slowly
          let newY = particle.y - particle.speed;
          
          // If particle goes off screen, reset it to bottom
          if (newY < -20) {
            newY = windowSize.height + 20;
          }
          
          return {
            ...particle,
            y: newY,
          };
        })
      );
    };
    
    // Update less frequently for better performance
    const interval = setInterval(moveParticles, 100);
    return () => clearInterval(interval);
  }, [windowSize.height]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black to-black opacity-40" />
      
      {/* Particles */}
      {particles.map(particle => (
        <div 
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            transform: `translateZ(0)`, // Hardware acceleration
          }}
        />
      ))}
      
      {/* Subtle glow effect in top-right corner */}
      <div 
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-radial from-white/5 to-transparent rounded-full blur-3xl opacity-20"
      />
      
      {/* Subtle glow effect in bottom-left */}
      <div 
        className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-radial from-white/10 to-transparent rounded-full blur-2xl opacity-10"
      />
    </div>
  );
});

export default BackgroundEffects; 