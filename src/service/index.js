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

const getYearWeekKey = (date) => {
  const week = date.week();
  const year = date.year();
  return `${year}_${week}`;
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
    const yearWeek = getYearWeekKey(entry.start);
    const entryKey = this.dbRef.child(`entries/${yearWeek}`).push().key;
    const payload = {
      ...entry,
      key: entryKey,
    };
    const updates = {};
    updates[`entries/${yearWeek}/${entryKey}`] = this.serializeEntry(payload);
    return this.dbRef.update(updates)
      .then(() => payload);
  }

  /**
   * Removes an entry from the database
   */
  removeEntry(key) {
    return this.dbRef.child(`entries/${key}`).remove();
  }

  changeEntryEnd(entry, end) {
    const payload = {
      ...entry,
      end,
    };
    const updates = {};
    updates[`entries/${entry.key}`] = this.serializeEntry(payload);
    return this.dbRef.update(updates);
  }

  // loadEntriesForWeekByDay(day) {
  // }
}

export default new Service();
