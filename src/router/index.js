import Vue from 'vue';
import Router from 'vue-router';
import AppMain from '@/components/AppMain';
import AppHeader from '@/components/AppHeader';
import Login from '@/components/atoms/login/Login';
import store from '../store';

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
      beforeEnter: (to, from, next) => {
        if (store.getters.user) {
          next();
        } else {
          next('/login');
        }
      },
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        default: Login,
      },
    },
  ],
});
