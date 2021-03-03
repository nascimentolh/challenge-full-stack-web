<template>
  <v-app-bar id="core-toolbar" app dark style="background: #424242" flat dense>
    <v-app-bar-nav-icon
      v-if="responsive"
      @click.stop="onClickBtn"
    ></v-app-bar-nav-icon>

    <div class="v-toolbar-title">
      <v-toolbar-title class="font-weight-light white--text">
        {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-flex align-center layout py-2>
        <v-icon class="toolbar-items" color @click="logout">mdi-power</v-icon>
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
      this.title = val.meta.name;
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
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style>
#core-toolbar a {
  text-decoration: none;
}
</style>