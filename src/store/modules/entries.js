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
  entriesForDay: s => day => s.entries.filter(e =>
    e.start.date() === day.date()
    && e.start.month() === day.month()
    && e.start.year() === day.year(),
  ).sort((a, b) => {
    if (a.start.isBefore(b.start)) {
      return -1;
    }
    if (a.start.isAfter(b.start)) {
      return 1;
    }
    return 0;
  }),
  entryByKey: s => key => s.entries.find(e => e.key === key),
  dragConstraints: (state, getters) => (key) => {
    /**
     * get entry
     */
    const entry = getters.entryByKey(key);
    /**
     * get entries for same day
     */
    const entriesForDay = getters.entriesForDay(entry.start);
    /**
     * get position of entry in sorted entries array
     */
    const index = entriesForDay.findIndex(e => e.key === key);
    /**
     * set end constraint to start of next entry or end of day
     */
    let endConstraint;
    if (index + 1 < entriesForDay.length) {
      /**
       * start of next entry
       */
      endConstraint = entriesForDay[index + 1].start;
    } else {
      /**
       * end of day
       */
      endConstraint = moment(entry.start).endOf('day');
    }

    const startConstraint = moment(entry.start).add(15, 'minutes');
    return {
      start: startConstraint,
      end: endConstraint,
    };
  },
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
    Service.addOrUpdateEntry({
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
  updateEntry({ state, commit }, { key, start, end }) {
    const entry = state.entries.find(e => e.key === key);
    Service.addOrUpdateEntry({
      ...entry,
      start,
      end,
    }).then((dbEntry) => {
      commit(types.UPDATE_ENTRY, {
        ...dbEntry,
      });
      commit(types.END_DRAG);
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

  [types.REMOVE_ENTRY](s, { key }) {
    const index = s.entries.findIndex(entry => entry.key === key);
    s.entries.splice(index, 1);
  },

  [types.UPDATE_ENTRY](s, entry) {
    const index = s.entries.findIndex(e => e.key === entry.key);
    Vue.set(s.entries, index, entry);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
