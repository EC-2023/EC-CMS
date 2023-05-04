import axiosClient from './axiosClient';

const CategoryAPI = {
  fetchFeature: () => {
    const url = '/categories/features';
    return axiosClient.get(url);
  },
};

export default CategoryAPI;
