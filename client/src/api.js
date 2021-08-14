import axios from 'axios';

const api = {
  auth: {
    checkAuth: () => axios.get('/api/users/checkAuth').then((res) => res.data),
  },
};

export default api;
