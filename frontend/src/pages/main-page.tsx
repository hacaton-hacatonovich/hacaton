import { BriefcaseBusiness, ChartNoAxesCombined, Settings, Users } from "lucide-react";
import React from "react";

export const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between relative z-30">
        <div className="text-purple-700 text-2xl font-bold">
          {/* Logo placeholder - replace with actual link */}
          <img src="./../../public/logo.png" alt="" className="w-52" />
        </div>

        <button className="bg-orange-500 text-white text-sm px-4 py-2 rounded-md font-medium hover:bg-orange-600 transition-colors duration-200">
          Выйти из аккаунта
        </button>
      </header>

      {/* Main container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav 
          className="bg-white shadow-lg w-60 group"
        >
          <div className="h-full flex flex-col justify-between items-center py-6">
            {/* Top section with icons */}
            <div className="space-y-4">
              {/* Sidebar item example */}
              <div className="relative gap-4 flex items-center cursor-pointer">
                <ChartNoAxesCombined width={20} color="#FF4F12" />
                <span className="pl-2">
                  Дэшборд
                </span>
              </div>
              <div className="relative gap-4 flex items-center cursor-pointer">
                <BriefcaseBusiness width={20} color="#FF4F12" />
                <span className="pl-2">
                  Проекты
                </span>
              </div>
              <div className="relative gap-4 flex items-center cursor-pointer">
                <Users width={20} color="#FF4F12" />
                <span className="pl-2">
                  Пользователи
                </span>
              </div>
            </div>
            
            {/* Bottom section with icons */}
            <div className="space-y-4">
              <div className="relative flex gap-4 items-center cursor-pointer">
                <Settings width={20} color="#7700FF" />
                <span className="pl-2">
                  Настройки
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* Content area */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-purple-700 text-6xl mb-4">👋</div>
              <h2 className="text-xl font-medium text-purple-800 mb-2">
                Добро пожаловать в панель быстрого доступа
              </h2>
              <p className="text-purple-600">
                Выберите пункт меню слева, чтобы начать работу
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
