<template>
  <v-app class="text-center mb-10">
    <h1 class="text-center ma-6">
      {{ topic }}<bottom-sheet v-if="topic === 'Inventory'"></bottom-sheet>
    </h1>
    <v-container class="my-0">
      <v-row justify="center">
        <v-col class="justify-sm-center" md="8" sm="12" cols="auto">
          <v-row>
            <v-col
              v-for="(item, index) in itemInventory"
              :key="index"
              cols="12"
              md="4"
              sm="6"
              class="d-sm-block d-md-none"
            >
            <dialog-item :detail-data="data" :state-item="statepage" @sell="sellItem" @edit="editItem" @cancelsellitem="cancelsalesItem" @delete="deleteItem">
              <v-card outlined               @click="setData(item)">
                <v-img
                  v-if="item.Description !== ''"
                  :src="`${item.WeaponSkin.imageURL}`"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <v-card-title
                    v-text="item.WeaponSkin.Skin.SkinName"
                  ></v-card-title>
                  <v-row dense>
                    <v-col
                      v-for="(stickerincol, index2) in item.Item_Sticker"
                      :key="index2"
                      cols="4"
                    >
                      <v-img
                        max-height="60px"
                        max-width="60px"
                        :src="`https://api.blackcarrack.tech/api/stickeritem/stickerimage/${stickerincol.Sticker.StickerName}`"
                      >
                      </v-img
                    ></v-col>
                  </v-row>
                </v-img>
                <v-img
                  v-if="item.Description === ''"
                  :src="``"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <v-card-title v-text="item.WeaponSkin.Skin.SkinName">
                  </v-card-title>
                </v-img>
              </v-card>
              </dialog-item>
            </v-col>
            <v-col
              v-for="(item, index) in itemInventory"
              :key="index+'s'"
              cols="12"
              md="4"
              sm="6"
              class="d-none d-sm-none d-md-inline-block "
            
            >
              <v-card outlined :disabled="item.Description === ''" @click="setData(item)">
                <v-img
                  v-if="item.Description !== ''"
                  :src="`${item.WeaponSkin.imageURL}`"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <v-card-title
                    v-text="item.WeaponSkin.Skin.SkinName"
                  ></v-card-title>
                  <v-row dense>
                    <v-col
                      v-for="(stickerincol, index2) in item.Item_Sticker"
                      :key="index2"
                      cols="4"
                    >
                      <v-img
                        height="60px"
                        width="60px"
                        :src="`https://api.blackcarrack.tech/api/stickeritem/stickerimage/${stickerincol.Sticker.StickerName}`"
                      >
                      </v-img
                    ></v-col>
                  </v-row>
                </v-img>
                <v-img
                  v-if="item.Description === ''"
                  :src="``"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <v-card-title v-text="item.WeaponSkin.Skin.SkinName">
                  </v-card-title>
                </v-img>
              </v-card>
            </v-col>
            <v-col class="d-flex justify-center" cols="12">
              <v-col cols="6" sm="2" md="2">
                <select-page
                  :pagenumber="totalpage"
                  @numberPage="changeItemPage"
                />
              </v-col>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          v-if="check"
          class="grey darken-3 d-none d-sm-none d-md-inline-block"
          cols="4"
        >
          <v-img
            :src="`${data.WeaponSkin.imageURL}`"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="300px"
          />
          <p>| {{ data.WeaponSkin.Weapon.WeaponName }} |</p>
          <p>{{ data.WeaponSkin.Skin.SkinName }}</p>
          <v-textarea
            v-if="editState !== true"
            label="Description"
            :value="data.Description"
            outlined
            disabled
          ></v-textarea>
          <v-textarea
            v-else
            v-model="editDescription"
            label="Description"
            outlined
            :rules="[rules.required, validateDescription]"
          ></v-textarea>
          <p>User : {{ data.Users.Name }}</p>
          <p v-if="editState !== true">$ {{ data.Price }}</p>
          <v-text-field
            v-else
            v-model.number="editPrice"
            label="Price"
            type="number"
            outlined
            :rules="[
              rules.numberCheck,
              rules.required,
              rules.positiveCheck,
              validateNumber,
            ]"
          ></v-text-field>
          <v-btn
            v-if="statepage === 'inventory' && editState !== true"
            color="primary"
            dark
            @click="editState = !editState"
          >
            Edit
          </v-btn>
          <v-btn
            v-if="statepage === 'inventory' && editState !== true"
            color="black"
            dark
            @click="sellItem(data.ItemID)"
          >
            Sell
          </v-btn>
          <v-btn
            v-if="statepage === 'inventory' && editState !== true"
            color="red"
            dark
            @click="deleteItem(data.ItemID)"
          >
            Delete
          </v-btn>
          <v-btn
            v-if="statepage === 'inventory' && editState === true"
            color="green"
            dark
            @click="editItem({id:data.ItemID,description:editDescription,price:editPrice})"
          >
            Confirm
          </v-btn>
          <v-btn
            v-if="statepage === 'inventory' && editState === true"
            color="red"
            dark
            @click="editState = !editState"
          >
            Cancle
          </v-btn>

          <v-btn
            v-if="statepage === 'sell' && editState !== true"
            color="red"
            dark
            @click="cancelsalesItem(data.ItemID)"
          >
            Cancel Sell
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center">
      <v-snackbar v-model="snackbar" :timeout="2000">
        <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
        {{ snackbartext }}

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
  props: ['statepage'],
  data() {
    return {
      editState: false,
      editDescription: '',
      editPrice: '',

      topic: '',
      totalpage: [0],
      itemInventory: [],
      dialog: false,
      data: {
        ItemID: 'Simple',
        Price: '',
        Description: '',
        Date: '',
        WeaponSkinID: '',
        UserID: '',
        Publish: '',
        WeaponSkin: {
          WeaponSkinID: '',
          SkinID: '',
          WeaponID: '',
          Skin: { SkinName: '' },
          Weapon: { WeaponName: '' },
        },
        Users: { Name: '', Email: '' },
        Item_Sticker: [],
      },
      snackbar: false,
      snackbartext: '',
      check: false,
      setForItem: [],
      rules: {
        required: (v) => !!v || 'Required.',
        numberCheck: (v) =>
          Number.isInteger(Number(v)) || 'The value must be an integer',
        positiveCheck: (v) => v > 0 || 'The value must be positive',
      },
    }
  },
  async fetch() {
    if (this.statepage === 'inventory') {
      const dataset = await this.$axios.$get(
        `/inventory/MyItem/${this.$nuxt.$auth.user.UserID}/1`
      )
      this.topic = 'Inventory'
      this.itemInventory = dataset.data
      this.totalpage = Array.from(Array(dataset.totalpage).keys())
      if (this.itemInventory[0] !== undefined) {
        this.check = true
         this.data = this.itemInventory[0]
      }else{
        this.check = false
      }
      this.setArrayItem()
    } else if (this.statepage === 'sell') {
      this.topic = 'Sell Item'
      const dataset = await this.$axios.$get(
        `/inventory/MyItemselling/${this.$nuxt.$auth.user.UserID}/1`
      )
      this.itemInventory = dataset.data
      this.totalpage = Array.from(Array(dataset.totalpage).keys())
      if (this.itemInventory[0] !== undefined) {
        this.check = true
         this.data = this.itemInventory[0]
      }else{
        this.check = false
      }
           this.setArrayItem()
    }
  },
  methods: {
    validateDescription(description) {
      if (description.length > 100) {
        return 'Please decrease text'
      }
      return true
    },
    validateNumber(num) {
      if (Number.isInteger(Number(num)) && num > 0) {
        return true
      }
      return false
    },
    setData(data1) {
        this.data = data1
        this.check = true
    },
    setArrayItem() {
      for (let index = 0; index < 9; index++) {
        if (this.itemInventory[index] === undefined) {
            const blankdata = {
              ItemID: index,
              Price: '',
              Description: '',
              Date: '',
              WeaponSkinID: '',
              UserID: '',
              Publish: '',
              WeaponSkin: {
                WeaponSkinID: '',
                SkinID: '',
                WeaponID: '',
                Skin: { SkinName: '' },
                Weapon: { WeaponName: '' },
                imageURL: '',
              },
              Users: { Name: '', Email: '' },
              Item_Sticker: [],
            }
            this.setForItem.push(blankdata)
        } else {
          this.setForItem.push(this.itemInventory[index])
        }
      }
      this.itemInventory = this.setForItem
    },
    deleteItem(number) {
      if (confirm('Sure to delete ?')) {
        this.$axios.$delete(`/inventory/deleteItem/${number}`)
        this.snackbartext = 'Delete item completed'
        this.snackbar = true
       location.reload()
      }
    },
    sellItem(number) {
      if (confirm('Sure to sell ?')) {
        this.$axios.$put(`/inventory/sellItem/${number}`)
        this.snackbar = true
        this.snackbartext = 'Sell completed'
       location.reload()
      }
    },
    cancelsalesItem(number) {
      if (confirm('Sure to cancelsales ?')) {
        this.$axios.$put(`/inventory/cancelsales/${number}`)
        this.snackbar = true
        this.snackbartext = 'Cancel sell completed'
       location.reload()
      }
    },
    async changeItemPage(number) {
      if (this.statepage === 'inventory') {
        const dataset = await this.$axios.$get(
          `/inventory/MyItem/${this.$nuxt.$auth.user.UserID}/${number}`
        )
        this.itemInventory = dataset.data
        this.totalpage = Array.from(Array(dataset.totalpage).keys())
      }
      if (this.statepage === 'sell') {
        const dataset = await this.$axios.$get(
          `/inventory/MyItemselling/${this.$nuxt.$auth.user.UserID}/${number}`
        )
        this.itemInventory = dataset.data
        this.totalpage = Array.from(Array(dataset.totalpage).keys())
      }
    },
    editItem(arrayget) {
      if (
        this.validateNumber(arrayget.price) === true &&
        this.description !== '' &&
        this.validateDescription(arrayget.description) === true
      ) {
        const data = {
          Price: arrayget.price,
          Description: arrayget.description,
        }
        if (confirm('Sure to edit Item ?')) {
          this.$axios.$put(`/inventory/editItem/${arrayget.id}`, data)
          this.snackbartext = 'Edit item completed'
          this.snackbar = true
         location.reload()
        }
      } else {
        alert('Check Data')
      }
    },
  },
}
</script>