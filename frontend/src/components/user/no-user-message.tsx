// components/user/no-users-message.tsx
import { Users } from "lucide-react";

export const NoUsersMessage: React.FC = () => (
  <div className="text-center py-12">
    <Users size={48} className="mx-auto text-purple-300 mb-4" />
    <h3 className="text-lg font-medium text-purple-600 mb-2">Пользователи не найдены</h3>
    <p className="text-purple-500">Начните с добавления первого пользователя</p>
  </div>
);