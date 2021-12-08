<template>
  <v-select
    v-model="selectPage"
    :items="pagenumber"
    label="Page"
    outlined
    @change="sendBack"
  ></v-select>
</template>

<script>
export default {
    props: {
    pagenumber: {
        default: () => [0]
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