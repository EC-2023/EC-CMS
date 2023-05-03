import axiosClient from './axiosClient';


const OrderAPI = {
  addOrder : (params) =>{
    const url = '/orders/add-my-order';
    return axiosClient.post(url, params);
  }
}

export default OrderAPI;