import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Product from '../views/Products.vue';
import News from '../views/News.vue';
import About from '../views/About.vue';
import Login from '../views/Login.vue';
import User from '../views/User.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/news', name: 'news', component: News },
  { path: '/about', name: 'about', component: About },
  { path: '/products', name: 'product',component: Product },
  { path: '/login', name: 'login', component: Login },
  { path: '/user', name: 'user', component: User, meta: { requireAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { 
    return { 
      top: 0, 
      behavior: 'smooth' 
    };
  },
}); 

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    const token = localStorage.getItem('token');

    if (token) {
      return next();
    }
    
    return next('/login');
  }
  next();
})

export default router;