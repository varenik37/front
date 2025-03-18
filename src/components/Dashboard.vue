<template>
  <div>
    <h1 v-if="user">Добро пожаловать, {{ user.name }}!</h1>
    <h1 v-else>Загрузка...</h1>
    <p v-if="user">Вы успешно вошли в систему.</p>
    <button v-if="user" @click="logout">Выйти</button>
    <router-link v-if="user" to="/results">Посмотреть результаты</router-link>
  </div>
</template>

<script>
export default {
  name: 'MainDashboard',
  computed: {
    user() {
      return this.$store.state.user; // Получаем данные пользователя из Vuex
    },
  },
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push('/login');
    },
  },
};
</script>