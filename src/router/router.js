import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue';
import Product from '../views/Products.vue';
import News from '../views/News.vue';
import About from '../views/About.vue';
import Login from "../views/Login.vue";

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/news', name: 'news', component: News },
  { path: '/about', name: 'about', component: About },
  { path: '/products', name: 'product',component: Product },
  { path: '/login', name: 'login', component: Login, meta: { hideComponents: true }}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  // Check user information in localStorage
  const loggedIn = localStorage.getItem('user');  
  if (to.meta.requiresAuth && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;