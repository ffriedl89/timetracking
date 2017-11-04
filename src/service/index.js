import { initializeApp, auth, database } from 'firebase';
import moment from 'moment';
import store from '../store';
import router from '../router';

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

    this.queue = [];

    auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch('login', user);
        this.userKey = user.uid;
        this.dbRef = database().ref(this.userKey);
        this.runQueue();
        if (this.nextRoute) {
          router.push({ path: this.nextRoute });
        } else {
          router.push({ path: '/' });
        }
      } else {
        store.dispatch('logout');
        this.userKey = undefined;
        this.dbRef = undefined;
        router.push({ path: '/login' });
      }
    });
  }

  runQueue() {
    this.queue.forEach((e) => {
      e.fn(...e.args);
    });
    this.queue = [];
  }

  login() {
    return auth().signInWithPopup(this.providers.google);
  }

  logout() {  // eslint-disable-line
    return auth().signOut();
  }

  /**
   * Sets the next route to send to the correct route after authStateChange
   * @param {function} next - router next callback
   */
  setNextRoute(next) {
    this.nextRoute = next.path;
  }

  static serializeEntry(entry) { //eslint-disable-line
    return {
      ...entry,
      start: entry.start.toISOString(),
      end: entry.end.toISOString(),
    };
  }

  static deserializeEntry(entry) {
    return {
      ...entry,
      start: moment(entry.start),
      end: moment(entry.end),
    };
  }

  /**
   * Adds or updates a timeentry to the user spaced database in firebase
   * @param {timeentry} entry
   */
  addOrUpdateEntry(entry) {
    const entryKey = entry.key || this.dbRef.child('entries').push().key;
    const payload = {
      ...entry,
      key: entryKey,
    };
    const updates = {};
    updates[`entries/${entryKey}`] = Service.serializeEntry(payload);
    return this.dbRef.update(updates)
      .then(() => payload);
  }

  /**
   * Removes an entry from the database
   */
  removeEntry(key) {
    return this.dbRef.child(`entries/${key}`).remove();
  }

  /**
   * Load Entries from firebase or from the @todo cache
   * Dispatches `populateEntries` to store
   * @param {moment} start
   * @param {moment} end
   */
  loadEntries(start, end) {
    if (!this.userKey) {
      this.queue.push({ fn: this.loadEntries.bind(this), args: [start, end] });
      return;
    }
    this.dbRef
      .child('entries')
      .orderByChild('start')
      .startAt(start.toISOString())
      .endAt(end.toISOString())
      .once('value')
      .then((snapshot) => {
        // merge to array
        const snapshotValue = snapshot.val();
        if (!snapshotValue) {
          return [];
        }
        return Object.keys(snapshotValue).map(key => snapshotValue[key]);
      })
      .then(entries => entries.map(entry => Service.deserializeEntry(entry)))
      .then(entries => store.dispatch('populateEntries', entries));
  }
}

export default new Service();
