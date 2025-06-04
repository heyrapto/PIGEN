import type { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import BackgroundEffects from '../components/BackgroundEffects';

interface ChatLayoutProps {
  children: ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen w-full bg-black text-white relative overflow-hidden">
      {/* Animated background effects */}
      <BackgroundEffects />
      
      {/* Background pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-20 z-0"></div>
      
      {/* Radial gradient */}
      <div className="fixed inset-0 bg-gradient-radial from-transparent via-black to-black opacity-90 z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full">
        <main className="h-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ChatLayout; 