import axiosClient from './axiosClient';


const UserAPI = {
  getAll : (params) => {
    const url = 'products';
    return axiosClient.get(url, {params});
  },

  login : (params) =>{
    const url = '/auth/login';
    return axiosClient.post(url, { username: params.username, password: params.password });
  }
}

export default UserAPI;