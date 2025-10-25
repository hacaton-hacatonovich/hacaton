import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useConfirmEmailStore from "../store/confirmEmailStore";
import { useUserStore } from "../store/userStore";

interface Props {
  className?: string;
}

type FormData = {
  verificationCode: string;
};

export const ConfirmRegistration: React.FC<Props> = ({ className }) => {

  useEffect(() => {
      if (useUserStore.getState().userCookie) {
        navigate('/')
      } else{
        const func = async() => {
          const response = await fetch(
        'http://hackaton.com' + "/check-code", 
        {
          method: 'POST',
          credentials: 'include' as RequestCredentials,
					headers: {
							'Content-Type': 'application/json'
					},
        }
        );
        const data = await response.json();
        console.log(data)
        }
        func()
    }
  }, [])

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
	const { email, clearEmail } = useConfirmEmailStore();
  const { register, handleSubmit } = useForm<FormData>({});

  const onSubmit = async (formData: FormData) => {
    try {
      setLoading(true);
      const formInfo = {
						method: 'POST',
            credentials: 'include' as RequestCredentials,
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							code: formData.verificationCode,
						})
			}
      const response = await fetch(
        'http://hackaton.com' + "/check-code-process", formInfo
      );
      const data = await response.json();
      if (data.success) {
        navigate("/")
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
