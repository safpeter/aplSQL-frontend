<template>
  <v-app id="app">
    <v-row color="red darken-4" justify="center">
    <h1 color="red darken-4" id="header">*ApL.SqL*</h1>
    </v-row>
  <v-content>
         <router-view> 
         </router-view >
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
});
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600&family=Roboto&display=swap');

#app{
  font-family: 'Orbitron';
}

#header{
  font-size: 250%;
  color:darkred;
}

</style>