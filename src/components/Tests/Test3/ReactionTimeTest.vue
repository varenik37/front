<template>
  <div class="reaction-container">
    <div class="reaction-test" :class="stateClass" @click="handleClick">
      <p v-if="state === 'waiting'">Нажмите, чтобы начать</p>
      <p v-if="state === 'ready'">Ждите зелёного...</p>
      <p v-if="state === 'click'">Жмите!</p>
      <p v-if="state === 'tooSoon'">Слишком рано!</p>
      <p v-if="state === 'result'">Ваше время: {{ reactionTime }} мс</p>
    </div>
    
    <!-- Добавляем блок с результатами внутри компонента -->
    <div v-if="showResults" class="results-panel">
      <h3>Результаты теста</h3>
      <p>Ваше время реакции: <strong>{{ reactionTime }} мс</strong></p>
      <p>
        <span v-if="reactionTime < 200">Невероятно быстро! Это лучше, чем у профессиональных спортсменов.</span>
        <span v-else-if="reactionTime < 300">Великолепная реакция! Профессиональный уровень.</span>
        <span v-else-if="reactionTime < 400">Отличная реакция! Выше среднего.</span>
        <span v-else-if="reactionTime < 500">Хорошая реакция, чуть лучше среднего.</span>
        <span v-else-if="reactionTime < 600">Средняя реакция для большинства людей.</span>
        <span v-else-if="reactionTime < 800">Нормальная реакция, но есть куда расти.</span>
        <span v-else>Реакция немного медленнее среднего, попробуйте еще раз!</span>
      </p>
      
      <div class="result-actions">
        <button class="retry-btn" @click="resetTest">Попробовать еще раз</button>
      </div>
    </div>
    
    <!-- Статистика тестов -->
    <div v-if="attempts > 0" class="stats-panel">
      <h4>Ваша статистика:</h4>
      <p>Попыток: {{ attempts }}</p>
      <p>Лучшее время: {{ bestTime }} мс</p>
      <p>Среднее время: {{ averageTime }} мс</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: 'waiting',
      startTime: 0,
      reactionTime: null,
      timeout: null,
      showResults: false,
      attempts: 0,
      bestTime: Infinity,
      totalTime: 0,
    };
  },
  computed: {
    stateClass() {
      return {
        'waiting': this.state === 'waiting',
        'ready': this.state === 'ready',
        'click': this.state === 'click',
        'tooSoon': this.state === 'tooSoon',
        'result': this.state === 'result',
      };
    },
    averageTime() {
      return this.attempts > 0 ? Math.round(this.totalTime / this.attempts) : 0;
    }
  },
  mounted() {
    // Сообщаем родителю, что тест начался, но без запуска таймера
    this.$emit('test-start');
  },
  methods: {
    handleClick() {
      if (this.state === 'waiting') {
        this.startTest();
      } else if (this.state === 'ready') {
        clearTimeout(this.timeout);
        this.state = 'tooSoon';
        this.showResults = false;
      } else if (this.state === 'click') {
        this.endTest();
      } else if (this.state === 'result' || this.state === 'tooSoon') {
        this.resetTest();
      }
    },
    startTest() {
      this.state = 'ready';
      this.showResults = false;
      const delay = Math.floor(Math.random() * 3000) + 2000;
      this.timeout = setTimeout(() => {
        this.state = 'click';
        this.startTime = Date.now();
      }, delay);
    },
    endTest() {
      this.reactionTime = Date.now() - this.startTime;
      this.state = 'result';
      this.showResults = true;
      
      // Обновляем статистику
      this.attempts++;
      this.totalTime += this.reactionTime;
      if (this.reactionTime < this.bestTime) {
        this.bestTime = this.reactionTime;
      }
      
      // НЕ отправляем результат родителю, чтобы избежать всплывающего окна
      // this.$emit('test-complete', this.reactionTime < 500 ? 10 : this.reactionTime < 800 ? 8 : this.reactionTime < 1000 ? 5 : 3);
    },
    resetTest() {
      this.state = 'waiting';
      this.showResults = false;
    },
    finishTest() {
      // Этот метод можно вызвать, если нужно завершить тест и вернуться в главное меню
      const score = this.reactionTime < 300 ? 10 : 
                    this.reactionTime < 400 ? 9 : 
                    this.reactionTime < 500 ? 8 : 
                    this.reactionTime < 600 ? 7 : 
                    this.reactionTime < 700 ? 6 : 
                    this.reactionTime < 800 ? 5 : 
                    this.reactionTime < 900 ? 4 : 
                    this.reactionTime < 1000 ? 3 : 2;
      
      this.$emit('test-complete', score, 10);
    }
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  }
};
</script>

<style scoped>
.reaction-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 700px;
  margin: 0 auto;
}

.reaction-test {
  width: 500px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin: 0 auto 20px;
  transition: background-color 0.3s;
}

.waiting, .ready, .click, .tooSoon, .result {
  width: 500px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.waiting {
  background-color: #4a5568;
}

.ready {
  background-color: #e53e3e;
}

.click {
  background-color: #38a169;
}

.tooSoon {
  background-color: #ed8936;
}

.result {
  background-color: #3182ce;
}

.results-panel {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.stats-panel {
  background-color: #f8fafc;
  border-radius: 10px;
  padding: 15px;
  border: 1px solid #e2e8f0;
  width: 100%;
  max-width: 500px;
  text-align: center;
  margin-bottom: 30px;
}

.result-actions {
  margin-top: 20px;
}

.retry-btn {
  background-color: #3b4ce2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.retry-btn:hover {
  background-color: #2d3ebd;
}

h3, h4 {
  margin-top: 0;
  color: #3b4ce2;
}
</style>