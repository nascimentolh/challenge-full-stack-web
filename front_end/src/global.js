import Vue from "vue";

export function showError(e) {
  console.log(e.response);
  if (e && e.response && e.response.data) {
    Vue.toasted.global.defaultError({ msg: e.response.data.error.message });
  } else if (typeof e === "string") {
    Vue.toasted.global.defaultError({ msg: e });
  } else {
    Vue.toasted.global.defaultError();
  }
}
