<template>
    <div id="app">
      <div v-if="currentQuestion < questions.length">
        <div class="question-number">Вопрос {{ currentQuestion + 1 }} </div>
        <img :src="currentQuestionData.image" alt="Question Image" />
        <h2>{{ currentQuestionData.question }}</h2>
        <div class="timer">Осталось времени: {{ timeLeft }} секунд</div> 
        <ul>
            <div id="test">
                <li v-for="(answer, index) in currentQuestionData.answers" :key="index">
                    <button @click="checkAnswer(answer)">{{ answer.text }}</button>
                </li>
            </div>
        </ul>
      </div>
      <div v-else>
        <h2>Тест завершен!</h2>
        <p>Ваш результат: {{ score }} из {{ questions.length }}</p>
        <button @click="restartTest">Пройти тест снова</button>
      </div>
    </div>
</template>

<script>
import pic1 from './static/test3/1.jpg';
import pic2 from './static/test3/2.jpg';
import pic3 from './static/test3/3.jpg';
import pic4 from './static/test3/4.jpg';
import pic5 from './static/test3/5.jpg';

export default {
  data() {
    return {
      currentQuestion: 0,
      score: 0,
      timeLeft: 30,
      timer: null,
      questions: [
        {
          image: pic1,
          answers: [
            { text: '3', correct: false },
            { text: '5', correct: true },
            { text: '4', correct: false },
            { text: '2', correct: false },
          ],
        },
        {
          image: pic2,
          answers: [
            { text: '3', correct: false },
            { text: '4', correct: true },
            { text: '5', correct: false },
            { text: '6', correct: false },
          ],
        },
        {
          image: pic3,
          answers: [
            { text: '3', correct: false },
            { text: '1', correct: false },
            { text: '2', correct: true },
            { text: '4', correct: false },
          ],
        },
        {
          image: pic4,
          answers: [
            { text: '8', correct: false },
            { text: '7', correct: true },
            { text: '5', correct: false },
            { text: '6', correct: false },
          ],
        },
        {
          image: pic5,
          answers: [
            { text: '4', correct: false },
            { text: '2', correct: false },
            { text: '1', correct: false },
            { text: '3', correct: true },
          ],
        },
      ],
    };
  },
  computed: {
    currentQuestionData() {
      return this.questions[this.currentQuestion];
    },
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
    checkAnswer(answer) {
      if (answer.correct) {
        this.score++;
      }
      clearInterval(this.timer);
      this.nextQuestion();
    },
    nextQuestion() {
      this.currentQuestion++;
      if (this.currentQuestion < this.questions.length) {
        this.startTimer(); 
      }
    },
    restartTest() {
      this.currentQuestion = 0;
      this.score = 0;
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
ul {
  list-style-type: none;
}
#test {
  display: flex;
  flex-wrap: no-wrap;
  justify-content: center;
}
.question-number {
  font-size: 24px;
  margin-bottom: 10px;
}
</style>