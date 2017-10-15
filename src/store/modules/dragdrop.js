 /* eslint-disable no-shadow, no-param-reassign */
import * as types from '../mutation-types';

// initial state
const state = {
  draggedEntryId: null,
  isDragging: false,
};

// getters
const getters = {
  draggedEntryId: s => s.draggedEntryId,
  isDragging: s => s.isDragging,
};

// actions
const actions = {
  startDragEntryEnd({ commit }, entry) {
    commit(types.START_DRAG_ENTRY_END, entry);
  },
  endDragEntryEnd({ commit }) {
    commit(types.END_DRAG_ENTRY_END);
  },
};

// mutations
const mutations = {
  [types.START_DRAG_ENTRY_END](state, entryId) {
    state.draggedEntryId = entryId;
    state.isDragging = true;
  },
  [types.END_DRAG_ENTRY_END](state) {
    state.draggedEntryId = null;
    state.isDragging = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
