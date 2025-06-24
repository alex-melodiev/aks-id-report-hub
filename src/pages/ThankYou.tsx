
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Language switcher */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Успешная идентификация */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-6">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-gray-800">
                {t('thanks.title')}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="text-center space-y-4">
              <p className="text-lg text-gray-600">
                {t('thanks.subtitle')}
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  {t('thanks.success')}
                </p>
              </div>

              <div className="pt-6">
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {t('home')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Контактная информация */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              {t('thanks.contact')}<br />
              <span className="text-blue-600">support@akslabs.uz</span> | 
              <span className="text-blue-600"> +998 (71) 123-45-67</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
