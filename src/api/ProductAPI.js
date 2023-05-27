import axiosClient from './axiosClient';


const productAPI = {
  getNewProduct : (params) => {
    const url = '/post';
    return axiosClient.get(url, {params});
  },
  
  searchProduct : (params) => {
    const url = '/post/search';
    return axiosClient.get(url, {params});
  },

  getAll : () =>{
    const url = '/products';
    return axiosClient.get(url);
  },

  getProduct: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  getProductsByCategory: (params) => {
    const url = `/post/category`;
    return axiosClient.get(url, {params});
  }
}

export default productAPI;