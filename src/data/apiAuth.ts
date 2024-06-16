import { ILogin, IRespLogin } from '@/interfaces/login.interface';
import axios from 'axios';
import { apiConfig } from '@/config/apiConfig';

const apiAuth = {

    login: async (login:ILogin): Promise<IRespLogin> => {
        const {data} = await axios.post(`${apiConfig.url}/auth/login`, login) 
        return data
    }
}

export default apiAuth;