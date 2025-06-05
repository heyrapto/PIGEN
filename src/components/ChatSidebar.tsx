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
      className={`fixed md:relative inset-y-0 left-0 z-30 bg-gray-900 border-r border-white/10 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-16'
      } ${!isOpen && 'md:hover:w-64'}`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header with Toggle */}
        <div className="flex items-center justify-between p-3 border-b border-white/10">
          <div className="flex items-center min-w-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className={`ml-3 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
              <h2 className="font-semibold text-white">AI Chat</h2>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 text-white transition-transform duration-300 ${!isOpen && 'rotate-180'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* New Chat Button */}
        <button
          onClick={() => setSelectedChat(null)}
          className="m-2 flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white text-sm group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
            New Chat
          </span>
        </button>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto mt-2 px-2">
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 text-left transition-colors group ${
                selectedChat === chat.id
                  ? 'bg-white/20 text-white'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              <span className={`text-sm truncate transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
                {chat.title}
              </span>
            </button>
          ))}
        </div>

        {/* Bottom Section - Profile & Sign Out */}
        <div className="mt-auto border-t border-white/10">
          <div className="p-2">
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition-colors group">
              <Link to="/profile" className="flex items-center min-w-0 space-x-3">
                <div className="relative flex-shrink-0">
                  <img
                    src={avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full ring-1 ring-white/20"
                  />
                  <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-1 ring-black"></span>
                </div>
                <span className={`text-sm text-white truncate transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
                  {user?.name}
                </span>
              </Link>
              <button
                onClick={signOut}
                className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white ${!isOpen && 'hidden md:group-hover:block'}`}
                title="Sign out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
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