
// Сервис для работы с отчётами из KATM и E-GOV
export class ScoreReportService {
  
  static async fetchAllReports(accessToken: string, pinfl: string) {
    console.log('Запрос отчётов для PINFL:', pinfl);
    
    try {
      // В продакшне здесь будут реальные API вызовы к KATM и E-GOV
      const [katmReport, egovReport] = await Promise.all([
        this.fetchKATMReport(accessToken, pinfl),
        this.fetchEGOVReport(accessToken, pinfl)
      ]);

      // Агрегируем данные
      const aggregatedReport = this.aggregateReports(katmReport, egovReport);
      
      return aggregatedReport;
    } catch (error) {
      console.error('Ошибка получения отчётов:', error);
      throw error;
    }
  }

  private static async fetchKATMReport(accessToken: string, pinfl: string) {
    // TODO: Интеграция с реальным API KATM
    // const response = await fetch('https://api.katm.uz/credit-report', {
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ pinfl })
    // });
    
    // В режиме разработки возвращаем заглушку
    await this.delay(2000); // Имитация сетевого запроса
    
    return {
      source: 'KATM',
      creditRating: 'A+',
      creditHistory: [
        { date: '2024-01-15', amount: 50000000, status: 'Закрыт' },
        { date: '2023-06-10', amount: 25000000, status: 'Активный' }
      ],
      totalDebt: 25000000,
      overdueDebt: 0,
      creditScore: 850
    };
  }

  private static async fetchEGOVReport(accessToken: string, pinfl: string) {
    // TODO: Интеграция с реальным API E-GOV
    // const response = await fetch('https://api.egov.uz/citizen-data', {
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ pinfl })
    // });
    
    // В режиме разработки возвращаем заглушку
    await this.delay(1500);
    
    return {
      source: 'E-GOV',
      employment: {
        status: 'Трудоустроен',
        company: 'ООО "Технологии"',
        position: 'Программист',
        salary: 15000000
      },
      assets: {
        property: true,
        vehicles: 1,
        bankAccounts: 2
      },
      taxes: {
        status: 'Без задолженности',
        lastPayment: '2024-01-15'
      }
    };
  }

  private static aggregateReports(katmReport: any, egovReport: any) {
    // Агрегация и расчёт итогового скоринга
    const baseScore = katmReport.creditScore || 750;
    const employmentBonus = egovReport.employment.status === 'Трудоустроен' ? 50 : 0;
    const taxBonus = egovReport.taxes.status === 'Без задолженности' ? 25 : -50;
    const assetBonus = egovReport.assets.property ? 30 : 0;
    
    const finalScore = Math.min(900, baseScore + employmentBonus + taxBonus + assetBonus);
    
    let rating = 'C';
    if (finalScore >= 800) rating = 'A+';
    else if (finalScore >= 750) rating = 'A';
    else if (finalScore >= 700) rating = 'B+';
    else if (finalScore >= 650) rating = 'B';
    else if (finalScore >= 600) rating = 'C+';

    return {
      pinfl: katmReport.pinfl,
      timestamp: new Date().toISOString(),
      finalScore,
      creditRating: rating,
      status: egovReport.employment.status,
      summary: {
        creditHistory: katmReport.creditHistory,
        employment: egovReport.employment,
        assets: egovReport.assets,
        taxes: egovReport.taxes,
        totalDebt: katmReport.totalDebt,
        overdueDebt: katmReport.overdueDebt
      },
      recommendations: this.generateRecommendations(finalScore, katmReport, egovReport)
    };
  }

  private static generateRecommendations(score: number, katmReport: any, egovReport: any) {
    const recommendations = [];
    
    if (score >= 800) {
      recommendations.push('Отличная кредитная история. Доступны лучшие кредитные продукты.');
    } else if (score >= 700) {
      recommendations.push('Хорошая кредитная история. Рекомендуется поддерживать текущий уровень.');
    } else {
      recommendations.push('Есть возможности для улучшения кредитной истории.');
    }
    
    if (katmReport.overdueDebt > 0) {
      recommendations.push('Рекомендуется погасить просроченную задолженность.');
    }
    
    if (!egovReport.assets.property) {
      recommendations.push('Наличие недвижимости может положительно повлиять на кредитный рейтинг.');
    }
    
    return recommendations;
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static downloadReport(reportData: any) {
    const reportContent = {
      ...reportData,
      generatedAt: new Date().toLocaleString('ru-UZ'),
      reportId: `SCORE_${Date.now()}`
    };
    
    const dataStr = JSON.stringify(reportContent, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `credit_score_report_${reportData.pinfl}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // API endpoint для получения отчёта (для внешних интеграций)
  static async getReportAPI(pinfl: string): Promise<any> {
    // TODO: Реализовать API endpoint
    // Здесь должна быть логика для получения сохранённого отчёта по PINFL
    
    const storedReport = localStorage.getItem(`report_${pinfl}`);
    if (storedReport) {
      return JSON.parse(storedReport);
    }
    
    throw new Error('Отчёт не найден');
  }
}
