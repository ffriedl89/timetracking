import moment from 'moment';
import Vue from 'vue';
import * as types from '../mutation-types';

const startWeek = moment().startOf('isoWeek');
const daysPerWeek = 7;
const endWeek = moment().startOf('isoWeek').add(daysPerWeek, 'days');

const calculateWeekArray = (start, end) => {
  const days = [];

  let length;
  if (typeof end === 'number') {
    length = end;
  }

  if (typeof end === 'object') {
    length = Math.abs(start.diff(end, 'days'));
  }

  for (let i = 0; i < length; i += 1) {
    days.push(start.clone().add(i, 'days'));
  }
  return days;
};

const state = {
  startWeek,
  endWeek,
  currentWeek: calculateWeekArray(startWeek, daysPerWeek),
  daysPerWeek,
};

const getters = {
  startWeek: s => s.startWeek,
  endWeek: s => s.endWeek,
  daysPerWeek: s => s.daysPerWeek,
  currentWeek: s => s.currentWeek,
};

const actions = {
  setWeek({ commit, dispatch }, { start }) {
    const week = calculateWeekArray(start, getters.daysPerWeek(state));
    const end = week[week.length - 1];
    commit(types.SET_CURRENT_WEEK, { week });
    commit(types.SET_CURRENT_STARTDATE, { start });
    commit(types.SET_CURRENT_ENDDATE, { end });
    return dispatch('loadWeekEntries', {
      start: getters.startWeek(state),
      end: getters.endWeek(state),
    });
  },
  increaseOffset({ dispatch }) {
    const start = getters.startWeek(state).clone().add(1, 'week');
    return dispatch('setWeek', { start });
  },
  decreaseOffset({ dispatch }) {
    const start = getters.startWeek(state).clone().subtract(1, 'week');
    return dispatch('setWeek', { start });
  },
  resetOffset({ dispatch }) {
    const start = moment().startOf('isoWeek');
    return dispatch('setWeek', { start });
  },
};

const mutations = {
  [types.SET_CURRENT_WEEK](s, { week }) {
    Vue.set(state, 'currentWeek', week);
  },
  [types.SET_CURRENT_STARTDATE](s, { start }) {
    Vue.set(state, 'startWeek', start);
  },
  [types.SET_CURRENT_ENDDATE](s, { end }) {
    Vue.set(state, 'endWeek', end);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
