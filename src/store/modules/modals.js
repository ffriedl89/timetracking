import Vue from 'vue';
import * as types from '../mutation-types';

const state = {
  modal: {
    el: null,
    props: null,
    open: false,
  },
};

const getters = {
  modal: s => s.modal,
};

const actions = {
  openModal({ commit }, { modal, props }) {
    commit(types.MODAL_SET_ELEMENT, { modal, props });
    commit(types.MODAL_OPEN);
  },
  closeModal({ commit }) {
    commit(types.MODAL_CLOSE);
  },
};

const mutations = {
  [types.MODAL_SET_ELEMENT](s, { modal, props }) {
    Vue.set(s.modal, 'el', modal);
    Vue.set(s.modal, 'props', props);
  },
  [types.MODAL_OPEN](s) {
    Vue.set(s.modal, 'open', true);
  },
  [types.MODAL_CLOSE](s) {
    Vue.set(s.modal, 'open', false);
    Vue.set(s.modal, 'el', null);
    Vue.set(s.modal, 'props', null);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
