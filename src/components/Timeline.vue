<template>
  <div class="timeline" :style="styleObject">
    <div class="timeline-entry" v-for="(time, index) in slots" 
      v-bind:key="index" 
      :class="{ 'timeline-entry--fullhour': isFullHour(time) }" 
      v-on:click="createEntry(time)" 
      :style="styleForTimeline(index)">
      <div class="timeline-entry__label" v-if="showLabels && isFullHour(time)">
        {{time | moment('HH:mm')}}
      </div>
    </div>
    <div class="entry" v-for="(entry, index) in entriesForDay(day)" :key="index" :style="styleForEntry(entry)">
      {{entry.issue}}
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  name: 'timeline',
  data() {
    return {
      step: 0.25,
    };
  },
  /**
   * props
   */
  props: {
    day: {
      type: Object,
      required: true,
    },
    startTime: {
      type: Object,
      default() {
        return moment('08:00', 'HH:mm');
      },
    },
    endTime: {
      type: Object,
      default() {
        return moment('18:00', 'HH:mm');
      },
    },
    showLabels: {
      type: Boolean,
      default: true,
    },
  },
  /**
   * computed props
   */
  computed: {
    ...mapGetters([
      'entriesForDay',
    ]),
    diff() {
      return this.endTime.diff(this.startTime, 'hours');
    },
    slots() {
      const moments = [];
      this.day.hours(this.startTime.hours()).minutes(this.startTime.minutes());
      for (let i = 0; i < this.diff; i += this.step) {
        moments.push(moment(this.day).add(i, 'hours'));
      }
      return moments;
    },
    styleObject() {
      return {
        'grid-template-rows': `repeat(${this.slots.length}, 1.5rem)`,
      };
    },
  },
  methods: {
    isFullHour(mom) {
      return mom.minute() === 0;
    },
    createEntry(start) {
      const startDate = moment(this.day).hours(start.hours()).minutes(start.minutes());
      this.$store.dispatch('addEntry', {
        id: 0,
        start: startDate,
        end: moment(startDate).add(30, 'minutes'),
        issue: 'UX-1231',
        comment: 'test 123123',
      });
    },
    styleForEntry(entry) {
      const rowStart = (entry.start.diff(this.day, 'minutes') / 60 / this.step) + 1;
      const rowEnd = (entry.end.diff(this.day, 'minutes') / 60 / this.step) + 1;
      return {
        'grid-row': `${rowStart} / ${rowEnd}`,
      };
    },
    styleForTimeline(index) {
      const rowStart = index + 1;
      const rowEnd = rowStart + 1;
      return {
        'grid-row': `${rowStart} / ${rowEnd}`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.timeline {
  display: grid;
  grid-template-columns: 1fr;
}

.timeline-entry {
  grid-column: 1;
}

.timeline-entry--fullhour:not(:first-child) {
  border-top: 1px solid $gray-dark;
}

.timeline-entry:hover {
  background-color: $green;
  color: #fff;
}

.timeline-entry__label {
  text-align: left;
  width: 2.625rem;
  padding-left: 0.25rem;
  line-height: 1.5rem;
}

.entry {
  background-color: $green;
  color: #fff;
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  grid-column: 1;
  opacity: 0.85;
}

</style>
