
<template>
  <div class="text-center">
      <h1 class="text-center ma-6">Inventory</h1>
      <bottom-sheet/>
  </div>
</template>

<script>
import BottomSheet from '~/components/BottomSheet.vue'
  export default {
  components: { BottomSheet },
    middleware: 'auth',
    data: () => ({
    }),
  }
</script>