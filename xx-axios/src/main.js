import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate';

import router from './router'
import store from './store'
import axios from 'axios'


Vue.use(Vuelidate);
 
axios.defaults.baseURL= 'https://vuejs-project-47b7e.firebaseio.com';
//axios.defaults.headers.common['Authorization'] = 'etewt';
axios.defaults.headers.get['Accepts'] = 'application/json'

const reqInterceptor = axios.interceptors.request.use(config => {
  console.log('req interceptor',config)
  return config
});

const resInterceptor =axios.interceptors.response.use(response  => {
  console.log('res interceptor', response)
  return response;
});

axios.interceptors.request.eject(reqInterceptor)
axios.interceptors.response.eject(resInterceptor)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
