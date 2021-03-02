import Vue from "vue";
import Vuex from "vuex";

import actions from "./actions";
import getters from "./getters";
import modules from "./modules";
import mutations from "./mutations";
import state from "./state";

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  actions,
  getters,
  modules,
  mutations,
});

export default store;
