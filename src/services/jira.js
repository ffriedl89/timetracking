import store from '../store';

const JiraService = {
  /**
   * Request helper for the jira api, which adds auth header and puts them through the proxy
   * @param {string} path - pass the subpath for the api
   */
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


  getCurrentIssuesForUser() {
    const j = store.getters.jirasettings;
    return JiraService.request(`/search/?jql=sprint%20in%20openSprints()%20AND%20assignee%3D${j.user}`);
  },

  testConnection() {
    return JiraService.request('myself');
  },
};

export default JiraService;
