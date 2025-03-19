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
        <input v-model="user.password2" type="password" placeholder="Подтверждение пароля" required>
      </div>
      <div class="nice-form-group">
        <input v-model="user.age" placeholder="Возраст" required type="number">
      </div>
      <div class="nice-form-group">
        <input v-model="user.residence" placeholder="Страна" required>
      </div>
      <div class="nice-form-group">
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
        <select id="dominant-hand" v-model="user.dominant_hand" required>
          <option value="" disabled selected>Ведущая рука</option>
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
    <p class="login-link">Уже есть аккаунт? <router-link to="/login">Войдите</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      user: {
        username: '',
        password: '',
        password2: '', // Добавлено поле для подтверждения пароля
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
        stress_level: 1, 
      },
      passwordConfirm: '',
    };
  },
  computed: {
    passwordError() {
      if (this.passwordConfirm && this.user.password !== this.passwordConfirm) {
        return 'Пароли не совпадают';
      }
      return '';
    },
    isFormValid() {
      return !this.passwordError && this.user.username && this.user.password;
    }
  },
  methods: {
    async handleSubmit() {
      // Проверка на совпадение паролей
      if (this.user.password !== this.user.password2) {
        alert('Пароли не совпадают!');
        return;
      }
      try {
        // Для отладки: добавьте email, даже если его нет в форме
        const userData = {
          ...this.user,
          email: `${this.user.username}@example.com`, // Временно добавляем email для отладки
          // Преобразуем числовые поля в числа
          age: this.user.age ? parseInt(this.user.age) : null,
          height: this.user.height ? parseInt(this.user.height) : null,
          weight: this.user.weight ? parseInt(this.user.weight) : null,
        };

        // Отправляем данные на сервер
        await this.$store.dispatch('register', userData);
        this.$router.push('/login');
      } catch (error) {
        console.error('Ошибка регистрации:', error);
        // Выводим более подробную информацию об ошибке, если она есть
        if (error.response && error.response.data) {
          console.error('Детали ошибки:', error.response.data);
          alert('Ошибка регистрации: ' + JSON.stringify(error.response.data));
        } else {
          alert('Ошибка регистрации. Проверьте данные и повторите попытку.');
        }
      }
    },
  },
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

.auth-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 0.625rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #3b4ce2;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 500;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.form-section {
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  background-color: #f9f9fa;
  border-radius: 0.5rem;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.nice-form-group {
  flex: 1;
  min-width: 250px;
}

.nice-form-group label {
  display: block;
  margin-bottom: 0.375rem;
  font-size: 0.875rem;
  color: #4b5563;
  font-weight: 500;
}

.nice-form-group input,
.nice-form-group select,
.nice-form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.nice-form-group input:focus,
.nice-form-group select:focus,
.nice-form-group textarea:focus {
  outline: none;
  border-color: #3b4ce2;
  box-shadow: 0 0 0 2px rgba(59, 76, 226, 0.1);
}

.nice-form-group textarea {
  min-height: 5rem;
  resize: vertical;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
  width: auto;
}

.checkbox-group input {
  width: 1.125rem;
  height: 1.125rem;
  cursor: pointer;
}

button {
  background: #3b4ce2;
  color: white;
  padding: 0.875rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #2538df;
}

.submit-btn:disabled {
  background: #a0a0a0;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 1.25rem;
  font-size: 0.875rem;
}

.login-link a {
  color: #3b4ce2;
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}

.error-message {
  color: #dc2626;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: block;
}

@media (max-width: 768px) {
  .auth-container {
    margin: 1rem;
    padding: 1rem;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0.625rem;
  }
  
  .nice-form-group {
    min-width: 100%;
  }
  
  .form-section {
    padding: 0.875rem;
  }
  
  .checkbox-grid {
    grid-template-columns: 1fr;
  }
}
</style>