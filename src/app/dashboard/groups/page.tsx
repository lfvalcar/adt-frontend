'use client'
import React, { useEffect, useState } from "react";
import ColumGroup from "@/interfaces/groups.interface";
import GroupsTable from "@/components/Tables/GroupsTable";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getCookie } from "@/components/Cookies/Cookie";
import dataGroups from "@/data/dataGroups";
import { useSearchParams } from 'next/navigation'
import EmptyTable from "@/components/Tables/EmptyTable";
import { appConfig } from "@/config/appConfig";

export const GroupsPage = () => {
  const params = useSearchParams()

  let filter = ''
  params.forEach((value, key) => {
    if(filter === ''){
      filter = `${key}=${value}`
    }else if(value){
      filter = filter + `&${key}=${value}`
    }
  });

  const [groups, setGroups] = useState([]);
  const token = getCookie('token');

  useEffect(() => {
    if(token){
      const fetchGroups = async () => {
      if(filter === ''){
        const result = await dataGroups.getAll(token);
        setGroups(result);
      }else{
        const result = await dataGroups.getFilter(token,filter);
        setGroups(result);
      }
      };

      fetchGroups();
    }else{
      window.location.href = (`${appConfig.url}/login`);
    }}, [token]);

  if(typeof(groups) === 'string' || groups === null){
    return (
      <section>
        <Breadcrumb pageName="Users" />
        {groups === null && (
          <div className='bg-yellow-100 border-yellow-400 text-yellow-700 text-center px-4 py-3 border rounded relative' role="alert">
            <p>El Servidor no responde</p>
          </div>
        )}
        {typeof(groups) === 'string' && (
          <EmptyTable/>
        )}
      </section>
    );
  }else{
    return (
      <section>
        <Breadcrumb pageName="Groups" />
        <GroupsTable rows={groups} columns={ColumGroup}/>
      </section>
    );
  }
}

export default GroupsPage

