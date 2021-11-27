<template>
  <v-select
    v-model="selectPage"
    :items="pageNumber"
    label="Page"
    outlined
    @change="sendBack"
  ></v-select>
</template>

<script>
export default {
    props: {
    pageNumber: {
        type: Array,
        default: () => []
    }
},
  data(){
      return{
          selectPage:''
      }
  }
  ,
  methods:{
      sendBack(){
          this.$emit('numberPage',this.selectPage+1)
      }
  }
}
</script>