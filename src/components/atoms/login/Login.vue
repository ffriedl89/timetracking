<template>
  <div>
    <button v-if="loggedIn">Hello {{username}}</button>
    <button v-else v-on:click="login">Login</button>
    <button v-on:click="checkLoggedin">aaa</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Service from '../../../service';

export default {
  ...mapGetters([
    'username',
  ]),
  computed: {
    loggedIn() {
      console.log(this.username);
      return this.username !== undefined;
    },
  },
  methods: {
    login() {
      Service.login();
    },
    checkLoggedin() {
      console.log(this.username);
      console.log(this.$store.state.user.username);
      debugger;
    },
  },
};

</script>



