import * as types from '../mutation-types';
import Service from '../../service';

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
  loadWeekEntries(_, { start, end }) {
    Service.loadEntries(start, end);
  },

  populateEntries({ commit, state }, entries) { // eslint-disable-line
    const entriesToAdd = entries
    .filter(({ key }) => !state.entries.some(e => e.key === key));
    commit(types.POPULATE_ENTRIES, entriesToAdd);
  },

  addEntry({ commit }, entry) {
    Service.addEntry(entry)
      .then((dbEntry) => {
        commit(types.ADD_ENTRY, dbEntry);
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
  [types.POPULATE_ENTRIES](s, entries) {
    s.entries.push(...entries);
  },

  [types.ADD_ENTRY](s, entry) {
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
