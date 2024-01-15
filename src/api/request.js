import { message as $message } from 'antd';
import axios from 'axios';
import store from '@/store';
import { setGlobalState } from '@/store/global.store';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api',
    // baseURL: 'https://medal.onrender.com/api',
    // timeout: 6000,
});
axiosInstance.interceptors.request.use(
    config => {
        store.dispatch(
            setGlobalState({
                loading: true,
            }),
        );
        return config;
    },
    error => {
        store.dispatch(
            setGlobalState({
                loading: false,
            }),
        );
        Promise.reject(error);
    },
);
axiosInstance.interceptors.response.use(
    config => {
        store.dispatch(
            setGlobalState({
                loading: false,
            }),
        );
        return config?.data;
    },
    error => {
        store.dispatch(
            setGlobalState({
                loading: false,
            }),
        );
        let errorMessage = 'error';
        if (error?.message?.includes('Network Error')) {
            errorMessage = 'network connection error!';
        } else {
            errorMessage = error?.message;
        }
        error.message && $message.error(errorMessage);
        return {
            status: false,
            message: errorMessage,
            result: null,
        };
    },
);
export const request = (method, url, data, config) => {
    switch (method) {
        case 'post':
            return axiosInstance.post(url, data, config);
        case 'get':
            return axiosInstance.get(url, { params: data, ...config });
        case 'delete':
            return axiosInstance.delete(url, { params: data, ...config });
        case 'put':
            return axiosInstance.put(url, data, config);
        default:
            break;
    }
};