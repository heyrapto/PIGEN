import { ReactNode } from 'react';

declare module './components/ChatSidebar' {
  export interface ChatSidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
  }
  
  const ChatSidebar: React.FC<ChatSidebarProps>;
  export default ChatSidebar;
} 