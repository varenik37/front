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
        console.log('Отправляемые данные:', userData);
        
        const response = await axios.post('http://localhost:8000/api/register/', userData);
        console.log('Ответ сервера:', response.data);
        
        // Используем response.data.token вместо response.data.access
        if (response.data.token) {
          commit('setToken', response.data.token);
        }
        
        if (response.data.user) {
          commit('setUser', response.data.user);
        }
        
        return response;
      } catch (error) {
        console.error('Детали ошибки:', error.response ? error.response.data : error);
        throw error;
      }
    },
    
    async login({ commit }, credentials) {
      try {
        console.log('Данные для входа:', credentials);
        
        // Попробуем стандартный формат для Django Rest Framework
        const response = await axios.post('http://localhost:8000/api/login/', {
          username: credentials.username,
          password: credentials.password
        });
        
        console.log('Ответ сервера при входе:', response.data);
        
        // Для Django Rest Framework обычно токен возвращается как response.data.token
        const token = response.data.token || response.data.access || response.data.key;
        
        if (token) {
          commit('setToken', token);
          // Для TokenAuthentication в Django Rest Framework
          axios.defaults.headers.common['Authorization'] = `Token ${token}`;
          await this.dispatch('fetchUser');
        } else {
          console.error('Токен не получен в ответе:', response.data);
          throw new Error('Не удалось получить токен авторизации');
        }
        
        return response;
      } catch (error) {
        console.error('Ошибка входа:', error);
        
        // Вывод деталей ошибки для отладки
        if (error.response && error.response.data) {
          console.error('Детали ошибки:', error.response.data);
        }
        
        throw error;
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