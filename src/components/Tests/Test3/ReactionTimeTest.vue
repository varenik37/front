<template>
  <div class="reaction-test" :class="stateClass" @click="handleClick">
    <p v-if="state === 'waiting'">Нажмите, чтобы начать</p>
    <p v-if="state === 'ready'">Ждите зелёного...</p>
    <p v-if="state === 'click'">Жмите!</p>
    <p v-if="state === 'tooSoon'">Слишком рано!</p>
    <p v-if="state === 'result'">Ваше время: {{ reactionTime }} мс</p>
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
    };
  },
  computed: {
    stateClass() {
      return {
        'waiting': this.state === 'waiting',
        'ready': this.state === 'ready',
        'click': this.state === 'click',
        'tooSoon': this.state === 'tooSoon',
      };
    },
  },
  methods: {
    handleClick() {
      if (this.state === 'waiting') {
        this.startTest();
      } else if (this.state === 'ready') {
        clearTimeout(this.timeout);
        this.state = 'tooSoon';
      } else if (this.state === 'click') {
        this.endTest();
      } else if (this.state === 'result' || this.state === 'tooSoon') {
        this.resetTest();
      }
    },
    startTest() {
      this.state = 'ready';
      this.$emit('test-start');
      const delay = Math.floor(Math.random() * 3000) + 2000;
      this.timeout = setTimeout(() => {
        this.state = 'click';
        this.startTime = Date.now();
      }, delay);
    },
    endTest() {
      this.reactionTime = Date.now() - this.startTime;
      this.state = 'result';
      setTimeout(() => {
        this.$emit('test-complete', this.reactionTime < 500 ? 10 : this.reactionTime < 800 ? 8 : this.reactionTime < 1000 ? 5 : 3);
      }, 2000);
    },
    resetTest() {
      this.state = 'waiting';
      this.reactionTime = null;
    },
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  }
};
</script>

<style scoped>
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
  margin: 0 auto;
}
.waiting, .ready, .click, .tooSoon {
  width: 500px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.waiting {
  background-color: gray;
}
.ready {
  background-color: red;
}
.click {
  background-color: green;
}
.tooSoon {
  background-color: orange;
}
</style>