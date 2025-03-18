<template>
  <div class="puzzle-container">
    <h2 v-if="!isFinished">Собери пазл ({{ currentLevel }}/5)</h2>

    <div v-if="!isFinished" class="puzzle-grid" 
         :style="{ gridTemplateColumns: `repeat(${gridX}, 1fr)`, gridTemplateRows: `repeat(${gridY}, 1fr)` }">
      <div
        v-for="(piece, index) in shuffledPieces"
        :key="piece.id"
        class="puzzle-piece"
        :style="{ backgroundImage: `url(${currentImage})`, backgroundPosition: piece.position }"
        @dragstart="dragStart(index)"
        @dragover.prevent
        @drop="drop(index)"
        draggable="true"
      ></div>
    </div>

    <div v-if="!isFinished">
      <button @click="shufflePuzzle">Перемешать</button>
      <button @click="checkPuzzle">Подтвердить</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="isSolved && currentLevel < levels.length">✅ Правильно! Нажмите "Следующий уровень"</p>
      <button v-if="isSolved && currentLevel < levels.length" @click="nextLevel">Следующий уровень</button>
      <button v-if="isSolved && currentLevel === levels.length" @click="finishTest">Завершить тест</button>
    </div>

    <div v-if="isFinished">
      <h2>Результаты</h2>
      <p>Количество собранных пазлов: {{ score }} из {{ levels.length }}</p>
      <p>Общее количество попыток: {{ attempts }}</p>
      <p>Точность: {{ accuracy }}%</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PuzzleGame",
  data() {
    return {
      levels: [ [2, 2], [3, 2], [3, 3], [4, 3], [4, 4] ], // Размер сетки на каждом уровне
      currentLevel: 1,
      gridX: 2,
      gridY: 2,
      pieces: [],
      shuffledPieces: [],
      draggedIndex: null,
      score: 0,
      attempts: 0,
      isSolved: false,
      isFinished: false,
      errorMessage: "",
      levelImages: [
        require('./static5/puzzle1.jpg'),
        require('./static5/puzzle2.jpg'),
        require('./static5/puzzle3.jpg'),
        require('./static5/puzzle4.jpg'),
        require('./static5/puzzle5.jpg')
      ]
    };
  },
  computed: {
    currentImage() {
      return this.levelImages[this.currentLevel - 1];
    },
    accuracy() {
      return this.attempts > 0 ? ((this.score / this.attempts) * 100).toFixed(1) : 0;
    },
  },
  methods: {
    generatePuzzle() {
      // Логика генерации пазла
      const [x, y] = this.levels[this.currentLevel - 1];
      this.gridX = x;
      this.gridY = y;

      this.pieces = [];
      const stepX = 100 / (x - 1);
      const stepY = 100 / (y - 1);
      let id = 0;

      for (let row = 0; row < y; row++) {
        for (let col = 0; col < x; col++) {
          this.pieces.push({
            id: id++,
            position: `${-col * stepX}% ${-row * stepY}%`,
          });
        }
      }

      // Перемешиваем пазлы после создания
      this.shufflePuzzle();
      console.log('Пазлы после перемешивания:', this.shuffledPieces);
      this.isSolved = false;
      this.errorMessage = "";
    },

    // Функция для перемешивания пазлов
    shufflePuzzle() {
      this.shuffledPieces = JSON.parse(JSON.stringify(this.pieces)).sort(() => Math.random() - 0.5);
    },

    dragStart(index) {
      this.draggedIndex = index;
    },

    drop(index) {
      if (this.draggedIndex !== null) {
        [this.shuffledPieces[index], this.shuffledPieces[this.draggedIndex]] =
          [this.shuffledPieces[this.draggedIndex], this.shuffledPieces[index]];
        this.draggedIndex = null;
      }
    },

    // Проверка правильности собранного пазла
    checkPuzzle() {
    this.attempts++;

    const expectedOrder = this.pieces.map(p => p.id).sort((a, b) => a - b);
    const currentOrder = this.shuffledPieces.map(p => p.id).sort((a, b) => a - b);

    console.log("Ожидаемый порядок:", expectedOrder);
    console.log("Текущий порядок:", currentOrder);

    if (JSON.stringify(currentOrder) === JSON.stringify(expectedOrder)) {
      this.isSolved = true;
      this.score++;
      this.errorMessage = "";
    } else {
      this.errorMessage = "❌ Пазл собран неправильно, попробуйте ещё раз!";
    }
  },

    finishTest() {
      this.isFinished = true;
    },

    nextLevel() {
      if (this.currentLevel < this.levels.length) {
        this.currentLevel++;
        this.generatePuzzle();
      } else {
        this.isFinished = true;
      }
    },
  },
  
  mounted() {
    this.generatePuzzle();
  },
};
</script>

<style scoped>
.puzzle-container {
  text-align: center;
  max-width: 400px;
  margin: auto;
}
.puzzle-grid {
  display: grid;
  width: 300px;
  height: 300px;
  margin: 20px auto;
  border: 2px solid #333;
}
.puzzle-piece {
  width: 100%;
  height: 100%;
  background-size: 300px 300px;
  cursor: grab;
  border: 1px solid #999;
}
.success-message {
  color: green;
  font-weight: bold;
}
.error-message {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
button {
  background: #3b4ce2;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin: 5px;
}
button:hover {
  background: #2538df;
}
</style>
