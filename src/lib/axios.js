import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    timeout: 4000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

axiosInstance.interceptors.request.use(config => {
    const token = `Bearer ${localStorage.getItem('TOKEN')}`;
    config.headers.Authorization = token;
    return config;
});

axiosInstance.interceptors.response.use(
    response => response, 
    error => {
    throw error;
})

export default axiosInstance;