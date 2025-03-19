<template>
  <div class="game-container">
    <!-- Добавляем экран с правилами -->
    <div v-if="showRules" class="rules-screen">
      <h2>Тест N-Back: Тренировка рабочей памяти</h2>
      
      <div class="rules-content">
        <p>Этот тест измеряет вашу <strong>рабочую память</strong> и способность концентрироваться.</p>
        
        <h3>Как играть:</h3>
        <ol>
          <li>Вы увидите последовательность цифр, появляющихся одна за другой.</li>
          <li>Ваша задача — определить, совпадает ли <strong>текущая цифра</strong> с <strong>первой цифрой</strong> в последовательности.</li>
          <li>Если цифры совпадают — нажмите <strong>"Да"</strong>.</li>
          <li>Если цифры не совпадают — нажмите <strong>"Нет"</strong>.</li>
        </ol>
        
        <div class="example">
          <h4>Пример:</h4>
          <div class="example-sequence">
            <span class="example-digit">4</span>
            <span class="example-digit">7</span>
            <span class="example-digit">4</span>
          </div>
          <p>В этом примере правильный ответ: <strong>"Да"</strong>, так как первая и последняя цифры совпадают (обе 4).</p>
        </div>
        
        <div class="tips">
          <h4>Советы:</h4>
          <ul>
            <li>У вас есть 3 жизни. За каждый неправильный ответ вы теряете одну жизнь.</li>
            <li>За правильные ответы вы получаете очки.</li>
            <li>Игра состоит из 20 раундов или заканчивается, когда вы потеряете все жизни.</li>
            <li>Чем дольше вы играете, тем сложнее будет запоминать цифры.</li>
          </ul>
        </div>
      </div>
      
      <button class="start-button" @click="startGame">Начать игру</button>
    </div>

    <!-- Основной экран игры -->
    <div v-else>
      <div class="sequence">
        <span
          v-for="(num, index) in sequence"
          :key="index"
          :class="getOpacityClass(index)"
          class="digit"
        >
          {{ num }}
        </span>
      </div>
      <div class="controls">
        <button @click="answer(false)" class="no-button">Нет</button>
        <button @click="answer(true)" class="yes-button">Да</button>
      </div>
      <div class="stats">
        <p>Жизни: {{ lives }}</p>
        <p>Счет: {{ score }}</p>
        <p>Раунд: {{ round }}/20</p>
      </div>
      <div v-if="gameOver" class="game-over">
        <p>Игра закончена</p>
        <p>Правильно: {{ correctAnswers }} из {{ round - 1 }} ({{ accuracy }}%)</p>
        <p>Очки: {{ score }}</p>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      sequence: [],
      lives: 3,
      score: 0,
      round: 1,
      correctAnswers: 0,
      transparencyLevels: [0, 0, 0],
      gameOver: false,
      streak: 0,
      isBlinking: false,
      leftCounter: 0,
      centerCounter: 0,
      showRules: true // Показываем правила по умолчанию
    };
  },
  computed: {
    accuracy() {
      return this.round > 1 ? Math.round((this.correctAnswers / (this.round - 1)) * 100) : 100;
    },
  },
  mounted() {
    // Инициализируем последовательность, но не начинаем игру сразу
    this.sequence = [
      this.getRandomDigit(false),
      this.getRandomDigit(false),
      this.getRandomDigit(true, 0.8)
    ];
    
    // Эмитим событие test-start только когда игра действительно начинается
  },
  methods: {
    startGame() {
      this.showRules = false;
      // Эмитим событие test-start когда игра действительно начинается
      this.$emit('test-start');
    },
    getRandomDigit(forceMatch = false, probabilityMatch = 0.8) {
      if (forceMatch && this.sequence.length > 0 && Math.random() < probabilityMatch) {
        return this.sequence[0];
      }
      return Math.floor(Math.random() * 10);
    },
    getOpacityClass(index) {
      const level = this.transparencyLevels[index];
      return `opacity-${Math.round(level * 5)}`;
    },
    answer(isYes) {
      if (this.gameOver) {
        this.$emit('test-complete', this.score / 100);
        return;
      }
      
      const correct = (this.sequence[0] === this.sequence[2]) === isYes;
      this.leftCounter++;
      this.centerCounter++;
      if (correct) {
        this.correctAnswers++;
        this.score += 100;
        this.streak++;
      } else {
        this.lives--;
        this.streak = 0;
        this.leftCounter = 0;
        this.centerCounter = 0;
        this.transparencyLevels[0] = 0;
        this.transparencyLevels[1] = 0;
      }
      if (this.leftCounter >= 3) {
        this.transparencyLevels[0] = 1;
      } else {
        this.transparencyLevels[0] = 0;
      }
      if (this.centerCounter >= 3) {
        this.transparencyLevels[1] = 1;
      } else {
        this.transparencyLevels[1] = 0;
      }
      if (this.lives <= 0 || this.round >= 20) {
        this.gameOver = true;
        setTimeout(() => {
          this.$emit('test-complete', this.score / 100);
        }, 3000);
        return;
      }
      if (this.streak >= 3) {
        this.blinkRightDigit();
      } else {
        this.shiftSequence();
      }
    },
    blinkRightDigit() {
      this.isBlinking = true;
      setTimeout(() => {
        this.isBlinking = false;
        this.shiftSequence();
      }, 300);
    },
    shiftSequence() {
      this.sequence = [
        this.sequence[1],
        this.sequence[2],
        this.getRandomDigit(true, 0.8)
      ];
      this.transparencyLevels = [
        this.transparencyLevels[0],
        0,
        0.4
      ];
      this.round++;
    }
  },
};
</script>
  
<style scoped>
.game-container {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

/* Стили для экрана правил */
.rules-screen {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.rules-content {
  text-align: left;
  margin: 20px 0;
}

.example {
  background-color: #f0f4ff;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
  border-left: 4px solid #3b4ce2;
}

.example-sequence {
  display: flex;
  justify-content: center;
  margin: 15px 0;
  gap: 20px;
}

.example-digit {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3b4ce2;
  color: white;
  font-size: 24px;
  font-weight: bold;
  border-radius: 8px;
}

.tips {
  background-color: #fffbea;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
  border-left: 4px solid #eab308;
}

.start-button {
  background-color: #3b4ce2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
}

.start-button:hover {
  background-color: #2d3ebd;
}

/* Стили для игры */
.sequence {
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 30px 0;
}

.digit {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3b4ce2;
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(59, 76, 226, 0.2);
}

.controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 30px 0;
}

.controls button {
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.no-button {
  background-color: #ef4444;
  color: white;
}

.yes-button {
  background-color: #10b981;
  color: white;
}

.no-button:hover {
  background-color: #dc2626;
  transform: translateY(-2px);
}

.yes-button:hover {
  background-color: #059669;
  transform: translateY(-2px);
}

.stats {
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 15px;
}

.stats p {
  margin: 0;
  font-weight: 600;
}

.game-over {
  background-color: #f0f4ff;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
  border: 2px solid #3b4ce2;
}

.game-over p:first-child {
  font-size: 24px;
  font-weight: 700;
  color: #3b4ce2;
  margin-top: 0;
}

/* Стили для прозрачности */
.opacity-0 { opacity: 1; }
.opacity-1 { opacity: 0.8; }
.opacity-2 { opacity: 0.6; }
.opacity-3 { opacity: 0.4; }
.opacity-4 { opacity: 0.2; }
.opacity-5 { opacity: 0; }
</style>