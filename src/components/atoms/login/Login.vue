<template>
  <div>
    <div v-if="loggedIn" class="loggedinMenu">
      <img :src="avatar" class="avatar" />
      <div class="hovermenu">
        <div class="hovermenu__group">
          <a v-on:click="logout">Logout</a>
        </div>
      </div>
    </div>
    <button v-else v-on:click="login">Login</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Service from '../../../service';

export default {
  computed: {
    ...mapGetters([
      'user',
    ]),
    loggedIn() {
      return this.user !== undefined;
    },
    username() {
      return this.loggedIn ? this.user.displayName : '';
    },
    avatar() {
      return this.user && this.user.photoURL ? this.user.photoURL : '';
    },
  },
  methods: {
    login() {
      Service.login();
    },
    logout() {
      Service.logout();
    },
  },
};

</script>

<style scoped>
  .avatar {
    width: 2.5rem;
    margin: 0.5rem;
    border-radius: 50%;
  }

  .loggedinMenu {
    position: relative;
  }

  .hovermenu {
    position: absolute;
    right: 0;
    top: 0;
    padding-top: 3.5rem;
    min-width: 3rem;
  }

  .hovermenu__group {
    background-color: #333;
    color: #fff;
    visibility: hidden;
    opacity: 0;
    transform: translateY(-25%);
    transition: opacity 150ms ease-out, transform 200ms ease-out;
    position: absolute;
    top: -999px;
    right: 0;
  }

  .hovermenu:hover .hovermenu__group {
    top: auto;
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }

  .hovermenu a {
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 275ms ease-out;
  }

  .hovermenu a:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
</style>

