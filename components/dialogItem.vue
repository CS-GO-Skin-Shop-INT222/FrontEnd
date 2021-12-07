<template>
  <div>
    <div @click="dialog = !dialog">
      <slot> </slot>
      <div>
        <v-row justify="center" class="text-center" dense>
          <v-dialog v-model="dialog" dark max-width="1200px" max-height="500px">
            <v-card>
              <v-container>
                <v-row dense class="ma-2" >
                  <v-col cols="12" md="8" sm="12">
                    <v-img
                      v-if="detailData.Description !== ''"
                      :src="`${detailData.WeaponSkin.imageURL}`"
                      class="white--text align-end ma-auto"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      max-height="600px"
                      max-width="700px"
                    />
                  </v-col>
                  <v-col cols="12" xs="12" md="4" sm="12">
                    <v-card-subtitle class="text-h5 pl-2 py-0">{{
                      detailData.WeaponSkin.Weapon.WeaponName
                    }}</v-card-subtitle>
                    <v-card-title class="text-h4 pl-2 py-0">{{
                      detailData.WeaponSkin.Skin.SkinName
                    }}</v-card-title>
                    <v-card-text v-if="editState !== true">
                      {{ detailData.Description }}
                    </v-card-text>
                    <v-textarea
                      v-else
                      v-model="editDescription"
                      label="Description"
                      outlined
                      :rules="[rules.required, validateDescriptionCheck]"
                    ></v-textarea>
                    <v-card-text>
                      Owner : {{ detailData.Users.Name }}
                    </v-card-text>
                    <v-row justify="center" class="px-10">
                      <v-col
                        v-for="(stickerincol, index) in detailData.Item_Sticker"
                        :key="index"
                        cols="4"
                        justify="center"
                        class="ma-auto"
                      >
                        <v-img
                          v-if="stickerincol !== undefined"
                          class="ma-auto"
                          height="80px"
                          width="80px"
                          :src="`https://api.blackcarrack.tech/api/stickeritem/stickerimage/${stickerincol.Sticker.StickerName}`"
                        >
                        </v-img>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-card-text
                        v-if="editState !== true"
                        class="text-center text-h5"
                      >
                        $ {{ detailData.Price }}
                      </v-card-text>
                      <v-text-field
                        v-else
                        v-model.number="editPrice"
                        label="Price"
                        type="number"
                        class="ma-auto"
                        outlined
                        :rules="[
                          rules.numberCheck,
                          rules.required,
                          rules.positiveCheck,
                          validateNumberCheck,
                        ]"
                      ></v-text-field>
                      <v-col cols="auto">
                      <v-btn
                        v-if="stateItem === 'index'"
                        class="justify-center"
                        color="green"
                        dark
                        elevation="2"
                        @click="sendNumberBuy"
                        >Buy Item</v-btn
                      >
                      <v-btn
                        v-if="stateItem === 'inventory' && editState !== true"
                        color="primary"
                        dark
                        @click="editState = !editState"
                      >
                        Edit
                      </v-btn>
                      <v-btn
                        v-if="stateItem === 'inventory' && editState !== true"
                        color="black"
                        dark
                        @click="sendNumberSell"
                      >
                        Sell
                      </v-btn>
                      <v-btn
                        v-if="stateItem === 'inventory' && editState !== true"
                        color="red"
                        dark
                        @click="sendNumberDelete"
                      >
                        Delete
                      </v-btn>
                      <v-btn
                        v-if="stateItem === 'inventory' && editState === true"
                        color="green"
                        dark
                        @click="sendNumberEdit"
                      >
                        Confirm
                      </v-btn>
                      <v-btn
                        v-if="stateItem === 'inventory' && editState === true"
                        color="red"
                        dark
                        @click="editState = !editState"
                      >
                        Cancle
                      </v-btn>
                      <v-btn
                        v-if="stateItem === 'sell' && editState !== true"
                        color="red"
                        dark
                        @click="sendNumberCancelSell"
                      >
                        Cancel Sell
                      </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['detail-data', 'state-item'],
  data() {
    return {
      
      dialog: false,
      editState: false,
      editDescription: '',
      editPrice: '',
      rules: {
        required: (v) => !!v || 'Required.',
        numberCheck: (v) =>
          Number.isInteger(Number(v)) || 'The value must be an integer',
        positiveCheck: (v) => v > 0 || 'The value must be positive',
      },
    }
  },
  methods: {
    validateDescriptionCheck(description) {
      if (description.length > 100) {
        return false || 'Please decrease text'
      }
      return true || 'Ok'
    },
    validateNumberCheck(num) {
      if (Number.isInteger(Number(num)) && num > 0) {
        return true
      }
      return false
    },
    sendNumberSell() {
      this.$emit('sell', this.detailData.ItemID)
    },
    sendNumberDelete() {
      this.$emit('delete', this.detailData.ItemID)
    },
    sendNumberEdit() {
      this.$emit('edit', {id:this.detailData.ItemID,description:this.editDescription,price:this.editPrice})
    },
    sendNumberCancelSell() {
      this.$emit('cancelsellitem', this.detailData.ItemID)
    },
    sendNumberBuy(){
      this.$emit('buy',this.detailData.ItemID)
    }
  },
}
</script>
