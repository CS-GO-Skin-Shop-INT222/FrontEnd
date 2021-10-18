<template>
  <v-app>
    <v-form>
      <h1 class="text-center ma-6">Login</h1>
      <v-row>
        <v-spacer></v-spacer>
        <v-col xs="2" sm="8" md="4">
          <v-text-field
            v-model="userEmail"
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
      <v-row align="center" justify="space-around">
        <p v-if="Userpassword" class="red--text text--darken-4">
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
  //    async asyncData({ $axios }) {
  //   const PATH_API = '/user/users'
  //   const ip = await $axios.$get(`${PATH_API}`)
  //   return { ip }
  // },
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
        await this.$auth.loginWith('local', {
          data: { Email: this.userEmail, Password: this.password },
        })
      } catch (errore) {
        console.log(errore)
        this.Userpassword = true
      }
    },
  },
}
</script>