import * as types from '../mutation-types';

// initial state
const state = {
  entries: [],
};

// getters
const getters = {
  entries: s => s.entries,
  entriesForDay: s => day => s.entries.filter(e =>
    e.start.date() === day.date()
    && e.start.month() === day.month()
    && e.start.year() === day.year(),
  ),
};

// actions
const actions = {
  addEntry({ commit }, entry) {
    commit(types.ADD_ENTRY, {
      entry,
    });
  },
  removeEntry({ commit }, id) {
    commit(types.REMOVE_ENTRY, {
      id,
    });
  },
};

// mutations
const mutations = {
  [types.ADD_ENTRY](s, { entry }) {
    s.entries.push(entry);
  },

  [types.REMOVE_ENTRY](s, { id }) {
    const index = s.entries.findIndex(entry => entry.id === id);
    s.entries.splice(index, 1);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
