import type { ReactNode } from 'react';
import { avatar } from '../assets';

interface ChatMessageProps {
  content: string | ReactNode;
  sender: 'user' | 'system';
  timestamp: Date;
  type?: 'text' | 'idea';
}

const ChatMessage = ({ content, sender, timestamp, type = 'text' }: ChatMessageProps) => {
  const isUser = sender === 'user';
  const animationClass = isUser ? 'animate-slideInRight delay-100' : 'animate-slideInUp delay-200';
  
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} ${animationClass}`}
    >
      {sender === 'system' && (
        <div className="mr-3 h-9 w-9 flex-shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-md shadow-indigo-500/20">
          <div className="h-full w-full rounded-full bg-gray-900 p-1.5 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="url(#paint0_linear)" strokeWidth="1.5"/>
              <path d="M12 8V12L15 15" stroke="url(#paint1_linear)" strokeWidth="1.5" strokeLinecap="round"/>
              <defs>
                <linearGradient id="paint0_linear" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366F1" />
                  <stop offset="1" stopColor="#A855F7" />
                </linearGradient>
                <linearGradient id="paint1_linear" x1="12" y1="8" x2="15" y2="15" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366F1" />
                  <stop offset="1" stopColor="#A855F7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      )}
      <div
        className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/20'
            : 'bg-gray-800/60 backdrop-blur-sm border border-white/5 text-white shadow-lg shadow-black/20'
        }`}
      >
        {type === 'text' ? (
          <>
            <p className="text-sm">{content}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs opacity-70">
                {timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
              
              {!isUser && (
                <div className="flex items-center space-x-1.5">
                  <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="w-full">
            {content}
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs opacity-70">
                {timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
              
              <div className="flex items-center space-x-2">
                <button className="p-1 text-xs flex items-center space-x-1 text-indigo-300 hover:bg-white/10 rounded-md px-2 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.707 7.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L13 8.586V5h3a2 2 0 012 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2V7a2 2 0 012-2h3v3.586L9.707 7.293zM11 3a1 1 0 112 0v2h-2V3z" />
                  </svg>
                  <span>Save</span>
                </button>
                <button className="p-1 text-xs flex items-center space-x-1 text-indigo-300 hover:bg-white/10 rounded-md px-2 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {isUser && (
        <div className="ml-3 h-9 w-9 flex-shrink-0 rounded-full overflow-hidden border-2 border-indigo-500 shadow-md shadow-indigo-500/20">
          <img src={avatar} alt="User avatar" className="h-full w-full object-cover" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage; 