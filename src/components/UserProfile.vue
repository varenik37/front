<template>
  <div class="auth-container">
    <h1>Личный кабинет</h1>
    <form @submit.prevent="updateProfile">
      <div class="nice-form-group">
        <input v-model="profile.username" type="text" disabled>
      </div>
      <div class="nice-form-group">
        <input v-model="profile.password" type="password" placeholder="Новый пароль">
      </div>
      <button type="submit">Сохранить</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserProfile',
  data() {
    return {
      profile: { username: '', password: '' },
    };
  },
  async created() {
    try {
      let res = await axios.get('/profile/');
      this.profile.username = res.data.username;
    } catch (error) {
      console.error("Ошибка загрузки профиля", error);
    }
  },
  methods: {
    async updateProfile() {
      try {
        await axios.put('/profile/', { password: this.profile.password });
        alert('Пароль обновлён!');
      } catch (error) {
        console.error("Ошибка обновления", error);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");

.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 50px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.nice-form-group {
  margin-bottom: 15px;
  margin-right: 10%;
}

.nice-form-group input {
  width: 100%;
  padding: 15px;
  border: 1px solid #c0c4c9;
  border-radius: 6px;
  font-size: 14px;
}

button {
  background: #3b4ce2;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  width: 50%;
}

button:hover {
  background: #2538df;
}
</style>
