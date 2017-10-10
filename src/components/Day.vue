<template>
  <div class="day">
    <header class="day__header">{{day | moment("dddd, MMM Do YYYY")}}</header>
    <div class="day__content" >
      <timeline slot="timeline"  :showLabels="showLabels" v-on:timelineclick="createEntry"/>
      <div class="entry" v-for="(entry, index) in entriesForDay" :key="index">
        {{entry.issue}}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

import Timeline from './Timeline';

export default {
  name: 'day',
  props: {
    day: {
      type: Object,
      required: true,
    },
    showLabels: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters([
      'entries',
    ]),
    entriesForDay() {
      return this.entries.filter(e =>
        e.start.date() === this.day.date()
        && e.start.month() === this.day.month()
        && e.start.year() === this.day.year(),
      );
    },
  },
  methods: {
    createEntry(start) {
      console.log(start);
      const startDate = moment(this.day).add(start.hours(), 'hours').add(start.minutes(), 'minutes');
      this.$store.dispatch('addEntry', {
        id: 0,
        start: startDate,
        end: moment(startDate).add(15, 'minutes'),
        issue: 'UX-1231',
        comment: 'test 123123',
      });
    },
  },
  components: {
    Timeline,
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.day {
  border-top: 5px solid $green;
  min-height: 20vh;
  display: grid;
}

.day:not(:last-child) {
  border-right: 1px solid $gray-dark;
}

.day__header {
  background-color: $gray-light;
  border-bottom: 1px solid $green;
  padding: 1rem 0.5rem;
}
</style>


