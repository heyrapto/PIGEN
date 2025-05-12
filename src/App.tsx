import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import ChatInterface from './components/ChatInterface';

const App = () => {
  return (
    <AuthProvider>
      <MainLayout>
        <ChatInterface />
      </MainLayout>
    </AuthProvider>
  );
};

export default App;
