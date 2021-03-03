import axios from "axios";

export default {
  login({ commit }, userData) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios
        .post("/auth", {
          email: userData.email,
          password: userData.password,
        })
        .then((response) => {
          const { token, ...dataWithoutToken } = response.data.data;
          localStorage.setItem("@GRUPOA_USER_TOKEN", token);
          localStorage.setItem("@GRUPOA_USER_NAME", dataWithoutToken.name);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          commit("setUser", dataWithoutToken);
          commit("setToken", token);
          resolve(response);
        })
        .catch((err) => {
          console.log("login error");
          commit("auth_error");
          localStorage.removeItem("@GRUPOA_USER_TOKEN");
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit("logout");
      commit("setUser", {});
      localStorage.removeItem("@GRUPOA_USER_TOKEN");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  },
  refreshtoken({ commit }) {
    axios
      .get("/refresh")
      .then((response) => {
        const token = response.data.access_token;
        localStorage.setItem("@GRUPOA_USER_TOKEN", token);
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        commit("auth_success", { token });
      })
      .catch((error) => {
        console.log("refresh token error");
        commit("logout");
        localStorage.removeItem("token");
        console.log(error);
      });
  },
};
