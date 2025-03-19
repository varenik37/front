<template>
    <div class="test-container">
      <h2 v-if="!isTestFinished">Выберите правильный знак (= или ≠)</h2>
      
      <div v-if="!isTestFinished" class="questions-container">
        <div v-for="(question, index) in questions" :key="index" class="question">
          <div class="question-content">
            <span class="question-number">{{ index + 1 }}.</span>
            <p>{{ question.text }}</p>
            <div class="button-container">
              <button @click="checkAnswer(index, '=')" :disabled="question.answered">=</button>
              <button @click="checkAnswer(index, '≠')" :disabled="question.answered">≠</button>
            </div>
          </div>
        </div>
      </div>
  
      <button 
        v-if="allQuestionsAnswered && !isTestFinished" 
        @click="finishTest" 
        class="finish-btn"
      >
        Завершить тест
      </button>
  
      <div v-if="isTestFinished">
        <h3>Результаты</h3>
        <p>Правильных ответов: {{ correctAnswers }} из {{ totalQuestions }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "MathTest",
    data() {
      return {
        questions: [],
        correctAnswers: 0,
        totalQuestions: 5,
        isTestFinished: false,
      };
    },
    computed: {
      allQuestionsAnswered() {
        return this.questions.every(q => q.answered);
      },
    },
    methods: {
      generateRandomQuestion() {
        const operations = ['+', '-', '*', '/'];
        const randomOperation = operations[Math.floor(Math.random() * operations.length)];
        const num1 = Math.floor(Math.random() * 100) + 1;
        const num2 = Math.floor(Math.random() * 100) + 1;
        const result = this.calculateResult(num1, num2, randomOperation);
        const incorrectResult = result + (Math.floor(Math.random() * 10) - 5);
  
        return {
          text: `${num1} ${randomOperation} ${num2} и ${incorrectResult}`,
          correctAnswer: result === incorrectResult ? '=' : '≠',
          answered: false,
        };
      },
  
      calculateResult(num1, num2, operation) {
        switch (operation) {
          case '+': return num1 + num2;
          case '-': return num1 - num2;
          case '*': return num1 * num2;
          case '/': return num2 !== 0 ? (num1 / num2).toFixed(2) : 0;
          default: return 0;
        }
      },
  
      checkAnswer(index, answer) {
        if (!this.questions[index].answered) {
          if (this.questions[index].correctAnswer === answer) {
            this.correctAnswers++;
          }
          this.questions[index].answered = true;
        }
      },
  
      finishTest() {
        this.isTestFinished = true;
      },
  
      generateTest() {
        this.questions = [];
        this.correctAnswers = 0;
        this.isTestFinished = false;
  
        for (let i = 0; i < this.totalQuestions; i++) {
          this.questions.push(this.generateRandomQuestion());
        }
      },
    },
  
    mounted() {
      this.generateTest();
    },
  };
  </script>
  
  <style scoped>
  .test-container {
    text-align: center;
    max-width: 600px;
    margin: 30px auto;
  }
  
  
  .questions-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  
  .question {
    background: #f8f8f8;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
 
  .question-number {
    font-weight: bold;
    color: #3b4ce2;
  }
  
  
  .question-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
  
  
  .button-container {
    display: flex;
    gap: 10px;
  }
  
  
  button {
    background: #3b4ce2;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  
  button:disabled {
    background: #999;
    cursor: not-allowed;
  }
  
  button:hover {
    background: #2538df;
  }
  
  .finish-btn {
    background: #4CAF50;
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 30px;
    display: block;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    position: relative; 
    z-index: 10; 
  }
  
  .finish-btn:hover {
    background: #45a049;
  }
  
  h3 {
    font-size: 1.5em;
    margin-top: 20px;
  }
  timer{
    display: block;
  }
  </style>
  