<template>
  <div class="control">
    <h3>Week No. {{weekNumber}}</h3>
    <btn v-on:click.native="setToday">Today</btn>
    <btn v-on:click.native="setPrevWeek">&#9664;</btn>
    <btn v-on:click.native="setNextWeek">&#9654;</btn>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import btn from './atoms/btn/Btn';

export default {
  components: {
    btn,
  },
  computed: {
    ...mapGetters([
      'startWeek',
    ]),
    weekNumber() {
      return this.startWeek.week();
    },
  },
  methods: {
    setToday() {
      this.$store.dispatch('resetOffset');
    },
    setPrevWeek() {
      this.$store.dispatch('decreaseOffset');
    },
    setNextWeek() {
      this.$store.dispatch('increaseOffset');
    },
  },
};
</script>

<style lang="scss" scoped>

.control {
  text-align: left;
}

.control h3 {
  display: inline-block;
}

.control .btn {
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}

</style>

