
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    pinfl: "",
    passportSeries: "",
    passportNumber: "",
    birthDate: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const formatPinfl = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 14);
  };

  const formatPassportSeries = (value: string) => {
    return value.replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 2);
  };

  const formatPassportNumber = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 7);
  };

  const formatBirthDate = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
    return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4, 8)}`;
  };

  const validateAge = (dateStr: string) => {
    const [day, month, year] = dateStr.split('.').map(Number);
    if (!day || !month || !year || year < 1900 || year > new Date().getFullYear()) return false;
    
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 18;
    }
    
    return age >= 18;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    switch (field) {
      case 'pinfl':
        formattedValue = formatPinfl(value);
        break;
      case 'passportSeries':
        formattedValue = formatPassportSeries(value);
        break;
      case 'passportNumber':
        formattedValue = formatPassportNumber(value);
        break;
      case 'birthDate':
        formattedValue = formatBirthDate(value);
        break;
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate PINFL or Passport
    if (formData.pinfl) {
      if (formData.pinfl.length !== 14) {
        newErrors.pinfl = t('pinfl.error');
      }
    } else {
      if (!formData.passportSeries || formData.passportSeries.length !== 2) {
        newErrors.passportSeries = t('passport.series.error');
      }
      if (!formData.passportNumber || formData.passportNumber.length !== 7) {
        newErrors.passportNumber = t('passport.number.error');
      }
    }

    // Validate birth date
    if (!formData.birthDate || formData.birthDate.length !== 10) {
      newErrors.birthDate = t('birth.date.error');
    } else if (!validateAge(formData.birthDate)) {
      newErrors.birthDate = t('age.error');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/phone-input', { state: { personalData: formData } });
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
                  <User className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold mb-2">
                  {t('personal.title')}
                </CardTitle>
                <p className="text-blue-100">
                  {t('personal.description')}
                </p>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* PINFL or Passport choice */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="pinfl" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('pinfl.label')}
                      </label>
                      <Input
                        id="pinfl"
                        type="text"
                        value={formData.pinfl}
                        onChange={(e) => handleInputChange('pinfl', e.target.value)}
                        placeholder={t('pinfl.placeholder')}
                        className={`text-lg h-12 border-2 rounded-xl ${
                          errors.pinfl ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                        }`}
                      />
                      {errors.pinfl && (
                        <p className="mt-2 text-sm text-red-600">{errors.pinfl}</p>
                      )}
                    </div>

                    <div className="text-center text-gray-500 text-sm">или</div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="passportSeries" className="block text-sm font-medium text-gray-700 mb-2">
                          {t('passport.series.label')}
                        </label>
                        <Input
                          id="passportSeries"
                          type="text"
                          value={formData.passportSeries}
                          onChange={(e) => handleInputChange('passportSeries', e.target.value)}
                          placeholder={t('passport.series.placeholder')}
                          className={`text-lg h-12 border-2 rounded-xl ${
                            errors.passportSeries ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                          }`}
                          disabled={!!formData.pinfl}
                        />
                        {errors.passportSeries && (
                          <p className="mt-2 text-sm text-red-600">{errors.passportSeries}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700 mb-2">
                          {t('passport.number.label')}
                        </label>
                        <Input
                          id="passportNumber"
                          type="text"
                          value={formData.passportNumber}
                          onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                          placeholder={t('passport.number.placeholder')}
                          className={`text-lg h-12 border-2 rounded-xl ${
                            errors.passportNumber ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                          }`}
                          disabled={!!formData.pinfl}
                        />
                        {errors.passportNumber && (
                          <p className="mt-2 text-sm text-red-600">{errors.passportNumber}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Birth Date */}
                  <div>
                    <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('birth.date.label')}
                    </label>
                    <Input
                      id="birthDate"
                      type="text"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      placeholder={t('birth.date.placeholder')}
                      className={`text-lg h-12 border-2 rounded-xl ${
                        errors.birthDate ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.birthDate && (
                      <p className="mt-2 text-sm text-red-600">{errors.birthDate}</p>
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
                      disabled={isLoading}
                      className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold"
                    >
                      {isLoading ? t('sending') : t('continue')}
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

export default PersonalInfo;
