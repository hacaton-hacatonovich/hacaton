import { BriefcaseBusiness, Users, TrendingUp, DollarSign } from "lucide-react";
import type { Project, User } from "../../@types/types";

type Props = {
  projects: Project[];
  users: User[];
}

export const StatsGrid: React.FC<Props> = ({ projects, users }) => {
  const totalRevenue = projects.reduce((sum, project) => 
    sum + project.revenueInfo.reduce((projectSum, revenue) => projectSum + revenue.amount, 0), 0
  );

  const activeProjects = projects.filter(p => 
    p.projectStage !== "Завершен"
  ).length;

  const analysts = users.filter(u => u.role === "analyst").length;

  const avgProbability = projects.length > 0 
    ? projects.reduce((sum, p) => sum + p.realizationProbability, 0) / projects.length 
    : 0;

  const stats = [
    {
      title: "Всего проектов",
      value: projects.length,
      icon: BriefcaseBusiness,
      color: "bg-blue-500",
      change: "+12%",
      trend: "up"
    },
    {
      title: "Активные проекты",
      value: activeProjects,
      icon: TrendingUp,
      color: "bg-green-500",
      change: "+5%",
      trend: "up"
    },
    {
      title: "Общая выручка",
      value: `${(totalRevenue / 1000000).toFixed(1)}M руб.`,
      icon: DollarSign,
      color: "bg-purple-500",
      change: "+18%",
      trend: "up"
    },
    {
      title: "Аналитики",
      value: analysts,
      icon: Users,
      color: "bg-orange-500",
      change: "+2",
      trend: "up"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
  change: string;
  trend: 'up' | 'down';
}> = ({ title, value, icon: Icon, color, change, trend }) => (
  <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-purple-600">{title}</p>
        <p className="text-2xl font-bold text-purple-800 mt-1">{value}</p>
        <div className={`flex items-center mt-2 text-sm ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          <span className="font-medium">{change}</span>
          <span className="ml-1 text-purple-500">за месяц</span>
        </div>
      </div>
      <div className={`${color} p-3 rounded-full`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);