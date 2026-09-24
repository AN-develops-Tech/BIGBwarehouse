import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercept requests to add token if exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Intercept response to handle 401 token refresh (Simple JWT)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken) {
                try {
                    const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'}/auth/refresh/`, {
                        refresh: refreshToken,
                    });
                    localStorage.setItem('access_token', res.data.access);
                    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
                    originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
                    return api(originalRequest);
                } catch (err) {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    delete api.defaults.headers.common['Authorization'];
                    if (originalRequest.headers) {
                        delete originalRequest.headers.Authorization;
                    }
                    // For GET requests, retry unauthenticated
                    if (originalRequest.method?.toLowerCase() === 'get') {
                        return api(originalRequest);
                    }
                }
            } else {
                localStorage.removeItem('access_token');
                delete api.defaults.headers.common['Authorization'];
                if (originalRequest.headers) {
                    delete originalRequest.headers.Authorization;
                }
                // For GET requests, retry unauthenticated
                if (originalRequest.method?.toLowerCase() === 'get') {
                    return api(originalRequest);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;

