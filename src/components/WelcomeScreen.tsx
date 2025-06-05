import { memo } from 'react';
import TestimonialCarousel from './TestimonialCarousel';
import Footer from './Footer';

interface WelcomeScreenProps {
  onSignIn: () => void;
}

const WelcomeScreen = memo(({ onSignIn }: WelcomeScreenProps) => {
  const features = [
    {
      title: 'Personalized Ideas',
      description: 'Tailored to your skills and interests',
      icon: (
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-xl blur-lg"></div>
          <div className="relative w-full h-full bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m0 16v1m-8-8h1m15 0h1m-9-9l.5-.5m4.5.5l-.5-.5m-8.5 9.5l-.5.5m12.5-.5l-.5.5M5.379 5.308A9 9 0 0021 12a9 9 0 00-9 9 9 9 0 01-5-1.5" />
            </svg>
          </div>
        </div>
      )
    },
    {
      title: 'Developer Focused',
      description: 'Get practical projects to build your skills',
      icon: (
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-xl blur-lg"></div>
          <div className="relative w-full h-full bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
        </div>
      )
    },
    {
      title: 'Business Ready',
      description: 'Startup ideas with monetization strategies',
      icon: (
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-xl blur-lg"></div>
          <div className="relative w-full h-full bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
      )
    }
  ];
  
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 mb-16">
        {/* 3D-like floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top left floating cube */}
          <div className="absolute -top-20 -left-20 w-40 h-40 animate-float delay-100">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl blur-xl"></div>
              <div className="absolute inset-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 transform rotate-12"></div>
            </div>
          </div>
          {/* Bottom right floating sphere */}
          <div className="absolute -bottom-20 -right-20 w-40 h-40 animate-float delay-300">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-xl"></div>
              <div className="absolute inset-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"></div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="relative">
          {/* Animated logo */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-radial from-white/20 to-transparent opacity-50 blur-2xl"></div>
            <div className="relative inline-block animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="1.5"/>
                  <path d="M12 8V12L15 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8 3C9.5 5 12 5 12 5C12 5 12 3 12 2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Title and description */}
          <div className="relative mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              Project Idea Generator
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Your AI-powered creative companion. Sign in to start generating
              innovative project and startup ideas tailored to your skills and interests.
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={onSignIn}
            className="group relative px-8 py-4 rounded-xl overflow-hidden transition-all duration-300 text-lg font-semibold hover:shadow-glow active:scale-[0.98] mb-12"
          >
            <div className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 opacity-80 group-hover:opacity-100"></div>
            <div className="absolute inset-0 w-3/6 h-full transition-all duration-300 blur-xl bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 opacity-50 group-hover:opacity-70 animate-pulse-slow"></div>
            <span className="relative text-white font-medium">Get Started with Google</span>
          </button>

          {/* Stats bar with animated borders */}
          <div className="flex items-center justify-center w-full mx-auto mb-12 overflow-x-auto px-2 sm:px-0">
            <div className="relative flex items-center justify-center py-3 sm:py-4 px-6 sm:px-10 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-emerald-500/10 animate-pulse-slow"></div>
              {[
                { value: '600+', label: 'Project Ideas' },
                { value: '24/7', label: 'Availability' },
                { value: '100%', label: 'AI Powered' }
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center flex-shrink-0">
                  {i > 0 && <div className="h-8 w-px bg-gradient-to-b from-white/5 via-white/10 to-white/5 mx-6 sm:mx-8"></div>}
                  <div className="text-center px-3 sm:px-6">
                    <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl overflow-hidden transition-all duration-500 transform hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
              <div className="p-6 relative">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-300 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-white/0 via-white/40 to-white/0 w-0 group-hover:w-full opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rest of the components */}
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
      
      <Footer />
    </div>
  );
});

export default WelcomeScreen; 