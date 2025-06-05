import { useState, useCallback, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import HistorySidebar from '../components/HistorySidebar';
import BackgroundEffects from '../components/BackgroundEffects';
import WelcomeScreen from '../components/WelcomeScreen';
import LowCreditsAlert from '../components/LowCreditsAlert';
import { avatar } from '../assets';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { user, signIn, signOut, remainingIdeas, showLowCreditsAlert } = useAuth();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();
  console.log(currentTime)
  
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

  // Determine if we're on the profile page
  const isProfilePage = location.pathname === '/profile';
  
  // Redirect authenticated users to /chat when on landing page
  if (user && location.pathname === '/') {
    return <Navigate to="/chat" replace />;
  }

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden">
      {/* Animated background effects */}
      <BackgroundEffects />
      
      {/* Background pattern - make it fixed */}
      <div className="fixed inset-0 bg-grid-pattern opacity-20 z-0"></div>
      
      {/* Radial gradient for dramatic effect - make it fixed */}
      <div className="fixed inset-0 bg-gradient-radial from-transparent via-black to-black opacity-90 z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <nav 
          className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
            scrolled 
              ? 'bg-black/40 backdrop-blur-2xl shadow-lg' 
              : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              {/* Logo section with improved gradient */}
              <Link to="/" className="flex items-center space-x-3 sm:space-x-4 group">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-emerald-500/50 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-black/50 backdrop-blur-sm p-2 rounded-full border border-white/10 group-hover:border-white/20 transition-colors duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-5 sm:h-5">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent tracking-wider">
                    PIGEN
                  </h1>
                  <span className="text-[8px] sm:text-[10px] text-gray-400 leading-none tracking-wider">PROJECT IDEA GENERATOR</span>
                </div>
              </Link>

              {/* Central info panel - visible when user is logged in */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                {user ? (
                  <>
                    <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                      <svg className="w-3.5 h-3.5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5zm0 8a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 00-2-2H5z" />
                      </svg>
                      <span className="text-xs font-medium"><span className="font-semibold text-purple-200">{remainingIdeas}</span> ideas</span>
                    </div>
                    
                    {/* History button with improved hover effect */}
                    <button
                      onClick={handleHistoryToggle}
                      className="p-2.5 hover:bg-white/5 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-105 active:scale-95 relative group border border-white/10 hover:border-white/20"
                      aria-label="View history"
                    >
                      <svg
                        className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors duration-300"
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
                      <span className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transform group-hover:-translate-y-1 transition-all duration-300 text-[10px] text-white/70 bg-black/50 px-1.5 py-0.5 rounded-full backdrop-blur-sm">History</span>
                    </button>
                    
                    {/* User profile with improved animation */}
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-emerald-500/30 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
                      <Link 
                        to="/profile"
                        className={`relative flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/10 group-hover:border-white/20 transition-colors duration-300 ${
                          isProfilePage ? 'bg-white/10 backdrop-blur-sm' : 'bg-black/50 backdrop-blur-sm hover:bg-white/5'
                        }`}
                      >
                        <div className="relative">
                          <img
                            src={avatar}
                            alt={user.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="absolute bottom-0 right-0 block h-1.5 w-1.5 rounded-full bg-emerald-400 ring-1 ring-black"></span>
                        </div>
                        <span className="text-xs font-medium text-gray-200 group-hover:text-white transition-colors duration-300">{user.name.split(' ')[0]}</span>
                        
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSignOut();
                          }}
                          className="hover:bg-white/10 p-1 rounded-full transition-colors duration-300"
                        >
                          <svg className="w-3.5 h-3.5 text-gray-400 hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={handleSignIn}
                    className="group relative px-5 py-2 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-glow active:scale-[0.98] cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/80 via-blue-500/80 to-emerald-500/80 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500 animate-pulse-slow"></div>
                    <span className="relative text-white text-sm font-medium">Sign in with Google</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
        
        <main className="pt-20 flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-12rem)]">
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

        {/* Low Credits Alert */}
        {showLowCreditsAlert && (
          <LowCreditsAlert 
            onAddApiKey={() => {
              // This is handled by the component itself now
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MainLayout; 