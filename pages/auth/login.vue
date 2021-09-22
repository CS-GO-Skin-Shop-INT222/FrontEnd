<template>
  <v-form>
    
    <h1 class="text-md-center ma-6"> Login </h1>
     <v-row>
         <v-spacer></v-spacer>
       <v-col cols="4">
      <v-text-field label="User" outlined></v-text-field>
        </v-col>
          <v-spacer></v-spacer>
        </v-row>
     <v-row>
       <v-spacer></v-spacer>
       <v-col cols="4">
       <v-text-field label="User" outlined></v-text-field>
       </v-col>
         <v-spacer></v-spacer>
     </v-row>
             <v-row align="center" justify="space-around">
          <v-btn  class="py-5" x-large tile color="success" @click="test">
            Login
          </v-btn>
        </v-row>
  </v-form>
</template>

<script>
export default {
   async asyncData({ $axios }) {
  const PATH_API = '/user/users'
  const ip = await $axios.$get(`${PATH_API}`)
  return { ip }
},
  data() {
    return {
      data:[]
       }
  },

  }

  

</script>