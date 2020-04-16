import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    sendQuery(context, query){
      axios({
        method : 'post',
        url:  `https://aplsql.herokuapp.com/${query.route}`,
        data : query.queryString,
        headers : {
          "Content-Type" :  "application/json"
        }
    })
  },
  },
  modules: {
  }
})
