import { IUpdateOu, IOu } from "@/interfaces/ous.interface";
import axios from "axios";
import { apiConfig } from "@/config/apiConfig";

const dataOus = {
    getAll: async (token: string) => {
        try{
          const response = await axios.get(`${apiConfig.url}/ous`, 
          { headers:{Authorization: `Bearer ${token}`}});
          
          return response.data
      }catch(err){
        return null;
      }
    },

    getFilter: async (token: string,filter: string) => {  
      try{
        const response = await axios.get(`${apiConfig.url}/ous?${filter}`, 
        { headers:{Authorization: `Bearer ${token}`}});
        
        return response.data
    }catch(err){
      return null;
    }
  },

    post: async (ou: IOu, token:string) => {
      try {
        const response = await axios.post(`${apiConfig.url}/ous`,
        ou,
        { headers:{Authorization: `Bearer ${token}`}});
        return response.data
      }catch(err){
        if(axios.isAxiosError(err)){
          return err.response?.data
        }
      }
    },

    delete: async (selectedOus: any, token: string) => {
      try {
        const response = await axios.delete(`${apiConfig.url}/seed/ous`,
        { data: selectedOus, headers:{Authorization: `Bearer ${token}`}});
        return response.data
      }catch(err){
        if(axios.isAxiosError(err)){
          return err.response?.data
        }
      }
    },

    update: async (ou: string,body: IUpdateOu,token: string) => {
      try {
        const response = await axios.patch(`${apiConfig.url}/ous/${ou}`,body,
        {headers:{Authorization: `Bearer ${token}`}})
        return response.data
      }catch(err){
        if(axios.isAxiosError(err)){
          return err.response?.data
        }
      }
    }
}

export default dataOus