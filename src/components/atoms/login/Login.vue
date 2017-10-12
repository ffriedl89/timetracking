<template>
  <div>
    <button v-if="loggedIn" v-on:click="logout">Logout {{username}}</button>
    <button v-else v-on:click="login">Login</button>
  </div>
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
      console.log(Service);
      Service.logout();
    },
  },
};

</script>



