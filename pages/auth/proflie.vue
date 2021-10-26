<template>
  <v-app>
    <v-form>
      <h1 class="text-center ma-6">
        Profile <v-icon @click="isEdit = !isEdit">mdi-account-edit</v-icon>
      </h1>
      <v-row dense justify="center" no-gutters>
        <v-spacer />
        <v-col sm="6" md="6" lg="4" class="text-md-center"
          ><v-text-field
            v-model="UserData.Email"
            :rules="rules.emailRules"
            label="Email"
            outlined
            disabled
          ></v-text-field>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row dense no-gutters justify="center">
        <v-spacer />
        <v-col sm="6" md="6" lg="4" class="text-md-center"
          ><v-text-field
            v-model="UserData.Name"
            :rules="[rules.required]"
            label="Name"
            outlined
            :disabled="isEdit"
          ></v-text-field>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row dense no-gutters justify="center">
        <v-spacer />
        <v-col sm="6" md="6" lg="4" class="text-md-center">
          <v-text-field
            v-model="UserData.Tel"
            :rules="[rules.required, rules.telnumber]"
            label="Tel"
            outlined
            :disabled="isEdit"
          ></v-text-field>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row>
        <v-row align="center" justify="space-around">
          <v-btn class="py-5" x-large color="success" @click="saveData">
            Save
          </v-btn>
        </v-row>
      </v-row>
    </v-form>

    <div class="text-center">
      <v-snackbar v-model="snackbar" :timeout="timeout">
        <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
        SaveData completed

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-app>
</template>


<script>
export default {
  middleware: 'auth',
  async asyncData({ $axios }) {
    const ip = await $axios.$get('/user/profile')
    return { UserData: ip.user }
  },
  data() {
    return {
      snackbar: false,
      timeout: 2000,
      urlserver: process.env.urlserver,
      email: '',
      Tel: '',
      Name: '',
      password: '',
      password1: false,
      password2: false,
      checkbox: false,
      ConfirmPassword: '',
      CheckTrue: '',
      UserData: {},
      isEdit: true,
      rules: {
        required: (v) => !!v || 'Required.',
        min: (v) => v.length >= 10 || 'Min 10 characters',
        Match: (v) => v === this.password || 'Password not Match',
        telnumber: (v) =>
          Number.isInteger(Number(v)) || 'The value must be an integer',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
        ],
      },
    }
  },
  methods: {   
    validateTelephone(tel){
     if(Number.isInteger(Number(tel)) && tel.length === 10 )  {
       return true
     }
      return false
    },
    validateName(name){
      const re = /^[A-Za-z]+$/
        return re.test(String(name).toLowerCase());
    },
    Checkrules() {
      const ArrayCheck = [
        this.Name,
        this.email,
        this.Tel,
        this.password,
        this.password === this.ConfirmPassword,
        this.checkbox,
      ]
      for (let index = 0; index < ArrayCheck.length; index++) {
        if (Boolean(ArrayCheck[index]) === false) {
          this.CheckTrue = false
        }
      }
      if (this.CheckTrue === false) {
        alert('please insert data')
      } else {
        const UserData = {
          Name: this.Name,
          Email: this.email,
          Tel: this.Tel,
          Password: this.password,
          Credit: 1,
        }
        console.log(UserData)
        this.snackbar = true
        setTimeout(() => this.$router.replace({ name: 'auth-login' }), 2000)
      }
    },
    async saveData() {
      const newData = {
        UserID: this.UserData.UserID,
        Name: this.UserData.Name,
        Email: this.UserData.Email,
        Tel: this.UserData.Tel,
        Password: this.UserData.Password,
      }
      const ips = await this.$axios.$put(
        `/user/edituser/${this.UserData.UserID}`,
        newData
      )
      return { ips }
    },
  },
}
</script>
