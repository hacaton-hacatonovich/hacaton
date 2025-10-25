import { Download, Edit } from "lucide-react";
import type { Project } from "../../@types/types";
import { ProjectDetails } from "./project-detail";

type Props = { project: Project; onEdit: (project: Project) => void }

export const ExpandedProjectContent: React.FC<Props> = ({ project, onEdit }) => (
	<div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6">
		<div className="flex justify-between items-start mb-6">
			<h3 className="text-lg font-semibold text-purple-800">Детальная информация по проекту</h3>
			<div className="flex gap-2">
				<button 
					className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors duration-200"
					onClick={(e) => {
						e.stopPropagation();
						onEdit(project);
					}}
				>
					<Edit size={16} />
					Редактировать
				</button>
				<button 
					className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors duration-200"
					onClick={(e) => e.stopPropagation()}
				>
					<Download size={16} />
					Экспорт в Excel
				</button>
			</div>
		</div>
		
		<ProjectDetails project={project} />
	</div>
);