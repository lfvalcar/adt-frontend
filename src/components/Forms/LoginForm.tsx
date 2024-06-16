'use client'
import apiAuth from "@/data/apiAuth";
import { ILogin } from "@/interfaces/login.interface";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { cookieExpiration, setCookie } from "../Cookies/Cookie";

export default function LoginForm() {
  const router = useRouter()
  const [error, setMessage] = useState('');
  const { register, handleSubmit } = useForm<ILogin>()
  
  const onLoginUser = async ({username, password}: ILogin ) => {
      try{
        const login = { username, password }

        if(login.username.trim()==='' && login.password.trim()===''){
            throw new Error('Rellene todos los campos')
        }
        const data  = await apiAuth.login(login);
        const { token, fullname, rol } = data;

        let dateExpiration = cookieExpiration(60) // Minutos
        setCookie('token', token, { expires: dateExpiration });
        setCookie('fullname', fullname, { expires: dateExpiration });
        setCookie('rol', rol, { expires: dateExpiration });

        router.replace('/dashboard');
      } catch (error:any){
        if (error.response) {
          // El servidor respondió con un código de estado diferente de 2xx
          setMessage(error.response.data.message); // Configura el mensaje de error recibido del servidor
        } else if (error.request) {
          // La solicitud se hizo pero no se recibió una respuesta
          setMessage('No se recibió una respuesta del servidor');
        }else if (error){
          setMessage(error.message);
        } else {
          // Hubo un error antes de enviar la solicitud
          setMessage('Error al enviar la solicitud');
        }
      }
        
    } 
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Inicia sesión en formateya.es
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={ handleSubmit(onLoginUser) } noValidate>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    { ...register('username')}
                    id="username"
                    name="username"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    { ...register('password')}
                    id="password"
                    name="password"
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
        {error && (
            <div className='bg-red-100 border-red-400 text-red-700 text-center px-4 py-3 border rounded relative' role="alert">
              <p>{error}</p>
            </div>
          )}
      </>
    )
  }
  