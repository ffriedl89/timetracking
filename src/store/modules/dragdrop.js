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
  startDragEntryEnd({ commit }) {
    commit(types.START_DRAG_ENTRY_END);
  },
  endDragEntryEnd({ commit }) {
    commit(types.END_DRAG_ENTRY_END);
  },
};

// mutations
const mutations = {
  [types.START_DRAG_ENTRY_END](state) {
    state.isDragging = true;
  },
  [types.END_DRAG_ENTRY_END](state) {
    state.isDragging = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
