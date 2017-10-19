<template>
  <div class="entry-wrapper" ref="wrapper" :style="styleObject">
    <div class="entry" :class="{'entry--dragging': dragging}">
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
export default {
  name: 'entry',
  data() {
    return {
      issue: 'UX-1231',
      startY: 0,
      initialMove: false,
      dragging: false,
      end: 0,
    };
  },
  props: {
    entryKey: {
      type: String,
      required: true,
    },
    rowStart: {
      type: Number,
      required: true,
    },
    rowEnd: {
      type: Number,
      required: true,
    },
    slotHeight: {
      type: Number,
      required: true,
    },
  },
  computed: {
    styleObject() {
      return {
        'grid-row': `${this.rowStart} / ${this.end}`,
      };
    },
  },
  methods: {
    onMouseDown(event) {
      event.preventDefault();
      this.dragging = true;
      this.startY = event.y;
      this.originalHeight = this.$el.offsetHeight;
      this.$el.style.height = `${this.originalHeight - 4}px`;
      // /** initialMove to jump to next slot immediately */
      this.initialMove = true;
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    },
    onMouseMove(event) {
      this.dragOffsetY = this.startY - event.y;
      const newHeight = Math.floor((this.originalHeight - this.dragOffsetY) / this.slotHeight) * this.slotHeight; // eslint-disable-line
      this.$el.style.height = `${Math.max(this.slotHeight, newHeight)}px`;
      // this.initialMove = false;
    },
    onMouseUp() {
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
      this.dragging = false;
      // TODO: send to store
    },
  },
  created() {
    this.end = this.rowEnd;
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
