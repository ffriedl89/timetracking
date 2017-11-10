<template>
  <div class="modal" v-on:keydown.enter="onSave">
    <header class="modal__header">Issue: {{entry.issue}}</header>
    <div class="modal__main">
      <div class="inputgroup">
        <label for="issue">Issue</label>
        <input name="issue" type="text" id="issue" autocomplete="off" v-model="entry.issue" />
        <combobox
          v-model="entry.issue"
          v-bind:options="options"
          v-bind:optionelement="issue"
        />
      </div>
    </div>
    <div class="modal__footer">
      <btn v-on:click.native="onClose">Close</btn>
      <btn v-on:click.native="onSave">Save</btn>
    </div>
  </div>
</template>

<script>
import JiraService from '../../services/jira';
import btn from '../atoms/btn/Btn';
import combobox from '../atoms/combobox/Combobox';
import issueComponent from '../atoms/issue/Issue';
import { sanitizeIssueNo } from '../../utils/jirautils';

export default {
  components: {
    btn,
    combobox,
  },
  methods: {
    onSave() {
      this.$store.dispatch('updateEntry', {
        key: this.entry.key,
        issue: sanitizeIssueNo(this.entry.issue),
      });
      this.$store.dispatch('closeModal');
    },
    onClose() {
      this.$store.dispatch('closeModal');
    },
    onChange(e) {
      console.log(e);
    },
    keyDown(e) {
      console.log(e);
    },
  },
  props: {
    entry: {
      type: Object,
    },
  },
  data() {
    return {
      issue: issueComponent,
      options: [],
    };
  },
  created() {
    JiraService
      .getCurrentIssuesForUser()
      .then((res) => {
        if (res.issues) {
          this.options = res.issues;
          console.log(this.options);
        }
      });
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
