<template>
  <div>
    <h3>The New Quote</h3>
    <button @click="counter++">increase</button>
    {{counter}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    };
  },
  destroyed() {
    console.log("Destroyed");
  },
  deactivated() {
      console.log('deactivated')
  },
  activated() {
      console.log('activated')
  }
};
</script>

<style>
</style>