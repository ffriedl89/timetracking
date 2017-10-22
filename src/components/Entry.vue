<template>
  <div class="entry-wrapper" ref="wrapper" :style="styleObject">
    <div class="entry" :class="{'entry--dragging': dragging}">
      <div class="entry__issue">
        {{entry.start.format('hh:mm:ss')}} {{entry.end.format('hh:mm:ss')}}
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
import moment from 'moment';

export default {
  name: 'entry',
  data() {
    return {
      issue: 'UX-1231',
      startY: 0,
      initialMove: false,
      end: 0,
      dragging: false,
      timeConstraints: {
        start: null,
        end: null,
      },
      newEnd: null,
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
    entry() {
      return this.$store.getters.entryByKey(this.entryKey);
    },
    styleObject() {
      return {
        'grid-row': `${this.rowStart} / ${this.end}`,
      };
    },
  },
  methods: {
    onMouseDown(event) {
      event.preventDefault();
      this.$store.dispatch('startDragEntryEnd');
      this.startY = event.y;
      this.originalHeight = this.$el.offsetHeight;
      this.$el.style.height = `${this.originalHeight}px`;
      this.dragging = true;
      this.timeConstraints = this.$store.getters.dragConstraints(this.entryKey);
      console.log('end', this.timeConstraints.end.format('hh:mm:ss'));
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    },
    onMouseMove(event) {
      this.dragOffsetY = this.startY - event.y;
      const slotDiff = Math.ceil(this.dragOffsetY / this.slotHeight) * -1;
      this.newEnd = moment(this.entry.end).add(slotDiff * 15, 'minutes');
      if (this.newEnd.isSameOrBefore(this.timeConstraints.end) && this.newEnd.isSameOrAfter(this.timeConstraints.start)) { // eslint-disable-line max-len
        const newHeight = Math.floor((this.originalHeight - this.dragOffsetY) / this.slotHeight) * this.slotHeight; // eslint-disable-line max-len
        this.$el.style.height = `${Math.max(this.slotHeight, newHeight)}px`;
      }
    },
    onMouseUp() {
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
      this.$store.dispatch('updateEntry', { key: this.entryKey, end: this.newEnd });
      this.dragging = false;
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
  padding: 0 0.25rem;
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
