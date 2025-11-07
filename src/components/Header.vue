<template>
  <nav :class="['navbar', { 'navbar-hidden': !showNavbar }]" class="navbar-expand-lg navbar-light mb-5">
    <div class="container p-1 position-relative">
      <div class="d-flex w-100 align-items-center">
        <!-- Toggler -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button> 

        <!-- Logo -->
        <a class="navbar-brand logo-position text-center" href="/">
          <img src="/sneakvue-logo.png" alt="" width="30" height="25" class="logo d-inline-block align-text-center">
          <div class="text-logo ms-2" style="font-family: 'Amarante', serif;">Sneak<span class="text-danger">Vue</span></div>
        </a>

        <!-- Login buttons -->
        <div class="d-flex ms-auto">
          <router-link class="nav-link" :to="authenticatedPath"><i class="bi bi-person" style="font-size: 1.75rem;"></i></router-link> 
        </div>
      </div>

      <!-- Menu (collapses on mobile) -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto gap-2">
          <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li> 
          <li class="nav-item"><router-link class="nav-link" to="/news">News</router-link></li> 
          <li class="nav-item"><router-link class="nav-link" to="/about">About</router-link></li> 
          <li class="nav-item dropdown">
            <router-link class="nav-link" to="/products" id="navbarDropdown" type="button" :data-bs-toggle="dropdownToggle" aria-expanded="false">
              Products
            </router-link>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <div class="container">
                <div class="row text-start">
                  <!-- One column per gender -->
                  <div
                    v-for="(gender, index) in dataGender"
                    :key="index"
                    class="col-md-2 mb-3"
                  >
                    <h6 class="fw-bold text-danger pb-1 mb-2" style="text-transform: uppercase; letter-spacing: 2px;">
                      {{ gender }}
                    </h6>

                    <div class="nav-item text-dark py-1">                      
                      <router-link class="fw-normal" :to="{ path: '/products', query: { gender: gender, type: 'all'}}">All categories</router-link>
                    </div>

                    <div
                      v-for="(type, i) in typeFilter(gender)"
                      :key="i"
                      class="nav-item text-dark py-1"
                    >
                      <router-link class="fw-normal" :to="{ path: '/products', query: { gender: gender, type: type }}">{{ type }}</router-link>
                    </div>
                  </div>
                  <div class="col-md-6 d-flex justify-content-end">
                    <router-link
                      class="card promo-card text-center border-0 shadow rounded-0 p-4 pt-2"
                      role="img"
                      aria-label="Promotional image card" 
                      to="/products"
                    >
                      <div class="card-body p-0 pt-3 d-flex align-items-end justify-content-center">
                        <div class="card-text fw-normal">NEW-IN <i class="bi bi-arrow-right"></i></div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template> 



<script setup>
  import { ref, onMounted, onUnmounted, onBeforeUnmount, computed } from 'vue';
  import mockData from '../assets/data/mock-sneaker-data.json';
  import { useAuthStore } from '../stores/auth';
 
  const data = ref([]);
  const authStore = useAuthStore();
  const dataGender = ref(['Men', 'Women', 'Unisex']);
  const showNavbar = ref(true);
  const lastScrollPosition = ref(0); 
  const width = ref(window.innerWidth);


  onMounted(() => {
    data.value = mockData.map(d => d);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  })

  const authenticatedPath = computed(() => authStore.isAuthenticated ? '/user' : '/login');
  const isMobile = computed(() => width.value < 992);
  const dropdownToggle = computed(() => (isMobile.value ? 'dropdown' : ''));

  const handleResize = () => width.value = window.innerWidth;  
  const typeFilter = (gender) => {
    const filteredType = [...new Set(data.value.filter(d => d.gender === gender).map(d => d.type).toSorted())];
    const index = filteredType.indexOf("Sneakers"); 

    // Move the "Sneakers" to top
    if (index > -1) { 
      filteredType.splice(index, 1); 
      filteredType.unshift("Sneakers"); 
    }
    
    return filteredType;
  }

  const handleScroll = () => {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (Math.abs(currentScrollPosition - lastScrollPosition.value) < 50) {
      return;
    }

    showNavbar.value = currentScrollPosition < lastScrollPosition.value || currentScrollPosition === 0;
    lastScrollPosition.value = currentScrollPosition;
  }
</script>
 


<style scoped>
  nav a.router-link-active {
    color: #000000;
    font-weight: bold;
    text-decoration: none;
  }

  nav, .dropdown-menu {
    background: linear-gradient(60deg, #f3f6fc 0%, #f5e9e9 100%);
    z-index: 10 !important;
  }

  .nav-link {
    color: #000000; 
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  } 

  .logo-position {
    margin-left: auto; 
  }

  .dropdown-menu a {
    color: #000;
    text-decoration: none;
  }

  .dropdown-menu a:hover { 
    text-decoration: underline; 
  }


  /* Mobile */
  @media (max-width: 991px) {
    .d-flex.w-100 {
      display: flex !important;
    } 
    nav, .dropdown-menu {
      padding-inline: 8px;
    }
  }

  /* Large screens */
  @media (min-width: 992px) {
    .d-flex.w-100 {display: contents !important;}
    .navbar-toggler {order: 1;}
    .navbar-brand {order: 2;}
    .navbar-collapse {order: 2;}
    .d-flex.ms-auto {
      order: 3;
      margin-left: auto !important;
    }

    .navbar-hidden {
      transform: translateY(-500%); 
    }
    
    nav {
      border-bottom: 1px solid #0000004d;
      padding-top: 1.7rem;
      padding-bottom: 1.7rem;
      position: sticky;
      top: 0; 
    }

    .logo {
      margin-top: 10px;
      scale: 1.4;
    }

    .logo-position {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    .text-logo {
      font-size: 1.5rem;
      font-family: 'Roboto';
      margin-top: 7px;
      letter-spacing: 2px;
    }

    .nav-item:hover {
      cursor: pointer;
      text-decoration: underline;
      text-decoration-thickness: 1.5px;
      text-underline-offset: 5px;
      color: #9b9b9b;
    }

    .dropdown-menu {
      position: fixed !important;
      left: 0 !important;
      right: 0 !important;
      width: 100% !important;
      transform: none !important;
      border-radius: 0;
      border: none;
      border-bottom: 1px solid #0000004d;
      display: block !important; 
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s ease;
      margin-top: 20px;
    }

    .dropdown-menu::before {
      content: '';
      position: absolute;
      top: -20px; 
      left: 0;
      right: 0;
      height: 20px; 
    }

    .dropdown:hover > .dropdown-menu {
      opacity: 1;
      pointer-events: auto;
    }

    .promo-card {
      position: relative;
      overflow: hidden;
      width: 18rem;           
      height: 230px;         
      flex-shrink: 0;        
      background-image: url('../assets/images/yeezy-adidas.jpg');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      background-color: #000000; 
      transition: all 0.4s ease;
      text-decoration: none;
    }

    .promo-card::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background: linear-gradient(
        130deg,
        transparent 0% 33%,
        #cce4ffab 66%,
        #990000 83.5%,
        #ca775e 100%
      );
      background-size: 250% 200%;
      background-position: 0% 0%;
      opacity: 0; 
      transition: background-position 350ms ease, opacity 350ms ease;
    }

    .promo-card:hover::before {
      background-position: 100% 100%;
      opacity: 0.85;
    }

    .promo-card .card-text { 
      color: #b8b8b8 !important; 
      position: relative;
      letter-spacing: 1px;
      z-index: 2;
      transition: all 0.2s; 
    }

    .promo-card:hover .card-text {
      color: #fff !important;
      letter-spacing: 2px;
      font-weight: bolder !important; 
      font-size: 1.2rem;
    }
  }
</style>