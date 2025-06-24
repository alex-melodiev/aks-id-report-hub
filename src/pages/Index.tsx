
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle } from "lucide-react";
import { ConsentText } from "@/components/ConsentText";
import { MyIDIntegration } from "@/components/MyIDIntegration";

const Index = () => {
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [isStartingIdentification, setIsStartingIdentification] = useState(false);
  const navigate = useNavigate();

  const handleStartIdentification = async () => {
    if (!isConsentChecked) return;
    
    setIsStartingIdentification(true);
    
    // Запуск MyID WebSDK
    try {
      const myIdResult = await MyIDIntegration.startIdentification();
      if (myIdResult.success) {
        // Перенаправление будет обработано через MyID callback
        console.log("MyID идентификация начата успешно");
      }
    } catch (error) {
      console.error("Ошибка при запуске MyID:", error);
      setIsStartingIdentification(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Ident Score</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Безопасная идентификация личности и получение кредитного скоринга
          </p>
        </div>

        {/* Основная карточка */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-gray-800">
                Согласие на прохождение идентификации и скоринга
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
                  Я ознакомился с условиями обработки персональных данных и даю согласие 
                  на прохождение идентификации через MyID, а также на получение кредитного 
                  скоринга из внешних источников KATM и E-GOV.
                </label>
              </div>

              {/* Преимущества */}
              <div className="grid md:grid-cols-3 gap-4 my-8">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm text-blue-800">Быстрая идентификация</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-green-800">Безопасность данных</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                  <span className="text-sm text-purple-800">Автоматический скоринг</span>
                </div>
              </div>

              {/* Кнопка продолжить */}
              <div className="text-center pt-6">
                <Button
                  onClick={handleStartIdentification}
                  disabled={!isConsentChecked || isStartingIdentification}
                  className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
                  size="lg"
                >
                  {isStartingIdentification ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Запуск идентификации...
                    </>
                  ) : (
                    "Продолжить"
                  )}
                </Button>
                
                {!isConsentChecked && (
                  <p className="text-sm text-gray-500 mt-2">
                    Отметьте согласие для продолжения
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Информация о безопасности */}
        <div className="max-w-2xl mx-auto mt-8 text-center">
          <p className="text-sm text-gray-500">
            Ваши данные защищены в соответствии с требованиями 
            законодательства Республики Узбекистан о персональных данных
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
