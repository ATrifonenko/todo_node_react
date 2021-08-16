import axios from 'axios';

const api = {
  auth: {
    checkAuth: async () => await axios.get('/api/users/checkAuth').then((res) => res.data.user),
    signUp: (email, password, firstName, secondName, patronymic) =>
      axios
        .post('/api/users/signup', { email, password, firstName, secondName, patronymic })
        .then((res) => res.data.user),
    signIn: (email, password) => axios.post('/api/users/signin', { email, password }).then((res) => res.data.user),
    logout: () => axios.get('/api/users/logout').then((res) => res.data.user),
  },
  todo: {
    add: (data) => axios.post('/api/todo/add', data).then((res) => res.data),
  },
};

export default api;
