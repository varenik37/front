<template>
  <div id="app">
    <div v-if="currentQuestion < questions.length" id="cont"> 
      <h2>Вопрос {{ currentQuestion + 1 }}</h2>
      <img :src="questions[currentQuestion].image" alt="Question Image"/>
      <div id="test">
        <div v-for="(option, index) in questions[currentQuestion].options" :key="index">
          <button @click="selectAnswer(option)">{{ option.text }}</button>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>Результаты теста</h2>
      <p>Вы ответили правильно на {{ correctAnswers }} из {{ questions.length }} вопросов.</p>
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
  mounted() {
    this.$emit('test-start');
  },
  methods: {
    selectAnswer(option) {
      this.selectedAnswer = option;
      if (option.correct) {
        this.correctAnswers++;
      }
      this.nextQuestion();
    },
    nextQuestion() {
      this.currentQuestion++;
      this.selectedAnswer = null;
      
      if (this.currentQuestion >= this.questions.length) {
        setTimeout(() => {
          this.$emit('test-complete', this.correctAnswers, this.questions.length);
        }, 2000);
      }
    }
  }
};
</script>

<style>
#test {
  display: flex;
  flex-wrap: no-wrap;
  justify-content: center;
} 
</style>