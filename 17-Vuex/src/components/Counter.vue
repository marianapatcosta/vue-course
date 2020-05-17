<template>
  <div>
    <button class="btn btn-primary" @click="increment(100)">Increment</button>
    <button class="btn btn-primary" @click="decrement(50)">Decrement</button>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import * as types from "../store/types";

export default {
  methods: {
    ...mapActions({
      increment: types.COUNTER_INCREMENT,
      decrement: types.COUNTER_DECREMENT
    })
    /*             ...mapMutations([
                'increment',
                'decrement'
            ]), */
    /*   increment() {
                //this.$emit('updated', 1);
                //this.$store.state.counter++;
                this.$store.commit('increment') ;
            },
            decrement() {
                this.$store.commit('decrement') ;

            } */
  }
};
</script>