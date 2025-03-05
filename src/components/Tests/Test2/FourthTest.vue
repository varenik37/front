<template>
  <div id="app">
    <h1>Запомни числа!</h1>
    <div v-if="!gameOver">
      <div v-if="showNumbers" class="timer">Осталось времени: {{ time }} секунд</div> <!-- Отображение таймера -->
      <div class="grid">
        <div v-if="showNumbers">
          <div v-for="(number, index) in numbers" :key="index" class="grid-item">
            {{ number }}
          </div>
        </div>
        <div v-else>
          <input
            v-for="(input, index) in inputs"
            :key="'input-' + index"
            type="number"
            v-model="inputs[index]"
            placeholder="?"
            class="input-field"
          />
        </div>
      </div>
      <button v-if="!showNumbers" @click="checkAnswers">Проверить</button>
    </div>
    <div v-else>
      <h2>Игра окончена!</h2>
      <p>Ваш результат: {{ score }} из 12</p>
      <button @click="restartGame">Начать заново</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numbers: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
      inputs: Array(12).fill(null),
      showNumbers: true,
      gameOver: false,
      score: 0,
      time: 30, 
      timer: null,
    };
  },
  created() {
    this.startTimer();
  },
  beforeUnmount() {
    clearInterval(this.timer); 
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.time--;
        if (this.time <= 0) {
          clearInterval(this.timer);
          this.showNumbers = false;
        }
      }, 1000);
    },
    checkAnswers() {
      this.score = this.numbers.filter((number, index) => number === Number(this.inputs[index])).length;
      this.gameOver = true;
      clearInterval(this.timer); 
    },
    restartGame() {
      this.inputs.fill(null);
      this.showNumbers = true;
      this.gameOver = false;
      this.score = 0;
      this.numbers = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));
      this.time = 30; 
      this.startTimer();
    },
  },
};
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 20px 0;
}

.grid-item {
  background-color: black;
  padding: 20px;
  border: 1px solid #ccc;
  font-size: 24px;
}

.input-field {
  width: 100%;
  padding: 10px;
  font-size: 24px;
}
</style>