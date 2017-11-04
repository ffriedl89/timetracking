import store from '../store';

const JiraService = {
  request(path) {
    const j = store.getters.jirasettings;
    const sanpath = path.replace(/^\/|\/$/g, '');
    const opts = {
      headers: new Headers({
        Authorization: `Basic ${j.auth}`,
      }),
      cache: 'default',
      credentials: 'include',
      mode: 'cors',
    };
    return window.fetch(`${j.url}/rest/api/2/${sanpath}`, opts);
  },

  testConnection() {
    return JiraService.request('myself')
      .then(e => console.log('e', e));
  },
};

export default JiraService;
