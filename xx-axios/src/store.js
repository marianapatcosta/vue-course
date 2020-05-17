import Vue from "vue";
import Vuex from "vuex";
import globalAxios from "axios";
import axios from "./axios-auth";
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  getters: {
    user: state => {
      return state.user;
    },
    isAuthenticated(state){
      return state.idToken !== null;
    }
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.idToken;
      state.userId = userData.userId;
    },
    storeUser (state, user) {
      state.user = user;
    },
    clearAuthData(state) {
      state.idToken = null;
      state.id = null;
    }
  },
  actions: {
    setLogoutTimer({commit, dispatch}, expirationTime) {
      setTimeout(() =>{
        /* commit('clearAuthData') */
        dispatch('logout')
      }, expirationTime * 1000)
    },
    signup({ commit, dispatch }, authData) {
      axios
        .post(":signUp?key=AIzaSyAjWplb5MOea7Xe28b-JSavbtWBusvgn-o", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(response => {
          console.log(response);
          commit("authUser", {
            idToken: response.data.idToken,
            userId: response.data.localId
          });
          const now = new Date();
          const expirationDate = new Date(now.getTime() + response.data.expiresIn * 1000);
          localStorage.setItem('token', response.data.idToken);
          localStorage.setItem('userId', response.data.localId);
          localStorage.setItem('expirationDate', expirationDate);

          dispatch("storeUser", authData);
          dispatch("setLogoutTimer", response.data.expiresIn);

        })
        .catch(error => console.log(error));
    },
    login({ commit, dispatch }, authData) {
      axios
        .post(
          ":signInWithPassword?key=AIzaSyAjWplb5MOea7Xe28b-JSavbtWBusvgn-o",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then(response => {
          console.log(response);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + response.data.expiresIn * 1000);
          localStorage.setItem('token', response.data.idToken);
          localStorage.setItem('userId', response.data.localId);
          localStorage.setItem('expirationDate', expirationDate);
          commit("authUser", {
            idToken: response.data.idToken,
            userId: response.data.localId
          });
          dispatch("setLogoutTimer", response.data.expiresIn);
        })
        .catch(error => console.log(error));
    },
    tryAutoLogin({commit}) {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const expirationDate = localStorage.getItem('expirationDate');
      const now = new Date();
      if (now >= expirationDate) {
        return;
      }
      const userId = localStorage.getItem('userId');
      commit('authUser', {
        token,
        userId
      })
    },
    logout({commit}) {
      commit('clearAuthData');
      router.push('/signin');
      localStorage.clear();
    },
    storeUser({ commit, state }, userData) {
      if (!state.idToken) {
        return;
      }
      globalAxios
        .post(`/axios.json?auth=${state.idToken}`, userData)
        .then(response => console.log(response))
        .catch(error => console.log(error));
    },
    // for firebase, the token should be passed as query params, but the way the token is passed depends on the backend
    fetchUser({ commit, state }) {
      globalAxios
        .get(`/axios.json?auth=${state.idToken}`)
        .then(response => {
          console.log(response);
          const data = response.data;
          const users = [];
          for (let key in data) {
            const user = data[key];
            user.id = key;
            users.push(user);
          }
          commit('storeUser', users[0])
        })
        .catch(error => console.log(error));
    }
  }
});
