<template>
  <div class="page">
    <div class="login">
      <img width="245px" height="245px" class="logo" src="../assets/logo.svg" alt="">
      <h2>Timetracking</h2>
      <btn class="btn" v-on:click.native="login">Login with google</btn>
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

<style lang="scss" scoped>
  @import '../scss/variables';
  .page {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $dark-color;
  }
  
  h2 {
    color: $gray-light;
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
    width: 100%;
  }

  $animLength: 750ms;
  .header-transition-leave-active,
  .header-transition-enter-active {
    
    &.page {
      transition: transform $animLength ease-in-out;
    }

    .login {
      transition: opacity ($animLength / 2) ease-in-out;
    }
  }

  .header-transition-leave.page,
  .header-transition-enter-to.page {
    transform: translateY(0);
  }
  
  .header-transition-leave-to.page,
  .header-transition-enter.page {
    transform: translateY(calc(-100% + 3.5rem));
  }

  .header-transition-leave .login,
  .header-transition-enter-to .login {
    opacity: 1;
  }
  
  .header-transition-leave-to .login,
  .header-transition-enter .login {
    opacity: 0;
  }

</style>
