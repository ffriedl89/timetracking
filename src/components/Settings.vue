<template>
  <div class="settings">
    <h1>Settings</h1>

    <fieldset>
      <legend>Jira</legend>
      <div class="inputgroup">
        <label for="jira-url">Endpoint</label>
        <input name="jiraurl" type="text" id="jira-url" autocomplete="off" v-model="jira.url" />
      </div>
      <div class="inputgroup">
        <label for="jira-user">User</label>
        <input name="jirauser" type="text" id="jira-user" autocomplete="off" v-model="jira.user" />
      </div>
      <div class="inputgroup">
        <label for="jira-password">Password</label>
        <input name="jirapassword" type="password" id="jira-password" autocomplete="off" v-model="jira.password" />
      </div>
      <p v-if="jira.auth">Authorization key present</p>
      <button v-on:click="savejira">Save</button>
      <button v-on:click="testjira">Test connection</button>
    </fieldset>
  </div>
</template>

<script>
import JiraService from '../services/jira';

export default {
  name: 'settings',
  computed: {
    jira: {
      get() {
        return this.$store.state.settings.jiraSettings;
      },
    },
  },
  methods: {
    savejira() {
      this.$store.dispatch('savejira', this.jira);
    },
    testjira() {
      // TODO: make a dummy test call to check if auth is working
      JiraService.testConnection();
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .settings {
    text-align: left;
    padding: 1rem;
  }

  .inputgroup {
    margin-bottom: 0.5rem;
  }

  label {
    width: 10rem;
    display: inline-block;
  }

  input {
    border-radius: 3px;
    padding: 0.3rem 0.5rem;
    border: 1px solid $gray-light;
  }
</style>

