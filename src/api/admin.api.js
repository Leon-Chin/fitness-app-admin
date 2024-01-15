import { request } from './request';

export const apiLogin = (data) => request('post', '/admin/signin', data);
export const checkToken = (token) => request('post', '/admin/check', token);

// get
export const getStatistics = () => request('get', '/admin/statistics');
export const getAllReports = () => request('get', '/admin/reports');
export const getAllFeedbacks = () => request('get', '/admin/feedbacks');

// delete
export const deleteBlog = (data) => request('post', `/admin/deleteblog/`, data);
export const deleteComment = (data) => request('post', `/admin/deletecomment/`, data);

// reply
export const reply = (targetID, data) => request('post', `/admin/reply/${targetID}`, data);
export const replyFeedback = (data) => request('post', `/admin/replyfeedback/`, data);

// send to all
export const sendToAll = (data) => request('post', `/admin/post`, data);

// operate user
export const operateUser = (data) => request('post', `/admin/operateuser`, data);





