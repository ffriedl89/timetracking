<template>
  <button class="btn">{{text}}</button>
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

<style scoped>

:root {
  --btnColor: #4fac27;
  --btnHoverColor: color(var(--btnColor) lightness(-2%));
}

.btn {
  background-color: var(--btnColor);
  color: #D6EBF3;
  border-radius: 3px;
  border: 2px solid  var(--btnColor);
  padding: .5rem 1rem;
  font-size: 1rem;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
}

.btn:hover,
.btn:focus {
  cursor: pointer;
  background-color: var(--btnHoverColor);
  border-color: var(--btnHoverColor);
  box-shadow: 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.3);
  transition: box-shadow 0.3s, background-color 0.3s;
  outline: none;
}
</style>
