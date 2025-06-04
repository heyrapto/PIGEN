import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ChatLayout from './layouts/ChatLayout';
import ChatInterface from './components/ChatInterface';
import ProfilePage from './pages/ProfilePage';
import { useAuth } from './contexts/AuthContext';

// Protected route component that redirects to home if not authenticated
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing page with full navbar */}
          <Route path="/" element={<MainLayout><ChatInterface /></MainLayout>} />
          
          {/* Chat interface with minimal layout */}
          <Route path="/chat" element={
            <ProtectedRoute>
              <ChatLayout>
                <ChatInterface />
              </ChatLayout>
            </ProtectedRoute>
          } />
          
          {/* Profile page with full navbar */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
