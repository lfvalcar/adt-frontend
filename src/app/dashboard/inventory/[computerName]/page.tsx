'use client'
import React, { useEffect, useState } from "react";
import InventoryView from "@/components/InventoryView";
import ColumInventory from "@/interfaces/inventory.interface";
import { getCookie } from "@/components/Cookies/Cookie";
import dataInventory from "@/data/dataInventory";
import { appConfig } from "@/config/appConfig";

export const InventoryComputerPage = ({params: {computerName}}: {params: {computerName:string}}) => {

    const [entry, setEntry] = useState<any>([]);

    const token = getCookie('token');
    if(token){
      useEffect(() => {
        const fetchEntry = async () => {
            const result = await dataInventory.FindOne(token,computerName);
                
            if(entry.statusCode === 500){
                window.location.href = (`${appConfig.url}/dashboard/inventory`);
            }else{
                setEntry(result);
            }
        };
    
        fetchEntry();
      }, [token]);
    }else{
      window.location.href = (`${appConfig.url}/login`);
    }

    return (
      <InventoryView fields={ColumInventory} entry={entry}/>
    );
}

export default InventoryComputerPage

