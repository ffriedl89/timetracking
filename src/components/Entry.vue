<template>
  <div class="entry-wrapper">
    <div class="entry" :class="{'entry--dragging': isDragging && draggedEntryKey === entryKey}">
      <div class="entry__issue">
        {{issue}}
      </div>
      <div class="entry__handle" @mousedown="onMouseDown" ref="resizeHandle" >
        <svg class="handle" height="8" viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100h400v50H0zM0 0h400v50H0z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'entry',
  data() {
    return {
      issue: 'UX-1231',
    };
  },
  props: {
    entryKey: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      'isDragging',
      'draggedEntryKey',
    ]),
  },
  methods: {
    onMouseDown(event) {
      event.preventDefault();
      const startY = event.pageY;
      this.$store.dispatch('startDragEntryEnd', { key: this.entryKey, startY });
      this.dragging = true;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../scss/variables';

.entry-wrapper {
  padding: 0.25rem;
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
  transition: box-shadow 0.3s ease-in-out; 
}

.entry--dragging {
  opacity: 0.85;
  box-shadow: $shadow;
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
