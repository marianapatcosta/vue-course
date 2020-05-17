<template>
  <div class="row">
    <app-quote 
        v-for="(quote, index) in quotes" 
        :key="index"
         @click.native="deleteQuote(index)"
        >
        {{ quote }}
    </app-quote>
  </div>
</template>

<script>
import Quote from "./Quote.vue";
export default {
  props: {
    quotes: Array
  },
  components: {
    "app-quote": Quote
  },
  methods: {
      deleteQuote(index) {
        this.$emit('deletedQuote', index);
      }
  }
};
</script>

<style>
</style>