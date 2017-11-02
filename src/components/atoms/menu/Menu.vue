<template>
  <div class="menu">
    <button class="menu__btn" v-on:click="toggleMenu" >
      <svg viewBox="0 0 100 100" class="menu__btn__icon" v-bind:class="{ isActive: open }">
        <path d="M10 20, 90 20" stroke-width="15" stroke-linecap="round" />
        <path d="M10 50, 90 50" stroke-width="15" stroke-linecap="round" />
        <path d="M10 80, 90 80" stroke-width="15" stroke-linecap="round" />
        <circle cx="90" cy="20" r="7.5" stroke-width="0" />
        <circle cx="90" cy="50" r="7.5" stroke-width="0" />
        <circle cx="90" cy="80" r="7.5" stroke-width="0" />
      </svg>
    </button>
    <div class="menu__foldout" v-bind:class="{ isActive: open }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggleMenu() {
      this.open = !this.open;
    },
  },
};
</script>

<style lang="scss">
  @import '../../../scss/variables';

  .menu {
    text-align: right;
    position: relative;
  }

  .menu__btn {
    position: relative;
    appearance: none;
    background-color: transparent;
    border: 0;
    outline: 0;
    margin: 1rem;
    padding: 0;
    font-size: 0;
    cursor: pointer;
  }

  .menu__btn__icon {
    width: 1.5rem;
    height: 1.5rem;

    path {
      stroke: $gray-light;
      transition: transform 125ms ease-in-out;
      transform: scaleX(0);
      transform-origin: right;
    }

    path:nth-child(2) {
      transition-delay: 30ms;
    }

    path:nth-child(3) {
      transition-delay: 60ms;
    }

    &.isActive path {
      transform: scaleX(1);
    }

    circle {
      fill: $gray-light
    }
  }

  .menu__foldout {
    display: block;
    background-color: $dark-color;
    list-style: none;
    z-index: 90;
    transform: translateX(100%);
    transition: transform 150ms ease-out;
    transition-delay: 80ms;
    
    &.isActive {
      transform: translateX(0);
    }
  }

  .menu__foldout > * {
    padding: 0.2rem 1rem;
    white-space: nowrap;
    display: list-item;
    color: $gray-light;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 125ms ease-out;

    &:hover {
      background-color: $light-color;
    }
  }
</style>

