import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import List from '@/views/List.vue'
import Details from '@/views/Details.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/list',
    name: 'list',
    component: List
  },
  {
    path: '/details/:id',
    name: 'details',
    component: Details
  },
  { path: "/:catchAll(.*)", redirect: "/list" }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router
