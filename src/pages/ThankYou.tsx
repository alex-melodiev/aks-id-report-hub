import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const ThankYou = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    // Получаем данные пользователя из URL или localStorage после MyID
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    const pinfl = urlParams.get('pinfl');

    console.log("ThankYou page loaded with params:", { accessToken, pinfl });

    if (accessToken && pinfl) {
      // Запускаем получение отчётов в фоне (для внутреннего использования)
      console.log("Отправка данных в бэкенд для последующей обработки:", { accessToken, pinfl });
    } else {
      // Проверяем localStorage для данных MyID
      const storedData = localStorage.getItem('myid_result');
      if (storedData) {
        const data = JSON.parse(storedData);
        console.log("Отправка данных в бэкенд для последующей обработки:", data);
      }
    }
  }, []);

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

      {/* Main Content */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Card */}
            <Card className="bg-white rounded-3xl shadow-2xl border-0 overflow-hidden">
              <CardHeader className="py-12 bg-gradient-to-r from-green-500 to-blue-500 text-white">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-12 w-12 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold mb-4">
                  {t('thanks.title')}
                </CardTitle>
                <p className="text-green-100 text-lg">
                  {t('thanks.subtitle')}
                </p>
              </CardHeader>
              
              <CardContent className="p-12">
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
                  <p className="text-green-800 font-semibold text-lg">
                    {t('thanks.success')}
                  </p>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={() => navigate('/')}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    {t('home')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="mt-12 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('thanks.help.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('thanks.contact')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:support@akslabs.uz" className="text-blue-600 hover:text-blue-700 font-medium">
                  support@akslabs.uz
                </a>
                <a href="tel:+998711234567" className="text-blue-600 hover:text-blue-700 font-medium">
                  +998 (71) 123-45-67
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
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

export default ThankYou;
