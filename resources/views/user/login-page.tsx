import axios from "axios";
import type React from "react"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
interface Props {
	className?: string;
}
type formDataType = {
	emailfield: string,
	firstnamefield?: string,
	lastnamefield?: string,
	patronymicfield?: string,
	passwordfield: string,
	confirmfield?: string
}

export const RegisterForm: React.FC<Props> = ({className}) => {

	const [formType, setFormType] = useState<"Sign" | "Log">("Log")

	const navigate = useNavigate()

	const handleChangeType = () => {
		setFormType(prev => {
			if (prev == "Log"){
				return "Sign"
			} else {
				return "Log"
			}
		})
	}

	const {register, handleSubmit} = useForm<formDataType>({})
	// const onSubmit = async(formData:formDataType) => {
	// 	try {
	// 		if (formType == 'Sign'){
	// 			if (formData.confirmfield == formData.passwordfield){
	// 				// const formInfo = {
	// 				// 	email: formData.emailfield,
	// 				// 	name: formData.namefield,
	// 				// 	password: formData.passwordfield
	// 				// }
	// 				const {data} = await axios.post('http://localhost:3000' + '/api/user/register', formInfo)

	// 				if(data.success){
	// 					localStorage.setItem('token', data.token)
	// 					toast.success(data.message);
	// 					navigate('/dashboard')
	// 				} else {
	// 					toast.error(data.message)
	// 				}
	// 			} else{
	// 				toast.error("Confirm password!")
	// 			}
	// 		}
	// 		else {
	// 			const formInfo = {
	// 					email: formData.emailfield,
	// 					password: formData.passwordfield
	// 				}
	// 			const {data} = await axios.post('http://localhost:3000' + '/api/user/login', formInfo)

	// 			if(data.success){
	// 				localStorage.setItem('token', data.token)
	// 				toast.success(data.message);
	// 				navigate('/dashboard')
	// 			} else {
	// 					toast.error(data.message)
	// 			}
	// 		}
	// 	} catch(error){
	// 		toast.error((error as Error).message)
	// 	}
	// }

	return (
		<div className={`min-h-screen flex justify-center items-center ${className}`}>
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-purple-700 mb-8">Вход в систему</h1>
        {formType === "Sign" 
          ? (
            <form className="flex flex-col gap-5" onSubmit={handleSubmit((data) => console.log(data))}>
              <input 
                type="email" 
                {...register('emailfield')} 
                placeholder="Электронная почта" 
                className="px-4 py-3 rounded-md border border-purple-300 shadow-sm focus:ring-2 focus:ring-purple-500 outline-none transition-colors duration-200" 
              />
              <input 
                type="text" 
                {...register('firstnamefield')} 
                placeholder="Имя" 
                className="px-4 py-3 rounded-md border border-purple-300 shadow-sm focus:ring-2 focus:ring-purple-500 outline-none transition-colors duration-200" 
              />
              <input 
                type="text" 
                {...register('lastnamefield')} 
                placeholder="Фамилия" 
                className="px-4 py-3 rounded-md border border-purple-300 shadow-sm focus:ring-2 focus:ring-purple-500 outline-none transition-colors duration-200" 
              />
              <input 
                type="text" 
                {...register('patronymicfield')} 
                placeholder="Отчество" 
                className="px-4 py-3 rounded-md border border-purple-300 shadow-sm focus:ring-2 focus:ring-purple-500 outline-none transition-colors duration-200" 
              />
              <input 
                type="password" 
                {...register('passwordfield')} 
                placeholder="Пароль" 
                className="px-4 py-3 rounded-md border border-purple-300 shadow-sm focus:ring-2 focus:ring-purple-500 outline-none transition-colors duration-200" 
              />
              <input 
                type="password" 
                {...register('confirmfield')} 
                placeholder="Подтверждение пароля" 
                className="px-4 py-3 rounded-md border border-purple-300 shadow-sm focus:ring-2 focus:ring-purple-500 outline-none transition-colors duration-200" 
              />
              <button 
                type="submit" 
                className="bg-orange-500 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-600 transition-colors duration-200 shadow-md"
              >
                Зарегистрироваться
              </button>
            </form>
          ) 
          : (
            <form className="flex flex-col gap-5" onSubmit={handleSubmit((data) => console.log(data))}>
              <input 
                type="email" 
                {...register('emailfield')} 
                placeholder="Почта" 
                className="px-4 py-3 rounded-md border border-purple-300 shadow-sm focus:ring-2 focus:ring-purple-500 outline-none transition-colors duration-200" 
              />
              <input 
                type="password" 
                {...register('passwordfield')} 
                placeholder="Пароль" 
                className="px-4 py-3 rounded-md border border-purple-300 shadow-sm focus:ring-2 focus:ring-purple-500 outline-none transition-colors duration-200" 
              />
              <button 
                type="submit" 
                className="bg-orange-500 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-800 transition-colors duration-200 shadow-md"
              >
                Войти
              </button>
            </form>
          )}
        <button 
          onClick={handleChangeType} 
          className="text-purple-700 hover:text-purple-900 font-medium mt-4 self-center transition-colors duration-200"
        >
          {formType === "Sign" ? "У меня уже есть аккаунт" : "У меня нет аккаунта"}
        </button>
      </div>
    </div>
	)
}