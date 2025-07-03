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
    'app.subtitle': 'Сервис идентификации личности',
    'app.description': 'Быстрая и безопасная система идентификации личности',
    'consent.title': 'Согласие на обработку персональных данных',
    'consent.description': 'Ознакомьтесь с условиями и дайте согласие на прохождение идентификации',
    'consent.checkbox': 'Ознакомьтесь с Заявлением на Согласия обработку персональных данных; передачу персональных данных третьим лицам; предоставление кредитного отчета о себе.',
    'continue': 'Продолжить',
    'consent.required': 'Отметьте согласие для продолжения',
    'starting.identification': 'Запуск идентификации...',
    'security.info': 'Ваши данные защищены в соответствии с требованиями законодательства Республики Узбекистан о персональных данных',
    'features.fast': 'Быстрая идентификация',
    'features.fast.description': 'Процесс занимает всего 30 секунд',
    'features.secure': 'Безопасность данных',
    'features.secure.description': 'Максимальная защита ваших данных',
    'features.automatic': 'Автоматическая обработка',
    'features.automatic.description': 'Полностью автоматизированный процесс',
    
    // Phone input page
    'phone.title': 'Введите номер телефона',
    'phone.description': 'Мы отправим SMS с кодом подтверждения',
    'phone.label': 'Номер телефона',
    'back': 'Назад',
    'send.code': 'Отправить код',
    'sending': 'Отправляем...',
    
    // OTP verification page
    'otp.title': 'Подтвердите номер',
    'otp.description': 'Введите код из SMS, отправленного на',
    'resend.code': 'Отправить код повторно',
    'resend.countdown': 'Повторная отправка через',
    'seconds': 'сек',
    'verify': 'Подтвердить',
    'verifying': 'Проверяем...',
    
    // Thank you page
    'thanks.title': 'Спасибо за идентификацию!',
    'thanks.subtitle': 'Ваша личность успешно подтверждена через MyID',
    'thanks.success': '✅ Идентификация завершена успешно',
    'thanks.contact': 'Возникли вопросы? Обратитесь в службу поддержки:',
    'thanks.help.title': 'Нужна помощь?',
    'home': 'На главную'
  },
  uz: {
    // Main page
    'app.title': 'Ident Score',
    'app.subtitle': 'Shaxsni xavfsiz identifikatsiya qilish',
    'app.description': 'Tez va xavfsiz shaxsni identifikatsiya qilish tizimi',
    'consent.title': 'Identifikatsiyadan o\'tishga rozilik',
    'consent.description': 'Shartlarni o\'qing va identifikatsiyadan o\'tishga rozilik bering',
    'consent.checkbox': 'Men shaxsiy ma\'lumotlarni qayta ishlash shartlari bilan tanishdim va MyID orqali identifikatsiyadan o\'tishga roziman.',
    'continue': 'Davom etish',
    'consent.required': 'Davom etish uchun rozilikni belgilang',
    'starting.identification': 'Identifikatsiya boshlanmoqda...',
    'security.info': 'Sizning ma\'lumotlaringiz O\'zbekiston Respublikasi shaxsiy ma\'lumotlar to\'g\'risidagi qonunchilik talablariga muvofiq himoyalangan',
    'features.fast': 'Tez identifikatsiya',
    'features.fast.description': 'Jarayon atigi 30 soniya davom etadi',
    'features.secure': 'Ma\'lumotlar xavfsizligi',
    'features.secure.description': 'Ma\'lumotlaringizning maksimal himoyasi',
    'features.automatic': 'Avtomatik qayta ishlash',
    'features.automatic.description': 'To\'liq avtomatlashtirilgan jarayon',
    
    // Phone input page
    'phone.title': 'Telefon raqamini kiriting',
    'phone.description': 'Tasdiqlash kodi bilan SMS yuboramiz',
    'phone.label': 'Telefon raqami',
    'back': 'Orqaga',
    'send.code': 'Kod yuborish',
    'sending': 'Yuborilmoqda...',
    
    // OTP verification page
    'otp.title': 'Raqamni tasdiqlang',
    'otp.description': 'SMS orqali yuborilgan kodni kiriting',
    'resend.code': 'Kodni qayta yuborish',
    'resend.countdown': 'Qayta yuborish',
    'seconds': 'soniyadan keyin',
    'verify': 'Tasdiqlash',
    'verifying': 'Tekshirilmoqda...',
    
    // Thank you page
    'thanks.title': 'Identifikatsiya uchun rahmat!',
    'thanks.subtitle': 'Sizning shaxsingiz MyID orqali muvaffaqiyatli tasdiqlandi',
    'thanks.success': '✅ Identifikatsiya muvaffaqiyatli yakunlandi',
    'thanks.contact': 'Savollaringiz bormi? Qo\'llab-quvvatlash xizmatiga murojaat qiling:',
    'thanks.help.title': 'Yordam kerakmi?',
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
