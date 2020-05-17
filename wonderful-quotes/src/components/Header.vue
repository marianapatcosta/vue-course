<template>
  <div class="row">
    <div class="col-sm-12">
      <h3>Quotes Added</h3>
      <div class="progress">
        <div class="progress">
          <div class="progressBarWrapper">
            <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
              :style="{width: getWidth()}"
            >{{ quotesLength }} / {{ maxQuotes }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    maxQuotes: Number,
    quotesLength: {
        type: Number,
        default: 0
    }
  },
  data() {
    return {
      width: ""
    };
  },
  methods: {
    getWidth() {
      const calculatedWidth = (this.quotesLength / this.maxQuotes) * 100;
      return `${calculatedWidth}%`;
    }
  }
};
</script>

<style scoped>
</style>