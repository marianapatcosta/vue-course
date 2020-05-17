import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history',
  // to and from are routes
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return { selector: to.hash }
    }
    //return {x: 0, y: 700}
  }
})

// execute this method before access every router
router.beforeEach((to, from, next) => {
  console.log('globall before each');
//must be called to tell that route can be accessed after code run
// can be called next() to let thr request continues its journey
//can set next(false) to abort the route load and stay ate the current page 
// next({})can be called with an object that defines path to navigate  
  next()
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
