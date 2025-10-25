import type { Project, User } from "../../@types/types";
import { StatsGrid } from "./stats-grid";
import { ProjectsChart } from "./projects-chart";
import { RevenueChart } from "./revenue-chart";
import { RecentProjects } from "./recent-projects";

type Props = {
  projects: Project[];
  users: User[];
}

export const DashboardContent: React.FC<Props> = ({ projects, users }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-800">Дашборд</h1>
        <div className="text-sm text-purple-600">
          Обновлено: {new Date().toLocaleDateString('ru-RU')}
        </div>
      </div>

      {/* Статистика */}
      <StatsGrid projects={projects} users={users} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Диаграмма проектов по этапам */}
        <ProjectsChart projects={projects} />
        
        {/* Диаграмма выручки */}
        <RevenueChart projects={projects} />
      </div>

      {/* Недавние проекты */}
      <RecentProjects projects={projects} />
    </div>
  );
};