// @ts-nocheck
import type { Project, User } from "../../@types/types";
import { StatsGrid } from "./stats-grid";
import { ProjectsChart } from "./projects-chart";
import { RevenueChart } from "./revenue-chart";
import { RecentProjects } from "./recent-projects";
import { useEffect, useState } from "react";

type Props = {
  projects: Project[];
  users: User[];
}

export const DashboardContent: React.FC<Props> = ({ projects, users }) => {
  const [dashboardData, setDashboardData] = useState<{
    all_projects: any;
    active_projects: any;
    analinik_count: any;
  } | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await fetch('/backend/dashboard_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: localStorage.getItem('user')
        })
      });

      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else {
        console.error('Ошибка загрузки данных дашборда');
      }
    } catch (error) {
      console.error('Ошибка загрузки данных дашборда:', error);
    } finally {
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-800">Дашборд</h1>
        <div className="text-sm text-purple-600">
          Обновлено: {new Date().toLocaleDateString('ru-RU')}
        </div>
      </div>

      {/* Статистика */}
      <StatsGrid
        dashboardData={dashboardData} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Диаграмма проектов по этапам */}
        <ProjectsChart 
          projects={projects} 
          dashboardData={dashboardData} 
        />
        
        {/* Диаграмма выручки */}
        <RevenueChart 
          projects={projects} 
          dashboardData={dashboardData} 
        />
      </div>

      {/* Недавние проекты */}
      <RecentProjects 
        projects={dashboardData?.recentProjects || projects} 
      />
    </div>
  );
};