import { request } from './request';

export const createTutorial = (data) => request('post', '/tutorials', data);

export const getAllTutorials = () => request('get', '/tutorials');

export const updateTutorial = (id, data) => request('put', `/tutorials/${id}`, data);

export const deleteTutorial = (id) => request('delete', `/tutorials/${id}`);
