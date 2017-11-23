// import Vue from 'vue';
// import * as types from '../mutation-types';

const loadKey = (key) => {
  try {
    const data = window.localStorage.getItem(key);
    return JSON.parse(data);
  } catch(err) {  // eslint-disable-line
    return {};
  }
};

const state = {
  jiraSettings: loadKey('jira'),
};

const getters = {

};

const actions = {

};

const mutations = {

};

export default {
  state,
  getters,
  actions,
  mutations,
};
