import { useState, useRef, useEffect, useCallback, memo, useMemo } from 'react';
import ChatMessage from './ChatMessage';
import IdeaCard from './IdeaCard';
import ChatSidebar from '../components/ChatSidebar';

interface Message {
  id: string;
  content: string | React.ReactNode;
  sender: 'user' | 'system';
  timestamp: Date;
  type?: 'text' | 'idea';
}

// Memoized button components to reduce re-renders
const IconButton = memo(({ onClick, disabled, children, className }: { 
  onClick: () => void, 
  disabled?: boolean, 
  children: React.ReactNode,
  className: string 
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={className}
  >
    {children}
  </button>
));

// Suggestions button component
const SuggestionButton = memo(({ suggestion, onClick }: { suggestion: string, onClick: (suggestion: string) => void }) => (
  <button
    onClick={() => onClick(suggestion)}
    className="text-left p-3 rounded-xl glass-effect-light hover:translate-y-[-2px] transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 text-sm"
  >
    {suggestion}
  </button>
));

// Memoized ChatInterface for performance
const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi! I can help you find project or startup ideas. What kind of idea are you looking for today?',
      sender: 'system',
      timestamp: new Date(),
      type: 'text',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [placeholder, setPlaceholder] = useState('Type your message...');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Performance optimization: only show visible messages
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Suggestions for quick prompts - memoized to prevent recreation
  const suggestions = useMemo(() => [
    "I need a web app idea for React",
    "Give me a startup idea in fintech",
    "I'm learning Python, what should I build?",
    "Suggest a mobile app for productivity"
  ], []);

  // Memoized message rendering logic to reduce calculations
  const visibleMessages = useMemo(() => {
    // If we have fewer than 50 messages, just show all of them
    if (messages.length < 50) return messages;
    
    // Otherwise, only render the visible ones
    return messages.slice(
      Math.max(0, visibleRange.start),
      Math.min(messages.length, visibleRange.end)
    );
  }, [messages, visibleRange]);

  // Auto-scroll to bottom when messages change, with performance optimization
  useEffect(() => {
    if (messages.length && messages[messages.length - 1].sender === 'user') {
      // Auto-scroll immediately after user sends a message
      messageEndRef.current?.scrollIntoView({ behavior: 'auto' });
    } else if (messages.length > 1) {
      // Smooth scroll for AI responses
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  // Handle scroll events for virtual rendering
  const handleMessagesScroll = useCallback(() => {
    if (!messagesContainerRef.current || messages.length < 50) return;
    
    const scrollTop = messagesContainerRef.current.scrollTop;
    const clientHeight = messagesContainerRef.current.clientHeight;
    // const scrollHeight = messagesContainerRef.current.scrollHeight;
    
    // Estimate which messages are visible
    const estimatedMessageHeight = 100; // Approximate average height
    const startIndex = Math.floor(scrollTop / estimatedMessageHeight);
    const visibleCount = Math.ceil(clientHeight / estimatedMessageHeight);
    
    // Add buffer before and after
    const buffer = 10;
    setVisibleRange({
      start: Math.max(0, startIndex - buffer),
      end: Math.min(messages.length, startIndex + visibleCount + buffer)
    });
  }, [messages.length]);

  // Set up scroll listener
  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      messagesContainer.addEventListener('scroll', handleMessagesScroll);
      return () => {
        messagesContainer.removeEventListener('scroll', handleMessagesScroll);
      };
    }
  }, [handleMessagesScroll]);

  // Rotating placeholder text with reduced update frequency
  useEffect(() => {
    const placeholders = [
      'Type your message...',
      'What skills do you have?',
      'Looking for a startup idea?',
      'Need a project for your portfolio?'
    ];
    
    // Reduced frequency of updates to save CPU cycles
    const intervalId = setInterval(() => {
      setPlaceholder(placeholders[Math.floor(Math.random() * placeholders.length)]);
    }, 8000); // Increased interval
    
    return () => clearInterval(intervalId);
  }, []);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent, customMessage?: string) => {
    e.preventDefault();
    const message = customMessage || inputValue;
    if ((!message.trim() && !customMessage) || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsGenerating(true);
    setShowSuggestions(false);

    // Simulate typing indicator before response
    await new Promise(resolve => setTimeout(resolve, 800));

    // Add thinking effect
    const thinkingId = Date.now().toString();
    setMessages((prev) => [
      ...prev,
      {
        id: thinkingId,
        content: "Let me think of a great idea for you...",
        sender: 'system',
        timestamp: new Date(),
        type: 'text',
      }
    ]);

    // Simulate idea generation (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Replace thinking message with actual response - optimized to avoid full array copy
    setMessages((prev) => {
      const filteredMessages = prev.filter(m => m.id !== thinkingId);
      return [...filteredMessages, {
        id: (Date.now() + 1).toString(),
        content: (
          <IdeaCard
            title="AI-Powered Personal Finance Manager"
            summary="An intelligent personal finance management app that uses AI to analyze spending patterns and provide personalized financial advice."
            problem="Many people struggle with managing their finances effectively and making informed financial decisions."
            targetAudience="Young professionals and individuals looking to improve their financial literacy and money management skills."
            coreFeatures={[
              'AI-powered spending analysis and categorization',
              'Personalized financial advice and recommendations',
              'Automated budget creation and tracking',
              'Investment portfolio optimization suggestions',
              'Financial goal setting and progress tracking',
            ]}
            benefits="Helps users make better financial decisions, save money, and achieve their financial goals through AI-driven insights."
            techStack={[
              'React Native',
              'Node.js',
              'TensorFlow',
              'MongoDB',
              'AWS',
            ]}
            monetization={[
              'Premium subscription for advanced features',
              'Partnerships with financial institutions',
              'Affiliate marketing for financial products',
            ]}
            challenges={[
              'Ensuring data security and privacy',
              'Building accurate AI models for financial predictions',
              'Gaining user trust in financial recommendations',
            ]}
            nextSteps={[
              'Conduct market research and user interviews',
              'Develop MVP with core features',
              'Test with beta users and gather feedback',
              'Implement security measures and compliance requirements',
            ]}
          />
        ),
        sender: 'system',
        timestamp: new Date(),
        type: 'idea',
      }];
    });
    
    setIsGenerating(false);
  }, [inputValue, isGenerating]);
  
  const handleSuggestionClick = useCallback((suggestion: string) => {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent, suggestion);
  }, [handleSubmit]);

  // Toggle sidebar with animation optimizations
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className="flex h-full bg-transparent relative overflow-hidden">
      {/* Chat Sidebar - memoized through its own component */}
      <ChatSidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
      />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative bg-gradient-to-b from-gray-900/30 to-black/30 backdrop-blur-sm rounded-xl border border-white/5">
        {/* Gradient accent - using CSS variables for better performance */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none transform-gpu"></div>
        
        {/* Messages container with virtualization */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent will-change-scroll"
          onScroll={handleMessagesScroll}
        >
          {messages.length === 1 && !isGenerating ? (
            // Center the suggestions when it's the only content
            <div className="h-full flex items-center justify-center">
              <div className="flex flex-col items-center space-y-6 -mt-20">
                <div className="animate-glow">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-75">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="1.5"/>
                    <path d="M12 8V12L15 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="flex flex-col items-center space-y-4 animate-fadeIn">
                  <p className="text-gray-400 text-sm">Here are some ideas to get you started:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                    {suggestions.map((suggestion, index) => (
                      <SuggestionButton
                        key={index}
                        suggestion={suggestion}
                        onClick={handleSuggestionClick}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 min-h-full">
              {/* Only render visible messages */}
              {visibleMessages.map((message) => (
                <ChatMessage
                  key={message.id}
                  content={message.content}
                  sender={message.sender}
                  timestamp={message.timestamp}
                  type={message.type}
                />
              ))}
              <div ref={messageEndRef} />
            </div>
          )}
        </div>
        
        {/* Input form - optimized rendering */}
        <div className="border-t border-white/10 bg-white/5 backdrop-blur-md px-4 py-4 rounded-b-xl">
          <form onSubmit={handleSubmit} className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isGenerating}
                placeholder={placeholder}
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm disabled:opacity-60 placeholder-gray-400"
              />
              {showSuggestions && (
                <div className="absolute bottom-full left-0 w-full bg-gray-800/95 backdrop-blur-md rounded-xl shadow-lg p-2 mb-2 border border-white/10 z-10 animate-slideInUp">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setInputValue(suggestion);
                        setShowSuggestions(false);
                        inputRef.current?.focus();
                      }}
                      className="p-2 hover:bg-white/10 rounded-lg cursor-pointer text-sm transition-colors"
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <IconButton
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 text-indigo-300 hover:text-indigo-200"
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </IconButton>
              <button
                type="submit"
                disabled={isGenerating}
                className={`p-3 rounded-xl ${
                  isGenerating
                    ? 'bg-indigo-500/30 cursor-not-allowed'
                    : 'bg-indigo-500 hover:bg-indigo-600 cursor-pointer'
                } transition-all duration-300 flex-shrink-0`}
              >
                {isGenerating ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                )}
              </button>
            </div>
          </form>
          
          {/* Features indicator - simple static content, low impact */}
          <div className="flex items-center justify-center mt-3 space-x-6 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>AI Powered</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Export Ideas</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Business Plans</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChatInterface); 