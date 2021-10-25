<template>
  <div class="text-center">

    <v-row justify="center" class="ma-10">
      <v-dialog
        v-model="dialog"
        max-width="1200px"
        max-height="100px"
      >
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
            <div class="ma-8">
              <div class="text-right"></div>
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
                          v-model="selectWeapon"
                          :items="weaponsFilter"
                          item-text="WeaponName"
                          label="Weapon"
                          outlined
                          :disabled="selectType === ''"
                          @click="filterWeapons"
                        ></v-select>
                        <v-select
                          v-model="selectSkin"
                          :items="skinFilter"
                          item-text="Skin.SkinName"
                          label="Skin"
                          outlined
                          :disabled="selectWeapon === ''"
                          @click="filterSkin"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="8">
                        <v-row>
                          <v-col>
                            <v-select
                              :items="stickerSet"
                              item-text="StickerName"
                              label="Sticker"
                              outlined
                              :disabled="selectSkin === ''"
                              @click="filterSkin"
                            ></v-select>
                          </v-col>
                          <v-col>
                            <v-select
                              :items="stickerSet"
                              item-text="StickerName"
                              label="Sticker"
                              outlined
                              :disabled="selectSkin === ''"
                              @click="filterSkin"
                            ></v-select>
                          </v-col>
                          <v-col>
                            <v-select
                              :items="stickerSet"
                              item-text="StickerName"
                              label="Sticker"
                              outlined
                              :disabled="selectSkin === ''"
                              @click="filterSkin"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row> </v-row>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model.number="price"
                          label="Price"
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
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="sendItem"
                        >
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

    skinId:'',
    skinSet: '',
    skinFilter: [],
    test: '',

    stickerSet: [],

    price: '',
    description:'',
    sheet: false,
    dialog: false,

    Stickers1:'',
    Stickers2:'',
    Stickers3:'',

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
      const skinSet = await this.$axios.$get(`/item/skin/${weaponsId}`)
      this.skinFilter = skinSet.Skin
    },
    checkSkin() {
      const dataSkinSelect = this.selectSkin
      const filterType = this.skinFilter
      const id = filterType.filter(function (item) {
        return item.Skin.SkinName === dataSkinSelect
      })
      this.skinId = id[0].SkinID
    },
    validateNumber(num) {
      if (Number.isInteger(Number(num)) && num > 0) {
        return true
      }
      return false
    },
    sendItem(){
      if(this.validateNumber(this.price) === true && this.description !== ''){
              this.checkSkin()
              const Item = {
        Price:this.price,
        Description:this.description,
        WeaponSkinID:this.skinId,
        UserID:this.$nuxt.$auth.user.UserID,
        Pubish:'N',
        Stickers:[{
            id:'STICKER8032871776'
        },
        {
          id:'STICKER8032871776'
        },{
          id:'STICKER8032871776'
        }
        ]
      }
      this.$axios.$post('/inventory/addItem',Item)

      }else{
      alert("wtf")
      }


    }
  },
}
</script>