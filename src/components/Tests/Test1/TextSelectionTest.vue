<template>
  <div class="text-selection-test">
    <h2>Тест: выделение слов</h2>
    <p>
      Постарайтесь выделить слова в следующем тексте. После того как вы
      завершите, нажмите кнопку "Готово".
    </p>

    <div
      class="text-area"
      contenteditable="true"
      ref="editableText"
      @mouseup="handleSelection"
    >
      {{ text }}
    </div>

    <button class="action-button" @click="finishTest">Готово</button>

    <div v-if="showResults" class="results">
      <h3>Результаты:</h3>
      <p>Вы выделили {{ selectedWords.length }} слов(а).</p>
      <p>Вы пропустили {{ totalWords - selectedWords.length }} слов(а).</p>
      <button class="action-button" @click="restartTest">Начать заново</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: `клодфитренмстоловоапряглицетыпошлидровоставракосылимонедпрыгаютвребелокречьщедорогакапустаквартирымыркодчебылкитюленувлесузебраскидаюхолстореворыпалкаочагпрокартайлебедяжукстарыйовражекореньдроваимеломшапканоркастихлосолнцезвенитшансгрибоклепестокпартастеклопосудажучокдверьлупень`,
      words: ["белок", "стол", "прыгают", "капуста", "лимон", "квартиры", "дорога", "код", "кит", "лес", "зебра",
              "палка", "очаг", "жук", "овраг", "дрова", "шапка", "норка", "солнце", "гриб", "парта", "жучок", "дверь"],
      selectedWords: [],
      totalWords: 23,
      showResults: false,
      testStarted: false
    };
  },
  methods: {
    handleSelection() {
      if (!this.testStarted){
        this.$emit('test-start');
        this.testStarted = true
      }
      console.log(window.getSelection())
      console.log(window.getSelection().anchorOffset)
      console.log(window.getSelection().focusOffset)
      const selection = window.getSelection().toString().trim();
      if (selection && !this.selectedWords.includes(selection) && this.words.includes(selection)) {
        this.selectedWords.push(selection);
      }

      if (selection.charAt(0) === "[" && selection.charAt(selection.length-1) === "]" ){
        this.text = this.text.replace(selection, selection.slice(1, selection.length-1))
      }
      else {
        let firstInsertion = this.text.slice(0, window.getSelection().anchorOffset) + '[' + this.text.slice(window.getSelection().anchorOffset);
        let adjustedIndex2 = window.getSelection().focusOffset + 1;
        this.text = firstInsertion.slice(0, adjustedIndex2) + ']' + firstInsertion.slice(adjustedIndex2);
      }
    },
    finishTest() {
      this.showResults = true;
      this.$emit('test-complete', this.selectedWords.length, this.totalWords);
    },
    restartTest() {
      this.selectedWords = [];
      this.showResults = false;
      this.$emit('test-start');
    },
  },
  mounted() {
    this.$emit('test-start');
  },
};
</script>

<style>
.text-selection-test {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  font-family: 'Roboto', sans-serif;
}

.text-selection-test h2 {
  color: #3b4ce2;
  margin-bottom: 20px;
}

.text-area {
  margin: 30px 0;
  padding: 20px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  min-height: 250px;
  overflow-y: auto;
  white-space: pre-wrap;
  font-family: 'Courier New', monospace;
  background: #f8fafc;
  user-select: text;
  color: #1e293b;
  font-size: 24px; /* Увеличенный размер шрифта */
  line-height: 1.6;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  text-align: justify;
  letter-spacing: 1px; /* Немного увеличиваем расстояние между буквами */
}

.action-button {
  margin: 10px;
  padding: 12px 30px;
  cursor: pointer;
  background-color: #3b4ce2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s, transform 0.1s;
}

.action-button:hover {
  background-color: #2d3ebd;
  transform: translateY(-2px);
}

.results {
  margin-top: 30px;
  padding: 20px;
  background-color: #f0f4ff;
  border-radius: 8px;
  border-left: 4px solid #3b4ce2;
}

.results h3 {
  color: #3b4ce2;
  margin-top: 0;
}

.results p {
  margin: 15px 0;
  font-size: 18px;
}
</style>