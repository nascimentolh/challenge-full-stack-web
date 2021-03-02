import Vue from "vue";

import "./components";

import vuetify from "./plugins/vuetify";

import { sync } from "vuex-router-sync";

import App from "./App.vue";
import router from "./router";
import acl from "./config/acl";
import store from "./store";
import toasted from "./config/toasted";
import axios from "axios";

Vue.prototype.$http = axios;

axios.defaults.baseURL = "http://localhost:3000/api/";
axios.defaults.headers.get["Accept"] = "application/json";
const token = localStorage.getItem("@GRUPOA_USER_TOKEN");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

sync(store, router);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  toasted,
  router,
  acl,
  store,
  render: (h) => h(App),
}).$mount("#app");
