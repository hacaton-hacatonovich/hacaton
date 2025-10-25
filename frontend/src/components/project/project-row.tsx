import { ChevronDown, ChevronUp } from "lucide-react";
import type { Project } from "../../@types/types";
import { ExpandedProjectContent } from "./expanded-project-content";

type Props = {
	project: Project; 
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: (project: Project) => void;
}

export const ProjectRow: React.FC<Props> = ({ project, isExpanded, onToggle, onEdit }) => (
  <>
    <tr className="border-b border-purple-100 hover:bg-purple-50 cursor-pointer transition-colors duration-200" onClick={onToggle}>
      <td className="py-3 px-4">
        <div className="flex items-center justify-between">
          <span>{project.organizationName}</span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </td>
      <td className="py-3 px-4">{project.projectName}</td>
      <td className="py-3 px-4">{project.manager}</td>
      <td className="py-3 px-4">{project.projectStage}</td>
      <td className="py-3 px-4">{project.realizationProbability}%</td>
      <td className="py-3 px-4">{project.realizationYear}</td>
    </tr>
    {isExpanded && (
      <tr>
        <td colSpan={6} className="bg-purple-25 p-6">
          <ExpandedProjectContent project={project} onEdit={onEdit} />
        </td>
      </tr>
    )}
  </>
);