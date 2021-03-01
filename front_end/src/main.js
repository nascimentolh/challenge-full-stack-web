import Vue from "vue";

import "./components";

import vuetify from "./plugins/vuetify";

import { sync } from "vuex-router-sync";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import toasted from "./config/toasted";
import axios from "axios";

Vue.prototype.$http = axios;

axios.defaults.baseURL = "http://localhost:3000/api/";
axios.defaults.headers.get["Accept"] = "application/json";

Vue.config.productionTip = false;

sync(store, router);

new Vue({
  vuetify,
  toasted,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
