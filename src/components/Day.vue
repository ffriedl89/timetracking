<template>
  <div class="day">
    <header class="day__header">{{day | moment("dddd, MMM Do YYYY")}}</header>
    <div class="day__content" >
      <timeline slot="timeline" :showLabels="showLabels" :day="day"/>
    </div>
  </div>
</template>

<script>
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
      default: false,
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
  border-top: 5px solid $light-color;
  min-height: 20vh;
  display: grid;
  grid-template-rows: auto 1fr;
}

.day:not(:last-child) {
  border-right: 1px solid $dark-color;
}

.day__header {
  background-color: $bg-color;
  border-bottom: 1px solid $light-color;
  padding: 1rem 0.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>


