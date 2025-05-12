import { useState, useCallback, memo, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import HistorySidebar from '../components/HistorySidebar';
import StatusIndicator from '../components/StatusIndicator';
import BackgroundEffects from '../components/BackgroundEffects';
import TestimonialCarousel from '../components/TestimonialCarousel';
import Footer from '../components/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { user, signIn, signOut, remainingIdeas } = useAuth();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const handleHistoryToggle = useCallback(() => {
    setIsHistoryOpen(prev => !prev);
  }, []);
  
  const handleSignIn = useCallback(() => {
    signIn();
  }, [signIn]);
  
  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  // Track scroll for navbar effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background effects */}
      <BackgroundEffects />
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      {/* Radial gradient for dramatic effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black to-black opacity-90"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <nav 
          className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
            scrolled 
              ? 'bg-black/70 backdrop-blur-xl border-b border-white/10 h-16' 
              : 'bg-transparent h-20'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex justify-between items-center h-full">
              {/* Logo section with animated gradient */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-white/80 via-white/20 to-white/80 rounded-full blur-sm opacity-70 animate-pulse-slow"></div>
                  <div className="relative bg-black p-1.5 rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="1.5"/>
                      <path d="M12 8V12L15 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-wider">
                    PIGEN
                  </h1>
                  <span className="text-[10px] text-gray-400 leading-none">PROJECT IDEA GENERATOR</span>
                </div>
              </div>

              {/* Central info panel - visible when user is logged in */}
              {user && (
                <div className="hidden md:flex items-center space-x-6">
                  <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-medium">{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  
                  <div className="h-4 border-r border-white/10"></div>
                  
                  <StatusIndicator type="online" />
                </div>
              )}

              {/* User section */}
              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5zm0 8a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 00-2-2H5z" />
                      </svg>
                      <span className="text-xs font-medium"><span className="font-semibold text-white">{remainingIdeas}</span> ideas</span>
                    </div>
                    
                    {/* History button with hover effect */}
                    <button
                      onClick={handleHistoryToggle}
                      className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:ring-2 hover:ring-white/20 active:scale-95 relative group cursor-pointer"
                      aria-label="View history"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transform group-hover:-translate-y-1 transition-all duration-300 text-[10px] text-white/70">History</span>
                    </button>
                    
                    {/* User profile with animated border */}
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-white/50 to-white/0 rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>
                      <div className="relative flex items-center space-x-2 px-2 py-1.5 rounded-full bg-white/5 border border-white/10">
                        <div className="relative">
                          <img
                            src="/src/assets/avatar.svg"
                            alt={user.name}
                            className="w-7 h-7 rounded-full ring-1 ring-white/10 object-cover"
                          />
                          <span className="absolute bottom-0 right-0 block h-1.5 w-1.5 rounded-full bg-green-400 ring-1 ring-black"></span>
                        </div>
                        <span className="text-xs font-medium mr-1">{user.name.split(' ')[0]}</span>
                        
                        <button
                          onClick={handleSignOut}
                          className="hover:bg-white/10 p-1 rounded-full cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={handleSignIn}
                    className="group relative px-5 py-2.5 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-glow active:scale-[0.98] cursor-pointer"
                  >
                    <div className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-white via-gray-200 to-white opacity-80 group-hover:opacity-100"></div>
                    <div className="absolute inset-0 w-3/6 h-full transition-all duration-300 blur-sm bg-gradient-to-r from-white via-gray-200 to-white opacity-50 group-hover:opacity-70 animate-pulse-slow"></div>
                    <span className="relative text-black text-sm font-medium">Sign in with Google</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
        
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {user ? (
              <>{children}</>
            ) : (
              <WelcomeScreen onSignIn={handleSignIn} />
            )}
          </div>
        </main>

        <HistorySidebar
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
        />
      </div>
    </div>
  );
};

// Memoized welcome screen for performance
const WelcomeScreen = memo(({ onSignIn }: { onSignIn: () => void }) => {
  const features = [
    {
      title: 'Personalized Ideas',
      description: 'Tailored to your skills and interests',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m0 16v1m-8-8h1m15 0h1m-9-9l.5-.5m4.5.5l-.5-.5m-8.5 9.5l-.5.5m12.5-.5l-.5.5M5.379 5.308A9 9 0 0021 12a9 9 0 00-9 9 9 9 0 01-5-1.5" />
        </svg>
      )
    },
    {
      title: 'Developer Focused',
      description: 'Get practical projects to build your skills',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: 'Business Ready',
      description: 'Startup ideas with monetization strategies',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent opacity-50"
        style={{ top: '-30%', width: '100%', height: '150%' }}
      ></div>
      
      {/* Hero Section */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 mb-16 flex flex-col">
        <div className="mb-6 animate-pulse-slow">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="1.5"/>
            <path d="M12 8V12L15 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8 3C9.5 5 12 5 12 5C12 5 12 3 12 2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Project Idea Generator
        </h1>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Your AI-powered creative companion. Sign in to start generating
          innovative project and startup ideas tailored to your skills and interests.
        </p>
        <button
          onClick={onSignIn}
          className="group relative px-8 py-3 rounded-lg overflow-hidden transition-all duration-300 text-lg font-semibold hover:shadow-glow active:scale-[0.98] mb-8 cursor-pointer"
        >
          <div className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-white via-gray-200 to-white opacity-80 group-hover:opacity-100"></div>
          <div className="absolute inset-0 w-3/6 h-full transition-all duration-300 blur-sm bg-gradient-to-r from-white via-gray-200 to-white opacity-50 group-hover:opacity-70 animate-pulse-slow"></div>
          <span className="relative text-black">Get Started with Google</span>
        </button>

        {/* Stats bar */}
        <div className="flex items-center justify-center w-full mx-auto mb-12">
          <div className="flex items-center justify-center py-3 px-8 rounded-full bg-white/5 border border-white/10">
            {[
              { value: '600+', label: 'Project Ideas' },
              { value: '24/7', label: 'Availability' },
              { value: '100%', label: 'AI Powered' }
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                {i > 0 && <div className="h-4 w-px bg-white/10 mx-6"></div>}
                <div className="text-center px-6">
                  <div className="text-sm font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl overflow-hidden transition-all duration-500 transform hover:-translate-y-1 hover:shadow-glow cursor-pointer"
            >
              {/* Background glow that changes position on hover */}
              <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" 
                style={{
                  transformOrigin: index === 0 ? 'top left' : index === 1 ? 'top center' : 'top right',
                  scale: 0.5,
                  translate: '0 20px'
                }}
              />
              
              <div className="p-6 relative">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-lg bg-white/10 text-white group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm">
                  {feature.description}
                </p>
                
                {/* Animated bottom border */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-white/0 via-white/40 to-white/0 w-0 group-hover:w-full opacity-0 group-hover:opacity-100 transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Testimonial Section */}
      <div className="relative z-10 w-full bg-white/[0.02] border-y border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Trusted by Developers & Entrepreneurs
            </h2>
            <p className="text-gray-400 mt-2">See what our users have to say about PIGEN</p>
          </div>
          <TestimonialCarousel />
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
});

export default MainLayout; 