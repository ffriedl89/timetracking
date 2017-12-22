<template>
  <div id="app">
    <transition name="header-transition">
      <router-view name="header"></router-view>
    </transition>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
@import './scss/variables';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: $bg-color;
  overflow: hidden;
}

body {
  margin: 0;
  padding: 0;
}

</style>
