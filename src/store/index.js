import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  actions: {
    async register({ commit }, userData) {
      const response = await axios.post('http://localhost:8000/api/register/', userData);
      commit('setUser', response.data);
    },
    async login({ commit }, credentials) {
      const response = await axios.post('http://localhost:8000/api/login/', credentials);
      commit('setToken', response.data.access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      const userResponse = await axios.get('http://localhost:8000/api/users/me/');
      commit('setUser', userResponse.data);
    },
    async fetchResults({ state }) {
      const response = await axios.get('http://localhost:8000/api/results/', {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      return response;
    },
  },
});