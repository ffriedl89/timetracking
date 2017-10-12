import { initializeApp, auth } from 'firebase';
import store from '../store';

const SETTINGS = {
  apiKey: 'AIzaSyAPMWLjeu2PkjCimTSJeHUoudfCsY7XAJg',
  authDomain: 'timetracking-78dc7.firebaseapp.com',
  databaseURL: 'https://timetracking-78dc7.firebaseio.com',
  projectId: 'timetracking-78dc7',
  storageBucket: 'timetracking-78dc7.appspot.com',
  messagingSenderId: '657882135042',
};

class Service {
  constructor() {
    this.app = initializeApp(SETTINGS);
    this.providers = {
      google: new auth.GoogleAuthProvider(),
    };

    auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch('login', user);
      } else {
        store.dispatch('logout');
      }
    });
  }

  login() {
    return auth().signInWithPopup(this.providers.google);
  }

  logout() {  // eslint-disable-line
    return auth().signOut();
  }
}

export default new Service();
