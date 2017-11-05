<template>
 <transition name="fade">
  <div class="modal__container" v-if="modal.open">
    <component v-bind:is="modal.el" >
    </component>
  </div>
 </transition>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'modal',
    ]),
  },
};
</script>

<style>
  .modal__container {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.1);
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex; 
    justify-content: center;
    align-items: center;
    z-index: 2;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
