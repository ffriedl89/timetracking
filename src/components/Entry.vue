<template>
  <div class="entry-wrapper" ref="wrapper" :style="styleObject" @mousedown="entryMouseDown">
    <div class="entry" :class="{'entry--dragging': dragging, 'entry--overlapping': overlapping}">
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
      startX: 0,
      dragging: false,
      overlapping: false,
      timeConstraints: {
        start: null,
        end: null,
      },
      newStart: null,
      newEnd: null,
      offsetFromEntryStartSlots: 0,
      dayMoved: null,
      entriesForDayMoved: [],
      dayWidth: 0,
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
      this.overlapping = false;
      this.$el.style.pointerEvents = '';
      if (!this.entry.end.isSame(this.newEnd)
        && !this.doesOverlap(this.newStart, this.newEnd)) {
        this.$store.dispatch('updateEntry', { key: this.entryKey, start: this.newStart, end: this.newEnd });
      } else {
        this.$el.style['grid-row'] = `${this.rowStart} / ${this.rowEnd}`;
        this.$el.style.left = '';
      }
    },
    entryMouseDown(event) {
      event.preventDefault();
      event.stopPropagation();
      this.$store.dispatch('startDrag');
      this.startY = event.y;
      this.startX = event.x;
      this.startXLeftOffset = event.layerX;
      this.$el.style.pointerEvents = 'none';
      this.dragging = true;
      this.dayWidth = document.querySelector('.day').offsetWidth;
      this.entriesForDayMoved = this.getEntriesForDayExceptSelf(this.entry.start);
      window.addEventListener('mousemove', this.onMouseMoveForMove);
      window.addEventListener('mouseup', this.onMouseUp);
    },
    onMouseMoveForMove(event) {
      this.dragOffsetY = event.y - this.startY;
      this.dragOffsetX = this.startXLeftOffset + (event.x - this.startX);
      const slotDiff = Math.floor(this.dragOffsetY / this.slotHeight);
      const dayDiff = Math.floor(this.dragOffsetX / this.dayWidth);

      if (this.checkDayMovementConstraint(slotDiff)) {
        this.$el.style['grid-row'] = `${this.rowStart + slotDiff} / ${this.rowEnd + slotDiff}`;
        this.$el.style.left = `${this.dayWidth * dayDiff}px`;
        const tempStart = this.setMomentBySlotDiff(this.entry.start, dayDiff, slotDiff);
        const tempEnd = this.setMomentBySlotDiff(this.entry.end, dayDiff, slotDiff);
        if (this.newStart && this.newStart.date() !== tempStart.date()) {
          this.entriesForDayMoved = this.getEntriesForDayExceptSelf(tempStart);
        }
        if (!this.doesOverlap(tempStart, tempEnd)) {
          this.overlapping = false;
          /**
           * update newStart / newEnd if no overlaps are found
           */
          this.newStart = tempStart;
          this.newEnd = tempEnd;
        } else {
          this.overlapping = true;
          this.newStart = this.entry.start;
          this.newEnd = this.entry.end;
        }
      }
    },
    checkDayMovementConstraint(slotDiff) {
      const isWithinDayStart = this.setMomentBySlotDiff(this.entry.start, 0, slotDiff);
      const isWithinDayEnd = this.setMomentBySlotDiff(this.entry.end, 0, slotDiff);
      const isMidnight = isWithinDayEnd.hours() === 0 && isWithinDayEnd.minutes() === 0;
      const isNextDay = isWithinDayEnd.date() === moment(this.entry.start).add(1, 'days').date();
      const isNextDayAtMidnight = isNextDay && isMidnight;
      return isWithinDayStart.date() === this.entry.start.date()
        && (isWithinDayEnd.date() === this.entry.start.date() || isNextDayAtMidnight);
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
    setMomentBySlotDiff(baseTime, dayDiff, slotDiff) {
      const temp = moment(baseTime).seconds(0).milliseconds(0);
      temp.hours(baseTime.hours())
        .minutes(baseTime.minutes())
        .add(slotDiff * 15, 'minutes')
        .add(dayDiff, 'days');
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
}

.entry {
  --entry-color: $light-color;
}

.entry {
  box-sizing: border-box;
  border-radius: 2px;
  background-color: var(--entry-color);
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

.entry--overlapping {
  --entry-color: $accent-color;
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
