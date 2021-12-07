<template>
  <v-app>
    <v-form>
      <h1 class="text-center ma-6">Login</h1>
      <v-container>
      <v-row justify="center">
        <v-col xs="4" sm="8" md="4">
          <v-text-field
            v-model="userEmail"
            label="Email"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col xs="4" sm="8" md="4">
          <v-text-field
            v-model="password"
            :append-icon="password2 ? 'mdi-eye' : 'mdi-eye-off'"
            label="Password"
            outlined
            :type="password2 ? 'text' : 'password'"
            @click:append="password2 = !password2"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn class="py-5" x-large tile color="success" @click="userLogin">
          Login
        </v-btn>
      </v-row>
      <v-row justify="center">
        <nuxt-link to="/admin/login" class="ma-2">
          <v-btn class="py-5" tile color="primary"> Admin </v-btn>
        </nuxt-link>
      </v-row>
      <v-row  justify="center">
        <p v-if="Userpassword" class="red--text text--darken-4">
          {{word}}
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
      </v-container>
    </v-form>
  </v-app>
</template>

<script>
export default {
    middleware:'statusLogin',
  data() {
    
    return {
      snackbar: false,
      timeout: 2000,
      userEmail: '',
      password: '',
      Userpassword: false,
      password2: false,
      word:'',
    }
  },
  methods: {
    Datasend() {
      this.userLogin()
      this.snackbar = true
    },
    async userLogin() {
      console.log(this.userEmail)
      console.log(this.password)
      try {
        await this.$auth.loginWith('local', {
          data: { Email: this.userEmail, Password: this.password },
        })
      } catch (errore) {
        this.word = errore.response.data.msg
        this.Userpassword = true
      }
    },
  },
}
</script>