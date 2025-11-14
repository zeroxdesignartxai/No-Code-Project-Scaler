
import React from 'react';

export const ChatIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
  </svg>
);

export const BoltIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 21h-1l1-7H7v-2h4l-1-7h1l-1 7h4v2h-4z" />
  </svg>
);

export const NetworkIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.9 14.45c.39-.4.39-1.04 0-1.44l-3.04-3.04c-.4-.4-1.04-.4-1.44 0l-1.08 1.08c-1.4-1.4-3.08-2.42-4.9-2.91l.88-1.57c.29-.51.13-1.15-.36-1.48L7.49 4.2c-.49-.33-1.13-.17-1.48.36L5.13 6.13c-.33.49-.17 1.13.36 1.48l1.57.88c-.49 1.82-1.51 3.5-2.91 4.9l-1.08-1.08c-.4-.4-.4-1.04 0-1.44L6 9.87c.4-.4.4-1.04 0-1.44l-1.08-1.08c-.4-.4-1.04-.4-1.44 0L.4 10.43c-.4.4-.4 1.04 0 1.44l3.04 3.04c.4.4 1.04.4 1.44 0l1.08-1.08c1.4 1.4 3.08 2.42 4.9 2.91l-.88 1.57c-.29.51-.13 1.15.36 1.48l1.48.9c.49.33 1.13.17 1.48-.36l.88-1.57c.33-.49.17-1.13-.36-1.48l-1.57-.88c1.82-.49 3.5-1.51 4.9-2.91l1.08 1.08c.4.4 1.04.4 1.44 0l3.04-3.04zm-8.31.57c-2.06-2.06-2.96-4.63-3.03-5.06l5.06 3.03c-2.06 2.06-4.63 2.96-5.06 3.03zm1.08-1.08c-2.06-2.06-2.06-5.39 0-7.44 2.06-2.06 5.39-2.06 7.44 0 2.06 2.06 2.06 5.39 0 7.44-2.06 2.06-5.38 2.06-7.44 0z" />
  </svg>
);

export const GoogleIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export const SendIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>
);
