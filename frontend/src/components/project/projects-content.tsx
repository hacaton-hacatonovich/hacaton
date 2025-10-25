import { Plus } from "lucide-react";
import type { Project } from "../../@types/types";
import { ProjectRow } from "./project-row";
import { NoProjectsMessage } from "./no-projects-message";

type Props = {
  projects: Project[];
  expandedProjectId: string | null;
  onToggleProject: (id: string) => void;
  onAddProject: () => void;
  onEditProject: (project: Project) => void;
}

export const ProjectsContent: React.FC<Props> = ({ projects, expandedProjectId, onToggleProject, onAddProject, onEditProject }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-purple-800">Проекты</h1>
      <button onClick={onAddProject} className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200">
        <Plus size={16} />
        Добавить проект
      </button>
    </div>

    <div className="bg-white rounded-lg shadow-sm border border-purple-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-purple-50">
          <tr>
            {['Организация', 'Название проекта', 'Менеджер', 'Этап', 'Вероятность', 'Год реализации'].map(header => (
              <th key={header} className="py-3 px-4 text-left text-purple-700 font-semibold">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <ProjectRow 
              key={project.id}
              project={project}
              isExpanded={expandedProjectId === project.id}
              onToggle={() => onToggleProject(project.id)}
              onEdit={onEditProject}
            />
          ))}
        </tbody>
      </table>
    </div>

    {projects.length === 0 && <NoProjectsMessage />}
  </div>
);