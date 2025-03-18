<template>
  <div class="tests-container">
    <h1 class="tests-main-title">Когнитивные тесты</h1>

    <!-- Главное меню -->
    <div v-if="!currentTest" class="tests-menu">
      <div class="tests-menu-grid">
        <div
          v-for="(test, key) in tests"
          :key="key"
          class="tests-menu-item"
          @click="selectTest(key)"
        >
          <div class="tests-menu-item-icon">
            <img :src="getTestIcon(key)" alt="Test icon" class="test-icon" />
          </div>
          <div class="tests-menu-item-title">{{ test }}</div>
        </div>
      </div>
    </div>
    
    <!-- Контейнер теста -->
    <div v-else class="test-active-container">
      <div class="test-header">
        <h2 class="test-title">{{ tests[currentTest] }}</h2>
        <Timer ref="timer" class="test-timer" />
      </div>
      
      <div class="test-content">
        <component
          :is="currentTest"
          @test-complete="onTestComplete"
          @test-start="onTestStart"
        />
      </div>
      
      <button @click="backToMenu" class="test-back-button">
        Вернуться в меню
      </button>
    </div>
  </div>
</template>

<script>
import Timer from './Test1/ThisTimer.vue';
import AttentionTest from './Test1/AttentionTest.vue';
import ReactionTest from './Test1/ReactionTest.vue';
import MemoryTest from './Test1/MemoryTest.vue';
import TextSelectionTest from './Test1/TextSelectionTest.vue';
import SumDigitsTest from './Test1/SumDigitsTest.vue';
import FirstTest from './Test2/FirstTest.vue';
import SecondTest from './Test2/SecondTest.vue';
import ThirdTest from './Test2/ThirdTest.vue';
import FourthTest from './Test2/FourthTest.vue';
import FifthTest from './Test2/FifthTest.vue';

export default {
  name: 'TestsApp',
  components: {
    Timer,
    AttentionTest,
    ReactionTest,
    MemoryTest,
    TextSelectionTest,
    SumDigitsTest,
    FirstTest,
    SecondTest,
    ThirdTest,
    FourthTest,
    FifthTest,
  },
  data() {
    return {
      currentTest: null,
      tests: {
        SumDigitsTest: 'Устный счет',
        AttentionTest: 'Внимание',
        ReactionTest: 'Реакция',
        MemoryTest: 'Память',
        TextSelectionTest: 'Выбор текста',
        FirstTest: 'Пространственное мышление',
        SecondTest: 'Внимание 2',
        ThirdTest: 'Концентрация',
        FourthTest: 'Память 2',
        FifthTest: 'Тест струппа',
      },
      testIcons: {
        SumDigitsTest: 'calc',
        AttentionTest: 'eye',
        ReactionTest: 'bolt',
        MemoryTest: 'brain',
        TextSelectionTest: 'text',
        FirstTest: 'cube',
        SecondTest: 'attention',
        ThirdTest: 'focus',
        FourthTest: 'memory',
        FifthTest: 'colors',
      },
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.token !== null;
    },
  },
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push('/login');
    },
    selectTest(testName) {
      this.currentTest = testName;
    },
    onTestComplete(score, total_test = 10) {
      this.$refs.timer.stopTimer();
      const totalTime = this.$refs.timer.timeElapsed;
      
      // Сохраняем результат теста
      this.saveTestResult(score, total_test, totalTime);
      
      // Показываем результат
      this.showTestResult(score, total_test, totalTime);
    },
    onTestStart() {
      this.$refs.timer.resetTimer();
      this.$refs.timer.startTimer();
    },
    backToMenu() {
      this.currentTest = null;
      this.$refs.timer.resetTimer();
    },
    getTestIcon() {
      return `/api/placeholder/50/50`;
    },
    async saveTestResult(score, total, time) {
      try {
        // Здесь должен быть запрос к API для сохранения результатов
        // Для примера:
        console.log('Сохранение результатов теста:', {
          testName: this.tests[this.currentTest],
          score,
          total,
          timeMs: time,
        });
      } catch (error) {
        console.error('Ошибка при сохранении результатов:', error);
      }
    },
    showTestResult(score, total, time) {
      const seconds = Math.floor(time / 1000);
      const percentage = Math.round((score / total) * 100);
      
      let resultMessage = '';
      if (percentage >= 90) {
        resultMessage = 'Отличный результат!';
      } else if (percentage >= 70) {
        resultMessage = 'Хороший результат!';
      } else if (percentage >= 50) {
        resultMessage = 'Неплохой результат.';
      } else {
        resultMessage = 'Есть куда расти.';
      }
      
      alert(`${resultMessage}\nВы завершили тест "${this.tests[this.currentTest]}" за ${seconds} секунд.\nВаш результат: ${score} из ${total} (${percentage}%).`);
      
      this.backToMenu();
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

.tests-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
}

.tests-main-title {
  font-size: 2.5rem;
  color: #3b4ce2;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
}

.tests-menu {
  margin-bottom: 3rem;
}

.tests-menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.tests-menu-item {
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tests-menu-item:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 0.5rem 1.5rem rgba(59, 76, 226, 0.2);
  background-color: #f0f4ff;
}

.tests-menu-item-icon {
  margin-bottom: 1rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f4ff;
  border-radius: 50%;
  color: #3b4ce2;
}

.test-icon {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
}

.tests-menu-item-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #3b4ce2;
  text-align: center;
}

.test-active-container {
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.test-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.test-title {
  font-size: 1.5rem;
  color: #3b4ce2;
  font-weight: 600;
}

.test-content {
  margin-bottom: 2rem;
}

.test-back-button {
  display: block;
  margin: 2rem auto 0;
  background-color: #3b4ce2;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.test-back-button:hover {
  background-color: #2538df;
}

/* Переопределение стилей таймера */
.test-timer {
  font-size: 1.125rem;
  font-weight: 500;
  color: #4b5563;
  background-color: #f3f4f6;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

/* Адаптивный дизайн */
@media (max-width: 768px) {
  .tests-container {
    padding: 1rem;
  }
  
  .tests-main-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .tests-menu-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .test-active-container {
    padding: 1.5rem;
  }
  
  .test-header {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>