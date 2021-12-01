<template>
  <show-item :stateItem="inventory"></show-item>
</template>

<script>
import ShowItem from '~/components/showItem.vue'
export default {
  components: {ShowItem },
  middleware: ['auth', 'adminCant'],
  data() {
    return {
      inventory:'inventory',
    }
  },
}
</script>
