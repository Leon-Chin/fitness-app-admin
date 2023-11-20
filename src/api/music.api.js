import { request } from './request';

export const getallmusics = () => request('get', '/music/all');
export const getmusicbytype = () => request('get', '/music/type');
export const updatemusic = (id, data) => request('put', `/music/${id}`, data);
export const createmusic = (data) => request('post', '/music/', data);
export const deletemusic = (id) => request('delete', `/music/${id}`);