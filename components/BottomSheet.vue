<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet" inset>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="orange" dark v-bind="attrs" v-on="on" @click="test1">
          Add Item
        </v-btn>
      </template>
      <v-sheet height="800px">
        <div class="ma-8">
          <div class="text-right">
            <v-btn class="mt-6" color="error " @click="sheet = !sheet">
              X
            </v-btn>
          </div>
          <v-container>
            <div class="my-3">
              <div class="text-center">
                <v-row>
                  <v-col cols="8">
                    <p>Hello</p>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      v-model="selectType"
                      :items="typeSet"
                      item-text="TypeName"
                      label="Type weapons"
                      outlined
                    ></v-select>
                    <v-select
                      v-if="selectType"
                      v-model="selectWeapon"
                      :items="weaponsFilter"
                      item-text="WeaponName"
                      label="Weapon"
                      outlined
                      @click="filterWeapons"
                    ></v-select>
                    <v-select
                      v-if="selectWeapon"
                      :items="skinFilter"
                      item-text="Skin.SkinName"
                      label="Skin"
                      @click="filterSkin"
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="8">

                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="price"
                      label="Price"
                      outlined
                    ></v-text-field>
                    <v-textarea label="Description" outlined></v-textarea>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-container>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const ip = await $axios.$get('/item/weapon')
    return { ip }
  },
  data: () => ({
    selectType: '',
    selectWeapon: '',

    typeId: '',
    typeSet: [],

    weaponsId: '',
    weaponsSet: '',
    weaponsFilter: [],

    skinSet: '',
    skinFilter: [],
    test: '',

    stickerSet:'',

    price: '',
    sheet: false,
  }),
  methods: {
    setArray(data) {
      const ArrayEiEi = []
      for (let index = 0; index < data.Type.length; index++) {
        ArrayEiEi.push(data.Type[index])
      }
      this.typeSet = ArrayEiEi
    },

    async test1() {
      const weapons = await this.$axios.$get('/item/weapon')
      const type = await this.$axios.$get('/item/type')
      const skin = await this.$axios.$get('/item/skin')
      const sticker = await this.$axios.$get('/Sticker/sticker')
      this.stickerSet = sticker
      this.typeSet = type
      this.weaponsSet = weapons
      this.skinSet = skin
      this.setArray(type)
      console.log(sticker)
    },
    checkType() {
      const dataSelect = this.selectType
      const filterType = this.typeSet
      const id = filterType.filter(function (item) {
        return item.TypeName === dataSelect
      })
      this.typeId = id[0].TypeID
    },
    filterWeapons() {
      this.checkType()
      const filterWeapons = this.weaponsSet.Weapon
      const typeId = this.typeId
      this.weaponsFilter = filterWeapons.filter(function (item) {
        return item.TypeID === typeId
      })
    },
    checkWeapons() {
      const dataWeaponSelect = this.selectWeapon
      const filterType = this.weaponsSet.Weapon
      const id = filterType.filter(function (item) {
        return item.WeaponName === dataWeaponSelect
      })
      this.weaponsId = id[0].WeaponID
    },

    async filterSkin() {
      this.checkWeapons()
      const weaponsId = this.weaponsId
      const skinSet = await this.$axios.$get(`/item/skin/${weaponsId}`)
      this.skinFilter = skinSet.Skin
    },
  },
}
</script>