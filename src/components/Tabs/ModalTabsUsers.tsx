import React, { useState } from "react";
import {Tabs, Tab, Button, Card, CardBody, Checkbox} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { getCookie } from "../Cookies/Cookie";
import dataUsers from "@/data/dataUsers";
import { appConfig } from "@/config/appConfig";

export default function ModalTabsUsers(uid:any) {
  const [selectedValues, setSelectedValues] = useState<any>([]);
  const [data, setData] = useState<any>();
  const { register, handleSubmit } = useForm();
  const [selected, setSelected] = React.useState<React.Key>("replace");

  const handleCheckboxChange = (event:any) => {
    const { value, checked } = event.target;
    if (checked) {
      // Añadir el valor seleccionado al estado
      setSelectedValues([...selectedValues, value]);
    } else {
      // Remover el valor deseleccionado del estado
      setSelectedValues(selectedValues.filter((val:any) => val !== value));
    }
  };

  const onUpdateReplaceUser = async (FormData:any) => {
    let updateBody = FormData
    updateBody['action'] = 'replace'

    for(let key in updateBody){
      if(updateBody[key] === '' ){
        delete updateBody[key]
      }
    }

    const token = getCookie('token');
    if (token) {
      const result = await dataUsers.update(uid['uid'].uid,updateBody,token);
      setData(result)
    } else {
      window.location.href = (`${appConfig.url}/login`);
    }
  }

  const onUpdateAddUser = async (FormData:any) => {
    let updateBody = FormData
    updateBody['action'] = 'add'

    for(let key in updateBody){
      if(updateBody[key] === '' ){
        delete updateBody[key]
      }
    }

    const token = getCookie('token');
    if (token) {
      const result = await dataUsers.update(uid['uid'].uid,updateBody,token);
      setData(result)
    } else {
      window.location.href = (`${appConfig.url}/login`);
    }
};

const onUpdateDelUser = async (selectedValues:any) => {
  let updateBody:any = {action: "delete"}
  updateBody['fields'] = selectedValues

  const token = getCookie('token');
  if (token) {
    const result = await dataUsers.update(uid['uid'].uid,updateBody,token);
    setData(result)
  } else {
    window.location.href = (`${appConfig.url}/login`);
  }
};

  return (
      <Card fullWidth={true} className="max-w-full">
        <CardBody>
          <Tabs
            fullWidth={true}
            color="primary"
            onSelectionChange={setSelected}
          >
            <Tab key="add" title="Añadir campos">
              <form className="flex flex-col gap-4" onSubmit={ handleSubmit(onUpdateAddUser) } noValidate>
              <label>Número télefono trabajo</label>
                  <input
                  { ...register('telephoneNumber')}
                  id='telephoneNumber'
                  name='telephoneNumber'
                  type="text"
                  placeholder="XXXX"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <label>Descripción</label>
                  <input
                  { ...register('description')}
                  id='description'
                  name='description'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <Button color="success" type="submit">
                    Añadir campos
                  </Button>
              </form>
            </Tab>
            <Tab key="replace" title="Reemplazar">
            <form className="flex flex-col gap-4 h-[500px]" onSubmit={ handleSubmit(onUpdateReplaceUser) } noValidate>
              <div className="overflow-y-auto">
                  <label>Unidad Organizativa</label>
                  <input
                  { ...register('ou')}
                  id='ou'
                  name='ou'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <label>Nombre</label>
                  <input
                  { ...register('givenName')}
                  id='givenName'
                  name='givenName'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <label>Apellido/s</label>
                  <input
                  { ...register('sn')}
                  id='sn'
                  name='sn'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <label>Nombre Completo</label>
                  <input
                  { ...register('cn')}
                  id='cn'
                  name='cn'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <label>Contraseña</label>
                  <input
                  { ...register('userPassword')}
                  id='userPassword'
                  name='userPassword'
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <label>Correo eléctronico</label>
                  <input
                  { ...register('mail')}
                  id='mail'
                  name='mail'
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <label>Número teléfono móvil</label>
                  <input
                  { ...register('mobile')}
                  id='mobile'
                  name='mobile'
                  type="text"
                  placeholder="XXX XXX XXX"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <label>Provincia/Estado</label>
                  <input
                  { ...register('st')}
                  id='st'
                  name='st'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <label>Título/Cargo</label>
                  <input
                  { ...register('title')}
                  id='title'
                  name='title'
                  type="text"
                  placeholder="Alumno,Profesor..."
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <label>Localidad</label>
                  <input
                  { ...register('l')}
                  id='l'
                  name='l'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <label>Grupo Principal</label>
                  <input
                  { ...register('group')}
                  id='group'
                  name='group'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <label>Número télefono trabajo</label>
                  <input
                  { ...register('telephoneNumber')}
                  id='telephoneNumber'
                  name='telephoneNumber'
                  type="text"
                  placeholder="XXXX"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <label>Descripción</label>
                  <input
                  { ...register('description')}
                  id='description'
                  name='description'
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
              </div>
                  <Button size="lg" className="w-full" color="secondary" type="submit">
                    Actualizar campos
                  </Button>
              </form>
            </Tab>
            <Tab className="flex flex-col gap-4" key="delete" title="Eliminar campos">
                <Checkbox onChange={handleCheckboxChange} color="danger" lineThrough value={'telephoneNumber'}>Número télefono trabajo</Checkbox>
                <Checkbox onChange={handleCheckboxChange} color="danger" lineThrough value={'description'}>Descripción</Checkbox>
                <Button color="danger" onClick={() => onUpdateDelUser(selectedValues)}>
                    Eliminar campos
                </Button>
            </Tab>
          </Tabs>
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
        </CardBody>
      </Card>
  );
}
