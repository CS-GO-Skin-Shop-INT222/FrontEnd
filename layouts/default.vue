<template>
  <v-app class="white">
    <v-card>
    <v-tabs 
      v-model="tab"
      background-color="black"
      height="70"
      fixed-tabs
      v-if="!this.$nuxt.$auth.loggedIn"
      
    >
      <v-tabs-slider
      color="red darken-4"
      ></v-tabs-slider>
      <v-tab to="/" nuxt class=" red--text text--darken-4" href="#tab-1" >
          Logo
      </v-tab>
      <v-tab  to="/" nuxt class=" red--text text--darken-4"  href="#tab-2">
        MARKET
      </v-tab>

      <v-tab to="/auth/inventory" nuxt class=" red--text text--darken-4"  href="#tab-3">
        INVENTORY
      </v-tab>

      <v-tab to="/auth/inventory" nuxt class=" red--text text--darken-4"  href="#tab-4">
        SELL
      </v-tab>
            <v-tab to="/auth/login" nuxt class=" red--text text--darken-4"  href="#tab-5">
          Login
      </v-tab>
            <v-tab to="/auth/register" nuxt class=" red--text text--darken-4"  href="#tab-6">
          Register
      </v-tab>

    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="i in 6"
        :key="i"
        :value="'tab-' + i"
      >
      </v-tab-item>
    </v-tabs-items>
  </v-card>

<v-card>
    <v-tabs 
      v-model="tab"
      background-color="black"
      height="70"
      fixed-tabs
      v-if="this.$nuxt.$auth.loggedIn"
      

    >
      <v-tabs-slider
      color="red darken-4" 
      ></v-tabs-slider>
      <v-tab  to="/" nuxt class=" red--text text--darken-4 " href="#tab-1" >
          Logo
      </v-tab>
      <v-tab  to="/" nuxt  class=" red--text text--darken-4 "  href="#tab-2">
        MARKET
      </v-tab>

      <v-tab to="/auth/inventory" nuxt  class=" red--text text--darken-4 " href="#tab-3">
        INVENTORY
      </v-tab>

      <v-tab to="/auth/inventory" nuxt  class=" red--text text--darken-4 " href="#tab-4">
        SELL
      </v-tab>
            <v-tab to="/auth/proflie" nuxt  class=" red--text text--darken-4 " href="#tab-5">
            <v-icon left>
              mdi-account 
            </v-icon>
          Profile
      </v-tab>
            <v-tab  nuxt  class=" red--text text--darken-4 "  href="#tab-6" @click="EiEi">
              <v-icon left>
                mdi-exit-to-app
              </v-icon>
          Logout
      </v-tab>

    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="i in 6"
        :key="i"
        :value="'tab-' + i"
      >
      </v-tab-item>
    </v-tabs-items>
  </v-card>


    <nuxt/>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
       tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
  ,methods:{
    EiEi(){
      try{
        this.$nuxt.$auth.logout()
      }catch{

      }
      
    }
  }
}
</script>
