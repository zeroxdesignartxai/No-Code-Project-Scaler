// FIX: Import `ComponentType` from 'react' to fix 'Cannot find namespace React' error.
import type { ComponentType } from 'react';

export type Mode = 'chat' | 'fast' | 'deep' | 'search';

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: GroundingSource[];
}

export interface ModeOption {
  id: Mode;
  name: string;
  model: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}
