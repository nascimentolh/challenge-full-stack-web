<template>
  <v-app id="dashboard-view">
    <core-toolbar />
    <core-drawer />
    <v-content>
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-content>
    <core-footer />
  </v-app>
</template>

<script>
export default {
  name: "DashboardView",
  metaInfo() {
    return {
      title: "Vuetify Admin Dashboard by ClintOxx",
    };
  },
};
</script>