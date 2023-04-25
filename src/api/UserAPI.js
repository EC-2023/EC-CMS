import axiosClient from './axiosClient';


const UserAPI = {
  getMyUserInfor : (params) => {
    const url = '/users/my-profile';
    return axiosClient.get(url);
  },

  updateMyUserInfor : (params) => {
    const url = '/users/my-profile';
    console.log("fName", params.firstName);
    return axiosClient.patch(url, 
    {firstName : params.firstName,
    lastName: params.lastName,
    middleName: params.middleName,
    phoneNumber: params.phoneNumber,
    email: params.email
  });
  },

  register : (params) => {
    const url = '/users';
    return axiosClient.post(url, params);
  },

  login : (params) =>{
    const url = '/auth/login';
    return axiosClient.post(url, { username: params.username, password: params.password });
  }
}

export default UserAPI;