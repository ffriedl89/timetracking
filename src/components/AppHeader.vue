<template>
  <header>
    <h1>This is the new timetracking!</h1>
    <p>Its much better than Excel!</p>
    <btn text="TestBtn"></btn>
  </header>
</template>

<script>
import Btn from './atoms/btn/Btn';

export default {
  name: 'app-header',
  components: {
    Btn,
  },
};
</script>

<style scoped>

</style>