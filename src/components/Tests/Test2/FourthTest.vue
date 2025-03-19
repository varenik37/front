<template>
  <div id="app">
    <h1>Запомни числа!</h1>
    <div v-if="!gameOver">
      <div v-if="showNumbers">
        <div class="grid">
          <div v-for="(number, index) in numbers" :key="index" class="grid-item">
            {{ number }}
          </div>
        </div>
      </div>
      <div v-else>
        <div class="grid">
          <input
            v-for="(input, index) in inputs"
            :key="'input-' + index"
            type="number"
            v-model="inputs[index]"
            placeholder="?"
            class="input-field"
          />
        </div>
        <button @click="checkAnswers">Проверить</button>
      </div>
    </div>
    <div v-else>
      <h2>Игра окончена!</h2>
      <p>Ваш результат: {{ score }} из 12</p>
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
    };
  },
  mounted() {
    this.$emit('test-start');
    
    // Автоматически переключаемся на ввод через 30 секунд
    setTimeout(() => {
      this.showNumbers = false;
    }, 30000);
  },
  methods: {
    checkAnswers() {
      this.score = this.numbers.filter((number, index) => number === Number(this.inputs[index])).length;
      this.gameOver = true;
      this.$emit('test-complete', this.score, 12);
    }
  }
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