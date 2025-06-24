
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, RefreshCw, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScoreReportService } from "@/services/ScoreReportService";

const ThankYou = () => {
  const [reportStatus, setReportStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [reportData, setReportData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Получаем данные пользователя из URL или localStorage после MyID
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    const pinfl = urlParams.get('pinfl');

    console.log("ThankYou page loaded with params:", { accessToken, pinfl });

    if (accessToken && pinfl) {
      // Запускаем получение отчётов в фоне
      fetchReports(accessToken, pinfl);
    } else {
      // Проверяем localStorage для данных MyID
      const storedData = localStorage.getItem('myid_result');
      if (storedData) {
        const data = JSON.parse(storedData);
        fetchReports(data.access_token, data.pinfl);
      } else {
        console.warn("Нет данных для получения отчётов");
        setReportStatus('error');
      }
    }
  }, []);

  const fetchReports = async (accessToken: string, pinfl: string) => {
    try {
      console.log("Запрос отчётов для PINFL:", pinfl);
      
      // Запрос к KATM и E-GOV (в фоне)
      const reports = await ScoreReportService.fetchAllReports(accessToken, pinfl);
      
      setReportData(reports);
      setReportStatus('ready');
      
      console.log("Отчёты получены успешно:", reports);
    } catch (error) {
      console.error("Ошибка при получении отчётов:", error);
      setReportStatus('error');
    }
  };

  const handleDownloadReport = () => {
    if (reportData) {
      ScoreReportService.downloadReport(reportData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Успешная идентификация */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-6">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-gray-800">
                Спасибо за идентификацию!
              </CardTitle>
            </CardHeader>
            
            <CardContent className="text-center space-y-4">
              <p className="text-lg text-gray-600">
                Ваша личность успешно подтверждена через MyID
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  ✅ Идентификация завершена успешно<br />
                  ✅ Запрос отчётов отправлен в KATM и E-GOV
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Статус отчётов */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                {reportStatus === 'loading' && <Clock className="h-5 w-5 text-blue-600" />}
                {reportStatus === 'ready' && <CheckCircle className="h-5 w-5 text-green-600" />}
                {reportStatus === 'error' && <RefreshCw className="h-5 w-5 text-red-600" />}
                
                Кредитный скоринг
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {reportStatus === 'loading' && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Получаем ваш кредитный отчёт...</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Обычно это занимает 30-60 секунд
                  </p>
                </div>
              )}

              {reportStatus === 'ready' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">Отчёт готов!</h3>
                    <p className="text-blue-700 text-sm">
                      Ваш кредитный скоринг сформирован на основе данных KATM и E-GOV
                    </p>
                  </div>

                  {reportData && (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-50 p-3 rounded">
                        <span className="text-gray-600">Кредитный рейтинг:</span>
                        <div className="font-semibold text-lg text-green-600">
                          {reportData.creditRating || 'A+'}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <span className="text-gray-600">Статус:</span>
                        <div className="font-semibold text-lg text-blue-600">
                          {reportData.status || 'Активный'}
                        </div>
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={handleDownloadReport}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Скачать полный отчёт
                  </Button>
                </div>
              )}

              {reportStatus === 'error' && (
                <div className="text-center py-8">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-red-800">
                      Произошла ошибка при получении отчёта
                    </p>
                    <p className="text-red-600 text-sm mt-1">
                      Пожалуйста, обратитесь в службу поддержки
                    </p>
                  </div>
                  
                  <Button 
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="mr-2"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Повторить
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/')}
                    variant="outline"
                  >
                    На главную
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Контактная информация */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Возникли вопросы? Обратитесь в службу поддержки:<br />
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
