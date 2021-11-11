<template>
  <v-app>
    <v-row class="ma-10">
      <v-col md="6" cols="12">
        <div class="text-center mx-6">
          <h1 class="text-center mx-6">
            User Image <v-icon large> mdi-account-box</v-icon>
          </h1>
          <img
            v-if="selectedFile"
            :src="imagePreview"
            alt="Upload Image"
            height="400"
            width="400"
          />
          <img
            v-else
            :src="imageURL"
            alt="Upload Image"
            height="400"
            width="400"
          />
          <!-- <input @change="onFileChanged" id="upload-photo" type="file" />
          <label for="upload-photo">Upload File</label> -->
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Avatar"
            @change="onFileChanged"
          ></v-file-input>
        </div>
      </v-col>
      <v-col md="6" cols="12">
        <h1 class="text-center mx-6">
          Profile <v-icon @click="isEdit = !isEdit">mdi-account-edit</v-icon>
        </h1>
        <v-form v-if="!isEdit">
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
              <v-btn class="py-5" x-large color="success" @click="sendImage()">
                Save
              </v-btn>
            </v-row>
          </v-row>
        </v-form>
        <v-card v-if="isEdit">
          <v-card-title> Name: {{ UserData.Name }} </v-card-title>
          <v-card-title> Email : {{ UserData.Email }} </v-card-title>
          <v-card-title> Tel : {{ UserData.Tel }} </v-card-title>
          <v-card-title> Credit : {{ UserData.Credit }} </v-card-title>
        </v-card>
      </v-col>
    </v-row>

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
      imagePreview: null,
      selectedFile: null,
      imageURL: '',

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
          (v) =>
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              v
            ) || 'E-mail must be valid',
        ],
      },
    }
  },
  async fetch() {
    console.log(this.UserData)
    try {
      this.imageURL = await this.$axios.$get('/imageusers/getImage')
      console.log(this.imageURL)
    } catch (error) {
      console.log('error')
      console.log(error)
    }
  },
  methods: {
    validateTelephone(tel) {
      if (Number.isInteger(Number(tel)) && tel.length === 10) {
        return true
      }
      return false
    },
    validateName(name) {
      const re = /^[A-Za-z]+$/
      return re.test(String(name).toLowerCase())
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
        Password: 'markmak12345@gmail',
      }
      const ips = await this.$axios.$put(
        `/user/edituser/${this.UserData.UserID}`,
        newData
      )
      return { ips }
    },
    onFileChanged(event) {
      console.log(event)
      if (event !== '' && event !== null) {
        console.log('asdasdasd')
        this.selectedFile = event
        this.imagePreview = URL.createObjectURL(event)
      } else {
        this.selectedFile = ''
        this.imagePreview = ''
      }
    },
    async sendImage() {
      const formData = new FormData()
      formData.append('avatar', this.selectedFile)
      console.log(formData)
      await this.$axios.$post(`/imageusers/uploadImage`, formData)
    },
  },
}
</script>
