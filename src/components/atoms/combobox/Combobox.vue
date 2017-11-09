<template>
  <div>
    <input type="text" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" />
    <div class="options">
      <span 
        v-for="(option, index) in options"
        v-bind:key="index"
        v-bind:is="optionelement"
        v-bind="option"
        >
      </span>
    </div>
  </div>  

</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: [],
    },
    optionelement: {
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>

</style>

