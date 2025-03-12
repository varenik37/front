<template>
  <div class="auth-container">
    <h1>Регистрация</h1>
    <form @submit.prevent="handleSubmit">
      <div class="nice-form-group">
        <input v-model="user.username" placeholder="Логин" required>
      </div>
      <div class="nice-form-group">
        <input v-model="user.password" type="password" placeholder="Пароль" required>
      </div>
      <div class="nice-form-group">
        <input v-model="user.age" placeholder="Возраст" required type="number">
      </div>
      <div class="nice-form-group">
        <input v-model="user.residence" placeholder="Страна" required>
      </div>
      <div class="nice-form-group">
        <label for="dominant-hand">Выберите уровень образования</label>
        <select v-model="user.education" required>
          <option value="" disabled selected>Выберите уровень образования</option>
          <option value="secondary">Среднее</option>
          <option value="higher">Высшее</option>
          <option value="postgraduate">Послевузовское</option>
          <option value="other">Другое</option>
        </select>
      </div>
      <div class="nice-form-group">
        <input v-model="user.speciality" placeholder="Специальность" required>
      </div>
      <div class="nice-form-group">
        <input v-model="user.height" placeholder="Рост (см)" type="number">
      </div>
      <div class="nice-form-group">
        <input v-model="user.weight" placeholder="Вес (кг)" required type="number">
      </div>
      <div class="nice-form-group">
        <label for="dominant-hand">Ведущая рука</label>
        <select id="dominant-hand" v-model="user.dominant_hand" required>
          <option value="" disabled selected>Выберите...</option>
          <option value="right">Правая</option>
          <option value="left">Левая</option>
        </select>
      </div>
      <div class="nice-form-group">
        <input v-model="user.diseases" placeholder="Заболевания" required>
      </div>
      <div class="nice-form-group checkbox-group">
        <label>
          <input v-model="user.smoking" type="checkbox"> Курите ли вы?
        </label>
      </div>
      <div class="nice-form-group checkbox-group">
        <label>
          <input v-model="user.alcohol" type="checkbox"> Употребляете ли вы алкоголь?
        </label>
      </div>
      <div class="nice-form-group checkbox-group">
        <label>
          <input v-model="user.sport" type="checkbox"> Занимаетесь ли вы спортом?
        </label>
      </div>
      <div class="nice-form-group checkbox-group">
        <label>
          <input v-model="user.insomnia" type="checkbox"> Есть ли у вас бессоница?
        </label>
      </div>
      <div class="nice-form-group checkbox-group">
        <label>
          <input v-model="user.gamer" type="checkbox"> Играете ли вы в компьютерные игры?
        </label>
      </div>
      <div class="nice-form-group">
        <label for="current_mood">Ваше настроение от 1 до 10</label>
        <input id="current_mood" v-model="user.stress_level" type="number" min="1" max="10" required>
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
    <p>Уже есть аккаунт? <router-link to="/login">Войдите</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      user: {
        username: '',
        password: '', // Добавлено поле пароля
        age: '',
        residence: '',
        education: '',
        speciality: '',
        height: '',
        weight: '',
        dominant_hand: '',
        diseases: '',
        smoking: false,
        alcohol: false,
        sport: false,
        insomnia: false,
        gamer: false,
        stress_level: 1, // Изменено на stress_level password: '',
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        console.log(this.user);
        await this.$store.dispatch('register', this.user);
        this.$router.push('/login');
      } catch (error) {
        console.log(error);
        alert('Ошибка регистрации. Проверьте данные.');
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");

body {
  font-family: 'Roboto', sans-serif;
  background: #f3f0e7;
  color: #4b5563;
}

.auth-container {
  max-width: 450px;
  margin: 50px auto;
  padding: 25px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.nice-form-group {
  margin-bottom: 15px;
}

.nice-form-group input,
.nice-form-group select,
.nice-form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #c0c4c9;
  border-radius: 6px;
  font-size: 14px;
}
.nice-form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  display: block;
  margin-bottom: 5px;
}

.nice-form-group textarea {
  min-height: 80px;
  resize: vertical;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  cursor: pointer;
}

.checkbox-group input {
  width: 16px;
  height: 16px;
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
  text-align: center;
  margin-top: 15px;
}
</style>