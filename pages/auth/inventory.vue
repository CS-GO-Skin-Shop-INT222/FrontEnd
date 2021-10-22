
<template>
  <div class="text-center">
      <h1 class="text-center ma-6">Inventory</h1>
      <bottom-sheet/>
      {{ ip }}
  </div>
</template>

<script>
import BottomSheet from '~/components/BottomSheet.vue'
  export default {
  //   async asyncData({ $axios }) {
  //   const ip = await $axios.$get(`/inventory/getitem/${this.$nuxt.$auth.user.UserID}`)
  //   return { ip }
  // },
    
  components: { BottomSheet },
    middleware: 'auth',
    data: () => ({
    }),
  }
</script>