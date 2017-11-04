import store from '../store';

class JiraService {
  constructor() {
    console.log(store.settings);
  }
}

export default new JiraService();
