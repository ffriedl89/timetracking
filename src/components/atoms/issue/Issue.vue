<template>
  <div>
    {{issuekey}}: {{fields.summary}}
  </div>
</template>

<script>
export default {
  props: {
    fields: {
      type: Object,
    },
    issuekey: {
      type: String,
    },
  },
  data() {
    return {};
  },
  created() {
    console.log(this);
  },
};
</script>
