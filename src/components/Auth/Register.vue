<template>
  <div class="auth-container">
    <h1>Регистрация</h1>
    <form @submit.prevent="handleSubmit">
      <div class="nice-form-group">
        <input v-model="user.surname" placeholder="Фамилия" required>
      </div>
      <div class="nice-form-group">
        <input v-model="user.name" placeholder="Имя" required>
      </div>
      <div class="nice-form-group">
        <input v-model="user.patronymic" placeholder="Отчество">
      </div>
      <div class="nice-form-group">
        <input v-model="user.date_of_birth" type="date" placeholder="Дата рождения" required>
      </div>
      <div class="nice-form-group">
        <select v-model="user.gender" required>
          <option value="">Выберите пол</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
      </div>
      <div class="nice-form-group">
        <input v-model="user.email" type="email" placeholder="Email" required>
      </div>
      <div class="nice-form-group">
        <input v-model="user.phone_number" placeholder="Номер телефона">
      </div>
      <div class="nice-form-group">
        <input v-model="user.city" placeholder="Город" required>
      </div>
      <div class="nice-form-group">
        <input v-model="user.country" placeholder="Страна" required>
      </div>
      <div class="nice-form-group">
        <select v-model="user.education_level" required>
          <option value="">Выберите уровень образования</option>
          <option value="secondary">Среднее</option>
          <option value="higher">Высшее</option>
          <option value="postgraduate">Послевузовское</option>
          <option value="other">Другое</option>
        </select>
      </div>
      <div class="nice-form-group">
        <input v-model="user.other_education" placeholder="Другое образование">
      </div>
      <div class="nice-form-group">
        <input v-model="user.profession" placeholder="Профессия" required>
      </div>
      <div class="nice-form-group">
        <input v-model="user.workplace" placeholder="Место работы">
      </div>
      <div class="nice-form-group checkbox-group">
        <label>
          <input v-model="user.smokes" type="checkbox"> Курите ли вы?
        </label>
      </div>
      <div class="nice-form-group checkbox-group">
        <label>
          <input v-model="user.drinks_alcohol" type="checkbox"> Употребляете ли вы алкоголь?
        </label>
      </div>
      <div class="nice-form-group">
        <input v-model="user.stress_level" type="number" min="1" max="10" placeholder="Уровень стресса" required> Ваш уровень стресса от 1 до 10
      </div>
      <div class="nice-form-group">
        <input v-model="user.goals" placeholder="Цели регистрации">
      </div>
      <div class="nice-form-group checkbox-group">
        <label>
          <input v-model="user.consent" type="checkbox" required> Согласие на обработку данных
        </label>
      </div>
      <div class="nice-form-group">
        <input v-model="user.password" type="password" placeholder="Пароль" required>
      </div>
      <div class="nice-form-group">
        <textarea v-model="user.additional_comments" placeholder="Дополнительные комментарии"></textarea>
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
        surname: '',
        name: '',
        patronymic: '',
        date_of_birth: '',
        gender: '',
        email: '',
        phone_number: '',
        city: '',
        country: '',
        education_level: '',
        other_education: '',
        profession: '',
        workplace: '',
        smokes: false,
        drinks_alcohol: false,
        stress_level: 1,
        goals: '',
        consent: false,
        password: '',
        additional_comments: '',
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

.nice-form-group textarea {
  min-height: 80px;
  resize: vertical;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 8px;
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
