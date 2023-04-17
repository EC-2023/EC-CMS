import axiosClient from './axiosClient';


const UserAPI = {
  getAll : (params) => {
    const url = 'products';
    return axiosClient.get(url, {params});
  },

  login : (params) =>{
    const headers = {
      'Content-Type': 'application/json'
    };
    const url = '/auth/login';
    return axiosClient.post(url, {params});
  }
}

export default UserAPI;