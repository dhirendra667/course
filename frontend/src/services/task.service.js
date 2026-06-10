import axiosInstance from './axios.js';

export const createTaskAPI = (data) => axiosInstance.post('/tasks', data);
export const getAllTasksAPI = (params = {}) => axiosInstance.get('/tasks', { params });
export const getTaskByIdAPI = (id) => axiosInstance.get(`/tasks/${id}`);
export const updateTaskAPI = (id, data) => axiosInstance.put(`/tasks/${id}`, data);
export const deleteTaskAPI = (id) => axiosInstance.delete(`/tasks/${id}`);
export const getTaskStatsAPI = () => axiosInstance.get('/tasks/stats');
