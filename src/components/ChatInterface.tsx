import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { useAuth } from '../contexts/AuthContext';
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
  const { remainingIdeas } = useAuth();
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
        className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        <div className="space-y-6">
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
          <div className="flex flex-col items-center space-y-4 mt-8 mb-4">
            <p className="text-gray-400 text-sm">Here are some ideas to get you started:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl mx-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-left p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 hover:translate-y-[-2px]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input form */}
      <div className="relative border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                placeholder={placeholder}
                className="w-full bg-white/5 text-white rounded-lg pl-4 pr-10 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 border border-white/10"
                disabled={isGenerating}
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => setInputValue('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              
              {/* Quick suggestions dropdown */}
              {showSuggestions && !isGenerating && (
                <div className="absolute bottom-full left-0 w-full bg-gray-900 rounded-t-lg border border-white/10 border-b-0 py-2 mb-1 max-h-40 overflow-y-auto z-10">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-white/10 text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="submit"
              className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                isGenerating
                  ? 'bg-gray-800 text-gray-400 cursor-not-allowed opacity-70'
                  : 'bg-white text-black hover:bg-opacity-90 active:scale-95'
              }`}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              ) : (
                <span>Send</span>
              )}
            </button>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
            <div>
              Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white mx-1">Enter</kbd> to send
            </div>
            <div className="text-gray-400">
              <span className="font-semibold text-white">{remainingIdeas}</span> ideas remaining today
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(ChatInterface); 