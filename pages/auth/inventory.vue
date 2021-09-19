
<template>
  <div class="text-center">
    <v-btn
      color="blue"
      dark
      @click="sheet = !sheet"
    >
      Open v-model
    </v-btn>
    <v-bottom-sheet  v-model="sheet" inset>
      <v-sheet
        class="text-center"
        height="700px"
      >
        <v-btn
          class="mt-6"
          text
          color="red"
          @click="sheet = !sheet"
        >
          close
        </v-btn>
        <div class="py-3">
<v-form>
    
    <h1 class="text-md-center ma-6">Login</h1>
     <v-row>
         <v-spacer></v-spacer>
       <v-col cols="4">
      <v-text-field label="User" outlined></v-text-field>
        </v-col>
          <v-spacer></v-spacer>
        </v-row>
     <v-row>
       <v-spacer></v-spacer>
       <v-col cols="4">
       <v-text-field label="User" outlined></v-text-field>
       </v-col>
         <v-spacer></v-spacer>
     </v-row>
             <v-row align="center" justify="space-around">
          <v-btn  class="py-5" x-large color="success">
            Login
          </v-btn>
        </v-row>
  </v-form>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
  export default {
    middleware: 'auth',
    data: () => ({
      sheet: false,
      tiles: [
        { img: 'keep.png', title: 'Keep' },
        { img: 'inbox.png', title: 'Inbox' },
        { img: 'hangouts.png', title: 'Hangouts' },
        { img: 'messenger.png', title: 'Messenger' },
        { img: 'google.png', title: 'Google+' },
      ],
    }),
  }
</script>