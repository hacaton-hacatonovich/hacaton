// components/dashboard/revenue-chart.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Project } from "../../@types/types";
import { MONTHS } from "../../constants";

type Props = {
  projects: Project[];
}

export const RevenueChart: React.FC<Props> = ({ projects }) => {
  // Собираем данные по месяцам
  const monthlyData = MONTHS.map(month => {
    const monthRevenue = projects.reduce((sum, project) => {
      const projectMonthRevenue = project.revenueInfo
        .filter(revenue => revenue.month === month)
        .reduce((monthSum, revenue) => monthSum + revenue.amount, 0);
      return sum + projectMonthRevenue;
    }, 0);

    const monthCost = projects.reduce((sum, project) => {
      const projectMonthCost = project.costInfo
        .filter(cost => cost.month === month)
        .reduce((monthSum, cost) => monthSum + cost.amount, 0);
      return sum + projectMonthCost;
    }, 0);

    return {
      month: month.substring(0, 3),
      выручка: monthRevenue,
      затраты: monthCost,
      прибыль: monthRevenue - monthCost
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-purple-200 rounded-lg shadow-sm">
          <p className="font-medium text-purple-800 mb-2">{MONTHS.find(m => m.startsWith(label))}</p>
          
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-medium">{entry.value.toLocaleString()} руб.</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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