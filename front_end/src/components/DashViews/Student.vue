<template>
  <v-container fluid grid-list-xl>
    <v-card class="mt-6">
      <v-form v-model="valid">
        <v-container>
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
          <v-btn color="primary" elevation="2" outlined v-if="mode === 'save'"
            >Salvar</v-btn
          >
          <v-btn elevation="2" color="error" outlined v-if="mode === 'remove'"
            >Delete</v-btn
          >
          <v-btn elevation="2" color="secondary" outlined class="ml-2"
            >Cancelar</v-btn
          >
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, integer, email } from "vuelidate/lib/validators";
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
      },
      ra: {
        required,
        integer,
      },
      email: {
        required,
        email,
      },
    },
  },

  data: () => ({
    mode: "remove",
    valid: false,
    student: {},
  }),
  computed: {
    cpfErrors() {
      const errors = [];
      if (!this.$v.student.cpf.$dirty) return errors;
      !this.$v.student.cpf.required && errors.push("CPF é requerido");
      !this.$v.student.cpf.cpfValid && errors.push("CPF é inválido");

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
      return errors;
    },
  },
};
</script>
