import { request } from './request';

export const createNotification = (data) => request('post', '/notification', data);

