import axiosClient from './axiosClient';


const UserAddress = {
  getUserAddressList : () =>{
    const url = '/useraddresss/my-address';
    return axiosClient.get(url);
  }
}

export default UserAddress;