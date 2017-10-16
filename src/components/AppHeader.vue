<template>
  <header class="appheader">
    <img class="logo" src="../assets/logo.svg" alt="">
    <!-- <h1>This is the new timetracking!</h1>
    <p>Its much better than Excel!</p>
    <btn text="TestBtn"></btn> -->
    <login class="login"></login>
  </header>
</template>

<script>
import Btn from './atoms/btn/Btn';
import Login from './atoms/login/Login';

export default {
  name: 'app-header',
  components: {
    Btn,
    Login,
  },
};
</script>

<style lang="css">
  .appheader {
    width: 100vw; 
    height: 3.5rem;
    background-color: #333;
    border-bottom: 1px solid #373737;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.5) 0 2px 2px;
  }

  .logo {
    width: 2.5rem;
    margin: 0.5rem;
    flex-basis: 2.5rem;
  }
</style>
