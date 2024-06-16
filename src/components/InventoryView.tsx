import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Button } from "@nextui-org/react";
import { FC } from "react";
import { IColumn } from "@/interfaces/common.interface";
import { appConfig } from "@/config/appConfig";
import { useForm } from "react-hook-form";
import { Iventory } from "@/interfaces/inventory.interface";

interface Props {
  fields: IColumn[]
  entry?: Iventory
}

const InventoryView:FC<Props> = ({fields,entry}) => {
  
  const { register, handleSubmit } = useForm();

  const onGetEntry = async (FormData:any) => {
    const computerName = FormData['search']
    window.location.href = (`${appConfig.url}/dashboard/inventory/${computerName}`);
    }
  
  return (
    <section>
        <Breadcrumb pageName="Inventory" />
        <div className="hidden sm:block p-4 mb-4">
            <div className="relative">
              <form onSubmit={ handleSubmit(onGetEntry) } noValidate>
                <Button className="absolute top-1/2 -translate-y-1/2" type="submit">
                  <svg
                    className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                      fill=""
                    />
                  </svg>
                </Button>
                <input
                  type="text"
                  placeholder="Type to search..."
                  className="border-2 border-gray-300 rounded-lg p-2 w-full bg-transparent pl-24 pr-4 font-medium focus:outline-none xl:w-125"
                  { ...register('search')}
                />
              </form>
            </div>
        </div>

        <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Características
                </h3>
              </div>
              {entry ? (
                <div className="p-7">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* INICIO CAMPO */}
                      
                        {fields.map((field) => (
                          <div>
                            <label
                            key={field.key}
                            className="m-2 mb-3 block text-sm font-medium text-black dark:text-white"
                            >
                              {field.label}
                            </label>
                            <div key={entry[field.key]}>
                              <p
                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              >
                                {entry[field.key]}
                              </p>
                            </div>
                          </div>
                        ))}
                      {/* FIN CAMPO */}
                    </div>
                </div>
              ) : (
                <div className='bg-yellow-100 border-yellow-400 text-yellow-700 text-center px-4 py-3 border rounded relative' role="alert">
                  <p>Nada que mostrar</p>
                </div>
              )}
              </div>
            </div>
      </section>
  );
};

export default InventoryView;
