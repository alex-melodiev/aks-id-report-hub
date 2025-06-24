
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      <Button
        variant={language === 'ru' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('ru')}
        className="text-xs"
      >
        РУ
      </Button>
      <Button
        variant={language === 'uz' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('uz')}
        className="text-xs"
      >
        UZ
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
