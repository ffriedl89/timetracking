<template>
  <div class="day">
    <header class="day_header">{{day | moment("dddd, MMM Do YYYY")}}</header>
    <div class="day__content">
      <
    </div>
  </div>
</template>

<script>
export default {
  name: 'day',
  props: ['day'],
};
</script>

<<style lang="postcss" scoped>
.day {
  border: 1px solid #D8E1DE;
  border-top: 5px solid #4fac27;
  padding: 1rem 0.5rem;
  min-height: 20vh;
}

.day__header {

}

.day__content {

}

</style>


