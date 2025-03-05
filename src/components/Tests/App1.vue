<template>
  
    <div id="my-app">
      <h1>Когнитивные тесты</h1>

      <!-- Главное меню -->
      <div v-if="!currentTest" class="menu">
        <div
          v-for="(test, key) in tests"
          :key="key"
          class="menu-item"
          @click="selectTest(key)"
        >
          {{ test }}
        </div>
      </div>
      <div v-else>
        <Timer ref="timer" />
        <component
          :is="currentTest"
          @test-complete="onTestComplete"
          @test-start="onTestStart"
        />
        <button @click="backToMenu" class="back-button">Вернуться в меню</button>
      </div>
    </div>
</template>

<script>
import Timer from '../Tests/Test1/ThisTimer.vue';
import AttentionTest from '../Tests/Test1/AttentionTest.vue';
import ReactionTest from '../Tests/Test1/ReactionTest.vue';
import MemoryTest from '../Tests/Test1/MemoryTest.vue';
import TextSelectionTest from '../Tests/Test1/TextSelectionTest.vue';
import SumDigitsTest from '../Tests/Test1/SumDigitsTest.vue';
import FirstTest from '../Tests/Test2/FirstTest.vue';
import SecondTest from '../Tests/Test2/SecondTest.vue';
import ThirdTest from '../Tests/Test2/ThirdTest.vue';
import FourthTest from '../Tests/Test2/FourthTest.vue';
import FifthTest from '../Tests/Test2/FifthTest.vue';

export default {
  name: 'App',
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
      alert(
        `Вы завершили тест за ${Math.floor(totalTime / 1000)} секунд. Ваш результат: ${score} из ${total_test}.`
      );
      this.backToMenu();
    },
    onTestStart() {
      this.$refs.timer.resetTimer();
      this.$refs.timer.startTimer();
    },
    backToMenu() {
      this.currentTest = null;
      this.$refs.timer.resetTimer();
    },
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  margin-bottom: 20px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

button {
  background: none;
  border: none;
  color: #2c3e50;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  text-decoration: underline;
}

#my-app {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.menu {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.menu-item {
  width: 150px;
  height: 150px;
  background-color: #f0f0;
  background-color: #f0f0f0;
  border: 2px solid #ccc;
  color: black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.menu-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background-color: #e0eaff;
  border-color: #6c91ff;
}

h1 {
  text-align: center;
  margin-bottom: 100px;
}

.back-button {
  left: 50%;
  margin-left: -85px;
  margin-top: 150px;
  background-color: #6c91ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
}

.back-button:hover {
  background-color: #5577cc;
}

.timer {
  margin-bottom: 50px;
}
</style>

