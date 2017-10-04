<template>
  <div>
    <week v-bind:weekdays="currentWeek"></week>
  </div>
</template>

<script>
import moment from 'moment';
import Week from './Week';

export default {
  name: 'app-main',
  components: {
    Week,
  },
  computed: {
    currentWeek: () => {
      const weekdays = [];
      let i = 0;
      do {
        weekdays.push(moment().startOf('isoweek').add(i, 'days'));
        i += 1;
      } while (i < 7);
      return weekdays;
    },
  },
};
</script>
