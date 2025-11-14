
import React from 'react';
import type { ChatMessage } from '../types';

interface MessageProps {
  message: ChatMessage;
  isLoading?: boolean;
}

const formatText = (text: string) => {
    // Basic markdown-like formatting for code blocks and bold text
    const html = text
        .replace(/\`\`\`([\s\S]*?)\`\`\`/g, '<pre class="bg-gray-800/50 p-3 rounded-md my-2 text-sm text-gray-200 overflow-x-auto"><code>$1</code></pre>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br />');
    return { __html: html };
}

const Message: React.FC<MessageProps> = ({ message, isLoading }) => {
  const isModel = message.role === 'model';

  return (
    <div className={`flex gap-4 ${!isModel && 'flex-row-reverse'}`}>
      <div className={`w-8 h-8 rounded-full flex-shrink-0 ${isModel ? 'bg-gemini-blue-600' : 'bg-gray-600'}`}></div>
      <div className="w-full">
        <div className={`relative max-w-full lg:max-w-[85%] inline-block p-4 rounded-lg ${isModel ? 'bg-gray-800' : 'bg-gemini-blue-700'}`}>
          {isLoading && !message.text ? (
             <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
             </div>
          ) : (
            <div className="text-gray-200 prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={formatText(message.text)}></div>
          )}
        </div>
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 text-xs text-gray-400">
            <h4 className="font-semibold mb-1">Sources:</h4>
            <ul className="space-y-1">
              {message.sources.map((source, index) => (
                <li key={index} className="flex items-center">
                  <span className="bg-gray-700 text-gray-300 text-xs font-medium mr-2 px-2 py-0.5 rounded-full">{index + 1}</span>
                  <a href={source.uri} target="_blank" rel="noopener noreferrer" className="hover:text-gemini-blue-400 truncate">
                    {source.title || source.uri}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
