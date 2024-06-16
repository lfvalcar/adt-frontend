'use client'
import React, { useEffect, useState } from "react";
import ColumOu from "@/interfaces/ous.interface";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getCookie } from "@/components/Cookies/Cookie";
import dataOus from "@/data/dataOus";
import { useSearchParams } from 'next/navigation'
import EmptyTable from "@/components/Tables/EmptyTable";
import OusTable from "@/components/Tables/OusTable";
import { appConfig } from "@/config/appConfig";

export const OusPage = () => {
  const params = useSearchParams()

  let filter = ''
  params.forEach((value, key) => {
    if(filter === ''){
      filter = `${key}=${value}`
    }else if(value){
      filter = filter + `&${key}=${value}`
    }
  });

  const [ous, setOus] = useState([]);
  const token = getCookie('token');

  if(token){
    useEffect(() => {
      const fetchOus = async () => {
        if(filter === ''){
          const result = await dataOus.getAll(token);
          setOus(result);
        }else{
          const result = await dataOus.getFilter(token,filter);
          setOus(result);
        }
      };
  
      fetchOus();
    }, [token]);
  }else{
    window.location.href = (`${appConfig.url}/login`);
  }

  if(typeof(ous) === 'string' || ous === null){
    return (
      <section>
        <Breadcrumb pageName="Ous" />
        {ous === null && (
          <div className='bg-yellow-100 border-yellow-400 text-yellow-700 text-center px-4 py-3 border rounded relative' role="alert">
            <p>El Servidor no responde</p>
          </div>
        )}
        {typeof(ous) === 'string' && (
          <EmptyTable/>
        )}
      </section>
    );
  }else{
    return (
      <section>
        <Breadcrumb pageName="Ous" />
        <OusTable rows={ous} columns={ColumOu}/>
      </section>
    );
  }
}

export default OusPage

