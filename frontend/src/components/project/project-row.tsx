// @ts-nocheck
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Project } from "../../@types/types";
import { ExpandedProjectContent } from "./expanded-project-content";

type Props = {
  project: Project; 
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

export const ProjectRow: React.FC<Props> = ({ project, isExpanded, onToggle, onEdit, onDelete }) => (
  <>
    <tr className="border-b border-purple-100 hover:bg-purple-50 cursor-pointer transition-colors duration-200" onClick={onToggle}>
      <td className="py-3 px-4">
        <div className="flex items-center justify-between">
          <span>{project.organization_id}</span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </td>
      <td className="py-3 px-4">{project.name}</td>
      <td className="py-3 px-4">{project.manager_id}</td>
      <td className="py-3 px-4">{project.stage}</td>
      <td className="py-3 px-4">{project.realization_probability}%</td>
      <td className="py-3 px-4">{project.realization_year}</td>
    </tr>
    {isExpanded && (
      <tr>
        <td colSpan={6} className="bg-purple-25 p-6">
          <ExpandedProjectContent 
            project={project} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        </td>
      </tr>
    )}
  </>
);