'use client'
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { IOu } from "@/interfaces/ous.interface";
import { appConfig } from "@/config/appConfig";

export const ModalFormOusFilter = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit } = useForm<IOu>();

  const deleteFilterOus = async () => {
    window.location.href = (`${appConfig.url}/dashboard/ous`);
  }

  const onFilterOus = async (FormData:IOu) => {
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

    window.location.href = (`${appConfig.url}/dashboard/ous?${params}`);
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
            <form onSubmit={ handleSubmit(onFilterOus) } noValidate>
              <ModalHeader className="flex flex-col gap-1">Agregar Filtros</ModalHeader>
              <ModalBody className={`grid grid-cols-1 sm:grid-cols-2 gap-4`}>
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
                  <label>Descripción</label>
                  <input
                  { ...register('description')}
                  id='description'
                  name='description'
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
                <form onSubmit={ handleSubmit(deleteFilterOus) }>
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