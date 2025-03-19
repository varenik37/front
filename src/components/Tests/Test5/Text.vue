<template>
    <div class="test-container">
      <h2 v-if="!isTestFinished">Прочитайте текст и выберите, о чём он</h2>
  
      <div v-if="!isTestFinished">
        <div class="question">
          <p class="text-block">{{ currentQuestion.text }}</p>
          <div class="button-container">
            <button
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              @click="checkAnswer(option)"
              :disabled="selectedAnswer !== null"
              class="answer-button"
            >
              {{ option }}
            </button>
          </div>
        </div>
  
        <p v-if="feedbackMessage" :class="{'correct': isCorrect, 'incorrect': !isCorrect}">
          {{ feedbackMessage }}
        </p>
  
        <button v-if="selectedAnswer !== null && currentQuestionIndex < questions.length - 1"
                @click="nextQuestion"
                class="next-btn">
          Следующий вопрос
        </button>
  
        <button v-if="selectedAnswer !== null && currentQuestionIndex === questions.length - 1"
                @click="finishTest"
                class="finish-btn">
          Завершить тест
        </button>
      </div>
  
      <div v-if="isTestFinished">
        <h3>Результаты</h3>
        <p>Вы правильно ответили на {{ correctAnswers }} из {{ questions.length }} вопросов.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "TextAnalysisTest",
    data() {
      return {
        questions: [
          {
            text: "«Уж небо осенью дышало, уж реже солнышко вставало, короче становился день…»",
            options: ["Изменения природы", "Глобализация", "Конец света"],
            correct: "Изменения природы",
          },
          {
            text: "«Сквозь волнистые туманы пробирается луна, на печальные поляны льет печально свет она…»",
            options: ["Одинокая луна", "Фантастика", "Погодные явления"],
            correct: "Одинокая луна",
          },
          {
            text: "«Лес рубят – щепки летят.»",
            options: ["Последствия действий", "Строительство", "Переработка дерева"],
            correct: "Последствия действий",
          },
        ],
        currentQuestionIndex: 0,
        selectedAnswer: null,
        correctAnswers: 0,
        isTestFinished: false,
        feedbackMessage: "",
        isCorrect: false,
      };
    },
    computed: {
      currentQuestion() {
        return this.questions[this.currentQuestionIndex];
      }
    },
    methods: {
      checkAnswer(option) {
        this.selectedAnswer = option;
        if (option === this.currentQuestion.correct) {
          this.correctAnswers++;
          this.feedbackMessage = "✅ Верно!";
          this.isCorrect = true;
        } else {
          this.feedbackMessage = "❌ Неправильно.";
          this.isCorrect = false;
        }
      },
      nextQuestion() {
        this.currentQuestionIndex++;
        this.selectedAnswer = null;
        this.feedbackMessage = "";
      },
      finishTest() {
        this.isTestFinished = true;
      }
    }
  };
  </script>
  
  <style scoped>
  .test-container {
    text-align: center;
    max-width: 600px;
    margin: 50px auto;
    padding-bottom: 200px; 
  }
  
  .text-block {
    font-size: 18px;
    font-style: italic;
    background: #f8f8f8;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    line-height: 1.5;
    text-align: center;
  }
  
  .questions-section {
    margin-top: 60px; 
  }
  
  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    margin-top: 15px;
  }
  
  .answer-button {
    background: #3b4ce2;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s ease;
    width: 80%;
    max-width: 400px;
    display: inline-block;
  }
  
  button:disabled {
    background: #999;
    cursor: not-allowed;
  }
  
  button:hover {
    background: #2538df;
  }
  
  .correct {
    color: green;
    font-weight: bold;
    margin-top: 15px;
  }
  
  .incorrect {
    color: red;
    font-weight: bold;
    margin-top: 15px;
  }
  
  .next-btn {
    background: #ff9800;
    margin-top: 20px;
    padding: 12px 20px;
    width: 80%;
    max-width: 400px;
    display: inline-block;
  }
  
  .next-btn:hover {
    background: #e68900;
  }
  
  .finish-btn {
    background: #4CAF50;
    margin-top: 20px;
    padding: 12px 20px;
    width: 80%;
    max-width: 400px;
    display: inline-block;
  }
  
  .finish-btn:hover {
    background: #45a049;
  }
  
  .result-section {
    margin-top: 30px;
  }
  
  h3 {
    font-size: 1.5em;
    margin-top: 20px;
  }
  
  /* Кнопка выхода в меню */
  .menu-button {
    background: #f44336;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s ease;
    width: 80%;
    max-width: 400px;
    margin-top: 40px;
    display: inline-block;
  }
  
  .menu-button:hover {
    background: #d32f2f;
  }
  </style>
  