<template>
  <div id="app">
    <!-- Начальный экран с выбором теста -->
    <div v-if="!started">
      <h1>Выбор теста</h1>
      <!-- Кнопки для выбора теста -->
      <button @click="selectTest('stroop')">Тест Струпа</button>
      <button @click="selectTest('colorGame')">Тест на отличия цвета</button>
    </div>

    <!-- Экран теста Струпа -->
    <div v-else-if="selectedTest === 'stroop'">
      <!-- Если тест еще не начат -->
      <div v-if="!inProgress">
        <h1>Тест Струпа</h1>
        <button @click="startTest">Начать тест</button>
      </div>

      <!-- Во время выполнения теста -->
      <div v-else-if="inProgress">
        <h1>Тест Струпа</h1>
        <p>Оставшееся время: {{ timer }} секунд</p>
        <div v-if="currentQuestion">
          <!-- Показываем слово с цветом -->
          <h2 :style="{ color: currentQuestion.color }">
            {{ currentQuestion.word }}
          </h2>
          <div>
            <!-- Кнопки для выбора ответа -->
            <button 
              v-for="option in options" 
              :key="option" 
              @click="checkAnswer(option)">
              {{ option }}
            </button>
          </div>
        </div>
      </div>

      <!-- После завершения теста -->
      <div v-if="!inProgress && showStroopResults">
        <h1>Результаты теста Струпа</h1>
        <p>Правильные ответы: {{ correctAnswers }}</p>
        <p>Неправильные ответы: {{ wrongAnswers }}</p>
        <p>Результат: {{ score }}%</p>
        <p>Тест завершён за: {{ elapsedTime }} секунд</p>
        <!-- Кнопки для повторного прохождения или возврата -->
        <button @click="retryTest">Повторить</button>
        <button @click="goBack">Вернуться назад</button>
      </div>
    </div>

    <!-- Результаты теста на цвета -->
    <div v-if="!inProgress && showColorGameResults">
      <h1>Результаты теста на отличия цвета</h1>
      <p>Тест завершён. Вы прошли {{ currentLevel - 1 }} уровней.</p>
      <button @click="retryColorGame">Повторить</button>
      <button @click="goBack">Вернуться назад</button>
    </div>

    <!-- Экран теста на отличия цвета -->
    <div v-else-if="selectedTest === 'colorGame'">
      <!-- Если тест еще не начат -->
      <div v-if="!inProgress">
        <h1>Тест на отличия цвета</h1>
        <button @click="startColorGame">Начать тест</button>
      </div>

      <!-- Во время выполнения теста -->
      <div v-else-if="inProgress">
        <h1>Уровень {{ currentLevel }}</h1>
        <p>Выберите цвет, который отличается:</p>
        <div class="grid">
          <div 
            v-for="(color, index) in gridColors" 
            :key="index" 
            :style="{ backgroundColor: color }"
            class="grid-item"
            @click="checkGridAnswer(index)">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      // Общие параметры
      started: false,
      selectedTest: null,
      inProgress: false,
      timer: 30,
      interval: null,
      startTime: null,
      elapsedTime: 0,

      // Тест Струпа
      questions: [
        { word: "Красный", color: "Blue", correct: "Синий" },
        { word: "Зелёный", color: "Red", correct: "Красный" },
        { word: "Синий", color: "Green", correct: "Зелёный" },
        { word: "Жёлтый", color: "Purple", correct: "Фиолетовый" },
      ],
      currentQuestion: null,
      options: ["Красный", "Синий", "Зелёный", "Жёлтый", "Фиолетовый"],
      correctAnswers: 0,
      wrongAnswers: 0,
      showStroopResults: false, // Новый флаг для результатов теста Струпа

      // Тест на отличия цвета
      currentLevel: 1,
      maxLevels: 10,
      gridColors: [],
      correctIndex: null,
      showColorGameResults: false, // Новый флаг для результатов теста на цвета
    };
  },

  computed: {
    score() {
      const total = this.correctAnswers + this.wrongAnswers;
      return total === 0 ? 0 : Math.round((this.correctAnswers / total) * 100);
    },
  },
  methods: {
    selectTest(test) {
      this.selectedTest = test;
      this.started = true;
    },
    startTest() {
      this.inProgress = true;
      this.correctAnswers = 0;
      this.wrongAnswers = 0;
      this.timer = 30;
      this.startTime = Date.now();
      this.nextQuestion();
      this.startTimer();
    },
    nextQuestion() {
      if (this.questions.length > 0) {
        const index = Math.floor(Math.random() * this.questions.length);
        this.currentQuestion = this.questions.splice(index, 1)[0];
      } else {
        this.endTest();
      }
    },
    checkAnswer(answer) {
      if (this.currentQuestion.correct === answer) {
        this.correctAnswers++;
      } else {
        this.wrongAnswers++;
      }
      this.nextQuestion();
    },
    startTimer() {
      this.interval = setInterval(() => {
        this.timer--;
        if (this.timer <= 0) {
          this.endTest();
        }
      }, 1000);
    },
    
    endTest() {
      clearInterval(this.interval);
      this.elapsedTime = Math.round((Date.now() - this.startTime) / 1000);
      this.inProgress = false;
      this.showStroopResults = true; // Отображаем результаты теста Струпа
    },
    retryTest() {
      this.questions = [
        { word: "Красный", color: "Blue", correct: "Синий" },
        { word: "Зелёный", color: "Red", correct: "Красный" },
        { word: "Синий", color: "Green", correct: "Зелёный" },
        { word: "Жёлтый", color: "Purple", correct: "Фиолетовый" },
      ];
      this.showStroopResults = false; // Скрываем результаты
      this.startTest();
    },

    startColorGame() {
      this.inProgress = true;
      this.currentLevel = 1;
      this.generateGrid();
    },
    generateGrid() {
      const baseColor = this.randomColor();
      const differentColor = this.generateSimilarColor(baseColor);
      const gridSize = 8;
      this.gridColors = Array(gridSize).fill(baseColor);
      this.correctIndex = Math.floor(Math.random() * gridSize);
      this.gridColors[this.correctIndex] = differentColor;
    },

    generateSimilarColor(baseColor) {
      // Убираем "#" из baseColor и преобразуем его в массив RGB
      let r = parseInt(baseColor.slice(1, 3), 16);
      let g = parseInt(baseColor.slice(3, 5), 16);
      let b = parseInt(baseColor.slice(5, 7), 16);

      // Создаем небольшое отклонение для каждого компонента
      const delta = 26; // степень отклонения (чем меньше, тем ближе оттенки)
      r = Math.min(255, Math.max(0, r + (Math.random() > 0.5 ? delta : -delta)));
      g = Math.min(255, Math.max(0, g + (Math.random() > 0.5 ? delta : -delta)));
      b = Math.min(255, Math.max(0, b + (Math.random() > 0.5 ? delta : -delta)));

      // Преобразуем обратно в шестнадцатеричный цвет
      return `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    },


    checkGridAnswer(index) {
      if (index === this.correctIndex) {
        this.currentLevel++;
        if (this.currentLevel > this.maxLevels) {
          this.endColorGame();
        } else {
          this.generateGrid();
        }
      } else {
        this.endColorGame();
      }
    },
    endColorGame() {
      this.inProgress = false;
      this.showColorGameResults = true; // Отображаем результаты теста на цвета
    },
    retryColorGame() {
      this.currentLevel = 1;
      this.showColorGameResults = false; // Скрываем результаты
      this.startColorGame();
    },
    goBack() {
      this.started = false;
      this.selectedTest = null;
      this.inProgress = false;
      this.showStroopResults = false;
      this.showColorGameResults = false;
      this.questions = [
        { word: "Красный", color: "Blue", correct: "Синий" },
        { word: "Зелёный", color: "Red", correct: "Красный" },
        { word: "Синий", color: "Green", correct: "Зелёный" },
        { word: "Жёлтый", color: "Purple", correct: "Фиолетовый" },
      ];
      this.correctAnswers = 0;
      this.wrongAnswers = 0;
      this.currentLevel = 1;
      clearInterval(this.interval);
    },

    randomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 20px;
}
button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
h2 {
  font-size: 36px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}
.grid-item {
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  cursor: pointer;
}
</style>
