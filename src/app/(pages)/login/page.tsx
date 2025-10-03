import React from 'react'
import { LoginForm } from './_Component/LoginForm/LoginForm'

export default function Login() {
  return <>
  
  <div className="min-h-[95vh] flex flex-col justify-center items-center gap-8">
      <h1 className="text-2xl font-bold text-[#A31D1D]">
         Welcome Back !
      </h1>
      <LoginForm/>
  </div>
  </>
}
