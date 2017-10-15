import Vue from 'vue';
import * as types from '../mutation-types';

// intial state
const state = {
  user: undefined,
};

// getters
const getters = {
  user: s => s.user,
};

// actions
const actions = {
  login({ commit }, user) {
    commit(types.LOGIN, user);
  },
  logout({ commit }) {
    commit(types.LOGOUT);
  },
};

// mutations
const mutations = {
  [types.LOGIN](s, user) {
    Vue.set(s, 'user', user);
  },
  [types.LOGOUT](s) {
    Vue.set(s, 'user', undefined);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
