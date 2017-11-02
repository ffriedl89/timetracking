<template>
  <a v-if="loggedIn" v-on:click="logout">Logout {{username}}</a>
  <a v-else v-on:click="login">Login</a>
</template>

<script>
import { mapGetters } from 'vuex';
import Service from '../../../service';

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
      Service.login();
    },
    logout() {
      Service.logout();
    },
  },
};

</script>
