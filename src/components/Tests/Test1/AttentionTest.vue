<template>
  <div class="attention-test" @click="handleClick">
    <div v-if="!testStarted" class="start-screen">
      <h2>Нажмите, чтобы начать тест</h2>
      <p>Это тест на внимательность. Вам нужно будет выбирать из предложенных вариантов слова правильно описывающие цвет слов на экране.</p>
    </div>

    <div v-else-if="currentTask <= totalTasks && !testCompleted">
      <h2>Задание {{ currentTask }}</h2>
      <div class="words-container">
        <div class="words">
          <span
            v-for="(word, index) in taskWords"
            :key="index"
            :style="{ color: word.color }"
            class="word"
          >
            {{ word.text }}
          </span>
        </div>
      </div>
      <div class="options">
        <button
          v-for="(option, index) in options"
          :key="index"
          @click="checkAnswer(option)"
          class="option-button"
        >
          {{ formatOption(option) }}
        </button>
      </div>
      <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <div v-if="testCompleted" class="result">
      <h3>Тест завершен!</h3>
      <p>Вы правильно ответили на {{ score }} из {{ totalTasks }} вопросов.</p>
      <button @click="restartTest" class="restart-button">Пройти тест заново</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTask: 1,
      totalTasks: 10,
      words: ['Красный', 'Синий','Зеленый','Желтый','Белый'],
      colors: ['red', 'blue', 'green', 'yellow', 'white'],
      taskWords: [],
      correctAnswer: [],
      options: [],
      score: 0,
      testStarted: false,
      testCompleted: false,
    };
  },
  computed: {
    progress() {
      return (this.currentTask / this.totalTasks) * 100;
    },
  },
  methods: {
    handleClick() {
      if (!this.testStarted) {
        this.testStarted = true;
        this.$emit('test-start');
        this.generateTask();
      }
    },
    generateTask() {
      const wordsCount = Math.min(this.currentTask, 10); // Ограничиваем до 10 слов
      const words = [];
      const answer = [];
      for (let i = 0; i < wordsCount; i++) {
        const randomColorText = this.words[Math.floor(Math.random() * this.words.length)];
        const randomColorIndex = Math.floor(Math.random() * this.colors.length);
        const randomColor = this.colors[randomColorIndex];
        words.push({ text: randomColorText, color: randomColor });
        answer.push(this.words[randomColorIndex]);
      }
      this.taskWords = words;
      this.correctAnswer = answer;

      const options = [];
      const correctOption = [...answer];
      options.push(correctOption);

      while (options.length < 3) {
        const randomOption = []
        for(let i = 0; i < wordsCount; i++){
          randomOption.push(this.words[Math.floor(Math.random() * this.words.length)])
        }

        if (!options.some((opt) => JSON.stringify(opt) === JSON.stringify(randomOption))) {
          options.push(randomOption);
        }
      }

      this.options = options.sort(() => Math.random() - 0.5);
    },
    formatOption(option) {
      // Форматируем длинные варианты ответов для лучшего отображения
      if (option.length > 6) {
        // Разделяем на две строки, если вариантов много
        const firstHalf = option.slice(0, Math.ceil(option.length/2)).join(', ');
        const secondHalf = option.slice(Math.ceil(option.length/2)).join(', ');
        return firstHalf + ',\n' + secondHalf;
      }
      return option.join(', ');
    },
    checkAnswer(selectedOption) {
      if (JSON.stringify(selectedOption) === JSON.stringify(this.correctAnswer)) {
        this.score++;
      }
      if (this.currentTask < this.totalTasks) {
        this.currentTask++;
        this.generateTask();
      } else {
        this.testCompleted = true;
        this.$emit('test-complete', this.score);
      }
    },
    restartTest() {
      this.currentTask = 1;
      this.score = 0;
      this.testCompleted = false
      this.generateTask();
      this.$emit('test-start');
    },
  },
};
</script>

<style>
.attention-test {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.start-screen {
  max-width: 600px;
  margin: 20px auto;
}

.words-container {
  width: 100%;
  margin: 20px 0;
  padding: 10px;
  overflow: hidden;
}

.words {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  max-width: 90%;
}

.word {
  font-size: 24px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  display: inline-block;
}

.options {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  width: 100%;
}

.option-button {
  min-height: 60px;
  width: 90%;
  max-width: 600px;
  padding: 12px 15px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1.4;
  white-space: pre-wrap;
  transition: all 0.2s;
}

.option-button:hover {
  background-color: #f0f4ff;
  border-color: #3b4ce2;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: #ddd;
  margin: 20px 0;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #4caf50;
  transition: width 0.3s;
}

.result {
  margin: 20px 0;
  padding: 20px;
  background-color: #f0f4ff;
  border-radius: 8px;
  border-left: 4px solid #3b4ce2;
  text-align: center;
  width: 90%;
  max-width: 600px;
}

.restart-button {
  background-color: #3b4ce2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 15px;
}

.restart-button:hover {
  background-color: #2d3ebd;
}

h2 {
  color: #3b4ce2;
  margin-bottom: 20px;
}
</style>
