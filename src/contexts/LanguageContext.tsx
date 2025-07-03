import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ru' | 'uz' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ru: {
    'app.title': 'АКСИС КРЕДИТ СКОР',
    'hero.title': 'Проверьте свой кредитный рейтинг бесплатно',
    'hero.subtitle': 'Узнайте свой кредитный рейтинг за несколько минут',
    'hero.description': 'Получите подробный отчет о своей кредитной истории и узнайте, как улучшить свой рейтинг',
    'get.score': 'Получить рейтинг',
    'features.instant': 'Мгновенный результат',
    'features.instant.desc': 'Получите свой кредитный рейтинг за несколько секунд',
    'features.secure': 'Безопасно и конфиденциально',
    'features.secure.desc': 'Ваши данные защищены современным шифрованием',
    'features.detailed': 'Подробный отчет',
    'features.detailed.desc': 'Полная информация о вашей кредитной истории',
    'myid.title': 'Авторизация через MyID',
    'myid.description': 'Для получения кредитного рейтинга войдите через MyID',
    'myid.login': 'Войти через MyID',
    'phone.title': 'Введите номер телефона',
    'phone.description': 'Мы отправим SMS с кодом подтверждения',
    'phone.label': 'Номер телефона',
    'phone.error': 'Неверный формат номера телефона',
    'otp.title': 'Введите код подтверждения',
    'otp.description': 'Мы отправили код на номер',
    'otp.label': 'Код подтверждения',
    'otp.resend': 'Отправить код повторно',
    'otp.resend.success': 'Код отправлен повторно',
    'back': 'Назад',
    'continue': 'Продолжить',
    'send.code': 'Отправить код',
    'sending': 'Отправляем...',
    'verify': 'Подтвердить',
    'verifying': 'Проверяем...',
    'consent.title': 'Согласие на обработку персональных данных',
    'consent.agree': 'Я согласен с',
    'consent.terms': 'условиями обработки персональных данных',
    'thank.title': 'Спасибо!',
    'thank.message': 'Ваш кредитный рейтинг успешно получен',
    'thank.description': 'Данные отправлены в систему для обработки',
    'home': 'На главную',
    'language': 'Язык'
  },
  uz: {
    'app.title': 'AKSIS KREDIT SKOR',
    'hero.title': 'Kredit reytingingizni bepul tekshiring',
    'hero.subtitle': 'Bir necha daqiqada kredit reytingingizni bilib oling',
    'hero.description': 'Kredit tarixingiz haqida batafsil hisobot oling va reytingingizni qanday yaxshilashni bilib oling',
    'get.score': 'Reytingni olish',
    'features.instant': 'Tezkor natija',
    'features.instant.desc': 'Bir necha soniyada kredit reytingingizni oling',
    'features.secure': 'Xavfsiz va maxfiy',
    'features.secure.desc': 'Sizning ma\'lumotlaringiz zamonaviy shifrlash bilan himoyalangan',
    'features.detailed': 'Batafsil hisobot',
    'features.detailed.desc': 'Kredit tarixingiz haqida to\'liq ma\'lumot',
    'myid.title': 'MyID orqali avtorizatsiya',
    'myid.description': 'Kredit reytingini olish uchun MyID orqali kiring',
    'myid.login': 'MyID orqali kirish',
    'phone.title': 'Telefon raqamini kiriting',
    'phone.description': 'Biz sizga tasdiqlash kodini SMS orqali yuboramiz',
    'phone.label': 'Telefon raqami',
    'phone.error': 'Telefon raqami formati noto\'g\'ri',
    'otp.title': 'Tasdiqlash kodini kiriting',
    'otp.description': 'Biz kodni quyidagi raqamga yubordik',
    'otp.label': 'Tasdiqlash kodi',
    'otp.resend': 'Kodni qayta yuborish',
    'otp.resend.success': 'Kod qayta yuborildi',
    'back': 'Orqaga',
    'continue': 'Davom etish',
    'send.code': 'Kod yuborish',
    'sending': 'Yuborilmoqda...',
    'verify': 'Tasdiqlash',
    'verifying': 'Tekshirilmoqda...',
    'consent.title': 'Shaxsiy ma\'lumotlarni qayta ishlashga rozilik',
    'consent.agree': 'Men',
    'consent.terms': 'shaxsiy ma\'lumotlarni qayta ishlash shartlariga roziman',
    'thank.title': 'Rahmat!',
    'thank.message': 'Sizning kredit reytingingiz muvaffaqiyatli olindi',
    'thank.description': 'Ma\'lumotlar qayta ishlash uchun tizimga yuborildi',
    'home': 'Bosh sahifa',
    'language': 'Til'
  },
  en: {
    'app.title': 'AKSIS CREDIT SCORE',
    'hero.title': 'Check your credit rating for free',
    'hero.subtitle': 'Find out your credit rating in minutes',
    'hero.description': 'Get a detailed report on your credit history and learn how to improve your rating',
    'get.score': 'Get rating',
    'features.instant': 'Instant result',
    'features.instant.desc': 'Get your credit rating in seconds',
    'features.secure': 'Safe and confidential',
    'features.secure.desc': 'Your data is protected by modern encryption',
    'features.detailed': 'Detailed report',
    'features.detailed.desc': 'Complete information about your credit history',
    'myid.title': 'Authorization via MyID',
    'myid.description': 'To get your credit rating, log in via MyID',
    'myid.login': 'Login via MyID',
    'phone.title': 'Enter phone number',
    'phone.description': 'We will send you a confirmation code via SMS',
    'phone.label': 'Phone number',
    'phone.error': 'Invalid phone number format',
    'otp.title': 'Enter confirmation code',
    'otp.description': 'We sent the code to',
    'otp.label': 'Confirmation code',
    'otp.resend': 'Resend code',
    'otp.resend.success': 'Code resent',
    'back': 'Back',
    'continue': 'Continue',
    'send.code': 'Send code',
    'sending': 'Sending...',
    'verify': 'Verify',
    'verifying': 'Verifying...',
    'consent.title': 'Consent to personal data processing',
    'consent.agree': 'I agree to',
    'consent.terms': 'personal data processing terms',
    'thank.title': 'Thank you!',
    'thank.message': 'Your credit rating has been successfully obtained',
    'thank.description': 'Data sent to the system for processing',
    'home': 'Home',
    'language': 'Language'
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
