// @ts-nocheck
import { BriefcaseBusiness, ChartNoAxesCombined, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ProjectModal } from "../components/modal/project-modal";
import { UserModal } from "../components/modal/user-modal";
import { ProjectsContent } from "../components/project/projects-content";
import { UsersContent } from "../components/user/user-content";
import { DashboardContent } from "../components/dashboard/dashboard-content";
import { WelcomeScreen } from "../components/welcome-screen";
import type { Project, User } from "../@types/types";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";

export const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const { clearUserData } = useUserStore();

  const [mainState, setMainState] = useState<false | 'Dashboard' | 'Projects' | 'Users'>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [projectModal, setProjectModal] = useState<{ isOpen: boolean; project: Project | null }>({ isOpen: false, project: null });
  const [userModal, setUserModal] = useState<{ isOpen: boolean; user: User | null }>({ isOpen: false, user: null });
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<'admin' | 'user' | 'analyst' | null>();

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    loadInitialData();
    getRole();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      await Promise.all([loadProjects(), loadUsers()]);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    } finally {
      setLoading(false);
    }
  };
  const getRole = async() => {
    try {
      const response = await fetch('/backend/get-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: localStorage.getItem('user'),
        })
      })
      if (response.ok) {
        const roleData = await response.json();
        setRole(roleData);
      } else {
        console.error('Ошибка получения роли');
      }
    } catch (error) {
      console.error(
          'Ошибка получения роли:',
          error
      );
    }
  }

  const loadProjects = async () => {
    try {
      const response = await fetch('/backend/show_project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: localStorage.getItem('user'),
        })
      });

      if (response.ok) {
        const projectsData = await response.json();
        console.log(projectsData)
        setProjects(projectsData);
      } else {
        console.error('Ошибка загрузки проектов');
      }
    } catch (error) {
      console.error('Ошибка загрузки проектов:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await fetch('/backend/show_all_users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: localStorage.getItem('user'),
        })
      });
      if (response.ok) {
        const usersData = await response.json();
        console.log(usersData)
        setUsers(usersData);
      } else {
        console.error('Ошибка загрузки пользователей');
      }
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
    }
  };

  const toggleProjectExpansion = (projectId: string) => {
    setExpandedProjectId(expandedProjectId === projectId ? null : projectId);
  };

  const handleSaveProject = async (project: Project) => {
    try {
      const response = await fetch('/backend/create_new_project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...project,
          revenueInfo: project.revenueInfo || [],
          costInfo: project.costInfo || [],
          projectHistory: project.projectHistory || [],
          email: localStorage.getItem('user')
        })
      });

      if (response.ok) {
        await loadProjects();
        closeProjectModal();
      } else {
        console.error('Ошибка сохранения проекта');
      }
    } catch (error) {
      console.error('Ошибка сохранения проекта:', error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (confirm("Вы уверены, что хотите удалить этот проект?")) {
      try {
        const response = await fetch(`/backend/delete_project`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
          id: projectId,
        })
        });

        if (response.ok) {
          await loadProjects();
        } else {
          console.error('Ошибка удаления проекта');
        }
      } catch (error) {
        console.error('Ошибка удаления проекта:', error);
      }
    }
  };

  const handleSaveUser = async (user: User) => {
    try {
      const response = await fetch('/backend/create_user_process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...user,
          admin_id: localStorage.getItem('user')
        })
      });

      if (response.ok) {
        await loadUsers();
        closeUserModal();
      } else {
        console.error('Ошибка сохранения пользователя');
      }
    } catch (error) {
      console.error('Ошибка сохранения пользователя:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm("Вы уверены, что хотите удалить этого пользователя?")) {
      try {
        const response = await fetch('/backend/delete_user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userId,
            admin_id: localStorage.getItem('user'),
          })
        });

        if (response.ok) {
          await loadUsers();
        } else {
          console.error('Ошибка удаления пользователя');
        }
      } catch (error) {
        console.error('Ошибка удаления пользователя:', error);
      }
    }
  };

  const openAddProjectModal = () => setProjectModal({ isOpen: true, project: null });
  const openEditProjectModal = (project: Project) => setProjectModal({ isOpen: true, project });
  const closeProjectModal = () => setProjectModal({ isOpen: false, project: null });

  const openAddUserModal = () => setUserModal({ isOpen: true, user: null });
  const closeUserModal = () => setUserModal({ isOpen: false, user: null });

  const currentProjects = projects;
  const currentUsers = users;

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">
      <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between relative z-30">
        <div className="text-purple-700 text-2xl font-bold cursor-pointer" onClick={() => setMainState(false)}>
          <img src="./../../public/logo.png" alt="" className="w-52" />
        </div>
        <button onClick={() => {clearUserData(); navigate('/login')}} className="bg-orange-500 text-white text-sm px-4 py-2 rounded-md font-medium hover:bg-orange-600 transition-colors duration-200">
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
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-purple-700">Загрузка данных...</div>
            </div>
          ) : (
            <>
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
                  onDeleteProject={handleDeleteProject}
                />
              )}
              {mainState === 'Users' && (
                <UsersContent
                  users={currentUsers}
                  onAddUser={openAddUserModal}
                  onDeleteUser={handleDeleteUser}
                />
              )}
            </>
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