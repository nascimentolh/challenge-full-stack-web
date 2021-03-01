<template>
  <v-container fluid>
    <v-card class="mt-6">
      <v-form v-model="valid">
        <v-container fluid>
          <v-row>
            <v-col cols="12" lg="9" md="12">
              <v-text-field
                v-model="student.name"
                :error-messages="nameErrors"
                :counter="70"
                label="Nome"
                @input="$v.student.name.$touch()"
                @blur="$v.student.name.$touch()"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" lg="3" md="12">
              <v-text-field
                v-model="student.cpf"
                :error-messages="cpfErrors"
                :counter="11"
                label="CPF"
                :disabled="mode === 'edit'"
                @input="$v.student.cpf.$touch()"
                @blur="$v.student.cpf.$touch()"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" lg="6" md="12">
              <v-text-field
                v-model="student.ra"
                :error-messages="raErrors"
                label="RA"
                type="number"
                :disabled="mode === 'edit'"
                @input="$v.student.ra.$touch()"
                @blur="$v.student.ra.$touch()"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="12">
              <v-text-field
                v-model="student.email"
                :error-messages="emailErrors"
                label="E-mail"
                @input="$v.student.email.$touch()"
                @blur="$v.student.email.$touch()"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn
            color="primary"
            elevation="2"
            outlined
            v-if="mode === 'save' || mode === 'edit'"
            @click="save()"
            >Salvar</v-btn
          >
          <v-btn elevation="2" color="error" outlined v-if="mode === 'remove'"
            >Delete</v-btn
          >
          <v-btn
            elevation="2"
            color="secondary"
            outlined
            class="ml-2"
            @click="reset()"
            >Cancelar</v-btn
          >
        </v-container>
      </v-form>
    </v-card>
    <dir>
      <v-data-table
        :headers="headers"
        :items="students"
        :options.sync="options"
        :server-items-length="totalStudents"
        :loading="loading"
        class="elevation-1 mt-6"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="loadStudent(item, 'edit')">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </dir>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, integer, email } from "vuelidate/lib/validators";
import { showError } from "@/global";
import axios from "axios";

export default {
  mixins: [validationMixin],

  validations: {
    student: {
      name: { required, maxLength: maxLength(70) },
      cpf: {
        required,
        async cpfValid(value) {
          const regex = /^(?:(\d)\1{10})$|(\D)|^(\d{12,})$|^(\d{0,10})$/g;
          if (value.match(regex)) {
            return false;
          }
          var sum = 0;
          var rest;
          for (let i = 1; i <= 9; i++)
            sum = sum + parseInt(value.substring(i - 1, i)) * (11 - i);
          rest = (sum * 10) % 11;
          if (rest == 10 || rest == 11) rest = 0;
          if (rest != parseInt(value.substring(9, 10))) return false;
          sum = 0;
          for (let i = 1; i <= 10; i++)
            sum = sum + parseInt(value.substring(i - 1, i)) * (12 - i);
          rest = (sum * 10) % 11;
          if (rest == 10 || rest == 11) rest = 0;
          if (rest != parseInt(value.substring(10, 11))) return false;
          return true;
        },
        async cpfIsUnique(value) {
          if (value.length == 11) {
            try {
              const { data } = await axios.get(`students/${value}/cpf`);
              if (data.data == null) return true;

              return false;
            } catch (error) {
              console.log(error);
            }
          }
        },
      },
      ra: {
        required,
        integer,
        async raIsUnique(value) {
          try {
            const { data } = await axios.get(`students/${value}/ra`);
            if (data.data == undefined) return true;

            return false;
          } catch (error) {
            console.log(error);
          }
        },
      },
      email: {
        required,
        email,
        async emailIsUnique(value) {
          try {
            const { data } = await axios.get(`users/${value}/email`);
            if (data.data == undefined) return true;

            return false;
          } catch (error) {
            console.log(error);
          }
        },
      },
    },
  },
  data: () => ({
    mode: "save",
    valid: false,
    student: {},
    totalStudents: 0,
    students: [],
    loading: true,
    options: {},
    headers: [
      {
        text: "RA",
        align: "start",
        value: "ra",
      },
      {
        text: "Nome",
        value: "user.name",
      },
      {
        text: "CPF",
        value: "cpf",
      },
      { text: "Ações", value: "actions", sortable: false },
    ],
  }),
  watch: {
    options: {
      handler() {
        this.loadStudents();
      },
      deep: true,
    },
  },
  mounted() {
    this.loadStudents();
  },
  computed: {
    cpfErrors() {
      const errors = [];
      if (!this.$v.student.cpf.$dirty) return errors;
      !this.$v.student.cpf.required && errors.push("CPF é requerido");
      !this.$v.student.cpf.cpfValid && errors.push("CPF é inválido");
      !this.$v.student.cpf.cpfIsUnique && errors.push("CPF está em uso");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.student.email.$dirty) return errors;
      !this.$v.student.email.email &&
        errors.push("RA deve ser um e-mail válido");
      !this.$v.student.email.required && errors.push("Email é requerido");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.student.name.$dirty) return errors;
      !this.$v.student.name.maxLength &&
        errors.push("O nome não pode ter mais de 70 caracteres");
      !this.$v.student.name.required && errors.push("Nome é requerido");
      return errors;
    },
    raErrors() {
      const errors = [];
      if (!this.$v.student.ra.$dirty) return errors;
      !this.$v.student.ra.integer && errors.push("RA deve ser inteiro");
      !this.$v.student.ra.required && errors.push("RA é requerido");
      !this.$v.student.ra.raIsUnique && errors.push("RA está em uso");
      return errors;
    },
  },
  methods: {
    reset() {
      this.mode = "save";
      this.student = {};
      this.loadStudents();
    },
    save() {
      const method = this.mode == "edit" ? "put" : "post";
      const url =
        this.mode == "edit" ? `/users/${this.student.user_id}` : "/students";
      axios[method](url, this.student)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadStudents() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      axios
        .get("/students", {
          params: { page, per_page: itemsPerPage },
        })
        .then((res) => {
          if (sortBy.length === 1 && sortDesc.length === 1) {
            this.students = res.data.data.data.sort((a, b) => {
              const sortA = a[sortBy[0]];
              const sortB = b[sortBy[0]];

              if (sortDesc[0]) {
                if (sortA < sortB) return 1;
                if (sortA > sortB) return -1;
                return 0;
              } else {
                if (sortA < sortB) return -1;
                if (sortA > sortB) return 1;
                return 0;
              }
            });
          } else {
            this.students = res.data.data.data;
          }
          this.totalStudents = res.data.data.total;
          this.loading = false;
        });
    },
    loadStudent(student, mode = "save") {
      this.mode = mode;
      this.student = {
        id: student.id,
        user_id: student.user.id,
        name: student.user.name,
        email: student.user.email,
        ra: student.ra,
        cpf: student.cpf,
      };
    },
  },
};
</script>
