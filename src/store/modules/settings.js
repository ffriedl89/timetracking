import Vue from 'vue';
import * as types from '../mutation-types';

const loadKey = (key) => {
  try {
    const data = window.localStorage.getItem(key);
    return JSON.parse(data) || {};
  } catch(err) {  // eslint-disable-line
    return {};
  }
};

const saveKey = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

const state = {
  jiraSettings: Object.assign({
    url: '',
    user: '',
    password: '',
  }, loadKey('jira')),
};

const getters = {
  jiraSettings: s => s.jiraSettings,
};

const actions = {
  savejira({ commit }, data) {
    const d = {
      url: `${data.url}/rest/api/2/`,
      auth: btoa(`${data.user}:${data.password}`),
    };
    commit(types.SETTINGS_SAVE_JIRA, d);
  },
};

const mutations = {
  [types.SETTINGS_SAVE_JIRA](s, data) {
    Vue.set(s.jiraSettings, 'url', data.url);
    Vue.set(s.jiraSettings, 'auth', data.aut);
    saveKey('jira', data);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
