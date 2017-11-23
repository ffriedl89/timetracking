<template>
  <div class="settings">
    <h1>Settings</h1>

    <fieldset>
      <legend>Jira</legend>
      <div>
        <label for="jira-url">Endpoint</label>
        <input name="jiraurl" type="text" id="jira-url" autocomplete="off" v-model="jira.url" />
      </div>
      <div>
        <label for="jira-user">User</label>
        <input name="jirauser" type="text" id="jira-user" autocomplete="off" v-model="jira.user" />
      </div>
      <div>
        <label for="jira-password">Password</label>
        <input name="jirapassword" type="password" id="jira-password" autocomplete="off" v-model="jira.password" />
      </div>
      <button v-on:click="savejira">Save</button>
      <button v-on:click="testjira">Test connection</button>
    </fieldset>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'settings',
  data() {
    return {
      jira: {
        user: '',
        url: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapGetters([
      'jiraSettings',
    ]),
  },
  methods: {
    savejira() {
      // TODO: convert jira username and password to auth token
      // TODO: save token and data to store
    },
    testjira() {
      // TODO: make a dummy test call to check if auth is working
    },
  },
};
</script>

<style lang="scss" scoped>
  .settings {
    text-align: left;
    padding: 1rem;
  }
</style>

