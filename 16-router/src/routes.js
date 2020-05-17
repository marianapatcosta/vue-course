import Home from './components/Home.vue'
import Header from './components/Header.vue'

// Lazy Load imports
// Webpack creates several bundles to load lazily, tells webpack that whenever we want to 
// load an component, execute this promise-like function that load the component. 
// If importing at the top, all the components would be eagerly imported

// , 'user' (as 3rd agr) is a name of a group, groups the bundles in groups, having only one bundle for all the components grouped

 const User = resolve => {
     require.ensure(['./components/user/User.vue'], () => {
         resolve(require('./components/user/User.vue'))
     }, 'user');
 };

 const UserStart = resolve => {
    require.ensure(['./components/user/UserStart.vue'], () => {
        resolve(require('./components/user/UserStart.vue'))
    }, 'user');
};

const UserDetail = resolve => {
    require.ensure(['./components/user/UserDetail.vue'], () => {
        resolve(require('./components/user/UserDetail.vue'))
    }, 'user');
};

const UserEdit = resolve => {
    require.ensure(['./components/user/UserEdit.vue'], () => {
        resolve(require('./components/user/UserEdit.vue'))
    }, 'user');
};
 
export const routes = [
    { path: '',  name: 'home', components: {
        default: Home,
        'header-top': Header
    } },
    { path: '/user', props: true, components: {
        default: User, 'header-bottom': Header }, children: [
        { path: '', component: UserStart },
        { path: ':id', component: UserDetail, props: true, beforeEnter: (to, from, next) => {
            console.log('inside useredit');
            next()
        }},
        { path: ':id/edit', component: UserEdit, name: 'userEdit' },
    ] },
    /* { path: '/redirect-me', redirect: '/user' }, */
    { path: '/redirect-me', redirect: {name: 'userEdit'} },
    { path: '*', redirect: '/' },
  ];