<template>
  <v-app>
    <h1 class="text-center ma-6">Market</h1>
    <v-container class="mb-10">
      <v-row>
        <v-col outlined class="text-center" cols="12" sm="12" md="3">
          <h2>Filter</h2>
          <v-row dense>
            <v-col sm="4" md="12" cols="4">
              <h4>Type</h4>
              <v-select
                v-model="selectType"
                :items="typeSet"
                item-text="TypeName"
                label="Type weapons"
                outlined
                @click="clearData(1)"
                @change="filterWeapons()"
              ></v-select>
            </v-col>
            <v-col sm="4" md="12" cols="4">
              <h4>Weapon</h4>
              <v-select
                v-model="selectWeapon"
                :items="weaponsFilter"
                item-text="WeaponName"
                label="Weapon"
                outlined
                :disabled="selectType === ''"
                @change="checkWeapons"
              ></v-select>
            </v-col>
            <v-col sm="4" md="12" cols="4">
              <h4>Page</h4>
              <select-page :pagenumber="totalpage" @numberPage="changePage" />
            </v-col>
            <v-col sm="12" md="12" cols="12">
              <v-btn @click="resetButton">Reset</v-btn></v-col
            >
          </v-row>
        </v-col>
        <v-col id="Marketitem" class="justify-sm-center" md="9" cols="auto">
          <v-row id="MarketFalse">
            <v-col
              v-for="item in itemMarket"
              :key="item.ItemID"
              cols="12"
              md="4"
              sm="6"
            >
            <dialog-item :state-item="'index'" :detail-data="detailData" @buy="buyItem">
                <v-card
                  outlined
                  hover
                  justify="center"
                  :disabled="item.Description === ''"
                  @click="getDetailItem(item)"
                  
                >
                  <v-img
                    :src="`${item.WeaponSkin.imageURL}`"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                  >
                    <v-card-title
                      v-text="item.WeaponSkin.Skin.SkinName"
                    ></v-card-title>
                    <v-row dense justify="center">
                      <v-col
                        v-for="(
                          stickerincol, indexsticker
                        ) in item.Item_Sticker"
                        :key="indexsticker"
                        cols="4"
                      >
                        <v-img
                        class="ma-auto"
                          height="60px"
                          width="60px"
                          :src="`https://api.blackcarrack.tech/api/stickeritem/stickerimage/${stickerincol.Sticker.StickerName}`"
                        >
                        </v-img>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </dialog-item>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      <v-icon dark right> {{icon}}</v-icon>
      {{ snackbarWord }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import DialogItem from '~/components/dialogItem.vue'
import selectPage from '~/components/selectPage.vue'
export default {
  components: { selectPage, DialogItem },
  middleware: 'adminCant',
  async asyncData({ $axios }) {
    const ip = await $axios.$get('/marketitem/allmarket/1')
    return { ip }
  },
  data() {
    return {
      snackbar: false,
      timeout: 2000,
      ip: '',
      itemMarket: '',
      itemMarket2: '',

      switchItem: false,

      setForItem: [],
      check: false,
      data: '',

      weaponsSet: [],
      typeSet: [],

      selectWeapon: '',
      selectType: '',

      weaponsFilter: [],
      totalpage: [],

      dialog: false,

      detailData: {
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
      },

      snackbarWord: '',
      icon:'',
      stateFilter: 'market',
      idWeapon: '',
    }
  },
  async fetch() {
    const weapons = await this.$axios.$get('/item/allweapon')
    const type = await this.$axios.$get('/item/alltype')
    const data = await this.$axios.$get('/marketitem/allmarket/1')
    this.typeSet = type.Type
    this.weaponsSet = weapons.Weapon
    this.itemMarket = data.data

    this.totalpage = Array.from(Array(data.totalpage).keys())
    this.setArrayItem(1)
  },
  methods: {
    setArrayItem(number) {
      this.detailData = {
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
          imageURL: '',
        },
        Users: { Name: '', Email: '' },
        Item_Sticker: [],
      }
      if (number === 1) {
        for (let index = 0; index < 9; index++) {
          if (this.itemMarket[index] === undefined) {
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
            this.setForItem.push(this.itemMarket[index])
          }
        }
        this.itemMarket = this.setForItem
      } else {
        for (let index = 0; index < 9; index++) {
          if (this.itemMarket2[index] === undefined) {
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
            this.setForItem.push(this.itemMarket2[index])
          }
        }
        this.itemMarket2 = this.setForItem
      }
    },
    clearData(number) {
      switch (number) {
        case 1:
          this.selectWeapon = ''
          this.selectSkin = ''
          break
      }
    },
    checkType() {
      const dataSelect = this.selectType
      const filterType = this.typeSet
      const id = filterType.filter(function (item) {
        return item.TypeName === dataSelect
      })
      this.typeId = id[0].TypeID
    },
    async filterWeapons() {
      this.checkType()
      const typeId = this.typeId
      const weaponSet = await this.$axios.$get(`/item/weapon/${typeId}`)
      this.weaponsFilter = weaponSet.Weapon
      const datatype = await this.$axios.$get(
        `/marketitem/filterType/${typeId}/1`
      )
      this.stateFilter = 'type'
      this.totalpage = Array.from(Array(datatype.totalpage).keys())
      this.itemMarket = []
      this.itemMarket = datatype.data
    },
    async checkWeapons() {
      const dataWeaponSelect = this.selectWeapon
      const filterType = this.weaponsSet
      const id = filterType.filter(function (item) {
        return item.WeaponName === dataWeaponSelect
      })
      this.idWeapon = id[0].WeaponID
      const dataweapon = await this.$axios.$get(
        `/marketitem/filterWeapon/${this.idWeapon}/1`
      )
      this.stateFilter = 'weapon'
      this.totalpage = Array.from(Array(dataweapon.totalpage).keys())
      this.itemMarket = []
      this.itemMarket = dataweapon.data
    },
    getDetailItem(item) {
      this.dialog = true
      this.detailData = item
    },
    async changePage(number) {
      let dataset = ''
      switch (this.stateFilter) {
        case 'market':
          dataset = await this.$axios.$get(`/marketitem/allmarket/${number}`)
          this.itemMarket = dataset.data
          this.totalpage = Array.from(Array(dataset.totalpage).keys())
          break
        case 'type':
          dataset = await this.$axios.$get(
            `/marketitem/filterType/${this.typeId}/${number}`
          )
          this.itemMarket = dataset.data
          this.totalpage = Array.from(Array(dataset.totalpage).keys())
          break
        case 'weapon':
          dataset = await this.$axios.$get(
            `/marketitem/filterWeapon/${this.idWeapon}/${number}`
          )
          this.itemMarket = dataset.data
          this.totalpage = Array.from(Array(dataset.totalpage).keys())
          break
      }
    },
    async buyItem(number) {
      if (this.$nuxt.$auth.loggedIn === false) {
        this.icon = 'mdi-cancel'
        this.snackbarWord = 'Please Login'
        this.snackbar = true
      } else {
        try {
          await this.$axios.put(`/marketitem/buyItem/${number}`)
          this.snackbarWord = 'Buy item completed'
          this.icon = 'mdi-checkbox-marked-circle'
          this.snackbar = true
        } catch (errore) {
          this.icon = 'mdi-cancel'
          if (errore.response.data.msg === 'Credit is not enough') {
            this.snackbarWord = 'Credit is not enough'
            this.snackbar = true
          } else if (errore.response.data.msg === 'item is your') {
            this.snackbarWord = 'item is your'
            this.snackbar = true
          }
        }
      }
    },
    async resetButton() {
      if (this.selectType !== '' || this.selectWeapon !== '') {
        const weapons = await this.$axios.$get('/item/allweapon')
        const type = await this.$axios.$get('/item/alltype')
        const data = await this.$axios.$get('/marketitem/allmarket/1')
        this.typeSet = type.Type
        this.weaponsSet = weapons.Weapon
        this.itemMarket = data.data

        this.totalpage = Array.from(Array(data.totalpage).keys())
        this.selectWeapon = ''
        this.selectType = ''
        this.stateFilter = 'market'
        this.changePage(1)
      } else {
        this.icon = 'mdi-cancel'
        this.snackbarWord = 'This is default'
        this.snackbar = true
      }
    },
  },
}
</script>

