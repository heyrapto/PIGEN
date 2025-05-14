import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { avatar } from '../assets';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { user, setApiKey } = useAuth();
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isKeyValid, setIsKeyValid] = useState(true);

  useEffect(() => {
    if (user?.apiKey) {
      setApiKeyInput(user.apiKey);
    }
  }, [user]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSaved(false);
      setIsKeyValid(true);
    }
  }, [isOpen]);

  const handleSave = () => {
    // Basic validation (in reality, you'd do proper validation)
    if (apiKeyInput.trim().length < 10) {
      setIsKeyValid(false);
      return;
    }
    
    setApiKey(apiKeyInput);
    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 border border-white/10 shadow-2xl overflow-hidden">
        {/* Header with blur effect */}
        <div className="px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-sm relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-50"></div>
          <h2 className="text-xl font-bold relative z-10">Profile Settings</h2>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-white/10 overflow-hidden border border-white/20">
              <img 
                src={avatar} 
                alt={user?.name || 'User'}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{user?.name}</h3>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>

          {/* API Key Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Gemini API Key</h4>
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                Get API Key
              </a>
            </div>
            <div className="relative">
              <input
                type="text"
                value={apiKeyInput}
                onChange={(e) => {
                  setApiKeyInput(e.target.value);
                  setIsKeyValid(true);
                }}
                placeholder="Enter your Gemini API key"
                className={`w-full bg-white/5 border ${isKeyValid ? 'border-white/20' : 'border-red-500/70'} rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white/30`}
              />
              {!isKeyValid && (
                <p className="text-xs text-red-400 mt-1">Please enter a valid API key</p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                Adding your own API key will give you unlimited idea generations.
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-black/30 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-white text-black hover:bg-opacity-90 text-sm transition-all duration-200 relative overflow-hidden group"
          >
            {isSaved ? (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Saved
              </span>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal; 