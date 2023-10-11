import { request } from './request';
export const getAllReports = () => request('get', '/tutorials');

export const updateTutorial = (id, data) => request('put', `/tutorials/${id}`, data);

export const deleteTutorial = (id, data) => request('delete', `/tutorials/${id}`);
