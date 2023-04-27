import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: queryString.stringify, // or (params) => Qs.stringify(params, {arrayFormat: 'brackets'})
  },
});
axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      return { ...config, headers: { ...config.headers, Authorization: 'Bearer ' + accessToken } };
      // config.headers['Authorization'] = 'Bearer ' + accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if ((error.response.status === 401 || error.response.status === 500) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axiosClient.post('/auth/refresh-token', {
          refreshToken: refreshToken,
        });

        if (response.data.accessToken) {
          localStorage.setItem('accessToken', response.data.accessToken);
          axiosClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return axiosClient(originalRequest);
        }
      } catch (error) {
        // Xử lý lỗi
      }
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
