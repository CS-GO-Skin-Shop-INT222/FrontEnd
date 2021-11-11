<template>
  <div justify="center">
    <v-container>
      <v-col class="ma-auto" md="6" cols="10">
        <v-card justify="center" class="ma-5" color="blue darken-1">
          <v-card-title class="text-center">Add Credit</v-card-title>
          <div class="ma-5">
            <v-select
              v-model="selectedUser"
              :items="userDataSet"
              item-text="Name"
              label="UserList"
              color="white"
              outlined
              @change="checkCredit"
            ></v-select>
            <v-card-text class="ma-2" v-show="selectedUser"
              >Credit : {{ presentCredit }}</v-card-text
            >
            <v-text-field
              type="number"
              v-show="selectedUser"
              v-model="numberAddCredit"
              label="Add Credit For this user"
              color="white"
            ></v-text-field>
            <v-btn class="ma-4" color="blue darken-1" @click="addCredit"
              >Add</v-btn
            >
          </div>
        </v-card>
      </v-col>
    </v-container>
  </div>
</template>
<script>
export default {
  middleware: 'admincheck',
  layout: 'admin',
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
    }
  },
  methods: {
    checkCredit() {
      const dataSelect = this.selectedUser
      const filterUser = this.userDataSet
      const user = filterUser.filter(function (item) {
        return item.Name === dataSelect
      })
      console.log(user)
      this.presentCredit = user[0].Credit
      this.userId = user[0].UserID
    },
    async addCredit() {
      console.log(this.userId)
      console.log(typeof this.numberAddCredit)
      if (this.numberAddCredit <= 0) {
        console.log('Credit cant less than 0 ')
      }
      await this.$axios.$put(`/admins/addcredit/${this.userId}`, {
        Credit: parseInt(this.numberAddCredit),
      })
    },
  },
}
</script>