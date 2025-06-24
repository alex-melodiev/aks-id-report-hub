
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{t('app.title')}</h1>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {t('app.subtitle')}
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Быстрая и безопасная система идентификации личности для современного мира
            </p>
            
            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('features.fast')}</h3>
                <p className="text-gray-600">Процесс занимает всего несколько минут</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('features.secure')}</h3>
                <p className="text-gray-600">Максимальная защита ваших данных</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('features.automatic')}</h3>
                <p className="text-gray-600">Полностью автоматизированный процесс</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white rounded-3xl shadow-2xl border-0 overflow-hidden">
              <CardHeader className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle className="text-3xl font-bold mb-4">
                  {t('consent.title')}
                </CardTitle>
                <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                  Ознакомьтесь с условиями и дайте согласие на прохождение идентификации
                </p>
              </CardHeader>
              
              <CardContent className="p-12">
                {/* Текст согласия */}
                <div className="mb-8">
                  <ConsentText />
                </div>
                
                {/* Чекбокс согласия */}
                <div className="flex items-start space-x-4 p-6 bg-blue-50 rounded-2xl border-2 border-blue-100 mb-8">
                  <Checkbox
                    id="consent"
                    checked={isConsentChecked}
                    onCheckedChange={(checked) => setIsConsentChecked(checked as boolean)}
                    className="mt-1 w-5 h-5"
                  />
                  <label 
                    htmlFor="consent" 
                    className="text-gray-700 cursor-pointer leading-relaxed font-medium"
                  >
                    {t('consent.checkbox')}
                  </label>
                </div>

                {/* Кнопка продолжить */}
                <div className="text-center">
                  <Button
                    onClick={handleStartIdentification}
                    disabled={!isConsentChecked}
                    className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                  >
                    {t('continue')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  {!isConsentChecked && (
                    <p className="text-gray-500 mt-4 text-sm">
                      {t('consent.required')}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            {t('security.info')}
          </p>
          <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
            <span>© 2024 AKS Labs</span>
            <span>•</span>
            <span>support@akslabs.uz</span>
            <span>•</span>
            <span>+998 (71) 123-45-67</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
