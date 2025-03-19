<template>
  <div class="spatial-test-container">
    <!-- Начальный экран -->
    <div v-if="!testStarted">
      <h3 class="test-heading">{{ testName }}</h3>
      <p class="test-description">
        Этот тест предназначен для изучения вашей способности мысленно визуализировать и производить манипуляции с графическими объектами (напр. вращать фигуры 3D или собирать различные части в определенное целое). Вам будет представлено несколько различных типов заданий. У вас есть 10 минут, чтобы решить 10 вопросов.
      </p>
      <div class="button-container">
        <button @click="startTest" class="primary-button">Начать тест</button>
      </div>
    </div>
    
    <!-- Экран с вопросами -->
    <div v-else>
      <h3 class="test-heading">{{ testName }}</h3>
      <div v-if="currentQuestionIndex < questions.length">
        <div class="question-info">Вопрос {{ currentQuestionIndex + 1 }}</div>
        
        <div class="question-content">
          <p class="question-text">
            {{ questions[currentQuestionIndex].questionText }}
          </p>
          <img :src="questions[currentQuestionIndex].image" alt="Задание" class="question-image" />
          
          <div class="answer-buttons">
            <button 
              v-for="(answer, index) in questions[currentQuestionIndex].answers" 
              :key="index"
              @click="selectAnswer(index)" 
              class="answer-button"
            >
              {{ answer.text }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- Экран с результатами -->
      <div v-if="testFinished">
        <div class="results-section">
          <h3>Тест завершен!</h3>
          <p>Ваш результат: {{ correctAnswers }} / {{ questions.length }}</p>
          <div v-if="mistakes.length">
            <h4>Ваши ошибки:</h4>
            <ul class="mistakes-list">
              <li v-for="(mistake, index) in mistakes" :key="index" class="mistake-item">
                Вопрос {{ mistake.questionIndex + 1 }}: Вы выбрали "{{ mistake.selectedAnswer }}", но правильный ответ - "{{ mistake.correctAnswer }}"
              </li>
            </ul>
          </div>
          <button @click="$emit('test-complete', correctAnswers, questions.length)" class="primary-button">
            Завершить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pic1 from './static3/test2/1.png';
import pic2 from './static3/test2/2.png';
import pic3 from './static3/test2/3.png';
import pic4 from './static3/test2/4.png';
import pic5 from './static3/test2/5.png';
import pic6 from './static3/test2/6.png';
import pic7 from './static3/test2/7.png';
import pic8 from './static3/test2/8.jpg';
import pic9 from './static3/test2/9.png';
import pic10 from './static3/test2/10.png';

export default {
  data() {
    return {
      testStarted: false,
      currentQuestionIndex: 0,
      correctAnswers: 0,
      mistakes: [],
      testFinished: false,
      selectedAnswers: {},
      questions: [
        {
          questionText: "При правильном соединении верхние части головоломки создадут одну из следующих фигур (1-5). Обратите внимание, что стороны, которые обозначены одинаковыми буквами (А, В, С), должны соприкасаться между собой. Выберите правильный ответ.",
          image: pic1,
          answers: [
            { text: "Ответ 1", correct: true },
            { text: "Ответ 2", correct: false },
            { text: "Ответ 3", correct: false },
            { text: "Ответ 4", correct: false },
            { text: "Ответ 5", correct: false }
          ]
        },
        {
          questionText: "При правильном соединении верхние части головоломки создадут одну из следующих фигур (1-5). Обратите внимание, что стороны, которые обозначены одинаковыми буквами (А, B, С) должны соприкасаться между собой. Выберите правильный ответ.",
          image: pic2,
          answers: [
            { text: "Ответ 1", correct: false },
            { text: "Ответ 2", correct: false },
            { text: "Ответ 3", correct: false },
            { text: "Ответ 4", correct: false },
            { text: "Ответ 5", correct: true }
          ]
        },
        {
          questionText: "Какой из четырех возможных вариантов представляет собой куб в сложенном виде?",
          image: pic3,
          answers: [
            { text: "Ответ 1", correct: false },
            { text: "Ответ 2", correct: false },
            { text: "Ответ 3", correct: true },
            { text: "Ответ 4", correct: false }
          ]
        },
        {
          questionText: "Какой из четырех возможных вариантов представляет верхний куб, показанный с другого ракурса? Каждая грань куба уникальна и не повторяется.",
          image: pic4,
          answers: [
            { text: "Ответ 1", correct: false },
            { text: "Ответ 2", correct: true },
            { text: "Ответ 3", correct: false },
            { text: "Ответ 4", correct: false }
          ]
        },
        {
          questionText: "Вверху представлена фигура. Из следующих 5 вариантов выберите один, изображающий ту же фигуру.",
          image: pic5,
          answers: [
            { text: "Ответ 1", correct: false },
            { text: "Ответ 2", correct: false },
            { text: "Ответ 3", correct: false },
            { text: "Ответ 4", correct: false },
            { text: "Ответ 5", correct: true }
          ]
        },
        {
          questionText: "Укажите правильную комбинацию фигур после вращения верхней модели (обе точки должны располагаться в тех же углах).",
          image: pic6,
          answers: [
            { text: "Ответ 1", correct: false },
            { text: "Ответ 2", correct: true },
            { text: "Ответ 3", correct: false },
            { text: "Ответ 4", correct: false },
            { text: "Ответ 5", correct: false }
          ]
        },
        {
          questionText: "Какое изображение (1-4) является зеркальным отражением верхней фигуры?",
          image: pic7,
          answers: [
            { text: "Ответ 1", correct: true },
            { text: "Ответ 2", correct: false },
            { text: "Ответ 3", correct: false },
            { text: "Ответ 4", correct: false }
          ]
        },
        {
          questionText: "При правильном соединении верхние части головоломки создадут одну из следующих фигур (А- Е). Обратите внимание, что стороны, которые обозначены одинаковыми буквами (х, y, z), должны соприкасаться между собой. Выберите правильный ответ.",
          image: pic8,
          answers: [
            { text: "Ответ 1", correct: false },
            { text: "Ответ 2", correct: true },
            { text: "Ответ 3", correct: false },
            { text: "Ответ 4", correct: false },
            { text: "Ответ 5", correct: false }
          ]
        },
        {
          questionText: "Какая из следующих фигур находится внутри квадрата?",
          image: pic9,
          answers: [
            { text: "Ответ 1", correct: false },
            { text: "Ответ 2", correct: false },
            { text: "Ответ 3", correct: false },
            { text: "Ответ 4", correct: true },
            { text: "Ответ 5", correct: false }
          ]
        },
        {
          questionText: "Какая фигура (1-5) получится при сложении данного шаблона бумаги? Выберите правильный ответ.",
          image: pic10,
          answers: [
            { text: "Ответ 1", correct: false },
            { text: "Ответ 2", correct: false },
            { text: "Ответ 3", correct: true },
            { text: "Ответ 4", correct: false },
            { text: "Ответ 5", correct: false }
          ]
        }
      ]
    };
  },
  methods: {
    startTest() {
      this.testStarted = true;
      this.$emit('test-start');
    },
    selectAnswer(index) {
      const question = this.questions[this.currentQuestionIndex];
      if (this.selectedAnswers[this.currentQuestionIndex] === true) {
        this.correctAnswers--;
      }
      this.selectedAnswers[this.currentQuestionIndex] = question.answers[index].correct;
      if (question.answers[index].correct) {
        this.correctAnswers++;
      } else {
        this.mistakes = this.mistakes.filter(m => m.questionIndex !== this.currentQuestionIndex);
        this.mistakes.push({
          questionIndex: this.currentQuestionIndex,
          selectedAnswer: question.answers[index].text,
          correctAnswer: question.answers.find(ans => ans.correct).text
        });
      }
      this.nextQuestion();
    },
    nextQuestion() {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex >= this.questions.length) {
        this.testFinished = true;
      }
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    }
  }
};
</script>

<style scoped>
.spatial-test-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.test-heading {
  color: #4a63e7;
  font-size: 16px;
  margin-bottom: 10px;
  text-align: center;
}

.test-description {
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  margin-bottom: 20px;
  text-align: left;
}

.question-info {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.question-content {
  padding: 0; /* Убрали все отступы контейнера */
  margin-bottom: 10px;
}

.question-text {
  font-size: 16px !important; /* Принудительно установлен размер шрифта */
  line-height: 1.4;
  margin-bottom: 0; /* Убрали все отступы после текста */
  text-align: center;
}

.question-image {
  max-width: 90%;
  height: auto;
  display: block;
  margin: 10px auto; /* Центрирование и минимальный отступ */
}

.answer-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.answer-button {
  padding: 8px 20px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px !important; /* Принудительно установлен размер шрифта */
  transition: all 0.3s;
}

.answer-button:hover {
  background-color: #e0e0e0;
}

.results-section {
  text-align: center;
  padding: 10px;
  margin-bottom: 10px;
}

.results-section h3,
.results-section h4 {
  font-size: 16px !important; /* Принудительно установлен размер шрифта */
  margin: 8px 0;
}

.results-section p {
  font-size: 16px !important; /* Принудительно установлен размер шрифта */
  margin: 8px 0;
}

.mistakes-list {
  list-style-type: none;
  padding: 0;
  text-align: left;
}

.mistake-item {
  margin-bottom: 8px;
  font-size: 16px !important; /* Принудительно установлен размер шрифта */
}

.button-container {
  margin: 15px 0;
  text-align: center;
}

.primary-button {
  background-color: #4a63e7;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px !important; /* Принудительно установлен размер шрифта */
  margin-top: 10px;
}

.primary-button:hover {
  opacity: 0.9;
}
</style>