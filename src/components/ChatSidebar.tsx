import { useState } from 'react';

interface ChatSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const ChatSidebar = ({ isOpen, toggleSidebar }: ChatSidebarProps) => {
  const [activeTab, setActiveTab] = useState<'tools' | 'settings' | 'documents'>('tools');
  
  // Sample data for the tools section
  const tools = [
    { 
      id: 'idea-generator', 
      name: 'Idea Generator', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      description: 'Generate project and startup ideas'
    },
    { 
      id: 'code-assistant', 
      name: 'Code Assistant', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      ),
      description: 'Help with coding questions and problems'
    },
    { 
      id: 'market-research', 
      name: 'Market Research', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L15.414 5l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3A1 1 0 0112 2zm0 10a1 1 0 01.707.293l.707.707L15.414 15l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3A1 1 0 0112 12z" clipRule="evenodd" />
        </svg>
      ),
      description: 'Analyze market trends and opportunities'
    },
    { 
      id: 'business-plan', 
      name: 'Business Plan', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
      ),
      description: 'Create a structured business plan'
    }
  ];

  // Sample saved documents
  const documents = [
    { id: 'doc1', title: 'AI Startup Idea', date: '2 days ago' },
    { id: 'doc2', title: 'Web3 Project Concept', date: '5 days ago' },
    { id: 'doc3', title: 'Mobile App Roadmap', date: '1 week ago' }
  ];

  // Settings options
  const settings = [
    { id: 'creativity', name: 'AI Creativity', value: 0.7 },
    { id: 'detail', name: 'Response Detail', value: 0.8 },
    { id: 'theme', name: 'Dark Mode', enabled: true }
  ];

  return (
    <div 
      className={`${isOpen ? 'w-72' : 'w-0 md:w-16'} transform transition-all duration-300 ease-in-out h-full bg-gray-900 border-r border-white/10 relative ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} overflow-hidden flex flex-col`}
    >
      {/* Header with logo */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className={`flex items-center space-x-2 ${!isOpen && 'md:hidden'}`}>
          <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center animate-glow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="font-bold text-white">PIGEN AI</h2>
        </div>
        <button 
          onClick={toggleSidebar} 
          className="p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            )}
          </svg>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className={`flex border-b border-white/10 ${!isOpen && 'md:hidden'}`}>
        <button 
          className={`flex-1 py-2 text-xs font-medium ${activeTab === 'tools' ? 'text-white border-b-2 border-teal-500' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('tools')}
        >
          Tools
        </button>
        <button 
          className={`flex-1 py-2 text-xs font-medium ${activeTab === 'documents' ? 'text-white border-b-2 border-teal-500' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('documents')}
        >
          Saved
        </button>
        <button 
          className={`flex-1 py-2 text-xs font-medium ${activeTab === 'settings' ? 'text-white border-b-2 border-teal-500' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      {/* Compact Menu for collapsed state */}
      <div className={`${isOpen ? 'hidden' : 'md:flex flex-col items-center py-4 space-y-6'} hidden`}>
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
        </button>
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Content Area */}
      <div className={`overflow-y-auto flex-1 scrollbar-thin ${!isOpen && 'md:hidden'}`}>
        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <div className="p-3 space-y-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Available Tools</h3>
            <div className="space-y-2">
              {tools.map(tool => (
                <div 
                  key={tool.id}
                  className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 rounded-full bg-teal-900/30 text-teal-500 group-hover:bg-teal-900/50 transition-colors">
                      {tool.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">{tool.name}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{tool.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6">Quick Prompts</h3>
            <div className="space-y-2">
              <button className="w-full p-2 text-left text-xs bg-white/5 hover:bg-white/10 transition-all duration-200 rounded-lg border border-white/10">
                Create a SaaS startup idea
              </button>
              <button className="w-full p-2 text-left text-xs bg-white/5 hover:bg-white/10 transition-all duration-200 rounded-lg border border-white/10">
                AI-powered app concept
              </button>
              <button className="w-full p-2 text-left text-xs bg-white/5 hover:bg-white/10 transition-all duration-200 rounded-lg border border-white/10">
                Fintech solution for students
              </button>
            </div>
          </div>
        )}
        
        {/* Saved Documents Tab */}
        {activeTab === 'documents' && (
          <div className="p-3 space-y-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Saved Ideas</h3>
            <div className="space-y-2">
              {documents.map(doc => (
                <div 
                  key={doc.id}
                  className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-white">{doc.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{doc.date}</p>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-white/10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-4 w-full py-2 flex items-center justify-center space-x-1 text-xs bg-white/5 hover:bg-white/10 transition-all duration-200 rounded-lg border border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>New Document</span>
            </button>
          </div>
        )}
        
        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="p-3 space-y-5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">AI Settings</h3>
            
            {/* Sliders for AI parameters */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs text-gray-300">Creativity</label>
                  <span className="text-xs text-gray-400">{settings[0]?.value ? settings[0].value * 10 : 7}/10</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1" 
                  defaultValue={settings[0]?.value || 0.7}
                  className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>Precise</span>
                  <span>Creative</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs text-gray-300">Detail Level</label>
                  <span className="text-xs text-gray-400">{settings[1]?.value ? settings[1].value * 10 : 8}/10</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1" 
                  defaultValue={settings[1]?.value || 0.8}
                  className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>Concise</span>
                  <span>Detailed</span>
                </div>
              </div>
            </div>
            
            {/* Toggle switches */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-2">Interface</h3>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300">Dark Mode</span>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input 
                    type="checkbox" 
                    name="toggle" 
                    id="toggle" 
                    className="sr-only toggle-checkbox"
                    defaultChecked={settings[2].enabled}
                  />
                  <label 
                    htmlFor="toggle" 
                    className="block overflow-hidden h-5 rounded-full bg-gray-700 cursor-pointer"
                  >
                    <span className="dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out" />
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300">Sound Effects</span>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input 
                    type="checkbox" 
                    name="toggle2" 
                    id="toggle2" 
                    className="sr-only toggle-checkbox"
                  />
                  <label 
                    htmlFor="toggle2" 
                    className="block overflow-hidden h-5 rounded-full bg-gray-700 cursor-pointer"
                  >
                    <span className="dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out" />
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300">Animations</span>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input 
                    type="checkbox" 
                    name="toggle3" 
                    id="toggle3" 
                    className="sr-only toggle-checkbox"
                    defaultChecked={true}
                  />
                  <label 
                    htmlFor="toggle3" 
                    className="block overflow-hidden h-5 rounded-full bg-gray-700 cursor-pointer"
                  >
                    <span className="dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className={`p-3 border-t border-white/10 ${!isOpen && 'md:hidden'}`}>
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">v2.1.0</div>
          <button className="text-xs text-gray-400 hover:text-white">Help</button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar; 