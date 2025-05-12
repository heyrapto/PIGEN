import type { ReactNode } from 'react';

interface ChatMessageProps {
  content: string | ReactNode;
  sender: 'user' | 'system';
  timestamp: Date;
  type?: 'text' | 'idea';
}

const ChatMessage = ({ content, sender, timestamp, type = 'text' }: ChatMessageProps) => {
  return (
    <div
      className={`flex ${
        sender === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      {sender === 'system' && (
        <div className="mr-1.5 sm:mr-2 h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 rounded-full bg-black p-1.5 border border-white/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="1.5"/>
            <path d="M12 8V12L15 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      )}
      <div
        className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2 ${
          sender === 'user'
            ? 'bg-white text-black'
            : 'bg-gray-800 text-white'
        }`}
      >
        {type === 'text' ? (
          <>
            <p className="text-xs sm:text-sm">{content}</p>
            <span className="text-[10px] sm:text-xs opacity-50 mt-1 block">
              {timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </span>
          </>
        ) : (
          <div className="w-full">
            {content}
            <span className="text-[10px] sm:text-xs opacity-50 mt-1 sm:mt-2 block">
              {timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </span>
          </div>
        )}
      </div>
      {sender === 'user' && (
        <div className="ml-1.5 sm:ml-2 h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 rounded-full bg-white/10 overflow-hidden">
          <img src="/src/assets/avatar.svg" alt="" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage; 