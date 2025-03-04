<template>
  <div>
    <h1>Результаты</h1>
    <ul>
      <li v-for="result in results" :key="result.id">
        {{ result.description }}: {{ result.result }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ResultsPage',
  data() {
    return {
      results: [],
    };
  },
  async created() {
    try {
      const response = await this.$store.dispatch('fetchResults');
      this.results = response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>