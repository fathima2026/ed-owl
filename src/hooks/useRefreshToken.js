import useAuth from './useAuth';
import axios from "axios";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();
   
    const refresh = async () => {
        const response = await axios.post(
            'http://localhost:8000/api/token/refresh/',
            { refresh: localStorage.getItem('refreshToken') },  // Include the refresh token in the request body
            { withCredentials: true }
        );
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.access);
            console.log(response.data);

            let roles =[]
            roles[0]=localStorage.getItem('role')
            return { ...prev, 
                 roles : roles,
                 accessToken: response.data.access}
        });
        return response.data.access;
    }
    return refresh;
};

export default useRefreshToken;