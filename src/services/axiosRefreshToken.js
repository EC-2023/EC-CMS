import axios from 'axios';
import AuthService from './auth_service';

const API_URL = 'https://ec-api.herokuapp.com/api/v1';

const refreshAuthLogic = failedRequest => AuthService.refreshToken()
  .then(tokenRefreshResponse => {
    const token = tokenRefreshResponse.data.accessToken;
    AuthService.saveToken(token);
    failedRequest.response.config.headers.Authorization = `Bearer ${token}`;
    return Promise.resolve();
  })
  .catch(() => {
    AuthService.logout();
    window.location.reload();
  });

axios.interceptors.response.use(response => response, error => {
  const { config, response: { status } } = error;
  const originalRequest = config;

  if (status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    return refreshAuthLogic(originalRequest);
  }
  return Promise.reject(error);
});

export default refreshAuthLogic;
