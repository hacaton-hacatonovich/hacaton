import { BriefcaseBusiness } from "lucide-react";

export const NoProjectsMessage: React.FC = () => (
  <div className="text-center py-12">
    <BriefcaseBusiness size={48} className="mx-auto text-purple-300 mb-4" />
    <h3 className="text-lg font-medium text-purple-600 mb-2">Проекты не найдены</h3>
    <p className="text-purple-500">Начните с добавления первого проекта</p>
  </div>
);