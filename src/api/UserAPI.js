import axiosClient from './axiosClient';


const UserAPI = {
  getMyUserInfor : (params) => {
    const url = '/users/my-profile';
    return axiosClient.get(url);
  },

  updateMyUserInfor : (params) => {
    const url = '/users/my-profile';
    return axiosClient.patch(url, {params});
  },

  login : (params) =>{
    const url = '/auth/login';
    return axiosClient.post(url, { username: params.username, password: params.password });
  }
}

export default UserAPI;