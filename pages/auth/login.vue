<template>
  <v-app>
    <h1 class="text-md-center">Login</h1>
    <v-row dense class="mb-6" justify="center" no-gutters>
        
      <v-col lg="4"></v-col>
      <v-col lg="4" class="text-md-center"
        ><v-text-field label="User" outlined></v-text-field>
      </v-col>
      <v-col lg="4"></v-col>
    </v-row>
    <v-row dense no-gutters justify="center">
            <v-col lg="4" class="text-md-center"
        ><v-text-field label="Password" outlined></v-text-field>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
}
</script>