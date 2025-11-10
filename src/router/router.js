import { createRouter, createWebHistory } from 'vue-router'; 

const routes = [
  { 
    path: '/', 
    name: 'home', 
    component: () => import('../views/Home.vue') 
  },
  { 
    path: '/news', 
    name: 'news', 
    component: () => import('../views/News.vue') 
  },
  { 
    path: '/about', 
    name: 'about', 
    component: () => import('../views/About.vue') 
  },
  { 
    path: '/products', 
    name: 'product',
    component: () => import('../views/Products.vue')
  },  
  { 
    path: '/products/:id',    
    name: 'product-detail',
    component: () => import('../views/ProductDetail.vue'),
    props: true            
  },
  { 
    path: '/favorites', 
    name: 'favorites', 
    component: () => import('../views/Favorites.vue'),
    meta: { requireAuth: true } 
  },
  { 
    path: '/cart', 
    name: 'cart', 
    component: () => import('../views/Cart.vue'),
    meta: { requireAuth: true } 
  },
  { 
    path: '/login', 
    name: 'login', 
    component: () => import('../views/Login.vue') 
  },
  { 
    path: '/user', 
    name: 'user', 
    component: () => import('../views/User.vue'), 
    meta: { requireAuth: true } 
  },
  { 
    path: '/admin', 
    name: 'admin', 
    component: () => import('../views/Administration.vue'), 
    meta: { requireAuth: true } 
  },
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