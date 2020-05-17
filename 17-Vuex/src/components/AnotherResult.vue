: <template>
  <div>
    <p>Counter is: {{ doubleCounter }}</p>
    <p>Number df clicks: {{ stringCounter }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from '../store/types';

export default {
  //props: ['counter']
  computed: {
    ...mapGetters({
                doubleCounter: types.DOUBLE_COUNTER,
                stringCounter: types.CLICK_COUNTER
            })
     /*  ...mapGetters([
          'doubleCounter',
          'stringCounter'
      ]) */
    /* counter() {
      return this.$store.getters.doubleCounter;
    },
    clicks() {
      return this.$store.getters.stringCounter;
    } */
  }
};
</script>