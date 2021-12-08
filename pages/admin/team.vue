<template>
    <div>
    <h1 class="blue--text text--darken-1 text-center ma-5">Team Member</h1>
    <v-container>
        <v-row>
      <v-col class="ma-auto" sm="12" md="4" cols="12">
        <v-card class="mx-auto" max-width="344">
          <v-img src="../teamimage/petch.jpg" height="300px"></v-img>
          <v-card-title> Thongtong Tangsiripaisan  <br />  62130500028 </v-card-title>
          <v-card-subtitle>
            System Design <br />  Back-end Developer <br /> Database
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col class="ma-auto" sm="12" md="4" cols="12">
        <v-card class="mx-auto" max-width="344">
          <v-img src="../teamimage/patsakorn.jpg" height="300px"></v-img>
          <v-card-title> Patsakorn Janthawong  <br /> 62130500065</v-card-title>
          <v-card-subtitle>
              System Design <br/>
            Front-end Developer
             <br/> Database
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col class="ma-auto" sm="12" md="4" cols="12">
        <v-card class="mx-auto" max-width="344">
          <v-img src="../teamimage/jakkrapop.jpg" height="300px"></v-img>
          <v-card-title> Jakkrapop Chivrarerk <br /> 62130500108</v-card-title>
          <v-card-subtitle>
            System Design <br /> DevOps <br /> Deploy infrastructure
          </v-card-subtitle>
        </v-card>
      </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
export default {
  layout: 'admin',
  data() {
    return {
      show: false,
    }
  },
}
</script>
