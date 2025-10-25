import type React from "react"
import { ToastContainer } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RegisterForm } from './pages/login-page';
import { MainPage } from "./pages/main-page";
import { ConfirmRegistration } from "./pages/confirm-registration";

export const App: React.FC = () => {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<RegisterForm />} />
          <Route path='/confirm-registration' element={<ConfirmRegistration />} />
          <Route path='/' element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
} 