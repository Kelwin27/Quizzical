import axios from '../API/index';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom'

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate()
    const token = localStorage.getItem('refreshToken')

    const refresh = async () => {
        if (!token) navigate('/')
        const response = await axios.get('/refresh', {headers: {"Authorization":`Bearer ${token}`}});
        const userData = await axios.get(`/users/${response.data.id}`, {headers: {"Authorization":`Bearer ${response.data.access_token}`}})
        setAuth(prev => {
            return { ...prev, 
                id: response.data.id, 
                accessToken: response.data.access_token,
                user: userData?.data?.username,
                score: userData?.data?.score,
                games: userData?.data?.games,
                role: userData?.data?.userrole,
                image: userData?.data?.image
            }
        });
        localStorage.setItem('refreshToken', response?.data.refresh_token)
        return response.data.access_token;
    }
    return refresh;
};

export default useRefreshToken;
