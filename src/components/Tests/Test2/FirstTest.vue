<template>
  <div id="app">
    <div v-if="currentQuestion < questions.length" id="cont"> 
      <h2>Вопрос {{ currentQuestion + 1 }}</h2>
      <img :src="questions[currentQuestion].image" alt="Question Image"/>
      <div class="timer">Осталось времени: {{ timeLeft }} секунд</div>
      <div id="test">
        <div v-for="(option, index) in questions[currentQuestion].options" :key="index">
          <button @click="selectAnswer(option)">{{ option.text }}</button>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>Результаты теста</h2>
      <p>Вы ответили правильно на {{ correctAnswers }} из {{ questions.length }} вопросов.</p>
      <button @click="restartTest">Пройти тест снова</button>
    </div>
  </div>
</template>

<script>
import pic1 from './static/test1/1.png';
import pic2 from './static/test1/2.png';
import pic3 from './static/test1/3.png';
import pic4 from './static/test1/4.png';
import pic5 from './static/test1/5.png';

export default {
data() {
  return {
    currentQuestion: 0,
    selectedAnswer: null,
    correctAnswers: 0,
    timeLeft: 30, 
    timer: null, 
    questions: [
      {
        image: pic1,
        options: [
          { text: 'Ответ 1', correct: true },
          { text: 'Ответ 2', correct: false },
          { text: 'Ответ 3', correct: false },
          { text: 'Ответ 4', correct: false },
          { text: 'Ответ 5', correct: false },
        ],
      },
      {
        image: pic2,
        options: [
          { text: 'Ответ 1', correct: false },
          { text: 'Ответ 2', correct: false },
          { text: 'Ответ 3', correct: false },
          { text: 'Ответ 4', correct: false },
          { text: 'Ответ 5', correct: true },
        ],
      },
      {
        image: pic3,
        options: [
          { text: 'Ответ 1', correct: false },
          { text: 'Ответ 2', correct: false },
          { text: 'Ответ 3', correct: true },
          { text: 'Ответ 4', correct: false },
        ],
      },
      {
        image: pic4,
        options: [
          { text: 'Ответ 1', correct: false },
          { text: 'Ответ 2', correct: true },
          { text: 'Ответ 3', correct: false },
          { text: 'Ответ 4', correct: false },
        ],
      },
      {
        image: pic5,
        options: [
          { text: 'Ответ 1', correct: false },
          { text: 'Ответ 2', correct: false },
          { text: 'Ответ 3', correct: false },
          { text: 'Ответ 4', correct: false },
          { text: 'Ответ 5', correct: true },
        ],
      },
    ],
  };
},
methods: {
  startTimer() {
    this.timeLeft = 30; 
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.nextQuestion(); 
      }
    }, 1000);
  },
  selectAnswer(option) {
    this.selectedAnswer = option;
    if (option.correct) {
      this.correctAnswers++;
    }
    clearInterval(this.timer); 
    this.nextQuestion();
  },
  nextQuestion() {
    this.currentQuestion++;
    this.selectedAnswer = null;
    if (this.currentQuestion < this.questions.length) {
      this.startTimer(); 
    }
  },
  restartTest() {
    this.currentQuestion = 0;
    this.correctAnswers = 0;
    this.selectedAnswer = null;
    clearInterval(this.timer);
    this.startTimer();
  },
},
created() {
  this.startTimer(); 
},
beforeUnmount() {
  clearInterval(this.timer); 
},
};
</script>

<style>
#test {
display: flex;
flex-wrap: no-wrap;
justify-content: center;
} 
.timer {
font-size: 20px;
margin-bottom: 10px;
}
</style>