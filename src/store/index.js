/**
 * All Codes below are Lifetime Warranted by mozat since 5/1/18.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  userId: '',
  userName: '',
  userSex: '',
  userBirth: '',
};

const mutations = {
  setUserId(state, id) {
    state.userId = id;
  },
  setUserName(state, name) {
    state.userName = name;
    console.log(name);
  },
  setUserSex(state, sex) {
    state.userSex = sex;
    console.log(sex);
  },
  setUserBirth(state, birth) {
    state.userBirth = birth;
    console.log(birth);
  },
};

const actions = {
  setUserId: ({ commit }, id) => { commit('setUserId', id); },
  setUserName: ({ commit }, name) => { commit('setUserName', name); },
  setUserSex: ({ commit }, sex) => { commit('setUserSex', sex); },
  setUserBirth: ({ commit }, birth) => { commit('setUserBirth', birth); },
};

const getters = {
  getId: state => { return state.userId; },
  getName: state => { return state.userName; },
  getSex: state => { return state.userSex; },
  getBirth: state => { return state.userBirth; },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});

