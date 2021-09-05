<template>
  <v-app>
    <h1 class="text-md-center">Register</h1>
    <v-row dense class="mb-6" justify="center" no-gutters>
      <v-col lg="4"></v-col>
      <v-col lg="4" class="text-md-center"
        ><v-text-field label="Email" outlined></v-text-field>
      </v-col>
      <v-col lg="4"></v-col>
    </v-row>
    <v-row dense no-gutters justify="center">
      <v-col lg="4" class="text-md-center"
        ><v-text-field 
            v-model="password"
            :append-icon="password1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="password1 ? 'text' : 'password'"
            name="input-10-1"
            hint="At least 8 characters"
            counter
            label="Password" outlined
            @click:append="password1 = !password1"
            >
            
        </v-text-field>
      </v-col>
    </v-row>
    <v-row dense no-gutters justify="center">
      <v-col lg="4" class="text-md-center"
        ><v-text-field
         v-model="ConfirmPassword"
            :append-icon="password2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.Match]"
            :type="password2 ? 'text' : 'password'"
            name="input-10-1"
            hint="Password not Match"
            counter
            label="Confirm Password" outlined
            @click:append="password2 = !password2"
           ></v-text-field>
      </v-col>
    </v-row>
    <v-row dense no-gutters justify="center">
      <v-col lg="4" class="text-md-center"
        ><v-text-field label="Name" outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row dense no-gutters justify="center">
      <v-col lg="4" class="text-md-center"
        ><v-text-field label="Tel" outlined></v-text-field>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        password1: false,
        password2: false,
        password: '',
        ConfirmPassword:'',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          Match: v => v === this.password || 'Password not Match',
        },
      }
    },
  }
</script>