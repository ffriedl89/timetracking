// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import vueMoment from 'vue-moment';
import App from './App';
import Btn from './components/atoms/btn/Btn';
import router from './router';

Vue.config.productionTip = false;
Vue.use(vueMoment);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App,
    Btn,
  },
});
