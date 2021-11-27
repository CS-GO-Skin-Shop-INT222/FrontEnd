<template>
  <div justify="center">
    <v-container>
      <v-col class="ma-auto" md="6" cols="12">
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
            <v-card-text v-show="selectedUser" class="ma-2"
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
      await this.$axios.$put(`/admins/addcredit/${this.userId}`, {
        Credit: parseInt(this.numberAddCredit),
      })
    },
  },
}
</script>