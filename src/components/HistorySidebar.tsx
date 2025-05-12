import { useState, useCallback, memo } from 'react';

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
  type: 'learning' | 'startup';
}

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Using memo for performance optimization
const HistorySidebar = memo(({ isOpen, onClose }: HistorySidebarProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'learning' | 'startup'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'AI Finance Manager',
      timestamp: new Date(),
      preview: 'Generated an AI-powered personal finance management app idea...',
      type: 'startup'
    },
    {
      id: '2',
      title: 'E-commerce Platform',
      timestamp: new Date(Date.now() - 86400000),
      preview: 'Discussed a modern e-commerce platform with AI recommendations...',
      type: 'startup'
    },
    {
      id: '3',
      title: 'Portfolio Website',
      timestamp: new Date(Date.now() - 172800000),
      preview: 'Created a learning project idea for a portfolio website with React...',
      type: 'learning'
    },
    {
      id: '4',
      title: 'Task Management App',
      timestamp: new Date(Date.now() - 259200000),
      preview: 'Explored building a task management application with Redux...',
      type: 'learning'
    },
  ]);

  const handleTabChange = useCallback((tab: 'all' | 'learning' | 'startup') => {
    setActiveTab(tab);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  // Filter conversations based on active tab and search query
  const filteredConversations = conversations.filter(convo => {
    const matchesTab = activeTab === 'all' || convo.type === activeTab;
    const matchesSearch = searchQuery === '' || 
      convo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      convo.preview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <>
      {/* Backdrop with blur effect */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-gradient-to-b from-gray-900 to-black border-l border-white/10 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Your Ideas
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                aria-label="Close sidebar"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            
            {/* Search input */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search your ideas..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-white/20"
              />
              {searchQuery && (
                <button 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchQuery('')}
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Filter tabs */}
            <div className="flex rounded-lg bg-white/5 p-1">
              <button
                className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'all' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => handleTabChange('all')}
              >
                All
              </button>
              <button
                className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'learning' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => handleTabChange('learning')}
              >
                Learning
              </button>
              <button
                className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'startup' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => handleTabChange('startup')}
              >
                Startup
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => (
                <ConversationItem key={conversation.id} conversation={conversation} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <svg className="w-16 h-16 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m0 16v1m-8-8h1m15 0h1m-9-9l.5-.5m4.5.5l-.5-.5m-8.5 9.5l-.5.5m12.5-.5l-.5.5M5.379 5.308A9 9 0 0021 12a9 9 0 00-9 9 9 9 0 01-5-1.5" />
                </svg>
                <p className="text-gray-400">No conversations found</p>
                {searchQuery && (
                  <button
                    className="mt-2 text-white text-sm underline"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-white/10">
            <button className="w-full py-2 rounded-lg bg-white text-black hover:bg-opacity-90 transition-all duration-200 font-medium">
              Start New Conversation
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

// Conversation item component
const ConversationItem = memo(({ conversation }: { conversation: Conversation }) => {
  const typeIcon = conversation.type === 'learning' 
    ? (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13c-1.168-.776-2.754-1.253-4.5-1.253-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ) 
    : (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );

  return (
    <button
      className="w-full text-left p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 transform hover:-translate-y-0.5"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex space-x-2 items-center">
          <span className="p-1.5 rounded-full bg-white/10">{typeIcon}</span>
          <h3 className="font-medium text-white">{conversation.title}</h3>
        </div>
        <span className="text-xs text-gray-500 whitespace-nowrap mt-1">
          {getRelativeTime(conversation.timestamp)}
        </span>
      </div>
      <p className="text-sm text-gray-400 line-clamp-2 mb-1">{conversation.preview}</p>
    </button>
  );
});

// Helper function for relative time
function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  
  return date.toLocaleDateString();
}

export default HistorySidebar; 