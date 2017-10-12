<template>
  <div>
    <div class="controls">
      <btn text="Previous week" v-on:click.native="weekOffset -= 1"></btn>
      <btn text="Current week" v-on:click.native="weekOffset = 0"></btn>
      <btn text="Next week" v-on:click.native="weekOffset += 1"></btn>
    </div>
    <week v-bind:weekdays="currentWeek"></week>
  </div>
</template>

<script>
import moment from 'moment';
import Week from './Week';
import Btn from './atoms/btn/Btn';

export default {
  name: 'app-main',
  components: {
    Week,
    Btn,
  },
  props: {
    daysPerWeek: {
      type: Number,
      default: 7,
    },
  },
  data() {
    return {
      weekOffset: 0,
    };
  },
  computed: {
    currentWeek() {
      const initialWeekday = moment().startOf('isoweek');
      initialWeekday.add(this.weekOffset, 'weeks');

      const weekdays = [];
      for (let i = 0; i < this.daysPerWeek; i += 1) {
        weekdays.push(initialWeekday.clone().add(i, 'days'));
      }
      return weekdays;
    },
  },
};
</script>
