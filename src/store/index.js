import Vue from 'vue';
import Vuex from 'vuex';
import entries from './modules/entries';
import user from './modules/user';
import dragdrop from './modules/dragdrop';
import settings from './modules/settings';
import modals from './modules/modals';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    entries,
    user,
    dragdrop,
    settings,
    modals,
  },
});
