import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Chat } from '@google/genai';
import type { Mode, ChatMessage, ModeOption } from '../types';
import { createChatSession, runChat, runFast, runDeep, runSearch } from '../services/geminiService';
import { BoltIcon, ChatIcon, GoogleIcon, NetworkIcon, SendIcon } from './icons';
import ModeSelector from './ModeSelector';
import Message from './Message';

const NO_CODE_CONTEXT = `Your primary goal is to help users understand how to structure a scalable no-code project so it doesn’t fall apart when they add more users, features, or automations. Use the following text as your core knowledge base.

--- KNOWLEDGE BASE ---
A scalable no-code system follows this pattern:
1.  Clean, normalized database: Keep data in separate tables (Users, Products, etc.). Don’t mix concepts. Use fields like 'status', 'type', 'role' for scalability.
2.  Thin frontend, thick backend: Move heavy logic to backend workflows (Xano, Bubble backend) or automations (Make.com), not on the user's device.
3.  Separate “core logic” from “UI logic”: 'Core logic' is "Create order". 'UI logic' is "Show this banner". Keep them separate.
4.  Versioning + naming conventions: Use clear names like 'orders_create_v1' and 'total_price'.
5.  Build with “states,” not “pages”: Use one dynamic page instead of many static pages to reduce load times.
6.  Event-driven automations: Use trigger tables (a 'Jobs' table) or event logs to run automations reliably.
7.  Role-based permissions: Define roles (admin, manager) and centralize rules for who can read/write/delete data.
--- END KNOWLEDGE BASE ---
`;

const modes: ModeOption[] = [
  { id: 'chat', name: 'Chat', model: 'gemini-2.5-flash', description: 'Ask questions about the content.', icon: ChatIcon },
  // FIX: Updated model to 'gemini-flash-lite-latest' to align with the coding guidelines.
  { id: 'fast', name: 'Fast', model: 'gemini-flash-lite-latest', description: 'Quick analysis of your ideas.', icon: BoltIcon },
  { id: 'deep', name: 'Deep Dive', model: 'gemini-2.5-pro', description: 'In-depth analysis for complex queries.', icon: NetworkIcon },
  { id: 'search', name: 'Web Search', model: 'gemini-2.5-flash', description: 'Get up-to-date info from the web.', icon: GoogleIcon },
];

const AIPanel: React.FC = () => {
  const [mode, setMode] = useState<Mode>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSession = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatSession.current = createChatSession(NO_CODE_CONTEXT);
    setMessages([{ role: 'model', text: 'Hello! How can I help you structure your no-code project today?' }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userInput = input;
    setInput('');
    setIsLoading(true);
    
    setMessages(prev => [...prev, { role: 'user', text: userInput }]);
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    try {
        let stream;
        switch (mode) {
            case 'chat':
                if (!chatSession.current) {
                    chatSession.current = createChatSession(NO_CODE_CONTEXT);
                }
                stream = runChat(chatSession.current, userInput);
                break;
            case 'fast':
                stream = runFast(`${NO_CODE_CONTEXT}\n\nUSER QUERY: ${userInput}`);
                break;
            case 'deep':
                stream = runDeep(`${NO_CODE_CONTEXT}\n\nUSER QUERY: ${userInput}`);
                break;
            case 'search':
                stream = runSearch(userInput);
                break;
        }

        for await (const chunk of stream) {
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                lastMessage.text += chunk.text;
                if (chunk.sources && chunk.sources.length > 0) {
                    lastMessage.sources = chunk.sources;
                }
                return newMessages;
            });
        }

    } catch (error) {
        console.error('Error:', error);
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = 'Sorry, something went wrong. Please try again.';
          return newMessages;
        });
    } finally {
        setIsLoading(false);
    }
  }, [input, isLoading, mode]);
  

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <header className="p-4 border-b border-gray-700/50">
        <ModeSelector modes={modes} selectedMode={mode} onSelectMode={setMode} />
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} isLoading={isLoading && index === messages.length - 1} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <footer className="p-4 border-t border-gray-700/50">
        <div className="flex items-center bg-gray-800 rounded-lg p-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                }
            }}
            placeholder={`Ask a question in ${mode} mode...`}
            className="flex-1 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none resize-none"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-2 rounded-full text-white disabled:text-gray-500 disabled:cursor-not-allowed enabled:hover:bg-gemini-blue-500 enabled:bg-gemini-blue-600 transition-colors"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AIPanel;
