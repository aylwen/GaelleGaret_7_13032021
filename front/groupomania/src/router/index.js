import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/post/:id',
    name: 'postSingle',
    component: () => import('../views/PostSingle.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/me',
    name: 'me',
    component: () => import('../views/User.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/', '/login', '/signup', '/about'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.state.account.status.loggedIn;

  if (authRequired && !loggedIn) {
    store.dispatch('alert/error', "Vous n'êtes pas autorisé à consulter cette page ! Loggez-vous !", { root: true });
    return next('/login');
  }

  next();
})

export default router;