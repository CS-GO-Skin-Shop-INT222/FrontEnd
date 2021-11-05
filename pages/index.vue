<template>
  <v-app>
    <h1 class="text-center ma-6">Market</h1>
    <v-container class="mb-10">
      <v-row>
        <v-col
          outlined
          class="d-none d-sm-none d-md-inline-block text-center"
          cols="3"
        >
          <h2>Filter</h2>
          <h4>Price</h4>
          <v-select
            v-model="selectType"
            :items="typeSet"
            item-text="TypeName"
            label="Type weapons"
            outlined
            @click="clearData(1)"
            @change="filterWeapons()"
          ></v-select>
          <v-select
            v-model="selectWeapon"
            :items="weaponsFilter"
            item-text="WeaponName"
            label="Weapon"
            outlined
            :disabled="selectType === ''"
          ></v-select>
          <v-btn class="mx-2" v-for="(itemss,index) in totalpage" :key="index" elevation="2">{{ index+1 }}</v-btn>
        </v-col>
        <v-col class="justify-sm-center" md="9" cols="auto">
          <v-row>
            <v-col
              v-for="(item, index) in itemMarket"
              :key="index"
              cols="12"
              md="4"
              sm="6"
            >
              <v-card outlined hover>
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
                  <v-row>
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
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const ip = await $axios.$get('/marketitem/allmarket/1')
    return { ip }
  },
  data() {
    return {
      ip: '',
      itemMarket: '',
      setForItem: [],
      check: false,
      data: '',

      weaponsSet: [],
      typeSet: [],

      selectWeapon: '',
      selectType: '',

      weaponsFilter: [],
      totalpage: '',
    }
  },
  async fetch() {
    const weapons = await this.$axios.$get('/item/allweapon')
    const type = await this.$axios.$get('/item/alltype')
    const data = await this.$axios.$get('/marketitem/allmarket/1')
    this.typeSet = type.Type
    this.weaponsSet = weapons.Weapon
    this.itemMarket = data.data
    this.totalpage = data.totalpage
    console.log(this.itemMarket)
    this.data = this.itemMarket[0]
    if (this.data !== undefined) {
      this.check = true
    } else {
      this.check = false
    }
    this.setArrayItem()
    console.log(this.itemMarket[0])
  },
  methods: {
    setArrayItem() {
      for (let index = 0; index < 9; index++) {
        if (this.itemMarket[index] === undefined) {
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
          this.setForItem.push(this.itemMarket[index])
        }
      }
      this.itemMarket = this.setForItem
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
    },
  },
}
</script>

