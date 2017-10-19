 /* eslint-disable no-shadow, no-param-reassign */
import * as types from '../mutation-types';

// initial state
const state = {
  draggedEntryKey: null,
  isDragging: false,
  startY: 0,
  endY: 0,
};

// getters
const getters = {
  draggedEntryKey: s => s.draggedEntryKey,
  isDragging: s => s.isDragging,
  endY: s => s.endY,
  dragOffsetY: s => s.endY - s.startY,
};

// actions
const actions = {
  startDragEntryEnd({ commit }, { key, startY }) {
    commit(types.START_DRAG_ENTRY_END, { key, startY });
  },
  dragMoveEntryEnd({ commit, dispatch, getters, state }, { y, gap }) {
    commit(types.DRAG_MOVE_ENTRY_END, { y, gap });
    /**
     * move one slot at a time
     */
    if (Math.abs(getters.dragOffsetY) > gap) {
      dispatch('changeEntryEnd', { key: state.draggedEntryKey, slotOffset: getters.dragOffsetY > 0 ? 1 : -1 });
      commit(types.SET_DRAG_START, { y });
    }
  },
  endDragEntryEnd({ commit }, { endY }) {
    commit(types.END_DRAG_ENTRY_END, { endY });
  },
};

// mutations
const mutations = {
  [types.START_DRAG_ENTRY_END](state, { key, startY }) {
    state.draggedEntryKey = key;
    state.isDragging = true;
    state.startY = startY;
    state.endY = startY;
  },
  [types.DRAG_MOVE_ENTRY_END](state, { y }) {
    state.endY = y;
  },
  [types.SET_DRAG_START](state, { y }) {
    state.startY = y;
  },
  [types.END_DRAG_ENTRY_END](state, { endY }) {
    state.draggedEntryKey = null;
    state.isDragging = false;
    state.endY = endY;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
