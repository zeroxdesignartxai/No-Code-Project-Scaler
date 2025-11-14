
import React from 'react';
import type { Mode, ModeOption } from '../types';

interface ModeSelectorProps {
  modes: ModeOption[];
  selectedMode: Mode;
  onSelectMode: (mode: Mode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ modes, selectedMode, onSelectMode }) => {
  return (
    <div className="flex flex-col items-start space-y-3">
      <div className="flex items-center space-x-2">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onSelectMode(mode.id)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedMode === mode.id
                ? 'bg-gemini-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <mode.icon className="w-4 h-4" />
            <span>{mode.name}</span>
          </button>
        ))}
      </div>
      <div className="text-xs text-gray-400 pl-1 h-4">
        {modes.find(m => m.id === selectedMode)?.description}
      </div>
    </div>
  );
};

export default ModeSelector;
