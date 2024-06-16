'use client'
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import dataUsers from "@/data/dataUsers";
import { getCookie } from "../../Cookies/Cookie";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from "@/lib/user.yup";
import { appConfig } from "@/config/appConfig";

export const ModalFormUsersPost = () => {
  const [data, setData] = useState<any>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema),});
  
  const onInsertUser = async (FormData: any) => {
    const registro = FormData;
    for(let key in registro){
      if(registro[key] === '' ){
        delete registro[key]
      }
    }

    const token = getCookie('token');
    if (token) {
      const result = await dataUsers.post(registro, token);
      if(result === undefined){
        setData(null)
      }else{
        setData(result);
      }
    } else {
      window.location.href = (`${appConfig.url}/login`);
    }
};

  return (
    <>
      <Button onPress={onOpen} color="primary">Nueva Entrada</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center" 
      >
        <ModalContent
        >
          {(onClose) => (
            <form onSubmit={ handleSubmit(onInsertUser) } noValidate>
              <ModalHeader className="flex flex-col gap-1">Nueva inserción</ModalHeader>
              <ModalBody className={`grid grid-cols-1 sm:grid-cols-2 gap-4`}>
              <div className="col-span-1">
                  <label>Nombre Usuario*</label>
                  <input
                  { ...register('uid')}
                  id='uid'
                  name='uid'
                  type="text"
                  placeholder='username'
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.uid && <p>{errors.uid.message}</p>}
                  </div>
                  <div className="col-span-1">
                  <label>Unidad Organizativa*</label>
                  <input
                  { ...register('ou')}
                  id='ou'
                  name='ou'
                  type="text"
                  defaultValue='common'
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.ou && <p>{errors.ou.message}</p>}
                  </div>
                  <div className="col-span-1">
                  <label>Nombre*</label>
                  <input
                  { ...register('givenName')}
                  id='givenName'
                  name='givenName'
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.givenName && <p>{errors.givenName.message}</p>}
                  </div>
                  <div className="col-span-1">
                  <label>Apellido/s*</label>
                  <input
                  { ...register('sn')}
                  id='sn'
                  name='sn'
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.sn && <p>{errors.sn.message}</p>}
                  </div>
                  <div className="col-span-1">
                  <label>Nombre Completo*</label>
                  <input
                  { ...register('cn')}
                  id='cn'
                  name='cn'
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.cn && <p>{errors.cn.message}</p>}
                  </div>
                  <div className="col-span-1">
                  <label>Contraseña*</label>
                  <input
                  { ...register('userPassword')}
                  id='userPassword'
                  name='userPassword'
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.userPassword && <p>{errors.userPassword.message}</p>}
                  </div>
                  <div className="col-span-1">
                  <label>Correo eléctronico*</label>
                  <input
                  { ...register('mail')}
                  id='mail'
                  name='mail'
                  type="email"
                  defaultValue={'alguien@formateya.es'}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.mail && <p>{errors.mail.message}</p>}
                  </div>
                  <div className="col-span-1">
                  <label>Número teléfono móvil*</label>
                  <input
                  { ...register('mobile')}
                  id='mobile'
                  name='mobile'
                  type="text"
                  placeholder="XXX XXX XXX"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.mobile && <p>{errors.mobile.message}</p>}
                  </div>
                  <div className="col-span-1">
                  <label>Provincia/Estado*</label>
                  <input
                  { ...register('st')}
                  id='st'
                  name='st'
                  type="text"
                  defaultValue={'Almería'}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.st && <p>{errors.st.message}</p>}
                  </div>
                  <div className="col-span-1">
                  <label>Título/Cargo*</label>
                  <input
                  { ...register('title')}
                  id='title'
                  name='title'
                  type="text"
                  placeholder="Alumno,Profesor..."
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.title && <p>{errors.title.message}</p>}
                  </div>
                  <div className="col-span-1">
                  <label>Localidad*</label>
                  <input
                  { ...register('l')}
                  id='l'
                  name='l'
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.l && <p>{errors.l.message}</p>}
                  </div>
                  <div className="col-span-1">
                  <label>Grupo Principal*</label>
                  <input
                  { ...register('group')}
                  id='group'
                  name='group'
                  type="text"
                  defaultValue={'usuarios'}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.group && <p>{errors.group.message}</p>}
                  </div>
                  <div className="col-span-1">
                  <label>Número télefono trabajo</label>
                  <input
                  { ...register('telephoneNumber')}
                  id='telephoneNumber'
                  name='telephoneNumber'
                  type="text"
                  placeholder="XXXX"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.telephoneNumber && <p>{errors.telephoneNumber.message}</p>}
                  </div>
                  <div className="col-span-1">
                  <label>Descripción</label>
                  <input
                  { ...register('description')}
                  id='description'
                  name='description'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.description && <p>{errors.description.message}</p>}
                  </div>
                  
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" type="submit">
                  Insertar
                </Button>
              </ModalFooter>
              {data && data.status === 200 && (
                  <div className='bg-green-100 border-green-400 text-green-700 text-center px-4 py-3 border rounded relative' role="alert">
                    <p>{data.msg}</p>
                  </div>
              )}
              {data && data.statusCode >= 400 && (
                  <div className='bg-yellow-100 border-yellow-400 text-yellow-700 text-center px-4 py-3 border rounded relative' role="alert">
                    <p>{data.message}</p>
                  </div>
              )}
              {data === null && (
                  <div className='bg-yellow-100 border-yellow-400 text-yellow-700 text-center px-4 py-3 border rounded relative' role="alert">
                    <p>El servidor no responde</p>
                  </div>
              )}
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}