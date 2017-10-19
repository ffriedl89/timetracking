 /* eslint-disable no-shadow, no-param-reassign */
import Vue from 'vue';
import moment from 'moment';
import * as types from '../mutation-types';
import Service from '../../service';

// initial state
const state = {
  entries: [],
  slotStepTime: 0.25,
};

// getters
const getters = {
  entries: s => s.entries,
  entriesForDay: s => day => s.entries.filter(e =>
    e.start.date() === day.date()
    && e.start.month() === day.month()
    && e.start.year() === day.year(),
  ),
  entryByKey: s => key => s.entries.find(e => e.key === key),
  slotStepTime: s => s.slotStepTime,
};

const isValidEndChange = (entry, newEnd) =>
  entry.start.isBefore(newEnd) && !entry.end.isSame(newEnd);

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
    Service.addEntry({
      ...entry,
    })
      .then((dbEntry) => {
        commit(types.ADD_ENTRY, dbEntry);
      });
  },
  removeEntry({ commit }, key) {
    commit(types.REMOVE_ENTRY, {
      key,
    });
  },
  changeEntryEnd({ commit, state }, { key, slotOffset }) {
    const entry = this.getters.entryByKey(key);
    console.log(slotOffset * state.slotStepTime);
    const slotTime = moment(entry.end).add(slotOffset * state.slotStepTime, 'hours');
    if (entry && isValidEndChange(entry, slotTime)) {
      commit(types.CHANGE_ENTRY_END, { entry, slotTime });
    }
  },
  confirmEntryEnd({ commit }, { key, slot }) {
    const entry = this.getters.entryByKey(key);
    if (entry && isValidEndChange(entry, slot)) {
      Service.changeEntryEnd(entry, slot)
      .then((dbEntry) => {
        commit(types.CHANGE_ENTRY_END, dbEntry);
      });
    }
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

  [types.REMOVE_ENTRY](s, { key }) {
    const index = s.entries.findIndex(entry => entry.key === key);
    s.entries.splice(index, 1);
  },

  [types.CHANGE_ENTRY_END](s, { entry, slotTime }) {
    const index = s.entries.findIndex(e => e.key === entry.key);
    Vue.set(s.entries, index, Object.assign(entry, { end: slotTime }));
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
