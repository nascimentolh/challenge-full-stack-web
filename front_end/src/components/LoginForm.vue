<template>
  <v-content>
    <v-container fill-height fluid>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card>
            <v-toolbar color="red accent-4 white--text">
              <v-toolbar-title>Admin Panel</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  ref="username"
                  v-model="email"
                  :rules="[() => !!email || 'This field is required']"
                  prepend-icon="mdi-account"
                  label="email"
                  placeholder="your@domain.com"
                  required
                />
                <v-text-field
                  ref="password"
                  v-model="password"
                  :rules="[() => !!password || 'This field is required']"
                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPassword ? 'text' : 'password'"
                  prepend-icon="mdi-lock"
                  label="Password"
                  placeholder="*********"
                  counter
                  required
                  @keydown.enter="login"
                  @click:append="showPassword = !showPassword"
                />
              </v-form>
            </v-card-text>
            <v-divider class="mt-5" />
            <v-card-actions>
              <v-spacer />
              <v-btn
                align-center
                justify-center
                outlined
                block
                color="error"
                @click="login"
                >Login
              </v-btn>
            </v-card-actions>
            <v-snackbar v-model="snackbar" color="white red--text" :top="true">
              {{ errorMessages }}
              <v-btn dark flat @click="snackbar = false"> Fechar </v-btn>
            </v-snackbar>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data: function () {
    return {
      username: "",
      password: "",
      errorMessages: "As informações de login não conferem",
      snackbar: false,
      color: "general",
      showPassword: false,
    };
  },
  methods: {
    login: function () {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => {
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          console.log(err);
          this.snackbar = true;
        });
    },
  },
};
</script>