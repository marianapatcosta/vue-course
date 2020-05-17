<template>
  <div class="row">
    <form action>
      <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
        <label>Quote</label>
        <textarea class="form-control" rows="3" v-model="newQuote"></textarea>
        
      </div>
      <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
        <button class="btn btn-primary" @click.prevent="onAddQuote">Add Quote</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
        newQuote: ''
    }
  },
  methods: {
    onAddQuote(event) {
        this.$emit('addQuote', this.newQuote);
        this.newQuote = '';
    }
  }
};
</script>

<style>
</style>