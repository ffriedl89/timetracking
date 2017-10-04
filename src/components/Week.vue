<template>
  <div class="week">
    <day v-for="(day, index) in weekdays"
      v-bind:key="index"
      v-bind:day="day"
    >
    </day>
  </div>
</template>

<script>
import Day from './Day';

export default {
  name: 'week',
  props: ['weekdays'],
  components: {
    Day,
  },
};
</script>

<<style lang="postcss" scoped>
.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 1rem;
  grid-gap: 0.5rem;
}
</style>


