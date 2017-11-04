<template>
  <a v-if="loggedIn" v-on:click="logout">Logout {{username}}</a>
  <a v-else v-on:click="login">Login</a>
</template>

<script>
import { mapGetters } from 'vuex';
import FirebaseService from '../../../services/firebase';

export default {
  computed: {
    ...mapGetters([
      'user',
    ]),
    loggedIn() {
      return this.user !== undefined;
    },
    username() {
      return this.loggedIn ? this.user.displayName : '';
    },
  },
  methods: {
    login() {
      FirebaseService.login();
    },
    logout() {
      FirebaseService.logout();
    },
  },
};

</script>
