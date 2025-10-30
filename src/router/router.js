import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue';
import Product from '../views/Products.vue';
import News from '../views/News.vue';
import About from '../views/About.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/news',
    name: 'news',
    component: News
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/products',
    name: 'product',
    component: Product
  } 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;