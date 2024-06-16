import axios from "axios";
import { apiConfig } from "@/config/apiConfig";

const dataInventory = {
    FindOne: async (token: string,computerName: string) => {
        try{
          const response = await axios.get(`${apiConfig.url}/inventory/${computerName}`, 
          { headers:{Authorization: `Bearer ${token}`}});
          return response.data
      }catch(err){
        return null;
      }
    }
}

export default dataInventory