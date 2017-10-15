import Vue from 'vue';
import Vuex from 'vuex';
import entries from './modules/entries';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    entries,
    user,
  },
});
