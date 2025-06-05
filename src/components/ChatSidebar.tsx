import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { avatar } from '../assets';

interface ChatSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const ChatSidebar = ({ isOpen, toggleSidebar }: ChatSidebarProps) => {
  const { user, signOut } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const chatHistory = [
    { id: '1', title: 'React Web App Ideas', date: '2024-01-20' },
    { id: '2', title: 'Fintech Startup Concepts', date: '2024-01-19' },
    { id: '3', title: 'Mobile App Project', date: '2024-01-18' },
  ];

  return (
    <aside
      className={`fixed md:relative inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-16'
      } bg-gradient-to-b from-gray-900 to-black border-r border-white/10 overflow-hidden`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header with Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className={`flex items-center min-w-0 ${!isOpen && 'w-full justify-center'}`}>
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className={`ml-3 overflow-hidden transition-all duration-300 ${isOpen ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}>
              <h2 className="font-semibold text-white truncate">AI Chat</h2>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer ${
              isOpen ? 'opacity-100' : 'hidden'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* New Chat Button */}
        <button
          onClick={() => setSelectedChat(null)}
          className={`mx-3 mt-3 flex items-center px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-white/10 transition-all duration-200 cursor-pointer ${
            !isOpen ? 'justify-center hover:bg-white/10' : 'space-x-3'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white flex-shrink-0 transition-transform duration-200 hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
          <span className={`text-sm font-medium text-white transition-all duration-300 ${isOpen ? 'opacity-100' : 'hidden'}`}>
            New Chat
          </span>
        </button>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto mt-3 px-3">
          <div className="space-y-1">
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                onClick={() => {
                  setSelectedChat(chat.id);
                  if (!isOpen) {
                    toggleSidebar();
                  }
                }}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-all duration-200 cursor-pointer ${
                  !isOpen ? 'justify-center hover:bg-white/10' : 'space-x-3'
                } ${
                  selectedChat === chat.id
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${!isOpen && 'hover:scale-110'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <div className={`flex-1 min-w-0 ${!isOpen ? 'hidden' : ''}`}>
                  <p className="text-sm truncate">{chat.title}</p>
                  <p className="text-xs text-gray-500 truncate">{chat.date}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Section - Profile & Sign Out */}
        <div className="mt-auto border-t border-white/10">
          <div className="p-3">
            <div className={`flex items-center p-2 rounded-lg hover:bg-white/5 transition-colors duration-200 cursor-pointer ${isOpen ? 'justify-between space-x-3' : 'justify-center'}`}>
              <Link 
                to="/profile" 
                className={`flex items-center min-w-0 ${isOpen ? 'space-x-3' : ''}`}
                onClick={() => {
                  if (!isOpen) {
                    toggleSidebar();
                  }
                }}
              >
                <div className="relative flex-shrink-0 transition-transform duration-200 hover:scale-110">
                  <img
                    src={avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full ring-1 ring-white/20"
                  />
                  <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-emerald-400 ring-1 ring-black"></span>
                </div>
                <span className={`text-sm text-white truncate transition-all duration-300 ${isOpen ? 'opacity-100 w-32' : 'hidden'}`}>
                  {user?.name}
                </span>
              </Link>
              <button
                onClick={signOut}
                className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors duration-200 text-gray-400 hover:text-white cursor-pointer ${
                  isOpen ? 'opacity-100' : 'hidden'
                }`}
                title="Sign out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-200 hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar; 