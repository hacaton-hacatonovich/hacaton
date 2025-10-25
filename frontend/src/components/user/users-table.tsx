// components/user/users-table.tsx
import { Trash2 } from "lucide-react";
import type { User } from "../../@types/types";

type Props = {
  users: User[];
  onDeleteUser: (id: string) => void;
}

export const UsersTable: React.FC<Props> = ({ users, onDeleteUser }) => (
  <table className="w-full">
    <thead className="bg-purple-50">
      <tr>
        {['ФИО', 'Email', 'Телефон', 'Роль', 'Действия'].map(header => (
          <th key={header} className="py-3 px-4 text-left text-purple-700 font-semibold">
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <UserRow key={user.id} user={user} onDelete={onDeleteUser} />
      ))}
    </tbody>
  </table>
);

const UserRow: React.FC<{ user: User; onDelete: (id: string) => void }> = ({ user, onDelete }) => {
  const fullName = `${user.lastName} ${user.firstName} ${user.patronymic}`.trim();
  const roleText = user.role === 'analyst' ? 'Аналитик' : 'Пользователь';

  return (
    <tr className="border-b border-purple-100 hover:bg-purple-50 transition-colors duration-200">
      <td className="py-3 px-4">{fullName}</td>
      <td className="py-3 px-4">{user.email}</td>
      <td className="py-3 px-4">{user.phone}</td>
      <td className="py-3 px-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          user.role === 'analyst' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {roleText}
        </span>
      </td>
      <td className="py-3 px-4">
        <button
          onClick={() => onDelete(user.id)}
          className="flex items-center gap-1 text-red-600 hover:text-red-800 transition-colors duration-200 p-1 rounded hover:bg-red-50"
          title="Удалить пользователя"
        >
          <Trash2 size={16} />
          <span className="text-sm">Удалить</span>
        </button>
      </td>
    </tr>
  );
};