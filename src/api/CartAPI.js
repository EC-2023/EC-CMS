import axiosClient from './axiosClient';


const CartAPI = {
  addToCart : (params) =>{
    const url = '/carts/add';
    return axiosClient.post(url,params);
  }
}

export default CartAPI;