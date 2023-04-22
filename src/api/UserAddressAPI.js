import axiosClient from './axiosClient';


const UserAddress = {
  getMyUserAddressList : () =>{
    const url = '/user-addresses/my-address';
    return axiosClient.get(url);
  },
  createMyUserAddress : (params) =>{
    const url = '/user-addresses/my-address/create';
    return axiosClient.post(url,{...params})
  },
  deleteMyUserAddress : (params) =>{
    const url = '/user-addresses/my-address/';
    return axiosClient.delete(url + params)
  }
}

export default UserAddress;