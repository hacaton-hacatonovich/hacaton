import { BriefcaseBusiness, ChartNoAxesCombined, Users } from "lucide-react";
import React, { useState } from "react";
import { ProjectModal } from "../components/modal/project-modal";
import { ProjectsContent } from "../components/project/projects-content";
import { WelcomeScreen } from "../components/welcome-screen";
import type { Project } from "../@types/types";

export const MainPage: React.FC = () => {
  const [mainState, setMainState] = useState<false | 'Dashboard' | 'Projects' | 'Users'>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [projectModal, setProjectModal] = useState<{ isOpen: boolean; project: Project | null }>({ isOpen: false, project: null });

  // Демо данные
  const mockProjects: Project[] = [
    {
      id: "1",
      organizationName: "ООО 'Пример'",
      inn: "1234567890",
      projectName: "Тестовый проект",
      service: "Консалтинг",
      paymentType: "Авансовый",
      projectStage: "Переговоры",
      realizationProbability: 70,
      manager: "Иванов И.И.",
      businessSegment: "IT",
      realizationYear: "2024",
      isIndustrySolution: true,
      isForecastAccepted: true,
      isDzoRealization: false,
      needsManagementControl: false,
      evaluationAccepted: "Высокая",
      industryManager: "Петров П.П.",
      projectNumber: "PRJ-001",
      creationDate: "2024-01-15",
      revenueInfo: [{ year: "2024", month: "Январь", amount: 100000, revenueStatus: "План" }],
      costInfo: [{ year: "2024", month: "Январь", amount: 50000, costType: "Зарплата", costReflectionStatus: "Факт" }],
      additionalInfo: {
        currentStatus: "Проект находится на стадии переговоров",
        periodAchievements: "Проведены предварительные встречи",
        nextPeriodPlans: "Заключение договора",
        comments: "Создан 15.01.2024 пользователем Admin"
      }
    }
  ];

  const toggleProjectExpansion = (projectId: string) => {
    setExpandedProjectId(expandedProjectId === projectId ? null : projectId);
  };

  const handleSaveProject = (project: Project) => {
    if (projectModal.project) {
      // Редактирование
      setProjects(prev => prev.map(p => p.id === project.id ? project : p));
    } else {
      // Создание
      setProjects(prev => [...prev, project]);
    }
  };

  const openAddModal = () => setProjectModal({ isOpen: true, project: null });
  const openEditModal = (project: Project) => setProjectModal({ isOpen: true, project });
  const closeModal = () => setProjectModal({ isOpen: false, project: null });

  const currentProjects = projects.length > 0 ? projects : mockProjects;

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">
      <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between relative z-30">
        <div className="text-purple-700 text-2xl font-bold cursor-pointer" onClick={() => setMainState(false)}>
          <img src="./../../public/logo.png" alt="" className="w-52" />
        </div>
        <button className="bg-orange-500 text-white text-sm px-4 py-2 rounded-md font-medium hover:bg-orange-600 transition-colors duration-200">
          Выйти
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <nav className="bg-white shadow-lg w-60 group">
          <div className="h-full flex flex-col justify-between items-center py-6">
            <div className="space-y-4">
              {(['Dashboard', 'Projects', 'Users'] as const).map((item) => (
                <div key={item} className={`relative gap-4 flex items-center cursor-pointer translate-x-0 ${mainState === item && 'bg-purple-50 rounded-md translate-x-3 transition-transform'}`} onClick={() => setMainState(item)}>
                  {item === 'Dashboard' && <ChartNoAxesCombined width={20} color="#FF4F12" />}
                  {item === 'Projects' && <BriefcaseBusiness width={20} color="#FF4F12" />}
                  {item === 'Users' && <Users width={20} color="#FF4F12" />}
                  <span className="pl-2">{item === 'Dashboard' ? 'Дэшборд' : item === 'Projects' ? 'Проекты' : 'Пользователи'}</span>
                </div>
              ))}
            </div>
          </div>
        </nav>

        <main className="flex-1 p-8 overflow-auto">
          {!mainState && <WelcomeScreen />}
          {mainState === 'Dashboard' && <div>Dashboard Content</div>}
          {mainState === 'Projects' && (
            <ProjectsContent 
              projects={currentProjects}
              expandedProjectId={expandedProjectId}
              onToggleProject={toggleProjectExpansion}
              onAddProject={openAddModal}
              onEditProject={openEditModal}
            />
          )}
        </main>
      </div>

      <ProjectModal 
        project={projectModal.project}
        isOpen={projectModal.isOpen}
        onClose={closeModal}
        onSave={handleSaveProject}
      />
    </div>
  );
};