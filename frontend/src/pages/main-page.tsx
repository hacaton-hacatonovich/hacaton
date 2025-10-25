// main-page.tsx
import { BriefcaseBusiness, ChartNoAxesCombined, Users } from "lucide-react";
import React, { useState } from "react";
import { ProjectModal } from "../components/modal/project-modal";
import { UserModal } from "../components/modal/user-modal";
import { ProjectsContent } from "../components/project/projects-content";
import { UsersContent } from "../components/user/user-content";
import { DashboardContent } from "../components/dashboard/dashboard-content";
import { WelcomeScreen } from "../components/welcome-screen";
import type { Project, User } from "../@types/types";

export const MainPage: React.FC = () => {
  const [mainState, setMainState] = useState<false | 'Dashboard' | 'Projects' | 'Users'>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [projectModal, setProjectModal] = useState<{ isOpen: boolean; project: Project | null }>({ isOpen: false, project: null });
  const [userModal, setUserModal] = useState<{ isOpen: boolean; user: User | null }>({ isOpen: false, user: null });

  // Демо данные проектов
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
      revenueInfo: [
        { year: "2024", month: "Январь", amount: 100000, revenueStatus: "План" },
        { year: "2024", month: "Февраль", amount: 120000, revenueStatus: "План" },
        { year: "2024", month: "Март", amount: 150000, revenueStatus: "План" }
      ],
      costInfo: [
        { year: "2024", month: "Январь", amount: 50000, costType: "Зарплата", costReflectionStatus: "Факт" },
        { year: "2024", month: "Февраль", amount: 60000, costType: "Зарплата", costReflectionStatus: "План" },
        { year: "2024", month: "Март", amount: 70000, costType: "Оборудование", costReflectionStatus: "План" }
      ],
      additionalInfo: {
        currentStatus: "Проект находится на стадии переговоров",
        periodAchievements: "Проведены предварительные встречи",
        nextPeriodPlans: "Заключение договора",
        comments: "Создан 15.01.2024 пользователем Admin"
      }
    },
    {
      id: "2",
      organizationName: "АО 'ТехноПрофи'",
      inn: "0987654321",
      projectName: "Разработка CRM системы",
      service: "Разработка",
      paymentType: "Постоплата",
      projectStage: "Реализация",
      realizationProbability: 90,
      manager: "Сидоров С.С.",
      businessSegment: "IT",
      realizationYear: "2024",
      isIndustrySolution: false,
      isForecastAccepted: true,
      isDzoRealization: true,
      needsManagementControl: true,
      evaluationAccepted: "Высокая",
      industryManager: "",
      projectNumber: "",
      creationDate: "2024-01-10",
      revenueInfo: [
        { year: "2024", month: "Январь", amount: 200000, revenueStatus: "Факт" },
        { year: "2024", month: "Февраль", amount: 250000, revenueStatus: "План" },
        { year: "2024", month: "Март", amount: 300000, revenueStatus: "План" }
      ],
      costInfo: [
        { year: "2024", month: "Январь", amount: 80000, costType: "Зарплата", costReflectionStatus: "Факт" },
        { year: "2024", month: "Февраль", amount: 90000, costType: "Зарплата", costReflectionStatus: "План" },
        { year: "2024", month: "Март", amount: 100000, costType: "Аутсорсинг", costReflectionStatus: "План" }
      ],
      additionalInfo: {
        currentStatus: "Проект в стадии активной разработки",
        periodAchievements: "Завершено проектирование архитектуры",
        nextPeriodPlans: "Разработка основного функционала",
        comments: "Высокий приоритет"
      }
    }
  ];

  // Демо данные пользователей
  const mockUsers: User[] = [
    {
      id: "1",
      firstName: "Иван",
      lastName: "Иванов",
      patronymic: "Иванович",
      email: "ivanov@example.com",
      phone: "+7 (999) 123-45-67",
      role: "analyst"
    },
    {
      id: "2",
      firstName: "Петр",
      lastName: "Петров",
      patronymic: "Петрович",
      email: "petrov@example.com",
      phone: "+7 (999) 765-43-21",
      role: "user"
    }
  ];

  const toggleProjectExpansion = (projectId: string) => {
    setExpandedProjectId(expandedProjectId === projectId ? null : projectId);
  };

  const handleSaveProject = (project: Project) => {
    if (projectModal.project) {
      setProjects(prev => prev.map(p => p.id === project.id ? project : p));
    } else {
      setProjects(prev => [...prev, project]);
    }
  };

  const handleSaveUser = (user: User) => {
    if (userModal.user) {
      setUsers(prev => prev.map(u => u.id === user.id ? user : u));
    } else {
      setUsers(prev => [...prev, user]);
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Вы уверены, что хотите удалить этого пользователя?")) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const openAddProjectModal = () => setProjectModal({ isOpen: true, project: null });
  const openEditProjectModal = (project: Project) => setProjectModal({ isOpen: true, project });
  const closeProjectModal = () => setProjectModal({ isOpen: false, project: null });

  const openAddUserModal = () => setUserModal({ isOpen: true, user: null });
  const closeUserModal = () => setUserModal({ isOpen: false, user: null });

  const currentProjects = projects.length > 0 ? projects : mockProjects;
  const currentUsers = users.length > 0 ? users : mockUsers;

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
          {mainState === 'Dashboard' && (
            <DashboardContent projects={currentProjects} users={currentUsers} />
          )}
          {mainState === 'Projects' && (
            <ProjectsContent 
              projects={currentProjects}
              expandedProjectId={expandedProjectId}
              onToggleProject={toggleProjectExpansion}
              onAddProject={openAddProjectModal}
              onEditProject={openEditProjectModal}
            />
          )}
          {mainState === 'Users' && (
            <UsersContent 
              users={currentUsers}
              onAddUser={openAddUserModal}
              onDeleteUser={handleDeleteUser}
            />
          )}
        </main>
      </div>

      <ProjectModal 
        project={projectModal.project}
        isOpen={projectModal.isOpen}
        onClose={closeProjectModal}
        onSave={handleSaveProject}
      />

      <UserModal 
        user={userModal.user}
        isOpen={userModal.isOpen}
        onClose={closeUserModal}
        onSave={handleSaveUser}
      />
    </div>
  );
};