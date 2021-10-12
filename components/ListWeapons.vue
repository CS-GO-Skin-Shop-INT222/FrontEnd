<template>
  <div class="text-center">
    <v-col v-if="type == 'Melee'" class="d-flex" cols="12" sm="6">
      <v-select :items="Melee" label="Weapon" outlined></v-select>
    </v-col>
    <v-col v-if="type == 'Pistols'" class="d-flex" cols="12" sm="6">
      <v-select :items="Pistols" label="Weapon" outlined></v-select>
    </v-col>
    <v-col v-if="type == 'Heavy'" class="d-flex" cols="12" sm="6">
      <v-select :items="Heavy" label="Weapon" outlined></v-select>
    </v-col>
    <v-col v-if="type == 'SMGs'" class="d-flex" cols="12" sm="6">
      <v-select :items="SMGs" label="Weapon" outlined></v-select>
    </v-col>
    <v-col v-if="type == 'Rifles'" class="d-flex" cols="12" sm="6">
      <v-select ref="theSelect"
      :items="Rifles" label="Weapon"  outlined v-model="SelectWeapons" @click:append="test1" ></v-select>
    </v-col>
  </div>
</template>
<script>
export default {
  props: ['type'],
  data: () => ({
    SelectWeapons:'',
    SelectType: '',
    TypeWeapons: ['Melee', 'Pistols', 'Heavy', 'SMGs', 'Rifles'],
    Melee: ['Knife', 'Axe', 'Bare Hands', 'Hammer'],
    Pistols: ['Desert Eagle', 'P2000', 'P250', 'Glock-18'],
    Heavy: ['MAG-7', 'Nova', 'Sawed-Off', 'Negev'],
    SMGs: ['MAC-10', 'MP5-SD', 'P90', 'MP7'],
    Rifles: ['AK-47', 'AUUG', 'M4A4', 'M4A1-S'],
    sheet: false,
  }),
  methods:{
      test1(){
          this.$refs.theSelect.onClick()
      }
  }
}
</script>