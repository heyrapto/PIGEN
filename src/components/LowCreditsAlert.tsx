import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LowCreditsAlertProps {
  onAddApiKey: () => void;
}

const LowCreditsAlert = ({ onAddApiKey }: LowCreditsAlertProps) => {
  const { remainingIdeas, dismissLowCreditsAlert } = useAuth();
  const navigate = useNavigate();

  const handleAddApiKey = () => {
    // Navigate programmatically using react-router
    navigate('/profile?tab=api');
    // Also call the passed in handler for backward compatibility
    onAddApiKey();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm">
      <div className="bg-gradient-to-r from-yellow-800/80 to-yellow-900/80 backdrop-blur-md rounded-lg border border-yellow-600/30 shadow-xl overflow-hidden animate-slideUp">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium text-yellow-200">
                Running Low on Credits
              </p>
              <p className="mt-1 text-xs text-yellow-300/80">
                You have {remainingIdeas} idea{remainingIdeas === 1 ? '' : 's'} remaining. Add your own Gemini API key for unlimited generations.
              </p>
              <div className="mt-3 flex space-x-2">
                <button
                  onClick={handleAddApiKey}
                  className="inline-flex items-center rounded-md bg-yellow-600/30 px-3 py-1.5 text-xs font-medium text-white hover:bg-yellow-600/40 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                >
                  Add API Key
                </button>
                <button
                  onClick={dismissLowCreditsAlert}
                  className="inline-flex items-center rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 focus:outline-none"
                >
                  Dismiss
                </button>
              </div>
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                onClick={dismissLowCreditsAlert}
                className="inline-flex text-yellow-400 hover:text-yellow-300"
              >
                <span className="sr-only">Close</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LowCreditsAlert; 