<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Http</h1>
        <div class="form-froup">
          <label for>Username</label>
          <input type="text" class="form-control" v-model="userData.username" />
        </div>
        <div class="form-froup">
          <label for>Email</label>
          <input type="text" class="form-control" v-model="userData.email" />
        </div>
        <button class="btn btn-primary" @click="onSubmit">Submit</button>
        <hr />
        <input type="text" class="form-control" v-model="node" />
        <button class="btn btn-primary" @click="fetchData">Get Data</button>
        <ul class="list-group">
          <li
            class="list-gropu-item"
            v-for="user in users"
            :key="user.username"
          >{{user.username}} - {{user.email}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        username: "",
        email: ""
      },
      users: [],
      resource: {},
      node: "data"
    };
  },
  methods: {
    async onSubmit() {
      // the address is firebase address to our DB + the name of colection (data) and only use json
      /*   this.$http
        .post('data.json', this.userData )
        .then(
          response => {
            console.log(response);
          },
          error => console.log(error)
        ); */
       try {
        const response = await this.$http.post(
          "https://vuejs-project-47b7e.firebaseio.com/data.json",
          this.userData
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }

      //this.resource.save({}, this.userData);
      //this.resource.saveAlt(this.userData);
    },
    fetchData() {
      /* const response = await this.$http.get(
        "https://vuejs-project-47b7e.firebaseio.com/data.json"
      );

      const dataJson = await response.json();

      const resultArray = [];
      for (let key in data) {
        resultArray.push(data[key]);
      }
      this.users = resultArray;
      console.log(this.users); */

      /* this.$http
        .get('data.json')
        .then(response => {
          // response.json extract response body and returns an object we can use
          return response.json();
        })
        .then(data => {
          const resultArray = [];
          for (let key in data) {
            resultArray.push(data[key]);
          }
          this.users = resultArray;
          console.log(this.users);
        }); */

      // as argument, our customized getData() takes an object that allow to override the flexible
      //url set in the configuration below
      this.resource
        .getData({ node: this.node })
        .then(response => {
          // response.json extract response body and returns an object we can use
          return response.json();
        })
        .then(data => {
          const resultArray = [];
          for (let key in data) {
            resultArray.push(data[key]);
          }
          this.users = resultArray;
          console.log(this.users);
        });
    }
  },
  created() {
    const customActions = {
      saveAlt: { method: "POST", url: "alternative.json" },
      getData: { method: "GET" }
    };
    this.resource = this.$resource("{node}.json", {}, customActions);
  }
};
</script>

<style>
</style>
