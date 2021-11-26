<template>
  <v-app class="text-center mb-10">
    <h1 class="text-center ma-6">Sell Item</h1>
    <v-container>
      <v-row>
        <v-col class="justify-sm-center" md="8" cols="auto">
          <v-row>
            <v-col
              v-for="(item, index) in itemInventory"
              :key="index"
              cols="12"
              md="4"
              sm="6"
              @click="setData(item)"
            >
              <v-card outlined 
              > 
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
                      v-for="(stickerincol, index) in item.Item_Sticker"
                      :key="index"
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
            label="Description"
            :value="data.Description"
            outlined
            disabled
          ></v-textarea>
          <p>User : {{ data.Users.Name }}</p>
          <p>$ {{ data.Price }}</p>
          <v-btn color="primary" dark @click="cancelsalesItem"> Cancel </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <div>
      <v-row justify="center">
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="text-h5"> Delete this item ? </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">
                Disagree
              </v-btn>
              <v-btn color="green darken-1" text @click="dialog = false">
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <div class="text-center">
      <v-snackbar v-model="snackbar" :timeout="2000">
        <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
        Cancel completed

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
  //   async asyncData({ $axios }) {
  //   const ip = await $axios.$get(`/inventory/getitem/${this.$nuxt.$auth.user.UserID}`)
  //   return { ip }
  // },
  middleware: 'auth',
  data() {
    return {
      itemInventory: '',
      dataimage: '../../assets/weapons/Hello.png',
      dialog: false,
      data: {
        WeaponSkin: {
          Weapon: { WeaponName: '' },
          Skin: { SkinName: '' },
        },
        Description: '',
        Users: { Name: '' },
        Price: '',
      },
      snackbar: false,
      check: false,
      setForItem: [],
      baseURL: 'https://api.blackcarrack.tech',
    }
  },
  async fetch() {
    const dataset = await this.$axios.$get(
      `/inventory/MyItemselling/${this.$nuxt.$auth.user.UserID}/1`
    )
    this.itemInventory = dataset.data
    console.log(dataset)
    this.data = this.itemInventory[0]
    if (this.data !== undefined) {
      this.check = true
    } else {
      this.check = false
    }
    this.setArrayItem()
  },
  methods: {
    setData(data1) {
      if (data1.ItemID !== '') {
        this.data = data1
        this.check = true
      }
    },
    setArrayItem() {
      for (let index = 0; index < 9; index++) {
        if (this.itemInventory[index] === undefined) {
          this.setForItem.push({
            ItemID: '',
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
          })
        } else {
          this.setForItem.push(this.itemInventory[index])
        }
      }
      this.itemInventory = this.setForItem
    },
    deleteItem() {
      console.log(this.data.ItemID)
      if (confirm('Sure to delete ?')) {
        this.$axios.$delete(`/inventory/deleteItem/${this.data.ItemID}`)
        this.snackbar = true
        location.reload()
      }
    },
    cancelsalesItem() {
      console.log(this.data.ItemID)
      if (confirm('Sure to cancelsales ?')) {
        this.$axios.$put(`/inventory/cancelsales/${this.data.ItemID}`)
        this.snackbar = true
        location.reload()
      }
    },
  },
}
</script>