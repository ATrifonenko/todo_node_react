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
    getMyEmployee: (id) => axios.get('/api/users/getMyEmployee', { params: { id } }).then((res) => res.data),
  },
  todo: {
    getTodo: (userId) => axios.get('/api/todo/getTodo', { params: { userId } }).then((res) => res.data.todo),
    getTodoById: (id) => axios.get('/api/todo/getTodoById', { params: { id } }).then((res) => res.data),
    add: (data) => axios.post('/api/todo/add', data).then((res) => res.data),
    update: (data) => axios.post('/api/todo/update', data).then((res) => res.data),
  },
};

export default api;
