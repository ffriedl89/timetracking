<template>
  <div class="entry-wrapper" ref="wrapper" :style="styleObject" @mousedown="entryMouseDown">
    <div class="entry" :class="{'entry--dragging': dragging, 'entry--moving': moving}">
      <div class="entry__info">
        {{newStart ? newStart.format('HH:mm:ss') : entry.start.format('HH:mm:ss')}} - {{newEnd ? newEnd.format('HH:mm:ss') : entry.end.format('HH:mm:ss')}}
      </div>
      <div class="entry__handle" @mousedown="resizeMouseDown" ref="resizeHandle" >
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Vue from 'vue';

export default {
  name: 'entry',
  data() {
    return {
      issue: 'UX-1231',
      startY: 0,
      dragging: false,
      moving: false,
      timeConstraints: {
        start: null,
        end: null,
      },
      newStart: null,
      newEnd: null,
      offsetFromEntryStartSlots: 0,
      dayMoved: null,
      entriesForDayMoved: [],
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
        this.$el.style.left = '';
      });
      return {
        'grid-row': `${this.rowStart} / ${this.rowEnd}`,
      };
    },
  },
  methods: {
    resizeMouseDown(event) {
      event.preventDefault();
      event.stopPropagation();
      this.$store.dispatch('startDrag');
      this.startY = event.y;
      this.originalHeight = this.$el.offsetHeight;
      this.$el.style.height = `${this.originalHeight}px`;
      this.dayMoved = this.getMomentFromDayDom(this.getDayFromMouseEvent(event));
      this.dragging = true;
      this.timeConstraints = this.$store.getters.dragConstraints(this.entryKey);
      this.newStart = this.entry.start;
      window.addEventListener('mousemove', this.onMouseMoveForResize);
      window.addEventListener('mouseup', this.onMouseUp);
    },
    onMouseMoveForResize(event) {
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
      window.removeEventListener('mousemove', this.onMouseMoveForResize);
      window.removeEventListener('mousemove', this.onMouseMoveForMove);
      window.removeEventListener('mouseup', this.onMouseUp);
      this.dragging = false;
      this.$el.style.pointerEvents = '';
      if (!this.doesOverlap(this.newStart, this.newEnd)) {
        this.$store.dispatch('updateEntry', { key: this.entryKey, start: this.newStart, end: this.newEnd });
      } else {
        this.$el.style.left = '';
      }
    },
    entryMouseDown(event) {
      event.preventDefault();
      event.stopPropagation();
      this.$store.dispatch('startDrag');
      this.startY = event.y;
      this.$el.style.pointerEvents = 'none';
      this.dragging = true;
      this.dayMoved = this.getMomentFromDayDom(this.getDayFromMouseEvent(event));
      this.entriesForDayMoved = this.getEntriesForDayExceptSelf(this.dayMoved);
      // this.timeConstraints = this.$store.getters.dragConstraints(this.entryKey);
      window.addEventListener('mousemove', this.onMouseMoveForMove);
      window.addEventListener('mouseup', this.onMouseUp);
    },
    onMouseMoveForMove(event) {
      this.dragOffsetY = this.startY - event.y;
      const dayDom = this.getDayFromMouseEvent(event);
      const newDayMoved = this.getMomentFromDayDom(dayDom);
      const timelineEntry = event.path.filter(e => e.classList && e.classList.contains('timeline-entry')).pop();
      const slotDiff = Math.floor(this.dragOffsetY / this.slotHeight) * -1;
      const tempStart = this.setMomentBySlotDiff(this.entry.start, newDayMoved, slotDiff);
      const tempEnd = this.setMomentBySlotDiff(this.entry.end, newDayMoved, slotDiff);
      if (tempStart.date() !== newDayMoved.date() || tempEnd.date() !== newDayMoved.date()) {
        /**
         * entry would move outside of day constraints
         */
        return;
      }
      if (newDayMoved.date() !== this.dayMoved.date()) {
        this.entriesForDayMoved = this.getEntriesForDayExceptSelf(newDayMoved);
        this.dayMoved = newDayMoved;
      }
      if (timelineEntry && !this.doesOverlap(tempStart, tempEnd)) {
        /**
         * update newStart / newEnd if no overlaps are found
         */
        this.newStart = tempStart;
        this.newEnd = tempEnd;
        const newStartRow = this.rowStart + slotDiff;
        const newEndRow = this.rowEnd + slotDiff;
        this.$el.style['grid-row'] = `${newStartRow} / ${newEndRow}`;
        console.log(this.newStart.diff(this.entry.start, 'hours') / 24);
        const dayPxOffset = Math.floor(this.newStart.diff(this.entry.start, 'hours') / 24) * dayDom.offsetWidth; // eslint-disable-line max-len
        this.$el.style.left = `${dayPxOffset}px`;
      }
    },
    /**
     * gets hit day dom element from mouse event
     * @returns {Object} dom element
     */
    getDayFromMouseEvent(event) {
      return event.path.filter(e => e.classList && e.classList.contains('day')).pop();
    },
    /**
     * gets moment from day dom element
     * @returns {Object} moment
     */
    getMomentFromDayDom(dayEle) {
      return moment()
        .date(dayEle.getAttribute('data-day'))
        .month(dayEle.getAttribute('data-month'))
        .year(dayEle.getAttribute('data-year'));
    },
    /**
     * get all entries for a day except self
     * @returns {Object[]} array of entries
     */
    getEntriesForDayExceptSelf(day) {
      return this.$store.getters.entriesForDay(day).filter(e => e.key !== this.entryKey);
    },
    doesOverlap(start, end) {
      return this.entriesForDayMoved.some(other =>
        other.start.isBefore(end)
          && other.end.isAfter(start));
    },
    setMomentBySlotDiff(baseTime, newDay, diff) {
      const temp = moment(newDay).seconds(0).milliseconds(0);
      temp.hours(baseTime.hours()).minutes(baseTime.minutes()).add(diff * 15, 'minutes');
      return temp;
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
  position: relative;
  left: 0;
  transition: left 0.2s ease-in-out;
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
  cursor: pointer;
}

.entry--dragging {
  opacity: 0.85;
  box-shadow: $shadow;
}

.entry--moving {
  cursor: move;
}

.entry__info {
  grid-row: 1;
  padding: 0.125rem 1rem 0;
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
