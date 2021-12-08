<template>
  <div justify="center">
    <v-container>
      <v-col class="ma-auto" md="6" cols="12">
        <v-card justify="center" class="ma-5" color="blue darken-1">
          <v-card-title class="text-center">Add Credit</v-card-title>
          <div class="mx-2">
            <v-select
              v-model="selectedUser"
              :items="userDataSet"
              item-text="Name"
              label="UserList"
              color="white"
              outlined
              @change="checkCredit"
            ></v-select>
            <v-card-text v-show="selectedUser" class="subtitle-1 px-0"
              >Credit now : {{ presentCredit }}</v-card-text
            >
            <v-text-field
              v-show="selectedUser"
              v-model="numberAddCredit"
              type="number"
              label="Add Credit For this user"
              color="white"
              outlined
            ></v-text-field>
            <v-col class="d-flex justify-center">
              <v-btn class="ma-4" color="blue darken-1" @click="addCredit"
                >Add</v-btn
              >
            </v-col>
          </div>
        </v-card>
      </v-col>
    </v-container>
    <v-snackbar :color="color" v-model="snackbar" timeout="2000">
      <v-icon dark right> {{icon}} </v-icon>
      {{ snackbarWord }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: ['adminRedirect', 'auth'],

  async asyncData({ $axios }) {
    const ip = await $axios.$get('/admins/users')
    return { userDataSet: ip }
  },
  data() {
    return {
      selectedUser: '',
      userDataSet: '',
      presentCredit: '',
      userId: '',
      numberAddCredit: '',
      snackbarWord:'',
      snackbar:false,
      icon:'',
      color:'',
    }
  },
  methods: {
    checkCredit() {
      const dataSelect = this.selectedUser
      const filterUser = this.userDataSet
      const user = filterUser.filter(function (item) {
        return item.Name === dataSelect
      })
      this.presentCredit = user[0].Credit
      this.userId = user[0].UserID
    },
    async addCredit() {
      if (this.numberAddCredit <= 0) {
        alert('Credit cant less than 0 ')
      }
      try {
        await this.$axios.$put(`/admins/addcredit/${this.userId}`, {
          Credit: parseInt(this.numberAddCredit),
        })
        this.snackbarWord = 'Add Credit Completed'
        this.icon = 'mdi-checkbox-marked-circle'
        this.color = 'green'
        this.snackbar =true
        this.presentCredit= parseInt(this.presentCredit) + parseInt(this.numberAddCredit)
      } catch (error) {
        this.snackbarWord = error.data.msg
        this.color = 'red'
        this.icon = 'mdi-cancel'
        this.snackbar =true
      }
    },
  },
}
</script>