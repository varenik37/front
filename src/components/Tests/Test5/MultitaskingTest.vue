<template>
  <div class="multitasking-test">
    <h2>Тест на многозадачность</h2>

    <div v-if="!isFinished">
      <div class="round-info">
        <h3>Раунд {{ currentRound }}: {{ roundDescription }}</h3>
        <p class="instruction-text">{{ instruction }}</p>
        <p>Время: {{ timeLeft }} секунд</p>
        <p>Жизни: ❤️ {{ lives }}</p>
      </div>

      
      <div class="sorting-game">
        <p>{{ taskDescription }}</p>
        <div class="items">
          <div v-for="(item, index) in currentItems" :key="index" class="item">
            <span :style="{ backgroundColor: item.color || 'transparent' }">{{ item.name }}</span>
            <select v-model="userAnswers[index]">
              <option disabled value="">Выберите</option>
              <option v-for="(person, idx) in persons" :key="idx" :value="person">
                {{ person }}
              </option>
            </select>
          </div>
        </div>
      </div>

      
      <button @click="checkAnswers" :disabled="!allAnswered">
        Подтвердить
      </button>
    </div>

    <!-- Результаты -->
    <div v-if="isFinished">
      <h3>Результаты</h3>
      <p>Правильных ответов: {{ score }}</p>
      <p>Осталось жизней: ❤️ {{ lives }}</p>
      <p>Время, затраченное на тест: {{ timeTaken }} секунд</p> 
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRound: 1,
      lives: 3,
      score: 0,
      timeLeft: 60,
      isFinished: false,
      persons: ["Даша", "Оля", "Маша"],
      currentItems: [],
      roundDescription: "",
      instruction: "",
      taskDescription: "",
      userAnswers: [],
      correctAnswers: [],
      startTime: null,  
      timeTaken: 0,     
    };
  },
  computed: {
    allAnswered() {
      return this.userAnswers.every(answer => answer !== "");
    }
  },
  methods: {
    startTimer() {
      this.startTime = Date.now(); 
      const timerInterval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(timerInterval);
          this.finishTest();
        }
      }, 1000);
    },

    setRound() {
      switch (this.currentRound) {
        case 1:
          this.roundDescription = "Сортировка по цветам";
          this.instruction = "Каждая девочка любит определённый цвет. Разложите покупки в пакеты.";
          this.taskDescription = "Оля любит розовый, Даша – голубой, Маша – жёлтый.";
          this.currentItems = [
            { name: "Розовый шарф", color: "pink" },
            { name: "Голубая футболка", color: "skyblue" },
            { name: "Жёлтые туфли", color: "yellow" },
          ];
          this.correctAnswers = ["Оля", "Даша", "Маша"];
          break;
        case 2:
          this.roundDescription = "Сортировка по количеству";
          this.instruction = "Рассортируйте предметы по количеству.";
          this.taskDescription = "Камушки: Даша – 5, Оля – 10, Маша – 3.";
          this.currentItems = [
            { name: "Камушки (5)", amount: 5 },
            { name: "Листья (10)", amount: 10 },
            { name: "Цветы (3)", amount: 3 },
          ];
          this.correctAnswers = ["Даша", "Оля", "Маша"];
          break;
        case 3:
          this.roundDescription = "Сортировка по форме";
          this.instruction = "Разделите предметы по их форме.";
          this.taskDescription = "Даша – круглые, Оля – квадратные, Маша – треугольные.";
          this.currentItems = [
            { name: "Круглый камень", shape: "круг" },
            { name: "Квадратная коробка", shape: "квадрат" },
            { name: "Треугольный флаг", shape: "треугольник" },
          ];
          this.correctAnswers = ["Даша", "Оля", "Маша"];
          break;
      }
      this.userAnswers = new Array(this.currentItems.length).fill(""); 
    },

    checkAnswers() {
      let roundScore = 0;
      this.userAnswers.forEach((answer, index) => {
        if (answer === this.correctAnswers[index]) {
          roundScore++;
        } else {
          this.lives--;
        }
      });

      this.score += roundScore;

      if (this.lives === 0 || this.currentRound === 3) {
        this.finishTest();
      } else {
        this.currentRound++;
        this.setRound();
      }
    },

    finishTest() {
      this.isFinished = true;
      this.timeTaken = Math.floor((Date.now() - this.startTime) / 1000); 
    }
  },

  mounted() {
    this.setRound();
    this.startTimer();
  }
};
</script>

<style scoped>
.multitasking-test {
  text-align: center;
  padding: 20px;
}

.round-info {
  margin-bottom: 20px;
}

.instruction-text {
  font-size: 18px;
  font-weight: bold;
}

.sorting-game {
  margin-top: 20px;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.item {
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #3b4ce2;
  color: white;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

h3 {
  font-size: 1.5em;
  margin-bottom: 10px;
}
</style>
