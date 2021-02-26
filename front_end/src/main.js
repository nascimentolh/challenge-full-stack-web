import Vue from "vue";

import "./components";

import vuetify from "./plugins/vuetify";

import { sync } from "vuex-router-sync";

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

sync(store, router);

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
