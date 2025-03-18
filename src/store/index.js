import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Token ${token}`; // Устанавливаем заголовок авторизации
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization']; // Удаляем заголовок авторизации
    },
  },
  actions: {
    async register({ commit }, userData) {
      try {
        const response = await axios.post('http://localhost:8000/api/register/', userData);
        commit('setToken', response.data.token); // Сохраняем токен
        commit('setUser ', userData); // Сохраняем данные пользователя
      } catch (error) {
        console.error('Registration failed:', error);
        throw error; // Пробрасываем ошибку для обработки в компоненте
      }
    },

    async login({ commit }, credentials) {
      try {
        const response = await axios.post('http://localhost:8000/api/login/', credentials);
        commit('setToken', response.data.token); // Сохраняем токен
        await this.dispatch('fetchUser '); // Загрузка данных пользователя
      } catch (error) {
        console.error('Login failed:', error);
        throw error; // Пробрасываем ошибку для обработки в компоненте
      }
    },

    async fetchUser ({ commit, state }) {
      if (!state.token) return;

      try {
        const response = await axios.get('http://localhost:8000/api/users/', {
          headers: {
            Authorization: `Token ${state.token}`, // Убедитесь, что токен передаётся
          },
        });
        commit('setUser ', response.data); // Сохраняем данные пользователя
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    },

    async addTest({ state }, testData) {
      if (!state.token) return;

      try {
        const response = await axios.post('http://localhost:8000/api/add-test/', testData, {
          headers: {
            Authorization: `Token ${state.token}`, // Убедитесь, что токен передаётся
          },
        });
        return response.data; // Возвращаем данные ответа
      } catch (error) {
        console.error('Failed to add test:', error);
        throw error; // Пробрасываем ошибку для обработки в компоненте
      }
    },

    async addResult({ state }, resultData) {
      if (!state.token) return;

      try {
        const response = await axios.post('http://localhost:8000/api/add-result/', resultData, {
          headers: {
            Authorization: `Token ${state.token}`, // Убедитесь, что токен передаётся
          },
        });
        return response.data; // Возвращаем данные ответа
      } catch (error) {
        console.error('Failed to add result:', error);
        throw error; // Пробрасываем ошибку для обработки в компоненте
      }
    },
  },
});