import axios from 'axios';

const instace = axios.create();

instace.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.resolve(error.response);
  },
);

export default instace;
