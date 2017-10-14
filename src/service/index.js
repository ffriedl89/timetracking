import { initializeApp, auth, database } from 'firebase';
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
        this.userKey = user.uid;
        this.dbRef = database().ref(this.userKey);
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

  serializeEntry(entry) { //eslint-disable-line
    return {
      ...entry,
      start: entry.start.toISOString(),
      end: entry.end.toISOString(),
    };
  }
  /**
   * Adds a timeentry to the user spaced database in firebase
   * @param {timeentry} entry
   */
  addEntry(entry) {
    const entryKey = this.dbRef.child('entries').push().key;
    const payload = {
      ...entry,
      key: entryKey,
    };
    const updates = {};
    updates[`entries/${entryKey}`] = this.serializeEntry(payload);
    return this.dbRef.update(updates)
      .then(() => payload);
  }

  /**
   * Removes an entry from the database
   */
  removeEntry(key) {
    return this.dbRef.child(`entries/${key}`).remove();
  }

  loadEntriesForDay(day) {

  }
}

export default new Service();
