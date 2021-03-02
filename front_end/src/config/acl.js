import Vue from "vue";

import { AclInstaller, AclCreate, AclRule } from "vue-acl";
import router from "../router";
import store from "../store";

Vue.use(AclInstaller);

export default new AclCreate({
  initial: "public",
  notfound: {
    path: "/login",
    forwardQueryParams: true,
  },
  router,
  acceptLocalRules: true,
  globalRules: {
    isAdmin: new AclRule("admin").generate(),
    isPublic: new AclRule("public").or("admin").generate(),
    isLogged: new AclRule("user").and("inside").generate(),
  },
  middleware: async (acl) => {
    if (store.getters.getUser.isStaff) {
      acl.change("admin");
    }
  },
});
