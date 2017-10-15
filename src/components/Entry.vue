<template>
  <div class="entry-wrapper">
    <div class="entry" :class="{'entry--dragging': dragging }">
      <div class="entry__issue">
        {{issue}}
      </div>
      <div class="entry__handle" v-on:dragstart="onDragStart" v-on:dragend="onDragEnd">
        <svg class="handle" height="8" viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100h400v50H0zM0 0h400v50H0z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'entry',
  data() {
    return {
      issue: 'UX-1231',
      dragging: false,
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onDragStart() {
      this.$store.dispatch('startDragEntryEnd', this.id);
      this.dragging = true;
    },
    onDragEnd() {
      this.$store.dispatch('endDragEntryEnd');
      this.dragging = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../scss/variables';

.entry-wrapper {
  margin: 0.25rem;
  grid-column: 1;
}

.entry {
  background-color: $green;
  color: #fff;
  font-size: 0.6875rem;
  display: grid;
  grid-template-rows: auto 12px;
  grid-template-columns: 1fr;
  height: 100%;
}

.entry--dragging {
  opacity: 0.85;
}

.entry__issue {
  grid-row: 1;
  padding: 0.5rem 1rem 0;
}

.entry__handle {
  cursor: ns-resize;
  grid-row: 2;
}

.entry__handle svg {
  fill: $gray-light;
  display: block;
  margin: 2px auto;
}

</style>
