// components/dashboard/projects-chart.tsx
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Project } from "../../@types/types";

type Props = {
  projects: Project[];
}

export const ProjectsChart: React.FC<Props> = ({ projects }) => {
  const stageData = projects.reduce((acc, project) => {
    const stage = project.projectStage || 'Не указан';
    acc[stage] = (acc[stage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(stageData).map(([name, value]) => ({
    name,
    value,
    percentage: Math.round((value / projects.length) * 100)
  }));

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
          <p className="text-sm text-purple-600">
            Доля: <span className="font-medium">{payload[0].payload.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

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