import axios from 'axios';
import authHeader from './auth-header';
import axiosRefreshToken from './axiosRefreshToken';

const API_URL = 'https://ec-api.herokuapp.com/api/v1/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axiosRefreshToken.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();