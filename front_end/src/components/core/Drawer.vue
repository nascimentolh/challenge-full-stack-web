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
        <v-img :src="logo"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>{{ $store.getters.getUser.name }}</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
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
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data: () => ({
    mini: true,
    drawer: true,
    logo: `https://ui-avatars.com/api/?name=${localStorage.getItem(
      "@GRUPOA_USER_NAME"
    )}`,
    links: [
      {
        to: "/dashboard/students",
        icon: "mdi-school",
        text: "Estudantes",
        can: "admin",
      },
      {
        to: "users",
        icon: "mdi-account",
        text: "Usuários",
        can: "admin",
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
  },
  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
    this.linksFilter();
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
    linksFilter() {
      this.links = this.links.filter((link) => {
        if (link.can == "admin" ? this.$acl.check("isAdmin") : false) {
          return link;
        } else if (link.can == "public") {
          return link;
        }
      });
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