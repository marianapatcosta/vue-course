<template>
    <div>
        <button class="btn btn-primary" @click="increment(100)">Increment</button>
        <button class="btn btn-primary" @click="decrement(200)">Decrement</button>
    </div>
</template>

<script>
   import { mapGetters, mapMutations, mapActions } from 'vuex';
    import * as types from '../store/types';


    export default {
        methods: {
         /*    ...mapMutations([
                'increment',
                'decrement'
            ]), */
         /*    ...mapActions([
                 'increment',
                'decrement'
            ]) */
             ...mapActions({
                increment: types.COUNTER_INCREMENT,
                decrement: types.COUNTER_DECREMENT
            })
        }
    }
</script>