// @ts-nocheck
import { Calendar, User, TrendingUp, BriefcaseBusiness } from "lucide-react";
import type { Project } from "../../@types/types";
import { useEffect, useState } from "react";
// import { dashboardAPI } from "../../services/dashboardAPI";

type Props = {
  dashboardData: any;
  fallbackProjects: Project[];
}

export const RecentProjects: React.FC<Props> = ({ dashboardData, fallbackProjects }) => {
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentProjects();
  }, [dashboardData]);

  const loadRecentProjects = async () => {
    try {
      if (dashboardData?.recentProjects) {
        setRecentProjects(dashboardData.recentProjects);
      } else {
        const data = await dashboardAPI.getRecentProjects();
        setRecentProjects(data);
      }
    } catch (error) {
      console.error('Ошибка загрузки недавних проектов:', error);
      const fallbackData = fallbackProjects
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);
      setRecentProjects(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (probability: number) => {
    if (probability >= 80) return "text-green-600 bg-green-100";
    if (probability >= 50) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6">
        <h3 className="text-lg font-semibold text-purple-800 mb-4">
          Недавние проекты
        </h3>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-purple-100 rounded-lg animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-200 rounded-lg"></div>
                <div>
                  <div className="h-4 bg-purple-200 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-purple-200 rounded w-24"></div>
                </div>
              </div>
              <div className="h-6 bg-purple-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">
        Недавние проекты
      </h3>
      <div className="space-y-4">
        {recentProjects.map((project) => (
          <div key={project.id} className="flex items-center justify-between p-4 border border-purple-100 rounded-lg hover:bg-purple-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BriefcaseBusiness className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-purple-800">{project.name}</h4>
                <p className="text-sm text-purple-600">{project.business_segment}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center text-sm text-purple-500">
                    <User className="h-4 w-4 mr-1" />
                    Менеджер: {project.manager_id}
                  </div>
                  <div className="flex items-center text-sm text-purple-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(project.created_at)}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.realization_probability)}`}>
                <TrendingUp className="h-4 w-4 inline mr-1" />
                {project.realization_probability}%
              </div>
              <span className="text-sm text-purple-600 capitalize">{project.stage}</span>
            </div>
          </div>
        ))}
        
        {recentProjects.length === 0 && (
          <div className="text-center py-8 text-purple-500">
            <BriefcaseBusiness className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Нет проектов для отображения</p>
          </div>
        )}
      </div>
    </div>
  );
};