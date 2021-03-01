<template>
  <v-app-bar id="core-toolbar" app dark style="background: #424242" flat dense>
    <div class="v-toolbar-title">
      <v-toolbar-title class="font-weight-light white--text">
        <v-btn
          v-if="responsive"
          class="v-btn--simple"
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-flex align-center layout py-2>
        <router-link v-ripple class="toolbar-items" to="/">
          <v-icon color>mdi-home</v-icon>
        </router-link>
        <v-menu
          bottom
          left
          content-class
          offset-y
          transition="slide-y-transition"
        >
        </v-menu>
        <router-link
          v-ripple
          class="toolbar-items"
          to="/dashboard/user-profile"
        >
          <v-icon color>mdi-account</v-icon>
        </router-link>

        <v-icon class="toolbar-items" color>mdi-power</v-icon>
      </v-flex>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data: () => ({
    title: "",
    responsive: false,
    responsiveInput: false,
  }),
  computed: {
    ...mapGetters(["authorized"]),
  },
  watch: {
    $route(val) {
      console.log(val);
      this.title = val.name;
    },
  },
  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },
  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    onClickBtn() {
      this.setDrawer(!this.$store.state.app.drawer);
    },
    onClick() {
      //
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
        this.responsiveInput = false;
      } else {
        this.responsive = false;
        this.responsiveInput = true;
      }
    },
  },
};
</script>

<style>
#core-toolbar a {
  text-decoration: none;
}
</style>