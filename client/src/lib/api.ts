import axios from "axios";

export const API_URL = `esoft-tasks-server-mvh9sjbvh-graffvishenkas-projects.vercel.app`

export const $api = axios.create({
  withCredentials:true,
  baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
})

