import store from '../store';

const JiraService = {
  request(path) {
    const j = store.getters.jirasettings;
    const sanpath = path.replace(/^\/|\/$/g, '');
    const opts = {
      headers: new Headers({
        Authorization: `Basic ${j.auth}`,
        'X-Proxy-To': j.url,
      }),
      cache: 'default',
      credentials: 'include',
      mode: 'cors',
    };
    return window.fetch(`/rest/api/2/${sanpath}`, opts)
      .then(res => res.json());
  },

  testConnection() {
    return JiraService.request('myself');
  },
};

export default JiraService;
