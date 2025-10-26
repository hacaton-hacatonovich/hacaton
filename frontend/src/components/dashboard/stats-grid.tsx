// @ts-nocheck
import { BriefcaseBusiness, Users, TrendingUp, DollarSign } from "lucide-react";
import type { Project, User } from "../../@types/types";
import { useEffect, useState } from "react";

type Props = {
  dashboardData: any;
  fallbackProjects: Project[];
  fallbackUsers: User[];
}

type StatItem = {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

export const StatsGrid: React.FC<Props> = ({ dashboardData }) => {
  console.log(dashboardData)
  const [stats, setStats] = useState<StatItem[] | null>(null)

  useEffect(() => {
      setStats([
        {
          title: "Всего проектов",
          value: 4|| 0,
          icon: BriefcaseBusiness,
          color: "bg-blue-500",
          description: "Все проекты в системе"
        },
        {
          title: "Активные проекты",
          value: 2 || 0,
          icon: TrendingUp,
          color: "bg-green-500",
          description: "Проекты в работе"
        },
        {
          title: "Общая выручка",
          value: `${((1500000 || 0) / 1000000).toFixed(1)}M руб.`,
          icon: DollarSign,
          color: "bg-purple-500",
          description: "Суммарная выручка"
        },
        {
          title: "Аналитики",
          value: 5 || 0,
          icon: Users,
          color: "bg-orange-500",
          description: "Активные аналитики"
        }
      ])

  }, [dashboardData]); // Added dashboardData as dependency

  // Show loading state or empty state while stats is null
  if (!stats) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-purple-100 p-6 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="bg-gray-200 p-3 rounded-full">
                    <div className="h-6 w-6"></div>
                  </div>
                </div>
              </div>
          ))}
        </div>
    );
  }

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
  description: string;
}> = ({ title, value, icon: Icon, color, description }) => (
    <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-purple-600">{title}</p>
          <p className="text-2xl font-bold text-purple-800 mt-1">{value}</p>
          <p className="text-sm text-purple-500 mt-2">{description}</p>
        </div>
        <div className={`${color} p-3 rounded-full`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
);