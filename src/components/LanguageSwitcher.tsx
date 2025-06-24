
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
      <Button
        variant={language === 'ru' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('ru')}
        className={`text-sm font-medium px-4 py-2 rounded-md transition-all ${
          language === 'ru' 
            ? 'bg-white text-gray-900 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
        }`}
      >
        RU
      </Button>
      <Button
        variant={language === 'uz' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('uz')}
        className={`text-sm font-medium px-4 py-2 rounded-md transition-all ${
          language === 'uz' 
            ? 'bg-white text-gray-900 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
        }`}
      >
        UZ
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
