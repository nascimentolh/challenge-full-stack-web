<template>
  <div id="app">
    <template-header />
    <template-menu />
    <template-content />
    <template-footer />
  </div>
</template>

<script>
export default {
  name: "App",

  components: {
    TemplateHeader: () => import("./components/template/Header"),
    TemplateMenu: () => import("./components/template/Menu"),
    TemplateContent: () => import("./components/template/Content"),
    TemplateFooter: () => import("./components/template/Footer"),
  },

  data: () => ({
    //
  }),
};
</script>


<style>
* {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: grid;
  grid-template-rows: 80px 1fr 40px;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
}
</style>