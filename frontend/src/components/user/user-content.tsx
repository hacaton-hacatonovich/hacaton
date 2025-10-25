// components/user/users-content.tsx
import { Plus } from "lucide-react";
import type { User } from "../../@types/types";
import { UsersTable } from "./users-table";
import { NoUsersMessage } from "./no-user-message";

type Props = {
  users: User[];
  onAddUser: () => void;
  onDeleteUser: (id: string) => void;
}

export const UsersContent: React.FC<Props> = ({ users, onAddUser, onDeleteUser }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-purple-800">Пользователи</h1>
      <button 
        onClick={onAddUser} 
        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200"
      >
        <Plus size={16} />
        Добавить пользователя
      </button>
    </div>

    <div className="bg-white rounded-lg shadow-sm border border-purple-100 overflow-hidden">
      <UsersTable users={users} onDeleteUser={onDeleteUser} />
    </div>

    {users.length === 0 && <NoUsersMessage />}
  </div>
);