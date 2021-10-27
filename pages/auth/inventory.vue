<template>
  <v-app class="text-center">
    <h1 class="text-center ma-6">Inventory</h1>
    <v-container>
      <v-row>
        <v-col class="grey darken-2" cols="8">
          <v-row>
            <v-col
              v-for="(item,index) in itemInventory"
              :key="index"
              cols="4"
              @click="setData(item)"
            >
              <v-card>
                <v-img
                  v-if="item.Description !== ''"
                  :src="`https://api.lorem.space/image/game?w=200&h=200`"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <v-card-title
                    v-text="item.WeaponSkin.Skin.SkinName"
                  ></v-card-title>
                </v-img>
                <v-img
                  v-if="item.Description === ''"
                  :src="`kuy`"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <v-card-title
                    v-text="item.WeaponSkin.Skin.SkinName"
                  ></v-card-title>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-if="!check" class="grey darken-3" cols="4">
          <v-img
            :src="`https://api.lorem.space/image/game?w=400&h=400`"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="400px"
          />
        </v-col>
        <v-col v-if="check" class="grey darken-3" cols="4">
          <v-img
            :src="`https://api.lorem.space/image/game?w=300&h=300`"
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
          <v-btn color="primary" dark> Edit </v-btn>
          <v-btn color="primary" dark @click="deleteItem"> Delete </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <bottom-sheet></bottom-sheet>
    <div>
      <v-row justify="center">
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="text-h5"> Delete this item ? </v-card-title>
            <v-card-text
              >Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are
              running.</v-card-text
            >
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
import BottomSheet from '~/components/BottomSheet.vue'
export default {
  //   async asyncData({ $axios }) {
  //   const ip = await $axios.$get(`/inventory/getitem/${this.$nuxt.$auth.user.UserID}`)
  //   return { ip }
  // },

  components: { BottomSheet },
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
      snackbar:false,
      check: false,
      setForItem: [],
    }
  },
  async fetch() {
    this.itemInventory = await this.$axios.$get(
      `/inventory/MyItem/${this.$nuxt.$auth.user.UserID}`
    )
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
        location.reload();
      }
    },
  },
}
</script>
