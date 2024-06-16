import React, { useState } from "react";
import {Tabs, Tab, Button, Card, CardBody, Checkbox} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { getCookie } from "../Cookies/Cookie";
import dataOus from "@/data/dataOus";
import { appConfig } from "@/config/appConfig";

export default function ModalTabsOus(ou:any) {
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

  const onUpdateReplaceOu = async (FormData:any) => {
    let updateBody = FormData
    updateBody['action'] = 'replace'

    for(let key in updateBody){
      if(updateBody[key] === '' ){
        delete updateBody[key]
      }
    }

    const token = getCookie('token');
    if (token) {
      const result = await dataOus.update(ou['ou'].ou,updateBody,token);
      setData(result)
    } else {
      window.location.href = (`${appConfig.url}/login`);
    }
  }

  const onUpdateAddOu = async (FormData:any) => {
    let updateBody = FormData
    updateBody['action'] = 'add'

    for(let key in updateBody){
      if(updateBody[key] === '' ){
        delete updateBody[key]
      }
    }

    const token = getCookie('token');
    if (token) {
      const result = await dataOus.update(ou['ou'].ou,updateBody,token);
      setData(result)
    } else {
      window.location.href = (`${appConfig.url}/login`);
    }
};

const onUpdateDelOu = async (selectedValues:any) => {
  let updateBody:any = {action: "delete"}
  updateBody['fields'] = selectedValues

  const token = getCookie('token');
  if (token) {
    const result = await dataOus.update(ou['ou'].ou,updateBody,token);
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
              <form className="flex flex-col gap-4" onSubmit={ handleSubmit(onUpdateAddOu) } noValidate>
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
            <form className="flex flex-col gap-4 h-[500px]" onSubmit={ handleSubmit(onUpdateReplaceOu) } noValidate>
              <div className="overflow-y-auto">
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
                <Checkbox onChange={handleCheckboxChange} color="danger" lineThrough value={'description'}>Descripción</Checkbox>
                <Button color="danger" onClick={() => onUpdateDelOu(selectedValues)}>
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
