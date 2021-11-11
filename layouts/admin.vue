<template>
  <v-app  >
    <v-card>
      <v-tabs
        v-model="tab"
        background-color="white"
        height="70"
        fixed-tabs
        v-if="this.$nuxt.$auth.loggedIn"
      >
        <v-tabs-slider color="blue darken-1"></v-tabs-slider>
        <v-tab to="/" nuxt class="blue--text text--darken-1" href="#tab-1">
          Logo
        </v-tab>
        <v-tab to="/" nuxt class="blue--text text--darken-1" href="#tab-2">
          MARKET
        </v-tab>


        <v-tab
          nuxt
          class="blue--text text--darken-1"
          href="#tab-6"
          @click="EiEi"
        >
          <v-icon left> mdi-exit-to-app </v-icon>
          Logout
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="i in 6" :key="i" :value="'tab-' + i"> </v-tab-item>
      </v-tabs-items>
    </v-card>

    <nuxt />
  </v-app>
</template>


<style scoped>
.v-application {
  background-color: #fff;
}
</style>
<script>
export default {
  data() {
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
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  methods: {
    EiEi() {
      try {
        this.$nuxt.$auth.logout()
      } catch {}
    },
  },
}
</script>
