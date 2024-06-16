'use client'
import React, { useEffect, useState } from "react";
import ColumUser from "@/interfaces/users.interface";
import UsersTable from "@/components/Tables/UsersTable";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getCookie } from "@/components/Cookies/Cookie";
import dataUsers from "@/data/dataUsers";
import { useSearchParams } from 'next/navigation'
import EmptyTable from "@/components/Tables/EmptyTable";
import { appConfig } from "@/config/appConfig";

export const UsersPage = () => {
  const params = useSearchParams()

  let filter = ''
  params.forEach((value, key) => {
    if(filter === ''){
      filter = `${key}=${value}`
    }else if(value){
      filter = filter + `&${key}=${value}`
    }
  });

  const [users, setUsers] = useState([]);
  
  const token = getCookie('token');
  if(token){
    useEffect(() => {
      const fetchUsers = async () => {
        if(filter === ''){
          const result = await dataUsers.getAll(token);
          setUsers(result);
        }else{
          const result = await dataUsers.getFilter(token,filter);
          setUsers(result);
        }
      };
  
      fetchUsers();
    }, [token]);
  }else{
    window.location.href = (`${appConfig.url}/login`);
  }

  if(typeof(users) === 'string' || users === null){
    return (
      <section>
        <Breadcrumb pageName="Users" />
        {users === null && (
          <div className='bg-yellow-100 border-yellow-400 text-yellow-700 text-center px-4 py-3 border rounded relative' role="alert">
            <p>El Servidor no responde</p>
          </div>
        )}
        {typeof(users) === 'string' && (
          <EmptyTable/>
        )}
      </section>
    );
  }else{
    return (
      <section>
        <Breadcrumb pageName="Users" />
        <UsersTable rows={users} columns={ColumUser} />
      </section>
    );
  }
}

export default UsersPage

