import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import ExerciseLog from '../views/ExerciseLog.vue';
import Planner from '../views/Planner.vue';
import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue';
import Admin from '../views/Admin.vue';
import AdminLogin from '../views/AdminLogin';
import { CurrentUser } from '../models/Users';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/exerciselog',
    name: 'ExerciseLog',
    component: ExerciseLog,
    meta: {needsAuth: true},
  },
  {
    path: '/planner',
    name: 'Planner',
    component: Planner,
    meta: {needsAuth: true},
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {needsAuth: true},
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      if(!CurrentUser) next({name: 'AdminLogin'});
      else if(CurrentUser.Email != 'admin@soundjog.com') next({name: 'Profile'});
      else next();
    }
  },
  {
    path: '/adminlogin',
    name: 'AdminLogin',
    component: AdminLogin,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});



router.beforeEach((to, from, next) => {
  if(to.meta.needsAuth && !CurrentUser) next({name: 'Login'});
  else next();
});

export default router
