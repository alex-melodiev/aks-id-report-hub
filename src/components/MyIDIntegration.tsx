
// Компонент для интеграции с MyID WebSDK
export class MyIDIntegration {
  private static isSDKLoaded = false;

  static async loadSDK(): Promise<void> {
    if (this.isSDKLoaded) return;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://id.myid.uz/static/js/widget.js'; // URL из документации MyID
      script.async = true;
      
      script.onload = () => {
        this.isSDKLoaded = true;
        console.log('MyID SDK загружен успешно');
        resolve();
      };
      
      script.onerror = () => {
        console.error('Ошибка загрузки MyID SDK');
        reject(new Error('Не удалось загрузить MyID SDK'));
      };
      
      document.head.appendChild(script);
    });
  }

  static async startIdentification(): Promise<{ success: boolean; data?: any }> {
    try {
      // Загружаем SDK если не загружен
      await this.loadSDK();

      // Проверяем доступность MyID API
      if (typeof (window as any).MyID === 'undefined') {
        throw new Error('MyID SDK не найден');
      }

      const MyID = (window as any).MyID;

      // Конфигурация для MyID
      const config = {
        // Эти параметры нужно получить при регистрации приложения в MyID
        client_id: process.env.REACT_APP_MYID_CLIENT_ID || 'demo_client_id',
        redirect_uri: `${window.location.origin}/thank-you`,
        scope: 'personal_data',
        state: this.generateRandomState(),
        response_type: 'code',
        // Callback для обработки результата
        onSuccess: (result: any) => {
          console.log('MyID успешная авторизация:', result);
          
          // Сохраняем результат для использования на странице thank-you
          localStorage.setItem('myid_result', JSON.stringify({
            access_token: result.access_token,
            pinfl: result.user_data?.pinfl,
            timestamp: Date.now()
          }));
          
          // Перенаправляем на страницу благодарности
          window.location.href = `/thank-you?access_token=${result.access_token}&pinfl=${result.user_data?.pinfl}`;
        },
        onError: (error: any) => {
          console.error('MyID ошибка авторизации:', error);
          alert('Ошибка при прохождении идентификации через MyID');
        }
      };

      // Запускаем MyID виджет
      MyID.init(config);
      MyID.open();

      return { success: true };
    } catch (error) {
      console.error('Ошибка инициализации MyID:', error);
      
      // В режиме разработки показываем заглушку
      if (process.env.NODE_ENV === 'development') {
        return this.mockIdentification();
      }
      
      throw error;
    }
  }

  private static generateRandomState(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  // Заглушка для разработки
  private static mockIdentification(): Promise<{ success: boolean; data?: any }> {
    return new Promise((resolve) => {
      console.log('DEMO: Имитация MyID идентификации...');
      
      setTimeout(() => {
        const mockData = {
          access_token: 'demo_access_token_' + Date.now(),
          pinfl: '12345678901234',
          user_data: {
            name: 'Иван Иванов',
            birth_date: '1990-01-01'
          }
        };
        
        localStorage.setItem('myid_result', JSON.stringify({
          ...mockData,
          timestamp: Date.now()
        }));
        
        // Перенаправляем на страницу благодарности
        window.location.href = `/thank-you?access_token=${mockData.access_token}&pinfl=${mockData.pinfl}`;
        
        resolve({ success: true, data: mockData });
      }, 2000);
    });
  }
}
