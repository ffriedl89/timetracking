<template>
  <div class="page">
    <div class="login">
      <img class="logo" src="../assets/logo.svg" alt="">
      <h2>Timetracking</h2>
      <btn v-on:click.native="login">Login with google</btn>
    </div>
  </div>
</template>

<script>
import Service from '../service';
import Btn from './atoms/btn/Btn';

export default {
  components: {
    Btn,
  },
  methods: {
    login() {
      Service.login();
    },
  },
};
</script>

<style scoped>
  .page {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #333;
  }
  
  h2 {
    color: #fefefe;
  }

  .login {
    max-width: 15rem;
    text-align: center;
  }

  .logo {
    padding-left: 3rem;
    padding-right: 3rem;
    max-width: 100%;
    box-sizing: border-box;
  }

  .btn {

  }
</style>
