// @ts-nocheck
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Project } from "../../@types/types";
import { MONTHS } from "../../constants";
import { useEffect, useState } from "react";
// import { dashboardAPI } from "../../services/dashboardAPI";

type Props = {
  dashboardData: any;
  fallbackProjects: Project[];
}

export const RevenueChart: React.FC<Props> = ({ dashboardData, fallbackProjects }) => {
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRevenueData();
  }, [dashboardData]);

  const loadRevenueData = async () => {
    try {
      if (dashboardData?.revenueData) {
        setMonthlyData(transformRevenueData(dashboardData.revenueData));
      } else {
        const data = await dashboardAPI.getRevenueStats();
        setMonthlyData(transformRevenueData(data));
      }
    } catch (error) {
      console.error('Ошибка загрузки данных выручки:', error);
      const fallbackData = calculateFallbackData(fallbackProjects);
      setMonthlyData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const transformRevenueData = (apiData: any[]) => {
    return apiData.map(item => ({
      month: item.month.substring(0, 3),
      выручка: item.revenue,
      затраты: item.cost,
      прибыль: item.profit
    }));
  };

  const calculateFallbackData = (projects: Project[]) => {
    // Группируем по месяцам из revenueInfo и costInfo
    const monthlyStats: Record<string, { revenue: number; cost: number }> = {};

    projects.forEach(project => {
      // Обрабатываем выручку
      project.revenueInfo.forEach(revenue => {
        const monthKey = `${revenue.year}-${revenue.month.toString().padStart(2, '0')}`;
        if (!monthlyStats[monthKey]) {
          monthlyStats[monthKey] = { revenue: 0, cost: 0 };
        }
        monthlyStats[monthKey].revenue += revenue.amount;
      });

      // Обрабатываем затраты
      project.costInfo.forEach(cost => {
        const monthKey = `${cost.year}-${cost.month.toString().padStart(2, '0')}`;
        if (!monthlyStats[monthKey]) {
          monthlyStats[monthKey] = { revenue: 0, cost: 0 };
        }
        monthlyStats[monthKey].cost += cost.amount;
      });
    });

    // Преобразуем в массив и сортируем по дате
    return Object.entries(monthlyStats)
      .map(([monthKey, data]) => {
        const [year, month] = monthKey.split('-');
        const monthName = MONTHS[parseInt(month) - 1]?.substring(0, 3) || month;
        
        return {
          month: monthName,
          выручка: data.revenue,
          затраты: data.cost,
          прибыль: data.revenue - data.cost
        };
      })
      .sort((a, b) => {
        // Сортируем по хронологии
        const monthA = MONTHS.findIndex(m => m.startsWith(a.month));
        const monthB = MONTHS.findIndex(m => m.startsWith(b.month));
        return monthA - monthB;
      })
      .slice(-12); // Берем последние 12 месяцев
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const fullMonthName = MONTHS.find(m => m.startsWith(label)) || label;
      
      return (
        <div className="bg-white p-3 border border-purple-200 rounded-lg shadow-sm">
          <p className="font-medium text-purple-800 mb-2">{fullMonthName}</p>
          
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-medium">{entry.value.toLocaleString('ru-RU')} руб.</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6">
        <h3 className="text-lg font-semibold text-purple-800 mb-4">
          Выручка и затраты по месяцам
        </h3>
        <div className="h-80 flex items-center justify-center">
          <div className="text-purple-700">Загрузка диаграммы...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">
        Выручка и затраты по месяцам
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="month" 
              className="text-sm"
              tick={{ fill: '#6B7280' }}
            />
            <YAxis 
              className="text-sm"
              tick={{ fill: '#6B7280' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="выручка" fill="#8884d8" name="Выручка" radius={[4, 4, 0, 0]} />
            <Bar dataKey="затраты" fill="#82ca9d" name="Затраты" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};