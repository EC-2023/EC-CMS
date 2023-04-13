import axiosClient from './axiosClient';


const productAPI = {
  getNewProduct : (params) => {
    const url = '/products/pagination';
    return axiosClient.get(url, {params});
  },
  
  getAll : () =>{
    const url = '/products';
    return axiosClient.get(url);
  }
}

export default productAPI;