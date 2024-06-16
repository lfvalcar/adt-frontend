import { IUpdateGroup, IGroup } from "@/interfaces/groups.interface";
import axios from "axios";
import { apiConfig } from "@/config/apiConfig";

const dataGroups = {
    getAll: async (token: string) => {
        try{
          const response = await axios.get(`${apiConfig.url}/groups`, 
          { headers:{Authorization: `Bearer ${token}`}});
          
          return response.data
      }catch(err){
        return null;
      }
    },

    getFilter: async (token: string,filter: string) => {  
      try{
        const response = await axios.get(`${apiConfig.url}/groups?${filter}`, 
        { headers:{Authorization: `Bearer ${token}`}});
        
        return response.data
    }catch(err){
      return null;
    }
  },

    post: async (group: IGroup, token:string) => {
      try {
        const response = await axios.post(`${apiConfig.url}/groups`,
        group,
        { headers:{Authorization: `Bearer ${token}`}});
        return response.data
      }catch(err){
        if(axios.isAxiosError(err)){
          return err.response?.data
        }
      }
    },

    delete: async (selectedCns: any, token: string) => {
      try {
        const response = await axios.delete(`${apiConfig.url}/seed/groups`,
        { data: selectedCns, headers:{Authorization: `Bearer ${token}`}});
        return response.data
      }catch(err){
        if(axios.isAxiosError(err)){
          return err.response?.data
        }
      }
    },

    update: async (cn: string,body: IUpdateGroup,token: string) => {
      try {
        const response = await axios.patch(`${apiConfig.url}/groups/${cn}`,body,
        {headers:{Authorization: `Bearer ${token}`}})
        return response.data
      }catch(err){
        if(axios.isAxiosError(err)){
          return err.response?.data
        }
      }
    }
}

export default dataGroups