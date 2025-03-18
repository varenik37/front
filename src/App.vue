<template>
  <div id="app">
    <nav v-if="$route.path !== '/login' && $route.path !== '/register'" class="main-navigation">
      <div class="nav-container">
        <div class="logo">
          <h1>Когнитивные тесты</h1>
        </div>
        <div class="nav-links">
          <router-link to="/" exact>Главная</router-link>
          <router-link to="/tests">Тесты</router-link>
          <router-link to="/results">Результаты</router-link>
          <button @click="logout" v-if="isAuthenticated" class="logout-btn">Выйти</button>
        </div>
        <div class="auth-links" v-if="!isAuthenticated">
          <router-link to="/login" class="auth-btn">Войти</router-link>
          <router-link to="/register" class="auth-btn register">Зарегистрироваться</router-link>
        </div>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
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
:root {
  --primary-color: #3b4ce2;
  --primary-hover: #2538df;
  --secondary-color: #42b983;
  --text-color: #2c3e50;
  --background-color: #f8f9fa;
  --card-background: #ffffff;
  --border-color: #e0e0e0;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

#app {
  text-align: center;
  max-width: 100%;
  margin: 0 auto;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.main-navigation {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.logo h1 {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin: 0;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-links a:hover {
  color: var(--primary-color);
  background-color: rgba(59, 76, 226, 0.05);
}

.nav-links a.router-link-exact-active,
.nav-links a.router-link-active {
  color: var(--primary-color);
  font-weight: 600;
  border-bottom: 2px solid var(--primary-color);
}

.auth-links {
  display: flex;
  gap: 1rem;
}

.auth-btn {
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.auth-btn:hover {
  transform: translateY(-2px);
}

.auth-btn.register {
  background-color: var(--primary-color);
  color: white;
}

.auth-btn.register:hover {
  background-color: var(--primary-hover);
}

.logout-btn {
  background: none;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 0.5rem 1rem;
  color: var(--text-color);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-color: #ccc;
}

/* Общие стили для всех компонентов */
h1, h2, h3, h4, h5, h6 {
  margin-bottom: 1rem;
  color: var(--text-color);
}

button {
  cursor: pointer;
  font-family: inherit;
}

/* Адаптивность */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .auth-links {
    width: 100%;
    justify-content: center;
  }
}
</style>