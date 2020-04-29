import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    queryResult : [],
    isWorking : ""
  },
  mutations: {
    setQueryResult(state, result){
      state.queryResult = result;
    },
    setIsWorking(state, result){
      state.isWorking = result;
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
  isWorking(context){
    axios({
      method : 'GET',
      url:  `https://aplsql.herokuapp.com/isworking}`,
      headers : {
        "Content-Type" :  "application/json",
        'Access-Control-Allow-Origin': '*'
      }
  }).then(response => (context.commit("setIsWorking", response.data)))
  }
  },
  modules: {
  }
})
