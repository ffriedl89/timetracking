<template>
  <div class="modal">
    <header class="modal__header">Issue: ...</header>
    <div class="modal__main"></div>
    <div class="modal__footer">
      <btn v-on:click.native="onClose">Close</btn>
      <btn>Save</btn>
    </div>
  </div>
</template>

<script>
import btn from '../atoms/btn/Btn';

export default {
  components: {
    btn,
  },
  methods: {
    onClose() {
      this.$store.dispatch('closeModal');
    },
  },
};
</script>


<style lang="scss" scoped>
@import '../../scss/variables';

$modalPadding: 1rem;

.modal {
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 4px 4px 6px $gray-dark;
}

.modal__header {
  height: 2rem;
  background-color: $dark-color;
  color: #fff;
  padding: $modalPadding / 2 $modalPadding;
}

.modal__main {
  min-height: 4rem;
}

.modal__footer {
  padding: $modalPadding / 2 $modalPadding;
}

</style>
