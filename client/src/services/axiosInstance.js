import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:6001/',
//   headers: {
//     'Content-Type': 'application/json',

//   }, // Replace with your API base URL
  
});

// Add a request interceptor to include the token in headers
// axiosInstance.interceptors.request.use(
//   async(config) => {
//     const token = localStorage.getItem('user');
//     // console.log('token>>', JSON.parse(token).sessionToken, config) // Retrieve token from local storage or any other place where it's stored
//     const parsedToken =  JSON.parse(token)
//     if (parsedToken.sessionToken) {
//       const sessionToken=`${parsedToken.sessionToken}`;
//    config.headers.Authorization = `Bearer ${sessionToken}`
//    config.headers['Content-Type'] = 'application/json'
//   } 
//   return config,
//   (error) => {
//     return Promise.reject(error);
//   }
// }
// );

// const getAccessToken = () => {
//     const token = localStorage.getItem('user');
//     // console.log('token>>', JSON.parse(token).sessionToken, config) // Retrieve token from local storage or any other place where it's stored
//     const parsedToken =  JSON.parse(token)
//     if (parsedToken.sessionToken) {
//      return `${parsedToken.sessionToken}`;
//     //   axios.defaults.headers.common['Authorization'] = `Bearer ${parsedToken.sessionToken}`
//     }
// }

// const getAuthClient = async () => {
//     axiosInstance.defaults.headers.common.Authorization = await getAccessToken();
//     return axiosInstance;
//   };

export default axiosInstance;