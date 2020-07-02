import Vue from 'vue'
import Vuex from 'vuex'
import state from './states'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
// import * as TYPES from './types'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions

  // state: {
  //     count: 0
  // },
  // mutations: {
  //     [TYPES.SET_COUMT](state, v) {
  //         state.count = v;
  //     },
  //     [TYPES.SET_COUMT_ADD](state) {
  //         state.count++
  //     },
  //     [TYPES.SET_COUMT_REDUCE](state) {
  //         state.count--
  //     }
  // },
  // actions: {
  //     userInfo(commit) {
  //         axios.get("/customer/user_info").then(res => {
  //             commit(TYPES.SET_COUMT, res.data);
  //         });
  //     }
  // }

})
