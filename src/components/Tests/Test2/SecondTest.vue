<template>
    <div id="app">
      <h1>Тест на сравнение строк</h1>
      <div v-if="!isTestFinished">
        <h2>Вопрос {{ currentQuestion + 1 }}</h2>
        <div id="variants">
            <strong>Строка 1: {{ currentPair.string1 }}</strong>
            <strong>Строка 2: {{ currentPair.string2 }}</strong>
        </div>
        <div>
          <button @click="checkAnswer(true)">Одинаковые</button>
          <button @click="checkAnswer(false)">Не одинаковые</button>
        </div>
        <p>Осталось времени: {{ timeLeft }} секунд</p>
      </div>
      <div v-else>
        <h2>Результаты теста</h2>
        <p>Вы ответили правильно на {{ correctAnswers }} из {{ totalQuestions }} вопросов.</p>
        <p>Время прохождения теста: {{ totalTime }} секунд</p>
        <button @click="restartTest">Пройти тест снова</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentQuestion: 0,
        correctAnswers: 0,
        totalTime: 0,
        timeLeft: 30,
        timer: null,
        isTestFinished: false,
        questions: [
          { string1: "ууйцууу", string2: "ууйцууу" },
          { string1: "ооОооОооО", string2: "ооОооОоО" },
          { string1: "вувовоувввв", string2: "вувовоуввв" },
          { string1: "ГгГОрВвввыы", string2: "ГгГОрВвввыы" },
          { string1: "zzZzZZZzzzZzZZz", string2: "zzZzZZZzzZzZZz" },
          { string1: "Оваовоаува", string2: "Оваовоаува" },
        ],
      };
    },
    computed: {
      currentPair() {
        return this.questions[this.currentQuestion];
      },
      totalQuestions() {
        return this.questions.length;
      },
    },
    methods: {
      startTimer() {
        this.timer = setInterval(() => {
          if (this.timeLeft > 0) {
            this.timeLeft--;
          } else {
            this.finishTest();
          }
        }, 1000);
      }, 
      checkAnswer(isSame) {
        const areEqual = this.currentPair.string1 === this.currentPair.string2;
        if (isSame === areEqual) {
          this.correctAnswers++;
        }
        this.currentQuestion++;
        if (this.currentQuestion >= this.totalQuestions) {
          this.finishTest();
        }
      },
      finishTest() {
        clearInterval(this.timer);
        this.totalTime = 30 - this.timeLeft;
        this.isTestFinished = true;
      },
      restartTest() {
        this.currentQuestion = 0;
        this.correctAnswers = 0;
        this.totalTime = 0;
        this.timeLeft = 30;
        this.isTestFinished = false;
        this.startTimer();
      },
    },
    mounted() {
      this.startTimer();
    },
    beforeUnmount() {
      clearInterval(this.timer);
    },
  };
  </script>
  
  <style>
  button {
    margin: 5px;
  }
  strong{
    margin: 20px;
  }

  </style>