import axiosClient from './axiosClient';


const productAPI = {
  getNewProduct : (params) => {
    const url = '/post';
    return axiosClient.get(url, {params});
  },
  
  getAll : () =>{
    const url = '/products';
    return axiosClient.get(url);
  },

  getProduct: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  }
}

export default productAPI;