<template>
  <header>
    <h1>This is the new timetracking!</h1>
    <p>Its much better than Excel!</p>
    <btn text="TestBtn"></btn>
    <login></login>
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

<style scoped>

</style>