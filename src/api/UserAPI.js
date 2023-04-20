import axiosClient from './axiosClient';


const UserAPI = {
  getUserInfor : (params) => {
    const url = '/users/my-profile';
    return axiosClient.get(url);
  },

  login : (params) =>{
    const url = '/auth/login';
    return axiosClient.post(url, { username: params.username, password: params.password });
  }
}

export default UserAPI;