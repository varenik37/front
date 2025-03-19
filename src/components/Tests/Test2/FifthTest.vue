<template>
  <div>
    <!-- Экран с правилами -->
    <div v-if="showRules">
      <h2>Тест Струпа</h2>
      <div class="test-instructions">
        <p>В этом тесте вам будут показаны названия цветов, написанные разными цветами.</p>
        <p>Ваша задача: выбрать цвет, <strong>которым написано слово</strong>, а не тот цвет, который обозначает само слово.</p>
        
        <div class="test-example">
          <h3>Пример:</h3>
          <p class="example-text" style="color: blue; font-size: 24px; font-weight: bold;">Красный</p>
          <p>В этом примере правильный ответ: <strong>Синий</strong>, так как слово написано синим цветом, хотя само слово обозначает "красный".</p>
        </div>
        
        <p>Тест состоит из 15 заданий. Старайтесь отвечать быстро и точно.</p>
        <button class="test-start-button" @click="startTest">Начать тест</button>
      </div>
    </div>

    <!-- Экран с тестом -->
    <div v-else-if="currentQuestion < questions.length && !isTimeUp">
      <h3>Вопрос {{ currentQuestion + 1 }} из {{ questions.length }}</h3>
      <p class="test-word" :style="{ color: questions[currentQuestion].colorValue, fontSize: '36px', fontWeight: 'bold', margin: '30px 0' }">
        {{ questions[currentQuestion].word }}
      </p>
      <div class="test-options">
        <button 
          v-for="(colorName, index) in colors" 
          :key="colorName" 
          @click="submitAnswer(colorValues[index])"
          :style="{ 
            backgroundColor: colorValues[index], 
            color: colorValues[index] === 'yellow' ? 'black' : 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            margin: '5px',
            fontWeight: '500',
            fontSize: '16px',
            cursor: 'pointer'
          }"
        >
          {{ colorName }}
        </button>
      </div>
    </div>

    <!-- Экран с результатами -->
    <div v-else>
      <h2>Результаты</h2>
      <p>Количество правильных ответов: <strong>{{ score }} из {{ questions.length }}</strong></p>
      
      <table class="test-results-table">
        <thead>
          <tr>
            <th>№</th>
            <th>Слово</th>
            <th>Цвет слова</th>
            <th>Ваш ответ</th>
            <th>Результат</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(question, index) in questions" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ question.word }}</td>
            <td>{{ question.colorName }}</td>
            <td>{{ getColorNameByValue(answers[index]) }}</td>
            <td>
              <span :style="{ color: answers[index] === question.colorValue ? '#10b981' : '#ef4444', fontWeight: 'bold' }">
                {{ answers[index] === question.colorValue ? '✓' : '✗' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentQuestion: 0,
      words: ['Красный', 'Зеленый', 'Синий', 'Желтый', 'Фиолетовый'],
      colorValues: ['red', 'green', 'blue', 'yellow', 'purple'],
      colors: ['Красный', 'Зеленый', 'Синий', 'Желтый', 'Фиолетовый'],
      questions: [],
      answers: [],
      isTimeUp: false,
      showRules: true, // Показываем правила при запуске
    };
  },
  created() {
    this.questions = this.generateQuestions();
  },
  computed: {
    correctAnswers() {
      return this.questions.map(q => q.colorValue);
    },
    score() {
      return this.answers.filter((answer, index) => answer === this.correctAnswers[index]).length;
    },
  },
  methods: {
    startTest() {
      this.showRules = false;
      // Эмитим событие test-start только когда пользователь начинает тест
      this.$emit('test-start');
    },
    generateQuestions() {
      const questions = [];
      for (let i = 0; i < 15; i++) {
        const word = this.words[Math.floor(Math.random() * this.words.length)];
        let colorIndex = Math.floor(Math.random() * this.colorValues.length);
        let colorValue = this.colorValues[colorIndex];
        
        // Проверяем, чтобы цвет текста не совпадал с его значением
        while (colorValue === this.getColorForWord(word)) {
          colorIndex = Math.floor(Math.random() * this.colorValues.length);
          colorValue = this.colorValues[colorIndex];
        } 
        
        questions.push({ 
          word, 
          colorValue,
          colorName: this.colors[colorIndex] 
        });
      }
      return this.shuffleQuestions(questions);
    },
    getColorForWord(word) {
      const index = this.words.indexOf(word);
      if (index !== -1) {
        return this.colorValues[index];
      }
      return '';
    },
    getColorNameByValue(colorValue) {
      const index = this.colorValues.indexOf(colorValue);
      if (index !== -1) {
        return this.colors[index];
      }
      return 'Неизвестно';
    },
    shuffleQuestions(questions) {
      for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
      }
      return questions;
    },
    submitAnswer(color) {
      this.answers.push(color);
      this.currentQuestion++;

      if (this.currentQuestion >= this.questions.length) {
        this.isTimeUp = true;
        this.$emit('test-complete', this.score, this.questions.length);
      }
    }
  },
};
</script>

<style scoped>
.test-instructions {
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
  padding: 1.5rem 2rem;
  margin: 1.5rem 0;
  text-align: left;
}

.test-example {
  background-color: #f0f4ff;
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
  margin: 1rem 0;
  border-left: 4px solid #3b4ce2;
}

.example-text {
  margin: 1rem 0;
}

.test-start-button {
  background-color: #3b4ce2;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s;
  font-weight: 500;
}

.test-start-button:hover {
  background-color: #2538df;
}

.test-options {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0 5rem 0; /* Большой отступ снизу */
}

.test-results-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  border: 1px solid #e5e7eb;
}

.test-results-table th, .test-results-table td {
  border: 1px solid #e5e7eb;
  padding: 0.75rem;
  text-align: center;
}

.test-results-table th {
  background-color: #f0f4ff;
  color: #3b4ce2;
  font-weight: 600;
}

.test-results-table tr:nth-child(even) td {
  background-color: #f9fafc;
}
</style>