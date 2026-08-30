import axios from 'axios';

const axiosInstance = axios.create({
    // Use import.meta.env for Vite environment variables
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Automatically attach the authorization token to every request
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Automatically log out the user if the token is invalid or expired
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Redirect to the authentication page
            window.location.href = '/auth'; 
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;