 /* eslint-disable no-shadow, no-param-reassign */
import * as types from '../mutation-types';

// initial state
const state = {
  isDragging: false,
};

// getters
const getters = {
  isDragging: s => s.isDragging,
};

// actions
const actions = {
  startDrag({ commit }) {
    commit(types.START_DRAG);
  },
  endDrag({ commit }) {
    commit(types.END_DRAG);
  },
};

// mutations
const mutations = {
  [types.START_DRAG](state) {
    state.isDragging = true;
  },
  [types.END_DRAG](state) {
    state.isDragging = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
