import axios from "axios";
import queryString from "query-string";
// Set up default config for http requests here
  
const axiosClient = axios.create({
  baseURL: "https://ec-api.herokuapp.com/api/v1",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  // paramsSerializer: {
  //   serialize: queryString.stringify // or (params) => Qs.stringify(params, {arrayFormat: 'brackets'})
  // }
});
axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      return {...config, headers : {...config.headers,Authorization : 'Bearer ' + accessToken}}
      // config.headers['Authorization'] = 'Bearer ' + accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);


// axiosClient.interceptors.response.use(
//   (response) => {
//     if (response && response.data) {
//       return response.data;
//     }
//     return response;
//   },
//   async (error) => {
//     console.log(error);
//     const originalRequest = JSON.parse(JSON.stringify(error.config)) ;

//     // if (!originalRequest) {
//     //   return Promise.reject(error);
//     // }

//     if (
//       (error.response.status === 401 || error.response.status === 500) &&
//       originalRequest &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         const response = await axiosClient.post('/auth/refresh-token', {
//           refreshToken: refreshToken,
//         });

//         if (response.accessToken) {
//           localStorage.setItem('accessToken', response.accessToken);
//            console.log(response.accessToken);
//            axiosClient.defaults.headers.common['Authorization'] = `Bearer ${response.accessToken}`;
//            originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
//            console.log(originalRequest);
//             return axiosClient(originalRequest);
//         }
//       } catch (error) {
//         // Handle errors
//         console.log("gửi lại requset"+ error);
//       }
//     }

//     return Promise.reject(error);
//   }

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if ((error.response.status === 401 || error.response.status === 500) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axiosClient.post('/auth/refresh-token', {
          refreshToken: refreshToken,
        });
        
        if (response.data.accessToken) {
          localStorage.setItem('accessToken', response.data.accessToken);
          axiosClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return axiosClient(originalRequest);
        }
        else{
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      } catch (error) {
        // Xử lý lỗi
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.log("Gửi lại request" + error);
      }      
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
