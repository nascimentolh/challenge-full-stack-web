<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    :mini-variant.sync="mini"
    app
    dark
    class="red accent-4"
    floating
    mobile-break-point="791"
    width="260"
    height="100%"
    absolute
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>John Leider</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="(link, i) in links" :key="i" link>
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <!-- <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    class="red accent-4"
    floating
    persistent
    mobile-break-point="991"
    width="260"
    absolute
  >
    <v-img :src="image" height="100%">
      <v-layout class="fill-height" column>
        <v-list-item avatar>
          <v-list-item-avatar color="grey">
            <v-img :src="logo" height="64" contain />
          </v-list-item-avatar>
          <v-list-item-title class="title"> User </v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          :active-class="color"
          avatar
          class="v-list-item"
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-title v-text="link.text" />
        </v-list-item>
      </v-layout>
    </v-img>
  </v-navigation-drawer> -->
</template>

<script>
// Utilities
import { mapMutations, mapState } from "vuex";
export default {
  data: () => ({
    mini: true,
    drawer: true,
    logo: "https://ui-avatars.com/api/?name=John+Doe",
    links: [
      {
        to: "/dashboard",
        icon: "mdi-view-dashboard",
        text: "Dashboard",
      },
      {
        to: "/students",
        icon: "mdi-school",
        text: "Estudantes",
      },
      {
        to: "/users",
        icon: "mdi-account",
        text: "Usuários",
      },
    ],
    responsive: false,
  }),
  computed: {
    ...mapState("app", ["image", "color"]),
    inputValue: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(val) {
        this.setDrawer(val);
      },
    },
    items() {
      return this.$t("Layout.View.items");
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
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.v-application a {
  color: #ffffff;
}
#app-drawer {
  .v-list__tile {
    border-radius: 4px;
    &--buy {
      margin-top: auto;
      margin-bottom: 17px;
    }
  }
  .v-image__image--contain {
    top: 9px;
    height: 60%;
  }
}
</style>