import axiosClient from './axiosClient';


class UserAPI {
  getAll = (params) => {
    const url = 'products';
    return axiosClient.get(url, {params})
  }

  login = (params) =>{
    const url = "login";
    return axiosClient.post(url,{params})
  }
}

export default new UserAPI();