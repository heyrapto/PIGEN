import { useState, useRef, useEffect, useCallback, memo } from 'react';
import ChatMessage from './ChatMessage';
import IdeaCard from './IdeaCard';

interface Message {
  id: string;
  content: string | React.ReactNode;
  sender: 'user' | 'system';
  timestamp: Date;
  type?: 'text' | 'idea';
}

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
  
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Suggestions for quick prompts
  const suggestions = [
    "I need a web app idea for React",
    "Give me a startup idea in fintech",
    "I'm learning Python, what should I build?",
    "Suggest a mobile app for productivity"
  ];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Rotating placeholder text
  useEffect(() => {
    const placeholders = [
      'Type your message...',
      'What skills do you have?',
      'Looking for a startup idea?',
      'Need a project for your portfolio?'
    ];
    
    const intervalId = setInterval(() => {
      setPlaceholder(placeholders[Math.floor(Math.random() * placeholders.length)]);
    }, 5000);
    
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

    // Replace thinking message with actual response
    setMessages((prev) => 
      prev.filter(m => m.id !== thinkingId).concat({
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
      })
    );
    
    setIsGenerating(false);
  }, [inputValue, isGenerating]);
  
  const handleSuggestionClick = useCallback((suggestion: string) => {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent, suggestion);
  }, [handleSubmit]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-transparent relative">
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
      
      {/* Messages container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        <div className="space-y-4 sm:space-y-6">
          {messages.map((message) => (
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
        
        {/* Suggestions shown when chat is empty */}
        {messages.length === 1 && !isGenerating && (
          <div className="flex flex-col items-center space-y-3 sm:space-y-4 mt-6 sm:mt-8 mb-3 sm:mb-4">
            <p className="text-gray-400 text-xs sm:text-sm">Here are some ideas to get you started:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 w-full max-w-2xl mx-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-left p-2 sm:p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 hover:translate-y-[-2px] text-xs sm:text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Input form */}
      <div className="border-t border-white/10 bg-white/5 backdrop-blur-sm px-2 sm:px-4 py-3 sm:py-4 rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 sm:space-x-4">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isGenerating}
              placeholder={placeholder}
              className="w-full bg-white/10 text-white rounded-full px-4 py-2 sm:py-3 focus:outline-none focus:ring-1 focus:ring-white/20 text-sm disabled:opacity-60 placeholder-gray-400 placeholder:text-xs sm:placeholder:text-sm"
            />
            {showSuggestions && (
              <div className="absolute bottom-full left-0 w-full bg-gray-900 rounded-lg shadow-lg p-2 mb-2 border border-white/10 z-10">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setInputValue(suggestion);
                      setShowSuggestions(false);
                      inputRef.current?.focus();
                    }}
                    className="p-2 hover:bg-white/5 rounded cursor-pointer text-xs sm:text-sm"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 text-gray-400"
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
          </button>
          <button
            type="submit"
            disabled={isGenerating}
            className={`p-2 sm:p-3 rounded-full ${
              isGenerating
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-white/10 cursor-pointer'
            } transition-colors duration-200 flex-shrink-0`}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(ChatInterface); 