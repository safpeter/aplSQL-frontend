import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    queryResult : [],
  },
  mutations: {
    setQueryResult(state, result){
      state.queryResult = result;
    }
  },
  actions: {
    sendQuery(context, query){
      axios({
        method : 'post',
        url:  `https://aplsql.herokuapp.com/${query.route}`,
        data :  {queryString : query.queryString} ,
        headers : {
          "Content-Type" :  "application/json",
          'Access-Control-Allow-Origin': '*'
        }
    })
  },
  },
  modules: {
  }
})
