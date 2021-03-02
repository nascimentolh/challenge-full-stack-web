export default {
  authorized: (state) => !!state.token,
  authstatus: (state) => state.authStatus,
  getUser: (state) => state.user,
};
