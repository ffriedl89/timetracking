import Vue from 'vue';
import * as types from '../mutation-types';

// intial state
const state = {
  user: {},
  username: undefined,
};

// getters
const getters = {
  user: s => s.user,
  username: s => s.username,
};

// actions
const actions = {
  login({ commit }, user) {
    commit(types.LOGIN, {
      user,
    });
  },
  logout({ commit }) {
    commit(types.LOGOUT);
  },
};

// mutations
const mutations = {
  [types.LOGIN](s, { user }) {
    Vue.set(s, 'username', user.user.displayName);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
