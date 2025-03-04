<template>
  <div>
    <h1>Добро пожаловать, {{ user.name }}!</h1>
    <p>Вы успешно вошли в систему.</p>
    <router-link to="/results">Посмотреть результаты</router-link>
  </div>
</template>

<script>
export default {
  name: 'MainDashboard',
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>