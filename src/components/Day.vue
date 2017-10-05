<template>
  <div class="day">
    <header class="day__header">{{day | moment("dddd, MMM Do YYYY")}}</header>
    <div class="day__content">
      <slot name="timeline" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'day',
  props: {
    day: {
      type: Object,
      required: true,
    },
  },
  components: {},
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


