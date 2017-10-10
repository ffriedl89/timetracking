<template>
  <button v-if="loggedIn">Hello {{username}}</button>
  <button v-else v-on:click="login">Login</button>
</template>

<script>
import { mapGetters } from 'vuex';
import Service from '../../../service';

export default {
  ...mapGetters([
    'user',
    'username',
  ]),
  computed: {
    loggedIn() {
      if (this.user) {
        console.log('loggedin', this.user, this.user.newProp);
      }
      return this.user !== undefined;
    },
    username() {
      console.log('username', this.username);
      if (!this.username) return '';
      return this.username || '';
    },
  },
  methods: {
    login() {
      Service.login();
    },
  },
};

</script>



