<template>
  <v-app>
    <v-form>
      <h1 class="text-center ma-6">Register</h1>
      <v-row dense justify="center" no-gutters>
        <v-spacer />
        <v-col sm="6" md="6" lg="4" class="text-md-center"
          ><v-text-field
            v-model="email"
            :rules="rules.emailRules"
            label="Email"
            outlined
          ></v-text-field>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row dense no-gutters justify="center">
        <v-spacer />
        <v-col sm="6" md="6" lg="4" class="text-md-center"
          ><v-text-field
            v-model="password"
            :append-icon="password1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min,rules.max]"
            :type="password1 ? 'text' : 'password'"
            name="input-10-1"
            hint="At least 10 characters"
            counter
            label="Password"
            outlined
            @click:append="password1 = !password1"
          >
          </v-text-field>
          <p class="text-caption text--secondary">
            Must include 10-20 capital & lower case English letters, numbers,
            and special characters
          </p>
        </v-col>
        <v-spacer />
      </v-row>

      <v-row dense no-gutters justify="center">
        <v-spacer />
        <v-col sm="6" md="6" lg="4" class="text-md-center"
          ><v-text-field
            v-model="ConfirmPassword"
            :append-icon="password2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.Match]"
            :type="password2 ? 'text' : 'password'"
            name="input-10-1"
            hint="Password must match"
            counter
            label="Confirm Password"
            outlined
            @click:append="password2 = !password2"
          ></v-text-field>
        </v-col>
        <v-spacer />
      </v-row>

      <v-row dense no-gutters justify="center">
        <v-spacer />
        <v-col sm="6" md="6" lg="4" class="text-md-center"
          ><v-text-field
            v-model="Name"
            :rules="[rules.required]"
            label="Name"
            outlined
          ></v-text-field>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row dense no-gutters justify="center">
        <v-spacer />
        <v-col sm="6" md="6" lg="4" class="text-md-center">
          <v-text-field
            v-model="Tel"
            :rules="[rules.required, rules.telnumber]"
            label="Tel"
            outlined
          ></v-text-field>
          <v-checkbox
            v-model="checkbox"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            class="justify-center text-md-center"
            justify="center"
            required
          ></v-checkbox>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row>
        <v-spacer />
        <v-row align="center" justify="space-around">
          <v-btn class="py-5" x-large color="success" @click="Checkrules">
            Register
          </v-btn>
        </v-row>
        <v-spacer />
      </v-row>
    </v-form>

    <div class="text-center">
      <v-snackbar v-model="snackbar" :timeout="timeout">
        <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
        Register completed

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
      UserData: [],
      rules: {
        required: (v) => !!v || 'Required.',
        min: (v) => v.length >= 10 || 'Min 10 characters',
        max: (v) => v.length <= 20 || 'Max 20 characters',
        Match: (v) => v === this.password || 'Password not match',
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
    validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
},
    validatePassword(password) {
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,20}$/;
    return re.test(String(password).toLowerCase());
},
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
        this.validateName(this.Name),
        this.validateEmail(this.email),
        this.validateTelephone(this.Tel),
        this.validatePassword(this.password),
        this.password === this.ConfirmPassword,
        this.checkbox,
      ]
      for (let index = 0; index < ArrayCheck.length; index++) {
        if (Boolean(ArrayCheck[index]) === false) {
          this.CheckTrue = false
        }
      }
      if (this.CheckTrue === false) {

        alert('Please check your data')
        this.CheckTrue = true
      } else {
         const UserData = {
           Name: this.Name,
           Email: this.email,
           Tel: this.Tel,
           Password: this.password,
           Credit: 1,
         }
         this.sendDataUser(UserData)
        this.snackbar = true
        console.log(UserData)
        //  setTimeout( () => this.$router.replace({  name:'auth-login'}), 2000);
      }
    },
    async sendDataUser(UserData) {
      const PATH_API = '/user/register'
      const ip = await this.$axios.$post(`${PATH_API}`, UserData)
      return { ip }
    },
  },
}
</script>