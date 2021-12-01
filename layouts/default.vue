<template>
  <v-app class="white">
    <navbar></navbar>
    <nuxt/>
  </v-app>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
export default {
  components: { Navbar },
  data () {
    return {
      tab: null,
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
