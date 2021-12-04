<template>
  <v-app>
    <v-form>
      <h1 class="text-center ma-6 blue--text text--darken-1">Admin Login</h1>
      <v-row>
        <v-spacer></v-spacer>
        <v-col xs="2" sm="8" md="4">
          <v-text-field
            v-model="userEmail"
            background-color="blue darken-1"
            color="light-blue darken-4"
            label="Email"
            outlined
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col xs="2" sm="8" md="4">
          <v-text-field
            v-model="password"
            background-color="blue darken-1"
            color="light-blue darken-4"
            :append-icon="password2 ? 'mdi-eye' : 'mdi-eye-off'"
            label="Password"
            outlined
            :type="password2 ? 'text' : 'password'"
            @click:append="password2 = !password2"
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row align="center" justify="space-around">
        <v-btn class="py-5" x-large tile color="success" @click="userLogin">
          Login
        </v-btn>
      </v-row>
      <v-row justify="center">
        <nuxt-link to="/user/login" class="ma-2">
          <v-btn class="py-5" tile color="primary"> User </v-btn>
        </nuxt-link>
      </v-row>
      <v-row align="center" justify="space-around">
        <p v-if="Userpassword" class="blue--text text--darken-1">
          NOT CORRECT USER AND PASSWORD
        </p>
      </v-row>
      <div class="text-center">
        <v-snackbar v-model="snackbar" :timeout="timeout">
          <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
          Login completed

          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </v-form>
  </v-app>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      snackbar: false,
      timeout: 2000,
      userEmail: '',
      password: '',
      Userpassword: false,
      password2: false,
    }
  },
  methods: {
    Datasend() {
      this.userLogin()
      this.snackbar = true
    },
    async userLogin() {
      try {
        await this.$auth.loginWith('admin', {
          data: { Email: this.userEmail, Password: this.password },
        })
      } catch (errore) {
        this.Userpassword = true
      }
    },
  },
}
</script>