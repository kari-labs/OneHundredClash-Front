import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { createProvider } from './vue-apollo';
import Vuex from 'vuex';
import router from "@/router";

Vue.config.productionTip = false
Vue.use(Vuex)

const state = {
  userData: {
  }
}
const getters = {
  getUserData: state => {
    return state.userData
  }
}
const store = new Vuex.Store({
  state,
  getters,
})

new Vue({
  vuetify,
  store,
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')

