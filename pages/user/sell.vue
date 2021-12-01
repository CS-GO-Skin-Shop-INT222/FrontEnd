<template>
  <show-item :stateItem="sell"/>
</template>



<script>
import showItem from '~/components/showItem.vue'
export default {
  components: { showItem },
  middleware: ['auth', 'adminCant'],
  data() {
    return {
      sell:'sell',
    }
  },
}
</script>