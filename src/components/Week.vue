<template>
  <div class="week">
    <day v-for="(day, index) in weekdays"
      v-bind:key="index"
      v-bind:day="day"
    >
      <timeline slot="timeline" :showLabels="index === 0"/>
    </day>
  </div>
</template>

<script>
import Day from './Day';
import Timeline from './Timeline';

export default {
  name: 'week',
  props: {
    weekdays: {
      type: Array,
      required: true,
    },
  },
  components: {
    Day,
    Timeline,
  },
  methods: {
    last(index, arr) {
      return index === arr.length - 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  box-shadow: $shadow;
}
</style>


