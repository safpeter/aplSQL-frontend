<template>
  <div>
    <v-container getIsWorking()>
      <v-row class="status-ok" v-if="isWorking === true">
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
    </v-container>
    <v-container>
      <v-form id="textarea">
        <v-row justify="center">
          <v-col>
            <v-textarea v-model="query" color="red darken-4" label="Your Query" outlined></v-textarea>
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
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    query: "",
    queryType: ["select", "create", "insert", "update", "delete"],
    modal: false,
    serverStatus:false
  }),
  created() {
    this.$store.dispatch("isWorking");
  },
  computed: {
    getIsWorking() {
      return this.$state.isWorking;
    }
  },
  methods: {
    sendQuery() {
      const firstCommand = this.query.split(" ")[0].toLowerCase();
      if (this.query && this.queryType.includes(firstCommand)) {
        this.$store.dispatch("sendQuery", {
          queryString: this.query,
          route: firstCommand
        });
      } else {
        this.modal = true;
      }
    }
  }
};
</script>
<style scoped>
#textarea {
  margin-top: -15%;
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
</style>