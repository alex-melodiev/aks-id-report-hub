
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ru' | 'uz';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ru: {
    // Main page
    'app.title': 'Ident Score',
    'app.subtitle': 'Безопасная идентификация личности',
    'consent.title': 'Согласие на прохождение идентификации',
    'consent.checkbox': 'Я ознакомился с условиями обработки персональных данных и даю согласие на прохождение идентификации через MyID.',
    'continue': 'Продолжить',
    'consent.required': 'Отметьте согласие для продолжения',
    'starting.identification': 'Запуск идентификации...',
    'security.info': 'Ваши данные защищены в соответствии с требованиями законодательства Республики Узбекистан о персональных данных',
    'features.fast': 'Быстрая идентификация',
    'features.secure': 'Безопасность данных',
    'features.automatic': 'Автоматическая обработка',
    
    // Thank you page
    'thanks.title': 'Спасибо за идентификацию!',
    'thanks.subtitle': 'Ваша личность успешно подтверждена через MyID',
    'thanks.success': '✅ Идентификация завершена успешно',
    'thanks.contact': 'Возникли вопросы? Обратитесь в службу поддержки:',
    'home': 'На главную'
  },
  uz: {
    // Main page
    'app.title': 'Ident Score',
    'app.subtitle': 'Shaxsni xavfsiz identifikatsiya qilish',
    'consent.title': 'Identifikatsiyadan o\'tishga rozilik',
    'consent.checkbox': 'Men shaxsiy ma\'lumotlarni qayta ishlash shartlari bilan tanishdim va MyID orqali identifikatsiyadan o\'tishga roziman.',
    'continue': 'Davom etish',
    'consent.required': 'Davom etish uchun rozilikni belgilang',
    'starting.identification': 'Identifikatsiya boshlanmoqda...',
    'security.info': 'Sizning ma\'lumotlaringiz O\'zbekiston Respublikasi shaxsiy ma\'lumotlar to\'g\'risidagi qonunchilik talablariga muvofiq himoyalangan',
    'features.fast': 'Tez identifikatsiya',
    'features.secure': 'Ma\'lumotlar xavfsizligi',
    'features.automatic': 'Avtomatik qayta ishlash',
    
    // Thank you page
    'thanks.title': 'Identifikatsiya uchun rahmat!',
    'thanks.subtitle': 'Sizning shaxsingiz MyID orqali muvaffaqiyatli tasdiqlandi',
    'thanks.success': '✅ Identifikatsiya muvaffaqiyatli yakunlandi',
    'thanks.contact': 'Savollaringiz bormi? Qo\'llab-quvvatlash xizmatiga murojaat qiling:',
    'home': 'Bosh sahifa'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ru']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
