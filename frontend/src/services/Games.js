import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3030/api/games'
});

export default {
  fetchById(id) {
    return instance.get(`/${id}`).then(response => response.data);
  },

  fetchMany(limit) {
    return instance
      .get('/', {
        params: {
          limit
        }
      })
      .then(response => response.data);
  }
};
