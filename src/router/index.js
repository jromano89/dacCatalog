/* eslint-disable comma-dangle */
import Vue from 'vue';
import Router from 'vue-router';
import SearchPage from '@/components/SearchPage';

Vue.use(Router);

export default new Router({
  base: process.env.ROUTER_BASE,
  mode: 'history',
  routes: [{
    path: '/',
    name: 'SearchPage',
    component: SearchPage
  }]
});
