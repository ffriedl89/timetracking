import Vue from 'vue';
import Router from 'vue-router';
import AppMain from '@/components/AppMain';
import AppHeader from '@/components/AppHeader';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppMain',
      components: {
        default: AppMain,
        header: AppHeader,
      },
    },
  ],
});
