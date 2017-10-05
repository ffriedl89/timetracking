<template>
  <div class="timeline" :style="styleObject">
    <div class="timeline-entry" v-for="(time, index) in slots" v-bind:key="index" :class="{ 'timeline-entry--fullhour': isFullHour(time) }">
      <div class="timeline-entry__label" v-if="showLabels && isFullHour(time)">
        {{time | moment('HH:mm')}}
      </div>
      <div class="timeline-entry__slot">

      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

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
    start: {
      type: Object,
      default() {
        return moment('08:00', 'HH:mm');
      },
    },
    end: {
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
    diff() {
      return this.end.diff(this.start, 'hours');
    },
    slots() {
      const moments = [];
      for (let i = 0; i < this.diff; i += this.step) {
        moments.push(moment(this.start).add(i, 'hours'));
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
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.timeline {
  display: grid;
  grid-auto-flow: column;
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
</style>
