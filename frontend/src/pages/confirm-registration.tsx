// @ts-nocheck
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useConfirmEmailStore from "../store/confirmEmailStore";

interface Props {
  className?: string;
}

type FormData = {
  verificationCode: string;
};

export const ConfirmRegistration: React.FC<Props> = ({ className }) => {
    const [rightCode, setRightCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false); // Флаг для однократного выполнения
    const navigate = useNavigate();
    const { email, clearEmail } = useConfirmEmailStore();
    const { register, handleSubmit } = useForm<FormData>({});

    useEffect(() => {
        const checkCode = async () => {
            // Проверяем, не выполнялся ли уже запрос
            if (hasFetched) return;

            try {
                const response = await fetch('/backend/check-code', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: localStorage.getItem('user'),
                    })
                });
                const data = await response.json();
                setRightCode(data);
                setHasFetched(true); // Устанавливаем флаг, что запрос выполнен
                console.log(data + " rightcode");
            } catch (error) {
                console.error('Ошибка сети:', error);
            }
        };

        checkCode();
    }, [hasFetched]); // Добавляем hasFetched в зависимости

    const onSubmit = async (formData: FormData) => {
        try {
            setLoading(true);
            console.log("Right code in submit:", rightCode); // Теперь rightCode сохраняется

            const formInfo = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('user'),
                    code: formData.verificationCode,
                    right_code: rightCode,
                })
            };

            const response = await fetch('/backend/check-code-process', formInfo);
            console.log(response);
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                navigate("/");
                clearEmail();
            } else {
                toast.error('Error');
            }
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className={`min-h-screen flex justify-center items-center ${className}`}>
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-purple-700 mb-8">Подтверждение регистрации</h1>
        
        <p className="text-gray-600 mb-6">
          Письмо с кодом подтверждения отправлено на адрес:
          <br />
          <span className="font-medium text-purple-700">{email}</span>
        </p>

          <div className={`
            px-4 py-3 rounded-md text-center
          `}>
          </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <input 
            type="text" 
            {...register('verificationCode', { required: true, minLength: 6 })}
            placeholder="Код из письма"
            className="px-4 py-3 rounded-md border border-purple-300 shadow-sm focus:ring-2 focus:ring-purple-500 outline-none transition-colors duration-200"
          />
          
          <button 
            type="submit" 
            disabled={loading}
            className="bg-orange-500 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-600 transition-colors duration-200 shadow-md"
          >
            {loading ? 'Проверка...' : 'Подтвердить'}
          </button>
        </form>
      </div>
    </div>
  );
};
