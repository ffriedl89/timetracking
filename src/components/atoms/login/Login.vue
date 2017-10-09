<template>
  <button v-if="loggedIn">Hello {{username}}</button>
  <button v-else v-on:click="login">Login</button>
</template>

<script>
import Service from '../../../service';

export default {
  data: Service,
  computed: {},
  methods: {
    login() {
      console.log(this.loggedIn);
      Service.login()
        .then(() => console.log(this.loggedIn));
    },
  },
};

</script>



