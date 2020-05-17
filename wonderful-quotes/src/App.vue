<template>
  <div class="container">
    <app-header :maxQuotes="maxQuotes" :quotesLength="quotes.length"></app-header>
    <app-add-quote @addQuote="onAddedQuote"></app-add-quote>
    <app-quotes-playground :quotes="quotes" @deletedQuote="onDeletedQuote"></app-quotes-playground>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import AddQuote from "./components/AddQuote.vue";
import QuotesPlayground from "./components/QuotesPlayground.vue";
import Footer from "./components/Footer.vue";
export default {
  data() {
    return {
      quotes: ["This is the first quote."],
      maxQuotes: 10
    };
  },
  methods: {
    onAddedQuote(quote) {
      if (this.quotes.length === this.maxQuotes) {
          return alert('Please delete Quotes first!');
      }
      this.quotes.push(quote);
    },
    onDeletedQuote(index) {
      this.quotes.splice(index, 1);
    }
  },
  components: {
    "app-header": Header,
    "app-add-quote": AddQuote,
    "app-quotes-playground": QuotesPlayground,
    "app-footer": Footer
  }
};
</script>

<style>
</style>
