export default {
  auth_request(state) {
    state.authStatus = "loading";
  },
  auth_error(state) {
    state.authStatus = "error";
  },
  logout(state) {
    state.authStatus = "";
    state.token = "";
  },
  setUser(state, user) {
    state.authStatus = "success";
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
  },
};
