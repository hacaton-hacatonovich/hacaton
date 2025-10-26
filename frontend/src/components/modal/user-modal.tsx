// @ts-nocheck
import { useForm } from "react-hook-form";
import type { User } from "../../@types/types";

interface UserFormData {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  phone: string;
  role: 'analyst' | 'user';
  password: string;
}

interface Props {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
}

export const UserModal: React.FC<Props> = ({ user, isOpen, onClose, onSave }) => {
  const isEdit = !!user;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserFormData>({
    defaultValues: user ? {
      first_name: user.firstName,
      last_name: user.lastName,
      patronymic: user.patronymic,
      email: user.email,
      phone_number: user.phone,
      role: user.role,
      password: ''
    } : {
      role: 'user'
    }
  });

  const onSubmit = (data: UserFormData) => {
    const userData: User = {
      id: user?.id || Date.now().toString(),
      first_name: data.firstName,
      last_name: data.lastName,
      patronymic: data.patronymic,
      email: data.email,
      phone_number: data.phone,
      role: data.role,
      ...(data.password && { password: data.password })
    };
    
    onSave(userData);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-purple-100">
          <h2 className="text-xl font-semibold text-purple-800">
            {isEdit ? 'Редактировать пользователя' : 'Добавить нового пользователя'}
          </h2>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Фамилия */}
              <div>
                <label className="block text-sm font-medium text-purple-600 mb-1">
                  Фамилия *
                </label>
                <input
                  type="text"
                  {...register("lastName", { required: "Фамилия обязательна" })}
                  className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>

              {/* Имя */}
              <div>
                <label className="block text-sm font-medium text-purple-600 mb-1">
                  Имя *
                </label>
                <input
                  type="text"
                  {...register("firstName", { required: "Имя обязательно" })}
                  className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>

              {/* Отчество */}
              <div>
                <label className="block text-sm font-medium text-purple-600 mb-1">
                  Отчество
                </label>
                <input
                  type="text"
                  {...register("patronymic")}
                  className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-purple-600 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  {...register("email", { 
                    required: "Email обязателен",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Некорректный email"
                    }
                  })}
                  className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Телефон */}
              <div>
                <label className="block text-sm font-medium text-purple-600 mb-1">
                  Телефон
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Роль */}
              <div>
                <label className="block text-sm font-medium text-purple-600 mb-1">
                  Роль *
                </label>
                <select
                  {...register("role", { required: "Роль обязательна" })}
                  className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="user">Пользователь</option>
                  <option value="analyst">Аналитик</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                )}
              </div>

              {/* Пароль */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-purple-600 mb-1">
                  {isEdit ? 'Новый пароль (оставьте пустым, если не меняется)' : 'Пароль *'}
                </label>
                <input
                  type="password"
                  {...register("password", { 
                    required: isEdit ? false : "Пароль обязателен",
                    minLength: {
                      value: 6,
                      message: "Пароль должен быть не менее 6 символов"
                    }
                  })}
                  className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Кнопки */}
            <div className="flex justify-end gap-3 pt-4 border-t border-purple-100">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-purple-600 border border-purple-300 rounded-md hover:bg-purple-50 transition-colors duration-200"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
              >
                {isEdit ? 'Сохранить' : 'Создать пользователя'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};