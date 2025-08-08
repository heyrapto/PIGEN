import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  apiKey?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  remainingIdeas: number;
  setApiKey: (key: string) => void;
  showLowCreditsAlert: boolean;
  dismissLowCreditsAlert: () => void;
  showProfileModal: boolean;
  setShowProfileModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [remainingIdeas, setRemainingIdeas] = useState(10);
  const [showLowCreditsAlert, setShowLowCreditsAlert] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Check for low credits
  useEffect(() => {
    if (user && remainingIdeas <= 3) {
      setShowLowCreditsAlert(true);
    }
  }, [remainingIdeas, user]);

  const signIn = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement Google Sign In
      const mockUser: User = {
        id: '1',
        email: 'user@example.com',
        name: 'John Doe',
        picture: 'https://via.placeholder.com/150',
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement Sign Out
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setApiKey = (key: string) => {
    if (user) {
      setUser({
        ...user,
        apiKey: key
      });
      // In a real app, save this to the backend
      console.log('API key updated:', key);
      
      // If we have a valid API key, increase credits and dismiss alert
      if (key && key.trim().length > 0) {
        setRemainingIdeas(prev => prev + 10);
        setShowLowCreditsAlert(false);
      }
    }
  };

  const dismissLowCreditsAlert = () => {
    setShowLowCreditsAlert(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signOut,
        remainingIdeas,
        setApiKey,
        showLowCreditsAlert,
        dismissLowCreditsAlert,
        showProfileModal,
        setShowProfileModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
