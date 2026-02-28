import axios from 'axios';

const api = axios.create({
    baseURL: ' https://awf-api.lvl99.dev'
  });

  api.interceptors.request.use(
    (config) => {
      // get token
      const token = localStorage.getItem('access_token');

      // the token is in localStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            console.error('sessions expired');
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_info');
            window.location.href = '/'; 
            break;
          default:
            console.error(error.message);
        }
      }
      return Promise.reject(error);
    }
  );
  
  export default api;