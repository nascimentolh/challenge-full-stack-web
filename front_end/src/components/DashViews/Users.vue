<template>
  <v-container fluid>
    <v-card class="mt-6">
      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item.isStaff="{ item }">
          <v-chip :color="item.isStaff ? 'success' : 'error'" dark>
            {{ item.isStaff ? "Administração" : "Aluno" }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    users: [],
    headers: [
      {
        text: "Nome",
        align: "start",
        value: "name",
      },
      {
        text: "Email",
        value: "email",
      },
      {
        text: "Posição",
        value: "isStaff",
      },
    ],
  }),
  methods: {
    loadUsers() {
      axios.get("/users").then((res) => {
        this.users = res.data.data;
      });
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>