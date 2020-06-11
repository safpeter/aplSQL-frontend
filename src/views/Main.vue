<template>
  <v-container>
    <!-- <v-container>
      <v-row class="status-ok" v-if="this.serverStatus === true">
        <v-col>
          <v-icon id="icon-ok">mdi-server-network</v-icon>
        </v-col>
        <v-col>
          <p id="status-text">Server is Working!</p>
        </v-col>
      </v-row>
      <v-row class="status-not" v-else>
        <v-col>
          <v-icon id="icon-not">mdi-server-network-off</v-icon>
        </v-col>
        <v-col>
          <p id="status-text">Failed To Connect To Server!</p>
        </v-col>
      </v-row>
    </v-container> -->
    <v-container>
      <v-form id="textarea">
        <v-row justify="center">
          <v-col>
            <v-textarea v-model="query" id=textarea color="red darken-4" label="Your Query" outlined></v-textarea>
            <v-row justify="center">
              <v-btn @click="sendQuery" color="red darken-4">Execute Query</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
      <v-dialog v-model="modal" max-width="400">
        <v-card>
          <v-card-title wrap>Invalid Query!</v-card-title>
          <v-card-text wrap>
            Try to start your query with:
            select,create,insert,delete !
          </v-card-text>
          <v-card-actions></v-card-actions>
        </v-card>
      </v-dialog>
        <v-dialog v-model="errorCard" >
        <v-card>
          <v-card-title wrap>Something went wrong!</v-card-title>
          <v-card-text wrap>
              The record already exists OR 
              the badly formatted!
          </v-card-text>
          <v-card-actions></v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="simpleQuery">
         <v-card>
           <v-card-title>
             {{results}}
           </v-card-title>
         </v-card>
      </v-dialog>
      <template>
      <v-simple-table id="table" >
        <th v-for="tableHeader in getTableHeaders" :key="tableHeader" class="headers">
             {{tableHeader}}
        </th>
         <tbody>
        <tr v-for="result in getQueryResults" :key="result.index">
          <td v-for="data in result" :key="data" >{{data}}
          </td>
        </tr>
         </tbody> 
      </v-simple-table>
      </template>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    query: "",
    queryTypes: ["select", "create", "insert", "update", "delete", "drop"],
    modal: false,
    results:"",
    simpleQuery: false,
    errorCard: false,
  }),
  computed:{
      getTableHeaders(){
        return this.results[0];
      },
      getQueryResults(){
        return this.results.slice(1,this.results.length);
      }
  },
  methods: {
     sendQuery() {
      document.querySelector("#table").style.display = "none";
      this.$store.state.queryResult = "";
      const firstCommand = this.query.split(" ")[0].toLowerCase();
    if (this.query && this.queryTypes.includes(firstCommand)) {
      const promise = new Promise((resolve) => {
      if (firstCommand == 'delete'){
          resolve(this.$store.dispatch("sendDeleteQuery", {
          queryString: this.query,
          route: firstCommand,
      })
        )
      } else {
      resolve(this.$store.dispatch("sendQuery", {
          queryString: this.query,
          route: firstCommand,
      })
        )}})
        promise.then(setTimeout(() => {this.results = this.$store.state.queryResult.data,
        this.query = '' }, 1000))
        .then(setTimeout(() => {
         if (firstCommand == "select"){
        document.querySelector("#table").style.display = "block";
        console.log(this.results)
      } else {
        this.simpleQuery = true;}
      }, 1000));
      } else {
        this.modal = true;
      }
    },
  }
};


</script>
<style scoped>
#textarea {
 
  color: darkred;
}

#status-text {
  margin-left: -100%;
}

.status-ok {
  margin-top: -25%;
  color: green;
}

.status-not {
    margin-top: -25%;
  color:darkred;
}

#icon-ok {
  color: green;
}

#icon-not {
  color: darkred;
}

#table {
  margin-top: 5%;
  display: none;
  border-color: darkred !important;
  border:groove !important;
  border-collapse: collapse !important;
}

.headers{
  font-size: 100%;
  font-style:italic;
  color: darkred;
}
</style>