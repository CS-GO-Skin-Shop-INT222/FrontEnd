<template>
  <div class="black">
    <div class="d-none d-sm-block d-md-block">
      <v-card>
        <v-tabs
          v-model="tab"
          background-color="black"
          height="70"
          fixed-tabs
          v-if="!this.$nuxt.$auth.loggedIn"
        >
          <v-tabs-slider color="red darken-4"></v-tabs-slider>
          <v-tab class="red--text text--darken-4  font-weight-medium" href="#tab-1">
            BlackCarrack
          </v-tab>
          <v-tab to="/" nuxt class="red--text text--darken-4 " href="#tab-2">
            MARKET
          </v-tab>

          <v-tab
            to="/user/inventory"
            nuxt
            class="red--text text--darken-4"
            href="#tab-3"
          >
            INVENTORY
          </v-tab>

          <v-tab
            to="/user/sell"
            nuxt
            class="red--text text--darken-4"
            href="#tab-4"
          >
            SELL
          </v-tab>
          <v-tab
            to="/user/login"
            nuxt
            class="red--text text--darken-4"
            href="#tab-5"
          >
            LOGIN
          </v-tab>
          <v-tab
            to="/user/register"
            nuxt
            class="red--text text--darken-4"
            href="#tab-6"
          >
            REGISTER
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="i in 6" :key="i" :value="'tab-' + i"> </v-tab-item>
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
          <v-tabs-slider color="red darken-4"></v-tabs-slider>
          <v-tab class="red--text text--darken-4" href="#tab-1">
            BlackCarrack
          </v-tab>
          <v-tab to="/" nuxt class="red--text text--darken-4" href="#tab-2">
            MARKET
          </v-tab>

          <v-tab
            to="/user/inventory"
            nuxt
            class="red--text text--darken-4"
            href="#tab-3"
          >
            INVENTORY
          </v-tab>

          <v-tab
            to="/user/sell"
            nuxt
            class="red--text text--darken-4"
            href="#tab-4"
          >
            SELL
          </v-tab>
          <v-tab
            to="/user/proflie"
            nuxt
            class="red--text text--darken-4"
            href="#tab-5"
          >
            <v-icon left> mdi-account </v-icon>
            Profile
          </v-tab>
          <v-tab
            nuxt
            class="red--text text--darken-4"
            href="#tab-6"
            @click="logout"
          >
            <v-icon left> mdi-exit-to-app </v-icon>
            Logout
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="i in 6" :key="i" :value="'tab-' + i"> </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
    <div class="d-block d-sm-none d-md-none">
      <v-card max-width="600">
        <v-app-bar color="black" dark>
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <v-app-bar-title class="red--text text--darken-4 headline  font-weight-regular">BlackCarrack</v-app-bar-title>
          <v-spacer></v-spacer>
            
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" color="black" absolute app>
          <v-list nav dense>
            <p class="red--text text--darken-4 text-center title font-weight-regular">BlackCarrack</p>
            <v-list-item-group v-if="!this.$nuxt.$auth.loggedIn"
              v-model="group"
              active-class="red--text text--darken-4"
            >
              <v-list-item  to="/" nuxt class="red--text text--darken-4" >
                <v-list-item-title class="subtitle-1">HOME</v-list-item-title>
              </v-list-item>

              <v-list-item  to="/user/inventory" nuxt class="red--text text--darken-4">
                <v-list-item-title class="subtitle-1 ">INVENTORY</v-list-item-title>
              </v-list-item>

              <v-list-item  to="/user/sell" nuxt class="red--text text--darken-4">
                <v-list-item-title class="subtitle-1">SELL</v-list-item-title>
              </v-list-item>

              <v-list-item  to="/user/login" nuxt class="red--text text--darken-4">
                <v-list-item-title class="subtitle-1">LOGIN</v-list-item-title>
              </v-list-item>
              <v-list-item  to="/user/register" nuxt class="red--text text--darken-4">
                <v-list-item-title class="subtitle-1">REGISTER</v-list-item-title>
              </v-list-item>
            </v-list-item-group>

            <v-list-item-group 
              v-model="group"
              v-else
              active-class="red--text text--darken-4"
            >
              <v-list-item  to="/" nuxt class="red--text text--darken-4 " >
                <v-list-item-title class="subtitle-1">HOME</v-list-item-title>
              </v-list-item>
              <v-list-item  to="/user/inventory" nuxt class="red--text text--darken-4">
                <v-list-item-title class="subtitle-1">INVENTORY</v-list-item-title>
              </v-list-item>

              <v-list-item  to="/user/sell" nuxt class="red--text text--darken-4">
                <v-list-item-title class="subtitle-1">SELL</v-list-item-title>
              </v-list-item>
              <v-list-item  to="/user/proflie" nuxt class="red--text text--darken-4">
                <v-list-item-title class="subtitle-1">PROFILE</v-list-item-title>
              </v-list-item>
              <v-list-item nuxt class="red--text text--darken-4 subtitle-1" @click="logout">
                <v-list-item-title class="subtitle-1">LOGOUT</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tab: null,
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      group: null,
    }
  },
  methods: {
    logout() {
      try {
        this.$nuxt.$user.logout()
      } catch {}
    },
  },
  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>
