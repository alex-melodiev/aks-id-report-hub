
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle } from "lucide-react";
import { ConsentText } from "@/components/ConsentText";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Index = () => {
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleStartIdentification = () => {
    if (!isConsentChecked) return;
    navigate('/thank-you');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Language switcher */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        {/* Заголовок */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">{t('app.title')}</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('app.subtitle')}
          </p>
        </div>

        {/* Основная карточка */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-gray-800">
                {t('consent.title')}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Текст согласия */}
              <ConsentText />
              
              {/* Чекбокс согласия */}
              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border">
                <Checkbox
                  id="consent"
                  checked={isConsentChecked}
                  onCheckedChange={(checked) => setIsConsentChecked(checked as boolean)}
                  className="mt-1"
                />
                <label 
                  htmlFor="consent" 
                  className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                >
                  {t('consent.checkbox')}
                </label>
              </div>

              {/* Преимущества */}
              <div className="grid md:grid-cols-3 gap-4 my-8">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm text-blue-800">{t('features.fast')}</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-green-800">{t('features.secure')}</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                  <span className="text-sm text-purple-800">{t('features.automatic')}</span>
                </div>
              </div>

              {/* Кнопка продолжить */}
              <div className="text-center pt-6">
                <Button
                  onClick={handleStartIdentification}
                  disabled={!isConsentChecked}
                  className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
                  size="lg"
                >
                  {t('continue')}
                </Button>
                
                {!isConsentChecked && (
                  <p className="text-sm text-gray-500 mt-2">
                    {t('consent.required')}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Информация о безопасности */}
        <div className="max-w-2xl mx-auto mt-8 text-center">
          <p className="text-sm text-gray-500">
            {t('security.info')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
