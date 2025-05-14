import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import StatusIndicator from '../components/StatusIndicator';
import { useLocation } from 'react-router-dom';
import { avatar } from '../assets';

const ProfilePage = () => {
  const { user, setApiKey, remainingIdeas } = useAuth();
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isKeyValid, setIsKeyValid] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'api' | 'usage' | 'preferences'>('profile');
  const location = useLocation();

  // Mock data for usage statistics
  const usageData = [
    { date: '2023-11-01', ideas: 5 },
    { date: '2023-11-02', ideas: 3 },
    { date: '2023-11-03', ideas: 7 },
    { date: '2023-11-04', ideas: 2 },
    { date: '2023-11-05', ideas: 4 }
  ];

  // Set the active tab based on URL parameters or user API key status
  useEffect(() => {
    // Check for tab in URL search params
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    
    if (tab === 'api') {
      setActiveTab('api');
    } else if (!user?.apiKey && remainingIdeas <= 3) {
      // If user has low credits and no API key, show API tab
      setActiveTab('api');
    }
  }, [location, user, remainingIdeas]);

  useEffect(() => {
    if (user?.apiKey) {
      setApiKeyInput(user.apiKey);
    }
  }, [user]);

  const handleSaveApiKey = () => {
    // Basic validation
    if (apiKeyInput.trim().length < 10) {
      setIsKeyValid(false);
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setApiKey(apiKeyInput);
      setIsSaving(false);
      setIsSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 800);
  };

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
          Profile Settings
        </h1>
        <p className="text-gray-400">Manage your account settings and API preferences</p>
      </div>
      
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-white/50 to-white/10 rounded-full blur-sm"></div>
            <div className="relative h-24 w-24 rounded-full bg-white/10 overflow-hidden border border-white/20">
              <img 
                src={avatar}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <p className="text-gray-400">{user.email}</p>
              </div>
              <StatusIndicator type="online" label="Active Account" className="self-start sm:self-auto" />
            </div>
            
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                <span className="text-xs text-gray-400">Member Since</span>
                <p className="text-sm font-medium">November 2023</p>
              </div>
              
              <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                <span className="text-xs text-gray-400">Remaining Ideas</span>
                <p className="text-sm font-medium">{remainingIdeas}</p>
              </div>
              
              <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                <span className="text-xs text-gray-400">API Status</span>
                <p className="text-sm font-medium">
                  {user.apiKey ? 
                    <span className="text-green-400">Active</span> : 
                    <span className="text-yellow-400">Not Configured</span>}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs and Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Tab Navigation */}
        <div className="md:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-white/5">
              <h3 className="font-medium">Settings</h3>
            </div>
            <div className="p-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'profile' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Personal Info</span>
              </button>
              
              <button
                onClick={() => setActiveTab('api')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'api' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span>API Key</span>
              </button>
              
              <button
                onClick={() => setActiveTab('usage')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'usage' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Usage Statistics</span>
              </button>
              
              <button
                onClick={() => setActiveTab('preferences')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'preferences' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Preferences</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="md:col-span-3">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.name}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/30"
                      readOnly
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue={user.email}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/30"
                      readOnly
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-gray-400">
                      This information is pulled from your Google account.
                      Changes to your personal information must be made through Google.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'api' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">API Key Configuration</h3>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/10 rounded-lg border border-blue-800/30 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-blue-300">Why add your API key?</p>
                        <p className="mt-1 text-sm text-blue-200/80">
                          Using your own Gemini API key gives you unlimited idea generations and personalized results.
                          You can get a free API key from Google AI Studio.
                        </p>
                        <a 
                          href="https://aistudio.google.com/app/apikey" 
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="mt-2 inline-flex items-center text-xs font-medium text-blue-400 hover:text-blue-300"
                        >
                          Get API Key from Google AI Studio
                          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Gemini API Key</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={apiKeyInput}
                        onChange={(e) => {
                          setApiKeyInput(e.target.value);
                          setIsKeyValid(true);
                        }}
                        placeholder="Enter your Gemini API key"
                        className={`w-full bg-white/5 border ${isKeyValid ? 'border-white/20' : 'border-red-500/70'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white/30`}
                      />
                      {!isKeyValid && (
                        <p className="mt-2 text-sm text-red-400">Please enter a valid API key (minimum 10 characters)</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveApiKey}
                      disabled={isSaving}
                      className={`px-4 py-2 rounded-lg bg-white text-black hover:bg-opacity-90 transition-all duration-200 flex items-center space-x-2 ${
                        isSaving ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Saving...</span>
                        </>
                      ) : isSuccess ? (
                        <>
                          <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Saved Successfully</span>
                        </>
                      ) : (
                        <span>Save API Key</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'usage' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Usage Statistics</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                    <h4 className="text-sm text-gray-400 mb-1">Total Ideas Generated</h4>
                    <p className="text-2xl font-bold">47</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                    <h4 className="text-sm text-gray-400 mb-1">This Month</h4>
                    <p className="text-2xl font-bold">21</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                    <h4 className="text-sm text-gray-400 mb-1">Remaining Credits</h4>
                    <p className="text-2xl font-bold">{remainingIdeas}</p>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                  <h4 className="text-sm font-medium mb-4">Recent Usage</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-xs text-gray-400 border-b border-white/10">
                          <th className="text-left pb-2">Date</th>
                          <th className="text-right pb-2">Ideas Generated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usageData.map((day) => (
                          <tr key={day.date} className="border-b border-white/5 text-sm">
                            <td className="py-3">{day.date}</td>
                            <td className="py-3 text-right">{day.ideas}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">User Preferences</h3>
                
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-400 mt-1">Receive updates and news about new features</p>
                      </div>
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input type="checkbox" className="sr-only" />
                          <div className="block bg-white/10 w-10 h-6 rounded-full"></div>
                          <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Save Chat History</h4>
                        <p className="text-sm text-gray-400 mt-1">Store your idea generation history</p>
                      </div>
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input type="checkbox" defaultChecked className="sr-only" />
                          <div className="block bg-white/10 w-10 h-6 rounded-full"></div>
                          <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition translate-x-4"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Display Credit Warning</h4>
                        <p className="text-sm text-gray-400 mt-1">Show warning when credits are running low</p>
                      </div>
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input type="checkbox" defaultChecked className="sr-only" />
                          <div className="block bg-white/10 w-10 h-6 rounded-full"></div>
                          <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition translate-x-4"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button className="px-4 py-2 rounded-lg bg-white text-black hover:bg-opacity-90 transition-all duration-200">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 