import axiosClient from './axiosClient';


const UserAddress = {
  getUserAddressList : () =>{
    const url = '/useraddresss/my-address';
    return axiosClient.get(url);
  },
  createUserAddress : (params) =>{
    const url = '/useraddresss/my-address/create';
    return axiosClient.post(url,{...params})
  },
  deleteUserAddress : (params) =>{
    const url = '/useraddresss/';
    return axiosClient.delete(url + params)
  }
}

export default UserAddress;