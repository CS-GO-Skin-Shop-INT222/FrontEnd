<template>
  <div class="text-center">
    <v-row justify="center" class="ma-10">
      <v-dialog v-model="dialog" max-width="1200px" max-height="100px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on" @click="test1">
            Add Item
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Item</span>
          </v-card-title>
          <v-card-text>
            <div class="ma-2 ma-xs-2 ma-sm-2 ma-md-2">
              <div class="text-right"></div>
              <v-container>
                <div class="my-3">
                  <div class="text-center">
                    <v-row>
                      <v-col cols="12" md="8" sm="12" justify="center">
                        <v-img
                          class="mx-auto"
                          :src="`${imageURL}`"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                          max-height="300px"
                          max-width="400px"
                        />
                      </v-col>
                      <v-col cols="12" xs="12" md="4" sm="12">
                        <v-select
                          v-model="selectType"
                          :items="typeSet"
                          item-text="TypeName"
                          label="Type weapons"
                          outlined
                          @click="clearData(1)"
                        ></v-select>
                        <v-select
                          v-model="selectWeapon"
                          :items="weaponsFilter"
                          item-text="WeaponName"
                          label="Weapon"
                          outlined
                          :disabled="selectType === ''"
                          @click="
                            filterWeapons()
                            clearData(2)
                          "
                        ></v-select>

                        <v-select
                          v-model="selectSkin"
                          :items="skinFilter"
                          item-text="Skin.SkinName"
                          label="Skin"
                          outlined
                          :disabled="selectWeapon === ''"
                          @click="filterSkin"
                          @change="changeImage"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="8" sm="12">
                        <v-row>
                          <v-col cols="auto" md="4" sm="12">
                            <v-select
                              v-model="Stickers1"
                              :items="stickerSet"
                              item-text="StickerName"
                              label="Sticker"
                              outlined
                              :disabled="selectSkin === ''"
                              @change="
                                stickerImage(1)
                                checkSticker(1)
                              "
                            ></v-select>
                            <v-img
                              class="mx-auto"
                              :src="`${simg1}`"
                              max-height="200"
                              max-width="200"
                            ></v-img>
                          </v-col>
                          <v-col cols="auto" md="4" sm="12">
                            <v-select
                              v-model="Stickers2"
                              :items="stickerSet"
                              item-text="StickerName"
                              label="Sticker"
                              outlined
                              :disabled="selectSkin === ''"
                              @change="
                                stickerImage(2)
                                checkSticker(2)
                              "
                            ></v-select>
                            <v-img
                              class="mx-auto"
                              :src="`${simg2}`"
                              max-height="200"
                              max-width="200"
                            ></v-img>
                          </v-col>
                          <v-col cols="auto" md="4" sm="12">
                            <v-select
                              v-model="Stickers3"
                              :items="stickerSet"
                              item-text="StickerName"
                              label="Sticker"
                              outlined
                              :disabled="selectSkin === ''"
                              @change="
                                stickerImage(3)
                                checkSticker(3)
                              "
                            ></v-select>
                            <v-img
                              class="mx-auto"
                              :src="`${simg3}`"
                              max-height="200"
                              max-width="200"
                            ></v-img>
                          </v-col>
                        </v-row>
                        <v-row> </v-row>
                      </v-col>
                      <v-col cols="12" xs="12" md="4" sm="12">
                        <v-text-field
                          v-model.number="price"
                          label="Price"
                          type="number"
                          outlined
                          :rules="[
                            rules.numberCheck,
                            rules.required,
                            rules.positiveCheck,
                          ]"
                        ></v-text-field>
                        <v-textarea
                          v-model="description"
                          label="Description"
                          outlined
                          :rules="[rules.required]"
                        ></v-textarea>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialog = false"
                        >
                          Close
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="sendItem">
                          Save
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-container>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
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
    selectSkin: '',

    typeId: '',
    typeSet: [],

    weaponsId: '',
    weaponsSet: '',
    weaponsFilter: [],

    skinId: '',
    skinSet: '',
    skinFilter: [],
    test: '',

    stickerSet: [],

    price: '',
    description: '',
    sheet: false,
    dialog: false,

    Stickers1: '',
    Stickers2: '',
    Stickers3: '',

    simg1: '',
    simg2: '',
    simg3: '',
    weaponTrueFalse: false,

    imageURL: '',

    baseURL: 'https://api.blackcarrack.tech',
    rules: {
      required: (v) => !!v || 'Required.',
      numberCheck: (v) =>
        Number.isInteger(Number(v)) || 'The value must be an integer',
      positiveCheck: (v) => v > 0 || 'The value must be positive',
    },
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
      const weapons = await this.$axios.$get('/item/allweapon')
      const type = await this.$axios.$get('/item/alltype')
      const skin = await this.$axios.$get('/item/allskin')
      const sticker = await this.$axios.$get('/stickeritem/sticker')
      this.stickerSet = sticker
      this.typeSet = type
      this.weaponsSet = weapons
      this.skinSet = skin
      this.setArray(type)
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
      const skinSet = await this.$axios.$get(`/item/showweapon/${weaponsId}`)
      this.skinFilter = skinSet.Weapon
    },
    checkSkin() {
      const dataSkinSelect = this.selectSkin
      const filterType = this.skinFilter
      console.log(filterType)
      const id = filterType.filter(function (item) {
        return item.Skin.SkinName === dataSkinSelect
      })
      this.skinId = id[0].WeaponSkinID
    },
    validateNumber(num) {
      if (Number.isInteger(Number(num)) && num > 0) {
        return true
      }
      return false
    },
    clearData(number) {
      switch (number) {
        case 1:
          this.selectWeapon = ''
          this.selectSkin = ''
          break
        case 2:
          this.selectSkin = ''
          break
      }
    },
    async changeImage() {
      this.checkSkin()
      const dataWeaponSkin = await this.$axios.$get(
        `/item/showskin/${this.skinId}`
      )
      this.imageURL = dataWeaponSkin.Weapon[0].imageURL
    },
    stickerImage(number) {
      switch (number) {
        case 1:
          this.simg1 = `${this.baseURL}/api/stickeritem/stickerimage/${this.Stickers1}`

          break
        case 2:
          this.simg2 = `${this.baseURL}/api/stickeritem/stickerimage/${this.Stickers2}`
          break
        case 3:
          this.simg3 = `${this.baseURL}/api/stickeritem/stickerimage/${this.Stickers3}`
          break
      }
    },

    checkSticker(number) {
      let dataStickerSelect = ''
      switch (number) {
        case 1:
          dataStickerSelect = this.Stickers1
          break
        case 2:
          dataStickerSelect = this.Stickers2
          break
        case 3:
          dataStickerSelect = this.Stickers3
          break
      }
      if (dataStickerSelect !== '') {
        const filterType = this.stickerSet
        const id = filterType.filter(function (item) {
          return item.StickerName === dataStickerSelect
        })
        return id[0].StickerID
      }
      return ''
    },
   async sendItem() {
      if (this.validateNumber(this.price) === true && this.description !== '') {
        this.checkSkin()
        const Item = {
          Price: this.price,
          Description: this.description,
          UserID: this.$nuxt.$auth.user.UserID,
          WeaponSkinID: this.skinId,
          Stickers: [
            {
              id: this.checkSticker(1),
            },
            {
              id: this.checkSticker(2),
            },
            {
              id: this.checkSticker(3),
            },
          ],
        }
        console.log(Item)
        await this.$axios.$post('/inventory/addItem', Item)
        this.dialog = false
        location.reload()
      } else {
        alert('Check Data')
      }
    },
  },
}
</script>