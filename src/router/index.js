import Vue from 'vue';
import Router from 'vue-router';
import AppMain from '@/components/AppMain';
import AppHeader from '@/components/AppHeader';
import AppLogin from '@/components/AppLogin';
import Settings from '@/components/Settings';
import FirebaseService from '@/services/firebase';

Vue.use(Router);

const checkloggedin = (to, from, next) => {
  if (!FirebaseService.userKey) {
    FirebaseService.setNextRoute(to);
    next('/login');
    return;
  }
  next();
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppMain',
      components: {
        default: AppMain,
        header: AppHeader,
      },
      beforeEnter: checkloggedin,
    },
    {
      path: '/settings',
      name: 'Settings',
      components: {
        header: AppHeader,
        default: Settings,
      },
      beforeEnter: checkloggedin,
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        header: AppLogin,
      },
    },
  ],
});
