<template>
  <div id="app">
    <div v-if="currentQuestion < questions.length">
      <div class="question-number">Вопрос {{ currentQuestion + 1 }} </div>
      <img :src="currentQuestionData.image" alt="Question Image" />
      <h2>{{ currentQuestionData.question }}</h2>
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
      questions: [
        {
          image: pic1,
          question: "Укажите правильный ответ",
          answers: [
            { text: '3', correct: false },
            { text: '5', correct: true },
            { text: '4', correct: false },
            { text: '2', correct: false },
          ],
        },
        {
          image: pic2,
          question: "Укажите правильный ответ",
          answers: [
            { text: '3', correct: false },
            { text: '4', correct: true },
            { text: '5', correct: false },
            { text: '6', correct: false },
          ],
        },
        {
          image: pic3,
          question: "Укажите правильный ответ",
          answers: [
            { text: '3', correct: false },
            { text: '1', correct: false },
            { text: '2', correct: true },
            { text: '4', correct: false },
          ],
        },
        {
          image: pic4,
          question: "Укажите правильный ответ",
          answers: [
            { text: '8', correct: false },
            { text: '7', correct: true },
            { text: '5', correct: false },
            { text: '6', correct: false },
          ],
        },
        {
          image: pic5,
          question: "Укажите правильный ответ",
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
  mounted() {
    this.$emit('test-start');
  },
  methods: {
    checkAnswer(answer) {
      if (answer.correct) {
        this.score++;
      }
      this.nextQuestion();
    },
    nextQuestion() {
      this.currentQuestion++;
      if (this.currentQuestion >= this.questions.length) {
        this.$emit('test-complete', this.score, this.questions.length);
      }
    }
  }
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