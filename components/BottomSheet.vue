<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet" inset>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="orange" dark v-bind="attrs" v-on="on"> Open Inset </v-btn>
      </template>
      <v-sheet height="800px">
        <div class="ma-8">
          <div class="text-right">
            <v-btn class="mt-6" color="error " @click="sheet = !sheet">
              X
            </v-btn>
          </div>
          <div class="my-3">
            This is a bottom sheet using the inset prop
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                v-model="SelectType"
                :items="TypeWeapons"
                label="Type weapons"
                outlined
              ></v-select>
            </v-col>
            <div class="text-center">
              <v-col v-if="SelectType == 'Melee'" class="d-flex" cols="12" sm="6">
                <v-select :items="Melee" label="Weapon" outlined></v-select>
              </v-col>
              <v-col v-if="SelectType == 'Pistols'" class="d-flex" cols="12" sm="6">
                <v-select :items="Pistols" label="Weapon" outlined></v-select>
              </v-col>
              <v-col v-if="SelectType == 'Heavy'" class="d-flex" cols="12" sm="6">
                <v-select :items="Heavy" label="Weapon" outlined></v-select>
              </v-col>
              <v-col v-if="SelectType == 'SMGs'" class="d-flex" cols="12" sm="6">
                <v-select :items="SMGs" label="Weapon" outlined></v-select>
              </v-col>
              <v-col v-if="SelectType == 'Rifles'" class="d-flex" cols="12" sm="6">
                <v-select
                  ref="theSelect"
                  :items="Rifles"
                  label="Weapon"
                  outlined
                  v-model="SelectWeapons"
                  @click:append="test1"
                ></v-select>
              </v-col>
            </div>
          </div>
          <p @click="test1">dasdasdadad</p>
          <p>{{ test }}</p>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>

export default {
  data: () => ({
    
    test: '',
    SelectType: '',
    SelectWeapons:'',
    TypeWeapons: ['Melee', 'Pistols', 'Heavy', 'SMGs', 'Rifles'],
    Melee: ['Knife', 'Axe', 'Bare Hands', 'Hammer'],
    Pistols: ['Desert Eagle', 'P2000', 'P250', 'Glock-18'],
    Heavy: ['MAG-7', 'Nova', 'Sawed-Off', 'Negev'],
    SMGs: ['MAC-10', 'MP5-SD', 'P90', 'MP7'],
    Rifles: ['AK-47', 'AUUG', 'M4A4', 'M4A1-S'],
    sheet: false,
  }),
  methods: {
    test1() {
      console.log(this.test)
    },
  },
}
</script>