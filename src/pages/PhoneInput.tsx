
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Phone, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const PhoneInput = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();
  const navigate = useNavigate();

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // If starts with 998, use it; otherwise add 998
    let formattedDigits = digits;
    if (!digits.startsWith('998')) {
      if (digits.length > 0) {
        formattedDigits = '998' + digits;
      } else {
        formattedDigits = '998';
      }
    }

    // Apply mask: +998 90 123 45 67
    if (formattedDigits.length <= 3) {
      return `+${formattedDigits}`;
    } else if (formattedDigits.length <= 5) {
      return `+${formattedDigits.slice(0, 3)} ${formattedDigits.slice(3)}`;
    } else if (formattedDigits.length <= 8) {
      return `+${formattedDigits.slice(0, 3)} ${formattedDigits.slice(3, 5)} ${formattedDigits.slice(5)}`;
    } else if (formattedDigits.length <= 10) {
      return `+${formattedDigits.slice(0, 3)} ${formattedDigits.slice(3, 5)} ${formattedDigits.slice(5, 8)} ${formattedDigits.slice(8)}`;
    } else {
      return `+${formattedDigits.slice(0, 3)} ${formattedDigits.slice(3, 5)} ${formattedDigits.slice(5, 8)} ${formattedDigits.slice(8, 10)} ${formattedDigits.slice(10, 12)}`;
    }
  };

  const validatePhoneNumber = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 12 && digits.startsWith('998');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhoneNumber(value);
    setPhoneNumber(formatted);
    
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhoneNumber(phoneNumber)) {
      setError(t('phone.error') || "Неверный формат номера телефона");
      return;
    }

    setIsLoading(true);
    setError("");
    
    // Имитация отправки SMS
    setTimeout(() => {
      setIsLoading(false);
      navigate('/otp-verification', { state: { phoneNumber } });
    }, 1000);
  };

  const handleBack = () => {
    navigate('/');
  };

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
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold mb-2">
                  {t('phone.title')}
                </CardTitle>
                <p className="text-blue-100">
                  {t('phone.description')}
                </p>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('phone.label')}
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="+998 90 123 45 67"
                      className={`text-lg h-12 border-2 rounded-xl ${
                        error ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                      }`}
                      required
                    />
                    {error && (
                      <p className="mt-2 text-sm text-red-600">{error}</p>
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
                      disabled={!phoneNumber.trim() || isLoading}
                      className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold"
                    >
                      {isLoading ? t('sending') : t('send.code')}
                      {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
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

export default PhoneInput;
