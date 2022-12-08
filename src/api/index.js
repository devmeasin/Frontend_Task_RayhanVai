
import axios from 'axios';
import { parseCookies } from 'nookies';

import { API_ENDPOINT } from 'config';

const baseUrl = API_ENDPOINT || 'http://104.251.211.125:8055';

const cookies = parseCookies();

const config = {
    headers: {
        // 'Authorization': cookies?.user_jwt
    }
};

export const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const login = (data) => api.post('/auth/login', data);
// export const signup = (data) => api.post('/api/auth/local/register', data);
// export const whoIam = () => api.get('/api/users/me',config);
// export const getProduct = () => api.get('/api/products?populate=*',config);