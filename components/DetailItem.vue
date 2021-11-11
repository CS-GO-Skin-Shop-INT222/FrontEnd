<template>
  <div class="text-center">
    <v-row justify="center" class="ma-10">
      <v-dialog v-model="dialog" max-width="1200px" max-height="100px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            {{ dialog}} {{dialog1}}
          </v-btn>
        </template>
        <p> {{dialog}}</p>
        <p> {{ dialog1}}</p>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    dialog1: { Type: Boolean, default: false },
  },
  data() {
    return {
        dialog:this.dialog1

    }
  },
}
</script>