'use client'
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import dataGroups from "@/data/dataGroups";
import { getCookie } from "../../Cookies/Cookie";
import { yupResolver } from '@hookform/resolvers/yup';
import createGroupSchema from "@/lib/group.yup";
import { appConfig } from "@/config/appConfig";

export const ModalFormGroupsPost = () => {
  const [data, setData] = useState<any>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(createGroupSchema),});
  
  const onInsertGroup = async (FormData: any) => {
    const registro = FormData;
    for(let key in registro){
      if(registro[key] === '' ){
        delete registro[key]
      }
    }

    const token = getCookie('token');
    if (token) {
      const result = await dataGroups.post(registro, token);
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
            <form onSubmit={ handleSubmit(onInsertGroup) } noValidate>
              <ModalHeader className="flex flex-col gap-1">Nueva inserción</ModalHeader>
              <ModalBody className={`grid grid-cols-1 sm:grid-cols-2 gap-4`}>
              <div className="col-span-1">
                  <label>Nombre*</label>
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
                  <label>Miembros</label>
                  <input
                  { ...register('memberUid')}
                  id='memberUid'
                  name='memberUid'
                  type="text"
                  placeholder="miembro,miembro..."
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.memberUid && <p>{errors.memberUid.message}</p>}
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