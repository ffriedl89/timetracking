<template>
  <button v-if="loggedIn">Hello {{username}}</button>
  <button v-else  v-on:click="login">Login</button>
</template>

<script>
import Service from '../../../service';

export default {
  computed: {
    username() {
      return Service.getUsername();
    },
    loggedIn() {
      return Service.getLoggedIn();
    },
  },
  methods: {
    login() {
      Service.login();
    },
  },
};

</script>



