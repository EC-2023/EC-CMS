import axios from "axios";
import queryString from "query-string";
// Set up default config for http requests here
  
const axiosClient = axios.create({
  baseURL: "https://ec-api.herokuapp.com/api/v1",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  paramsSerializer: {
    serialize: queryString.stringify // or (params) => Qs.stringify(params, {arrayFormat: 'brackets'})
  }
});
axiosClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('accessToken');

  // If access token exists, add it to the headers of the request
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axiosClient.post('/auth/refresh-token', {
          refreshToken: refreshToken,
        });

        if (response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + response.data.accessToken;
          return axiosClient(originalRequest);
        }
      } catch (error) {
        // Handle errors
        throw error;
      }
    }

    throw error;
  }
);
export default axiosClient;
