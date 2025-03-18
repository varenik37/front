<template>
    <div class="auth-container">
      <h1>Вход</h1>
      <form @submit.prevent="login">
        <div class="nice-form-group">
          <input v-model="email" type="email" placeholder="Email" required>
        </div>
        <div class="nice-form-group">
          <input v-model="password" type="password" placeholder="Пароль" required>
        </div>
        <button type="submit">Войти</button>
      </form>
      <p>Нет аккаунта? <router-link to="/register">Зарегистрируйтесь</router-link></p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginPage',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
          });
          this.$router.push('/');
        } catch (error) {
          console.error(error);
          alert('Ошибка входа. Проверьте email и пароль.');
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
    padding: 25px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .nice-form-group {
    margin-bottom: 15px;
  }
  
  .nice-form-group input {
    width: 100%;
    padding: 12px;
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
    width: 100%;
  }
  
  button:hover {
    background: #2538df;
  }
  
  p {
    margin-top: 15px;
  }
  </style>
  