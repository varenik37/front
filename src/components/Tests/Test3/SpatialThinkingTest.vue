<template>
  <div class="test-container">
    <h2 class="test-title">Тест на пространственное мышление</h2>
    
    <div v-if="!testStarted" class="start-screen">
      <p class="test-description">
        Этот тест предназначен для изучения вашей способности мысленно визуализировать и производить манипуляции с графическими объектами (напр. вращать фигуры 3D или собирать различные части в определенное целое). Вам будет представлено несколько различных типов заданий. У вас есть 10 минут, чтобы решить 10 вопросов.
      </p>
      <div class="start-button-container">
        <button @click="startTest" class="btn btn-blue">Начать тест</button>
      </div>
    </div>
    
    <div v-else>
      <div v-if="currentQuestionIndex < questions.length" class="question-container">
        <p class="question-counter">Вопрос {{ currentQuestionIndex + 1 }} из {{ questions.length }}</p>
        <p class="question-text">{{ questions[currentQuestionIndex].questionText }}</p>
        <img :src="questions[currentQuestionIndex].image" alt="Задание" class="question-image" />
        <div v-if="!testFinished" class="answers">
          <button v-for="(answer, index) in questions[currentQuestionIndex].answers" :key="index"
            @click="selectAnswer(index)" class="answer-btn">
            {{ answer.text }}
          </button>
        </div>
      </div>
      <div v-if="currentQuestionIndex >= questions.length && !testFinished" class="end-section">
        <div class="buttons-container">
          <button @click="prevQuestion" class="btn btn-gray">Назад</button>
          <button @click="finishTest" class="btn btn-blue">Завершить тестирование</button>
        </div>
      </div>
      <div v-if="testFinished" class="results-container">
        <h3 class="results-title">Тест завершён!</h3>
        <p class="results-score">Ваш результат: {{ correctAnswers }} / {{ questions.length }}</p>
        <h4 v-if="mistakes.length" class="mistakes-title">Ваши ошибки:</h4>
        <ul v-if="mistakes.length" class="mistakes-list">
          <li v-for="(mistake, index) in mistakes" :key="index" class="mistake-item">
            Вопрос {{ mistake.questionIndex + 1 }}: Вы выбрали "{{ mistake.selectedAnswer }}", но правильный ответ - "{{ mistake.correctAnswer }}"
          </li>
        </ul>
        <button @click="$emit('test-complete', correctAnswers, questions.length)" class="btn btn-blue">Завершить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testStarted: false,
      timeLeft: 600,
      currentQuestionIndex: 0,
      correctAnswers: 0,
      mistakes: [],
      testFinished: false,
      selectedAnswers: {},
      questions: [
        {
          questionText: "При правильном соединении верхние части головоломки создадут одну из следующих фигур (1-5). Обратите внимание, что стороны, которые обозначены одинаковыми буквами (А, В, С), должны соприкасаться между собой. Выберите правильный ответ.",
          image: "src/components/Tests/Test3/static3/test2/1.png",
          answers: [
            { text: "фигура 1", correct: true },
            { text: "фигура 2", correct: false },
            { text: "фигура 3", correct: false },
            { text: "фигура 4", correct: false },
            { text: "фигура 5", correct: false }
          ]
        },
        {
          questionText: "При правильном соединении верхние части головоломки создадут одну из следующих фигур (1-5). Обратите внимание, что стороны, которые обозначены одинаковыми буквами (А, B, С) должны соприкасаться между собой. Выберите правильный ответ.",
          image: "src/components/Tests/Test3/static3/test2/2.png",
          answers: [
            { text: "фигура 1", correct: false },
            { text: "фигура 2", correct: false },
            { text: "фигура 3", correct: false },
            { text: "фигура 4", correct: false },
            { text: "фигура 5", correct: true }
          ]
        },
        {
          questionText: "Какой из четырех возможных вариантов представляет собой куб в сложенном виде?",
          image: "src/components/Tests/Test3/static3/test2/3.png",
          answers: [
            { text: "куб 1", correct: false },
            { text: "куб 2", correct: false },
            { text: "куб 3", correct: true },
            { text: "куб 4", correct: false }
          ]
        },
        {
          questionText: "Какой из четырех возможных вариантов представляет верхний куб, показанный с другого ракурса? Каждая грань куба уникальна и не повторяется.",
          image: "src/components/Tests/Test3/static3/test2/4.png",
          answers: [
            { text: "куб 1", correct: false },
            { text: "куб 2", correct: true },
            { text: "куб 3", correct: false },
            { text: "куб 4", correct: false }
          ]
        },
        {
          questionText: "Вверху представлена фигура. Из следующих 5 вариантов выберите один, изображающий ту же фигуру.",
          image: "src/components/Tests/Test3/static3/test2/5.png",
          answers: [
            { text: "фигура 1", correct: false },
            { text: "фигура 2", correct: false },
            { text: "фигура 3", correct: false },
            { text: "фигура 4", correct: false },
            { text: "фигура 5", correct: true }
          ]
        },
        {
          questionText: "Укажите правильную комбинацию фигур после вращения верхней модели (обе точки должны располагаться в тех же углах).",
          image: "src/components/Tests/Test3/static3/test2/6.png",
          answers: [
            { text: "фигура A", correct: false },
            { text: "фигура B", correct: true },
            { text: "фигура C", correct: false },
            { text: "фигура D", correct: false },
            { text: "фигура E", correct: false }
          ]
        },
        {
          questionText: "Какое изображение (1-4) является зеркальным отражением верхней фигуры?",
          image: "src/components/Tests/Test3/static3/test2/7.png",
          answers: [
            { text: "фигура 1", correct: true },
            { text: "фигура 2", correct: false },
            { text: "фигура 3", correct: false },
            { text: "фигура 4", correct: false }
          ]
        },
        {
          questionText: "При правильном соединении верхние части головоломки создадут одну из следующих фигур (А- Е). Обратите внимание, что стороны, которые обозначены одинаковыми буквами (х, y, z), должны соприкасаться между собой. Выберите правильный ответ.",
          image: "src/components/Tests/Test3/static3/test2/8.jpg",
          answers: [
            { text: "фигура A", correct: false },
            { text: "фигура B", correct: true },
            { text: "фигура C", correct: false },
            { text: "фигура D", correct: false },
            { text: "фигура E", correct: false }
          ]
        },
        {
          questionText: "Какая из следующих фигур находится внутри квадрата?",
          image: "src/components/Tests/Test3/static3/test2/9.png",
          answers: [
            { text: "фигура 1", correct: false },
            { text: "фигура 2", correct: false },
            { text: "фигура 3", correct: false },
            { text: "фигура 4", correct: true },
            { text: "фигура 5", correct: false }
          ]
        },
        {
          questionText: "Какая фигура (1-5) получится при сложении данного шаблона бумаги? Выберите правильный ответ.",
          image: "src/components/Tests/Test3/static3/test2/10.png",
          answers: [
            { text: "фигура 1", correct: false },
            { text: "фигура 2", correct: false },
            { text: "фигура 3", correct: true },
            { text: "фигура 4", correct: false },
            { text: "фигура 5", correct: false }
          ]
        }
      ]
    };
  },
  methods: {
    startTest() {
      this.testStarted = true;
      this.$emit('test-start');
    },
    selectAnswer(index) {
      const question = this.questions[this.currentQuestionIndex];
      if (this.selectedAnswers[this.currentQuestionIndex] === true) {
        this.correctAnswers--;
      }
      this.selectedAnswers[this.currentQuestionIndex] = question.answers[index].correct;
      if (question.answers[index].correct) {
        this.correctAnswers++;
      } else {
        this.mistakes = this.mistakes.filter(m => m.questionIndex !== this.currentQuestionIndex);
        this.mistakes.push({
          questionIndex: this.currentQuestionIndex,
          selectedAnswer: question.answers[index].text,
          correctAnswer: question.answers.find(ans => ans.correct).text
        });
      }
      this.nextQuestion();
    },
    nextQuestion() {
      this.currentQuestionIndex++;
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },
    finishTest() {
      this.testFinished = true;
    }
  }
};
</script>

<style scoped>
.test-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.test-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.start-screen {
  text-align: center;
}

.test-description {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.start-button-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
}

.question-container {
  margin-bottom: 30px;
}

.question-counter {
  font-size: 16px;
  margin-bottom: 10px;
}

.question-text {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
}

.question-image {
  max-width: 100%;
  margin: 20px 0;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.answers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

.answer-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f8f9fa;
  cursor: pointer;
  font-size: 16px;
}

.answer-btn:hover {
  background-color: #e9ecef;
}

.buttons-container {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 12px;
}

.btn {
  padding: 10px 18px;
  font-size: 16px;
  border-radius: 6px;
  font-weight: bold;
  transition: background 0.3s;
  border: none;
  cursor: pointer;
}

.btn-blue {
  background-color: #007bff;
  color: white;
}

.btn-gray {
  background-color: #6c757d;
  color: white;
}

.results-container {
  text-align: center;
}

.results-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.results-score {
  font-size: 20px;
  margin-bottom: 20px;
}

.mistakes-title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
}

.mistakes-list {
  list-style-type: none;
  padding: 0;
}

.mistake-item {
  color: #dc3545;
  font-size: 16px;
  margin-bottom: 8px;
}

.end-section {
  margin-top: 30px;
}
</style>