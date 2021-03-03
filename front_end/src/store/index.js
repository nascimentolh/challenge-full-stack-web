import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import actions from "./actions";
import getters from "./getters";
import modules from "./modules";
import mutations from "./mutations";
import state from "./state";

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  plugins: [createPersistedState()],
  actions,
  getters,
  modules,
  mutations,
});

export default store;
