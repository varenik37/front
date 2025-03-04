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
      axios.defaults.headers.common['Authorization'] = '';
    },
  },
  actions: {
    async register({ commit }, userData) {
      const response = await axios.post('http://localhost:8000/api/register/', userData);
      commit('setToken', response.data.access);
      commit('setUser', response.data); // Если бэкенд возвращает данные пользователя
    },

    async login({ commit }, credentials) {
      const response = await axios.post('http://localhost:8000/api/login/', credentials);
      commit('setToken', response.data.access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      await this.dispatch('fetchUser'); // Загрузка данных пользователя
    },

    async fetchUser({ commit, state }) {
      console.log(state);
      if (!state.token) return;

      try {
        const response = await axios.get('http://localhost:8000/api/user/', {
          headers: {
            Authorization: `Bearer ${state.token}`, // Убедитесь, что токен передаётся
          },
        });
        console.log(response);
        commit('setUser', response.data); // Сохраняем данные пользователя
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    },
  },
});