import { request } from './request'
// blog
export const getspecificblog = (blogID) => request('get', `/blogs/find/${blogID}`)

// comments
export const getcommentbyid = (commentID) => request('get', `/comments/getcomment/${commentID}`);

// user
export const getuserbyid = (userID) => request('get', `/users/find/${userID}`);