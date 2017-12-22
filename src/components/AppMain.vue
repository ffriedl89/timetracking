<template>
  <main class="app-main">
    <week-controls></week-controls>
    <week v-bind:weekdays="currentWeek"></week>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import Week from './Week';
import WeekControls from './WeekControls';
import Btn from './atoms/btn/Btn';

export default {
  name: 'app-main',
  components: {
    Week,
    Btn,
    WeekControls,
  },
  computed: {
    ...mapGetters([
      'currentWeek',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  padding: 0 1rem 1rem;
}
</style>

