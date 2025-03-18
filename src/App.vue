<template>
  <div id="app">
    <nav v-if="$route.path !== '/login' && $route.path !== '/register'">
      <router-link to="/" v-if="isAuthenticated">Главная</router-link>
      <router-link to="/login" v-if="!isAuthenticated">Войти</router-link>
      <router-link to="/register" v-if="!isAuthenticated">Зарегистрироваться</router-link>
      <button @click="logout" v-if="isAuthenticated">Выйти</button>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isAuthenticated() {
      return this.$store.state.token !== null;
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  margin-bottom: 20px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

button {
  background: none;
  border: none;
  color: #2c3e50;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  text-decoration: underline;
}
</style>