<template>
  <header class="appheader">
    <img class="logo" src="../assets/logo.svg" alt="">
    <app-menu>
      <router-link to="/">Home</router-link>
      <router-link to="settings">Settings</router-link>
      <login />
    </app-menu>
  </header>
</template>

<script>
import Btn from './atoms/btn/Btn';
import Menu from './atoms/menu/Menu';
import Login from './atoms/login/Login';

export default {
  name: 'app-header',
  components: {
    Btn,
    'app-menu': Menu,
    Login,
  },
};
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .appheader {
    height: 3.5rem;
    background-color: $dark-color;
    border-bottom: 1px solid darken($dark-color, 5%);
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    box-shadow: $shadow;
    box-sizing: border-box;
  }

  .logo {
    width: 2.5rem;
    margin: 0.5rem;
    flex-basis: 2.5rem;
  }
</style>
