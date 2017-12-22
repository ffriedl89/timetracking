<template>
  <button class="btn"><slot>{{text}}</slot></button>
</template>

<script>
/**
* button atom
* @version 0.0.1
*/
export default {
  name: 'btn',
  props: {
    /**
     * the text of the button
    */
    text: {
      type: String,
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../../scss/variables';

.btn {
  background-color: $btnColor;
  color: #D6EBF3;
  border-radius: 3px;
  border: 2px solid  $btnColor;
  padding: .2rem 0.5rem;
  font-size: 1rem;
  box-shadow: $shadow;
}

.btn:hover,
.btn:focus {
  cursor: pointer;
  background-color: $btnHoverColor;
  border-color: $btnHoverColor;
  box-shadow: $shadowHover;
  transition: box-shadow 0.3s, background-color 0.3s;
  outline: none;
}
</style>
