import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Импортируйте Vuex store


const app = createApp(App);
app.use(store);
app.use(router); 
app.use(store);
app.mount('#app');