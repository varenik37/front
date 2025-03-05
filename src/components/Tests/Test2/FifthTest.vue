<template>
    <div>
      <div v-if="currentQuestion < questions.length && !isTimeUp">
        <p :style="{ color: questions[currentQuestion].color }">
          {{ questions[currentQuestion].word }}
        </p>
        <div class="options">
          <button v-for="color in colors" :key="color" @click="submitAnswer(color)">
            {{ color }}
          </button>
        </div>
      </div>
      <div v-else>
        <h2>Результаты</h2>
        <p>Ваши ответы: {{ answers.join(', ') }}</p>
        <p>Правильные ответы: {{ correctAnswers.join(', ') }}</p>
        <p>Количество правильных ответов: {{ score }} из {{ questions.length }}</p>
      </div>
      <div v-if="!isTimeUp">
        <p>Осталось времени: {{ timeLeft }} секунд</p>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      currentQuestion: 0,
      words: ['Красный', 'Зеленый', 'Синий', 'Желтый', 'Фиолетовый'],
      colors: ['red', 'green', 'blue', 'yellow', 'purple'],
      questions: [],
      answers: [],
      timeLeft: 30, 
      timer: null,
      isTimeUp: false, 
    };
  },
  created() {
    this.questions = this.generateQuestions();
    this.startTimer(); 
  },
  beforeUnmount() {
    clearInterval(this.timer); 
  },
  computed: {
    correctAnswers() {
      return this.questions.map(q => q.color);
    },
    score() {
      return this.answers.filter((answer, index) => answer === this.correctAnswers[index]).length;
    },
  },
  methods: {
    generateQuestions() {
      const questions = [];
      for (let i = 0; i < 5; i++) {
        const word = this.words[Math.floor(Math.random() * this.words.length)];
        let color;
        color = this.colors[Math.floor(Math.random() * this.colors.length)];
        while (color === this.getColorForWord(word)) {
            color = this.colors[Math.floor(Math.random() * this.colors.length)]; // Если цвет совпадает со словом, то меняем
        } 
        questions.push({ word, color });
      }
      return this.shuffleQuestions(questions);
    },
    getColorForWord(word) {
      switch (word) {
        case 'Красный':
          return 'red';
        case 'Зеленый':
          return 'green';
        case 'Синий':
          return 'blue';
        case 'Желтый':
          return 'yellow';
        case 'Фиолетовый':
          return 'purple';
        default:
          return '';
      }
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
        clearInterval(this.timer);
        this.isTimeUp = true;
      }
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.timeLeft--;
        if (this.timeLeft <= 0) {
          clearInterval(this.timer);
          this.isTimeUp = true; 
        }
      }, 1000);
    },
  },
};
</script>