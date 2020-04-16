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
       <v-dialog v-model="modal" max-width="400">
              <v-card>
                <v-card-title wrap>Invalid Query!</v-card-title>
                <v-card-text wrap>Try to start your query with:
                    select,create,insert,delete !</v-card-text>
                <v-card-actions>
                </v-card-actions>
              </v-card>
            </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
    data: () => ({
       query : "",
       queryType: ["select", "create", "insert", "update","delete"],
       modal : false
    }),
    methods: {
        sendQuery(){
            const firstCommand = this.query.split(" ")[0].toLowerCase();
            if (this.query &&  this.queryType.includes(firstCommand) ){
            this.$store.dispatch("sendQuery", {
                query : this.query,
                route : this.query.split(" ")[0]})
            } else{
                this.modal = true;
            }


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