'use client'
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { IUser } from "@/interfaces/users.interface";
import { appConfig } from "@/config/appConfig";

export const ModalFormUsersFilter = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit } = useForm<IUser>();

  const deleteFilterUsers = async () => {
    window.location.href = (`${appConfig.url}/dashboard/users`);
  }

  const onFilterUsers = async (FormData:IUser) => {
    const filter = FormData;
    for(let key in filter){
      if(filter[key] === '' ){
        delete filter[key]
      }
    }

    let params = null
    for(let key in filter){
      if(params === null){
        params = `${key}=${filter[key]}`
      }else{
        params = params + `&${key}=${filter[key]}`
      }
    }

    window.location.href = (`${appConfig.url}/dashboard/users?${params}`);
};

  return (
    <>
      <Button onPress={onOpen} color="success">Nuevo Filtro</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center" 
      >
        <ModalContent
        >
          {(onClose) => (
            <form onSubmit={ handleSubmit(onFilterUsers) } noValidate>
              <ModalHeader className="flex flex-col gap-1">Agregar Filtros</ModalHeader>
              <ModalBody className={`grid grid-cols-1 sm:grid-cols-2 gap-4`}>
              <div className="col-span-1">
                  <label>Nombre Usuario</label>
                  <input
                  { ...register('uid')}
                  id='uid'
                  name='uid'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
                  <div className="col-span-1">
                  <label>Unidad Organizativa</label>
                  <input
                  { ...register('ou')}
                  id='ou'
                  name='ou'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
                  <div className="col-span-1">
                  <label>Nombre</label>
                  <input
                  { ...register('givenName')}
                  id='givenName'
                  name='givenName'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
                  <div className="col-span-1">
                  <label>Apellido/s</label>
                  <input
                  { ...register('sn')}
                  id='sn'
                  name='sn'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
                  <div className="col-span-1">
                  <label>Nombre Completo</label>
                  <input
                  { ...register('cn')}
                  id='cn'
                  name='cn'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
                  <div className="col-span-1">
                  <label>Correo eléctronico</label>
                  <input
                  { ...register('mail')}
                  id='mail'
                  name='mail'
                  type="mail"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
                  <div className="col-span-1">
                  <label>Número teléfono móvil*</label>
                  <input
                  { ...register('mobile')}
                  id='mobile'
                  name='mobile'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
                  <div className="col-span-1">
                  <label>Provincia/Estado</label>
                  <input
                  { ...register('st')}
                  id='st'
                  name='st'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
                  <div className="col-span-1">
                  <label>Título/Cargo</label>
                  <input
                  { ...register('title')}
                  id='title'
                  name='title'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
                  <div className="col-span-1">
                  <label>Localidad</label>
                  <input
                  { ...register('l')}
                  id='l'
                  name='l'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
                  <div className="col-span-1">
                  <label>Grupo</label>
                  <input
                  { ...register('group')}
                  id='group'
                  name='group'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
                  <div className="col-span-1">
                  <label>Número télefono trabajo</label>
                  <input
                  { ...register('telephoneNumber')}
                  id='telephoneNumber'
                  name='telephoneNumber'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
                  
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="success" type="submit" onPress={onClose}>
                  Filtrar
                </Button>
                <form onSubmit={ handleSubmit(deleteFilterUsers) }>
                  <Button color="danger" type="submit" onPress={onClose}>
                    Borrar Filtro
                  </Button>
                </form>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}