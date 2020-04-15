<template>
  <div>
    <v-container>
      <v-form  id="textarea">
        <v-row justify="center">
          <v-col>
              <v-textarea
              v-model="query"
              color="red darken-4"
              label="Your Query"
              outlined>
               </v-textarea>
                <v-row justify="center">
               <v-btn @click="sendQuery" color="red darken-4">Execute Query
               </v-btn>
                </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
    data: () => ({
       query : ""
    }),
    methods: {
        sendQuery(){
            this.$store.dispatch("sendQuery", this.query)
            console.log(this.query)
        }
    }
};
</script>
<style scoped>

#textarea {
    margin-top: -15%;
    color:darkred;
}

</style>