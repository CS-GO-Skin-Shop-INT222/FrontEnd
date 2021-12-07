<template>
  <v-app>
    <v-row class="ma-10">
      <v-col md="6" cols="12">
        <div justify="center" class="text-center mx-6">
          <h1 class="text-center mx-6">
            User Image <v-icon large> mdi-account-box</v-icon>
          </h1>
          <div v-if="checkImage !== false">
            <v-img
              v-if="selectedFile"
              :src="imagePreview"
              class="ma-auto"
              alt="Upload Image"
              max-height="400"
              max-width="400"
            />
            <v-img
              v-else
              :src="`https://api.blackcarrack.tech/api/imageusers/getImage/${idUser}`"
              alt="Upload Image"
              class="ma-auto"
              max-height="400"
              max-width="400"
            />
          </div>
          <!-- <input @change="onFileChanged" id="upload-photo" type="file" />
          <label for="upload-photo">Upload File</label> -->
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Avatar"
            @change="onFileChanged"
          ></v-file-input>
          <v-btn class="py-5" x-large color="success" @click="sendImage()">
            Save Image
          </v-btn>
        </div>
      </v-col>
      <v-col md="6" cols="12">
        <h1 class="text-center mx-6">
          Profile <v-icon @click="isEdit = !isEdit">mdi-account-edit</v-icon>
        </h1>
        <v-form v-if="!isEdit">
          <v-row dense justify="center" no-gutters>
            <v-col sm="8" md="8" lg="8" class="text-md-center"
              ><v-text-field
                v-model="UserData.Email"
                :rules="rules.emailRules"
                label="Email"
                outlined
                disabled
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row dense no-gutters justify="center">
            <v-col sm="8" md="8" lg="8" class="text-md-center"
              ><v-text-field
                v-model="UserData.Name"
                :rules="[rules.required]"
                label="Name"
                outlined
                :disabled="isEdit"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row dense no-gutters justify="center">
            <v-col sm="8" md="8" lg="8" class="text-md-center">
              <v-text-field
                v-model="UserData.Tel"
                :rules="[rules.required, rules.telnumber]"
                label="Tel"
                outlined
                :disabled="isEdit"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row dense no-gutters justify="center">
            <v-col sm="8" md="8" lg="8" class="text-md-center">
              <v-btn x-small color="success" @click="checkEditPassword = !checkEditPassword">Edit Password</v-btn>
            </v-col>
          </v-row>
          <v-row dense no-gutters justify="center">
            
            <v-col sm="8" md="8" lg="8" class="text-md-center">
              <v-text-field
                v-model="password"
                :append-icon="password1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[
                  rules.required,
                  rules.min,
                  rules.max,
                  validatePassword,
                ]"
                :type="password1 ? 'text' : 'password'"
                name="input-10-1"
                hint="At least 10 characters"
                counter
                label="Password"
                outlined
                :disabled="checkEditPassword"
                @click:append="password1 = !password1"
              >
              </v-text-field>
              <p class="text-caption text--secondary">
                Must include 10-20 capital & lower case English letters,
                numbers, and special characters
              </p>
            </v-col>
          </v-row>
          <v-row dense no-gutters justify="center">
            <v-col sm="8" md="8" lg="8" class="text-md-center">
              <v-text-field
                v-model="ConfirmPassword"
                :append-icon="password2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.Match]"
                :type="password2 ? 'text' : 'password'"
                name="input-10-1"
                hint="Password must match"
                counter
                label="Confirm Password"
                outlined
                :disabled="checkEditPassword"
                @click:append="password2 = !password2"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-row align="center" justify="space-around">
              <v-btn class="py-5" x-large color="success" @click="checkRulesEdit()">
                Save
              </v-btn>
              <v-btn class="py-5" x-large color="red" @click="isEdit = !isEdit">
                Cancle
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
        <v-icon dark right> {{ icon }} </v-icon>
        {{ snackbarText }}

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
  middleware: ['auth', 'adminCant'],
  async asyncData({ $axios }) {
    const ip = await $axios.$get('/user/profile')
    return { UserData: ip.user }
  },
  data() {
    return {
      checkEditPassword:true,
      snackbarText: '',
      icon: '',
      checkImage: false,
      imagePreview: null,
      selectedFile: null,
      imageURL: 'https://api.blackcarrack.tech/api/imageusers/getImage',

      idUser: '',

      snackbar: false,
      timeout: 2000,
      urlserver: process.env.urlserver,
      password: '',
      password1: false,
      password2: false,
      ConfirmPassword: '',
      CheckTrue: '',
      UserData: {},
      isEdit: true,
      rules: {
        required: (v) => !!v || 'Required.',
        min: (v) => v.length >= 10 || 'Min 10 characters',
        max: (v) => v.length <= 20 || 'Max 20 characters',
        Match: (v) => v === this.password || 'Password not Match',
        telnumber: (v) =>
          Number.isInteger(Number(v)) || 'The value must be an integer',
      },
    }
  },
  async fetch() {
    try {
      const datauser = this.$nuxt.$auth.user
      this.idUser = datauser.UserID
      await this.$axios.get(
        `https://api.blackcarrack.tech/api/imageusers/getImage/${this.idUser}`
      )
      this.checkImage = true
    } catch (error) {
      this.checkImage = false
    }
  },

  methods: {
    validatePassword(password) {
      const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,20}$/
      return (
        re.test(String(password).toLowerCase()) ||
        'Password must English letters, numbers, and special characters'
      )
    },
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
    checkRulesEdit() {
      let ArrayCheck = []
      switch (this.checkEditPassword){
        case true:
          ArrayCheck = [
        this.UserData.Name,
        this.UserData.Tel,
      ]
      break;
      case false:
        ArrayCheck = [
        this.UserData.Name,
        this.UserData.Tel,
        this.password,
        this.password === this.ConfirmPassword,
      ]
      }
      for (let index = 0; index < ArrayCheck.length; index++) {
        if (Boolean(ArrayCheck[index]) === false) {
          this.CheckTrue = false
        }
      }
      if (this.CheckTrue === false) {
        this.icon = 'mdi-cancel'
        this.snackbarText = 'Please check your Data'
        this.snackbar = true
      } else {
        this.saveData()
        this.icon = 'mdi-checkbox-marked-circle'
        this.snackbarText = 'SaveData Complete'
        this.snackbar = true
        location.reload()
      }
    },
    async saveData() {
      if (this.checkEditPassword === true) {
        const newData = {
        Name: this.UserData.Name,
        Tel: this.UserData.Tel,
        Password:this.UserData.Password
      }
      await this.$axios.$put(
        `/user/edituser/${this.UserData.UserID}`,
        newData
      )
      }
      if (this.checkEditPassword === false) {
                const newData = {
        Name: this.UserData.Name,
        Tel: this.UserData.Tel,
        Password:this.password
      }
      await this.$axios.$put(
        `/user/edituser/${this.UserData.UserID}`,
        newData
      )
      }

    },
    onFileChanged(event) {
      if (event !== '' && event !== null) {
        this.selectedFile = event
        this.imagePreview = URL.createObjectURL(event)
      } else {
        this.selectedFile = ''
        this.imagePreview = ''
      }
    },
    async sendImage() {
      if (this.selectedFile === null || this.selectedFile === '') {
        this.icon = 'mdi-cancel'
        this.snackbarText = 'Please Upload Image'
        this.snackbar = true
      } else {
        const formData = new FormData()
        formData.append('avatar', this.selectedFile)
        this.icon = 'mdi-checkbox-marked-circle'
        this.snackbarText = 'UploadImage Complete'
        this.snackbar = true
        await this.$axios.$post(`/imageusers/uploadImage`, formData)
      }
    },
  },
}
</script>
