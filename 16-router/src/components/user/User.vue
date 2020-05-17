<template>
  <div>
    <h1>The User Page</h1>
    <p>Loaded ID {{id}}</p>
    <p>Loaded ID {{$route.params.id}}</p>
    <button @click="navigateToHome">Go Home</button>
    <hr />
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  props: ["id"],
  /*  data() {
        return {
            id: this.$route.params.id
        }
    }, */
  // we can use watch to watch the id because vuwjs did not change if the same
  // component is to be loaded even with  a different route OR use id as props
  // instead of data and declare props in the route
  /*  watch: {
        '$route' (to, from) {
            this.id = to.params.id
        }
    }, */
  methods: {
    navigateToHome() {
      //this.$router.push("/");
      this.$router.push({name: 'home'});
    }
  }
};
</script>