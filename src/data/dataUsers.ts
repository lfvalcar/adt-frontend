import { IUpdateUser, IUser } from "@/interfaces/users.interface";
import axios from "axios";
import { apiConfig } from "@/config/apiConfig";

const dataUsers = {
    getAll: async (token: string) => {
        try{
          const response = await axios.get(`${apiConfig.url}/users`, 
          { headers:{Authorization: `Bearer ${token}`}});
          
          return response.data
      }catch(err){
        return null;
      }
    },

    getFilter: async (token: string,filter: string) => {  
      try{
        const response = await axios.get(`${apiConfig.url}/users?${filter}`, 
        { headers:{Authorization: `Bearer ${token}`}});
        
        return response.data
    }catch(err){
      return null;
    }
  },

    post: async (user: IUser, token:string) => {
      try {
        const response = await axios.post(`${apiConfig.url}/users`,
        user,
        { headers:{Authorization: `Bearer ${token}`}});
        return response.data
      }catch(err){
        if(axios.isAxiosError(err)){
          return err.response?.data
        }
      }
    },

    delete: async (selectedUids: any, token: string) => {
      try {
        const response = await axios.delete(`${apiConfig.url}/seed/users`,
        { data: selectedUids, headers:{Authorization: `Bearer ${token}`}});
        return response.data
      }catch(err){
        if(axios.isAxiosError(err)){
          return err.response?.data
        }
      }
    },

    update: async (uid: string,body: IUpdateUser,token: string) => {
      try {
        const response = await axios.patch(`${apiConfig.url}/users/${uid}`,body,
        {headers:{Authorization: `Bearer ${token}`}})
        return response.data
      }catch(err){
        if(axios.isAxiosError(err)){
          return err.response?.data
        }
      }
    }
}

export default dataUsers