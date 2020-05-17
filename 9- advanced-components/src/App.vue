<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <button @click="selectedComponent = 'Quote'">Quote</button>
        <button @click="selectedComponent = 'Author'">Author</button>
        <button @click="selectedComponent = 'New'">New</button>
        <hr />
        {{selectedComponent}}
        <keep-alive>
          <component :is="selectedComponent">
            <p>default Content</p>
          </component>
        </keep-alive>
        <!-- <Quote quote="Hello">
          <h2 slot="title">{{quoteTitle}}</h2>
          <p >A wonderful quote!</p>
        </Quote>-->
      </div>
    </div>
  </div>
</template>

<script>
import Quote from "./components/Quote.vue";
import Author from "./components/Author.vue";
import New from "./components/New.vue";
export default {
  data() {
    return {
      quoteTitle: "The Quote",
      selectedComponent: "Quote"
    };
  },
  components: {
    Quote,
    Author,
    New
  }
};
</script>

<style>
h2 {
  color: red;
}
</style>
