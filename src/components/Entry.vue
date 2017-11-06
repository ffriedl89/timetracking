<template>
  <div class="entry-wrapper" ref="wrapper" :style="styleObject">
    <div class="entry" :class="{'entry--dragging': dragging}" v-on:click="onClick">
      <div class="entry__info">
        {{entry.start.format('HH:mm')}} - {{newEnd ? newEnd.format('HH:mm') : entry.end.format('HH:mm')}}
        <span class="entry__issue">{{entry.issue}}</span>
      </div>
      <div class="entry__handle" @mousedown="onMouseDown" ref="resizeHandle">
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Vue from 'vue';
import modal from './modals/EntryModal';

export default {
  name: 'entry',
  data() {
    return {
      issue: 'UX-1231',
      startY: 0,
      initialMove: false,
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
      Vue.nextTick(() => {
        this.$el.style.height = '';
      });
      return {
        'grid-row': `${this.rowStart} / ${this.rowEnd}`,
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
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    },
    onMouseMove(event) {
      this.dragOffsetY = this.startY - event.y;
      const slotDiff = Math.ceil(this.dragOffsetY / this.slotHeight) * -1;
      const moved = moment(this.entry.end).add(slotDiff * 15, 'minutes');
      if (moved.isSameOrBefore(this.timeConstraints.end) && moved.isSameOrAfter(this.timeConstraints.start)) { // eslint-disable-line max-len
        const newHeight = Math.floor((this.originalHeight - this.dragOffsetY) / this.slotHeight) * this.slotHeight; // eslint-disable-line max-len
        this.$el.style.height = `${Math.max(this.slotHeight, newHeight)}px`;
        this.newEnd = moved;
      }
    },
    onMouseUp() {
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
      this.$store.dispatch('updateEntry', { key: this.entryKey, end: this.newEnd });
      this.dragging = false;
    },
    onClick() {
      this.$store.dispatch('openModal', {
        modal,
        props: {
          entry: this.entry,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../scss/variables';

.entry-wrapper {
  padding: 0 0.25rem;
  grid-column: 1;
  box-sizing: border-box;
  padding-bottom: 2px;
  z-index: 1;
}

.entry {
  box-sizing: border-box;
  border-radius: 2px;
  background-color: $light-color;
  border: 1px solid darken($light-color, 5%);
  color: #fff;
  font-size: 0.6875rem;
  display: grid;
  grid-template-rows: auto 6px;
  grid-template-columns: 1fr;
  height: 100%;
  transition: box-shadow 0.3s ease-in-out;
}

.entry--dragging {
  opacity: 0.85;
  box-shadow: $shadow;
}

.entry__info {
  grid-row: 1;
  padding: 0.125rem 1rem 0;
}

.entry__issue {
  white-space: nowrap;
}

.entry__handle {
  cursor: ns-resize;
  grid-row: 2;
  background-color: $dark-color;
}

.entry__handle svg {
  fill: $gray-light;
  display: block;
  margin: 2px auto;
}

</style>
