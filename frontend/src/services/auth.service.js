import axiosInstance from './axios.js';

export const registerAPI = (data) => axiosInstance.post('/user/register', data);
export const loginAPI = (data) => axiosInstance.post('/user/login', data);
export const logoutAPI = () => axiosInstance.post('/user/logout');
export const getProfileAPI = () => axiosInstance.get('/user/profile');
export const updateProfileAPI = (data) => axiosInstance.put('/user/profile', data);
export const getAllUsersAPI = (page = 1) => axiosInstance.get(`/user/all?page=${page}`);
export const updateUserRoleAPI = (id, role) => axiosInstance.patch(`/user/${id}/role`, { role });
export const deleteUserAPI = (id) => axiosInstance.delete(`/user/${id}`);
