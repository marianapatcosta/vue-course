import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

// install a vuejs plugin
Vue.use(VueResource);

// $ sign is oly needed when access http from a Vue instance, here is global vue object
Vue.http.options.root = "https://vuejs-project-47b7e.firebaseio.com/";
Vue.http.interceptors.push((request, next) => {
  console.log(request);
  if (request.method === 'POST') {
    request.method = 'PUT'
  }
  next(response => {
    response.json = () => {
   return {
    messages: response.body
   }
 }  });
});

new Vue({
  el: '#app',
  render: h => h(App)
})
