import { initializeApp, auth } from 'firebase';

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

    // tracked data
    this.loggedIn = false;
    this.user = {};
    this.username = '';
  }

  login() {
    return auth()
      .signInWithPopup(this.providers.google)
      .then((data) => {
        console.log(data, this);
        this.user = data.user;
        this.username = this.user.name;
        this.loggedIn = true;
        this.credentials = data.credentials;
      });
  }
}

export default new Service();
