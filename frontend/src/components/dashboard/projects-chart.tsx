// @ts-nocheck
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Project } from "../../@types/types";
import { useEffect, useState } from "react";

type Props = {
  dashboardData: any;
  fallbackProjects: Project[];
}

export const ProjectsChart: React.FC<Props> = ({ dashboardData, fallbackProjects }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChartData();
  }, [dashboardData]);

  const loadChartData = async () => {
    try {
      if (dashboardData?.chartData) {
        setChartData(dashboardData.chartData);
      } else {
        const data = await dashboardAPI.getProjectsByStage();
        setChartData(data);
      }
    } catch (error) {
      console.error('Ошибка загрузки данных диаграммы:', error);
      const fallbackData = calculateFallbackData(fallbackProjects);
      setChartData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const calculateFallbackData = (projects: Project[]) => {
    const stageData = projects.reduce((acc, project) => {
      const stage = project.stage || 'Не указан';
      acc[stage] = (acc[stage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(stageData).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-purple-200 rounded-lg shadow-sm">
          <p className="font-medium text-purple-800">{payload[0].name}</p>
          <p className="text-sm text-purple-600">
            Проектов: <span className="font-medium">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6">
        <h3 className="text-lg font-semibold text-purple-800 mb-4">
          Распределение проектов по этапам
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
        Распределение проектов по этапам
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};