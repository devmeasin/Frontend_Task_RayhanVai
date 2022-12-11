
import axios from 'axios';

import { API_ENDPOINT } from 'config';
import { ILoginData, IRefreshTokenData } from './type';

const baseUrl = API_ENDPOINT || 'http://104.251.211.125:8055';

// const cookies = parseCookies();

// const config = {
//     headers: {
//         // 'Authorization': cookies?.user_jwt
//     }
// };

export const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const login = (data : ILoginData) => api.post('/auth/login', data);
export const refreshToken = (data : IRefreshTokenData) => api.post('/auth/refresh', data);
