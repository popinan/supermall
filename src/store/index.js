import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import modules from './modules'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: [],
  },
  mutations,
  actions,
  getters,
  modules,
})
