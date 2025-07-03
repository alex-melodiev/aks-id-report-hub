
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Shield, MessageSquare, RefreshCw, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber || "";

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setIsLoading(true);
    // Имитация проверки OTP
    setTimeout(() => {
      setIsLoading(false);
      navigate('/thank-you');
    }, 1000);
  };

  const handleResend = async () => {
    setCanResend(false);
    setCountdown(60);
    // Имитация повторной отправки SMS
    console.log('Resending SMS to:', phoneNumber);
  };

  const handleBack = () => {
    navigate('/phone-input');
  };

  const maskedPhone = phoneNumber.replace(/(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 *** ** $5');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="bg-white rounded-3xl shadow-2xl border-0 overflow-hidden">
              <CardHeader className="text-center py-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold mb-2">
                  {t('otp.title')}
                </CardTitle>
                <p className="text-blue-100">
                  {t('otp.description')} {maskedPhone}
                </p>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                      className="justify-center"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="w-12 h-12 text-lg border-2" />
                        <InputOTPSlot index={1} className="w-12 h-12 text-lg border-2" />
                        <InputOTPSlot index={2} className="w-12 h-12 text-lg border-2" />
                        <InputOTPSlot index={3} className="w-12 h-12 text-lg border-2" />
                        <InputOTPSlot index={4} className="w-12 h-12 text-lg border-2" />
                        <InputOTPSlot index={5} className="w-12 h-12 text-lg border-2" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <div className="text-center">
                    {canResend ? (
                      <Button
                        type="button"
                        onClick={handleResend}
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        {t('resend.code')}
                      </Button>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        {t('resend.countdown')} {countdown} {t('seconds')}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      onClick={handleBack}
                      variant="outline"
                      className="flex-1 h-12 border-2 border-gray-200 hover:border-gray-300 rounded-xl"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {t('back')}
                    </Button>
                    
                    <Button
                      type="submit"
                      disabled={otp.length !== 6 || isLoading}
                      className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold"
                    >
                      {isLoading ? t('verifying') : t('verify')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OtpVerification;
