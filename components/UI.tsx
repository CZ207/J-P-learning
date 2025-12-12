import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyle = "font-bold rounded-xl transition-all active:translate-y-1 active:shadow-none border-2 border-black font-sans";
  
  const variants = {
    primary: "bg-anime-pink text-black shadow-pop hover:bg-pink-300 dark:bg-pink-600 dark:text-white dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)]",
    secondary: "bg-anime-blue text-black shadow-pop hover:bg-blue-300 dark:bg-blue-600 dark:text-white dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)]",
    danger: "bg-red-400 text-white shadow-pop hover:bg-red-500",
    ghost: "bg-transparent shadow-none border-0 hover:bg-black/5 dark:hover:bg-white/10 dark:text-white"
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 rounded-2xl shadow-pop dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] p-4 transition-colors duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export const Header: React.FC<{ 
  title: string, 
  onBack?: () => void, 
  toggleTheme: () => void, 
  isDark: boolean 
}> = ({ title, onBack, toggleTheme, isDark }) => (
  <div className="sticky top-0 z-50 bg-anime-yellow/95 dark:bg-gray-900/95 border-b-2 border-black dark:border-gray-700 backdrop-blur-sm p-4 flex justify-between items-center transition-colors duration-300">
    <div className="flex items-center gap-2">
      {onBack && (
        <button onClick={onBack} className="text-xl p-1 hover:bg-black/10 rounded-full dark:text-white">
          ←
        </button>
      )}
      <h1 className="text-xl font-black text-gray-800 dark:text-white tracking-tight">{title}</h1>
    </div>
    <button onClick={toggleTheme} className="p-2 rounded-full bg-white dark:bg-gray-700 border-2 border-black dark:border-gray-500 shadow-pop-sm text-sm font-bold dark:text-yellow-300">
      {isDark ? '☀' : '🌙'}
    </button>
  </div>
);

export const TabBar: React.FC<{ 
  activeTab: 'HOME' | 'AI_TUTOR' | 'KANA'; 
  setTab: (t: 'HOME' | 'AI_TUTOR' | 'KANA') => void 
}> = ({ activeTab, setTab }) => {
  const tabs = [
    { id: 'HOME', label: '复习', icon: '📖' },
    { id: 'KANA', label: '五十音', icon: 'あ' },
    { id: 'AI_TUTOR', label: 'AI助教', icon: '🤖' },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t-2 border-black dark:border-gray-700 pb-safe px-4 py-2 flex justify-around items-center z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setTab(tab.id)}
          className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
            activeTab === tab.id 
              ? 'text-anime-pink dark:text-anime-blue -translate-y-1 font-bold bg-gray-50 dark:bg-gray-700' 
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <span className="text-2xl">{tab.icon}</span>
          <span className="text-xs mt-1">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
