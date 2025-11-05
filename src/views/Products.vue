<template>
  <div class="container mb-5"> 
    <div class="d-flex align-items-center">
      <h1 class="heading">NEW-INS</h1>
      <button 
        @click="toggleSidebar" 
        class="btn btn-filter border-black px-4 rounded-0 ms-auto"
        ><i class="bi bi-funnel"></i> Filter
      </button>
    </div>
    <hr class="container text-black-50"></hr>

    
    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>


    <!-- Main Products Content -->
    <div class="row row-cols-2 row-cols-lg-3 row-cols-xl-4">
      <div
        v-for="product in pageOfProducts"
        :key="product.product_id"
        class="col mb-1 g-3"
      >
        <div class="card shadow-md rounded-0">
          <img
            class="card-img-top rounded-0"
            :src="product.image_url"
            alt="Product image"
            style="height: 400px; width: 100%; object-fit: contain; object-position: center; background-color: #eeeff0;"
          />
          <div class="card-body ps-0 pe-0"> 
            <p class="h6" style="margin-bottom: 2px;">{{ product.name }}</p>
            <p class="h6 mb-2 text-secondary">{{ product.brand }}</p>
            <p class="">${{ product.price }}</p> 
          </div>
        </div>
      </div> 
    </div> 

    <div class="page-number d-flex justify-content-center px-3 pt-3">
      <ul v-if="pager.pages && pager.pages.length" class="pagination"> 
        <li :class="{'disabled': pager.currentPage === 1}" class="page-item previous-item">
          <router-link 
            :to="{ query: { page: pager.currentPage - 1 }}" 
            class="page-link me-3"
            style="clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%); padding-left: 22px;"
            >Previous
          </router-link>
        </li>
        <li 
          v-for="page in pager.pages"
          :key="page"
          :class="{'active': pager.currentPage === page}"
          class="page-item number-item">
          <router-link :to="{ query: { page: page }}" class="page-link">{{ page }}</router-link>
        </li>
        <li :class="{'disabled': pager.currentPage === pager.totalPages }" class="page-item next-item">
          <router-link 
            :to="{ query: { page: pager.currentPage + 1 }}" 
            class="page-link ms-3" 
            style="clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 100%, 0 100%); padding-right: 22px;"
            >Next
          </router-link>
        </li> 
      </ul>
    </div>


    <!-- Side Bar Filter -->  
    <div 
      v-if="isSidebarOpen" 
      class="sidebar-overlay"
      @click="closeSidebar"
    ></div>
 
    <div :class="['sidebar', { 'sidebar-open': isSidebarOpen }]" class="container">
      <div class="sidebar-header">
        <h5 class="pt-2">Filter & Search</h5>
        <div class="d-flex align-items-center">
          <p 
            type="button" 
            class="remove my-auto"   
          >Remove all</p>
          <button 
            type="button" 
            class="btn-close ms-3" 
            @click="closeSidebar"
            aria-label="Close"
          ></button> 
        </div>
      </div>
      
      <div class="sidebar-body">
        <div class="pt-2 pb-2 mx-auto w-100" style="max-width: 500px;">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search..." aria-label="Search" aria-describedby="search-addon">
            <button class="btn btn-outline-secondary" type="button" id="search-addon">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div> 


      </div>
    </div> 
  </div>
</template>



<script setup>
  import { ref, watch, onBeforeUnmount } from 'vue';
  import { useRoute } from 'vue-router';

  const API = "http://127.0.0.1:8000";
  const route = useRoute();
  const pager = ref({});
  const pageOfProducts = ref([]);
  const isLoading = ref(false);
  const error = ref('');
  const isSidebarOpen = ref(false);

  const fetchItems = async (page) => {
    isLoading.value = true; 

    try {
      const res = await fetch(`${API}/products?page=${page}`);
      const { pager: newPager, pageOfProducts: newPageProducts } = await res.json();

      if (newPager && newPageProducts) {
        pager.value = newPager;
        pageOfProducts.value = newPageProducts; 
      } else {
        error.value = data.message;
        alert(data.message);
      }
    } catch (e) {
      console.error('Error fetching products:', e);
      error.value = 'Failed to fetch products information';
      alert('Failed to fetch products information');
    } finally {
      isLoading.value = false;
    }
  };


  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
    if (isSidebarOpen.value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeSidebar = () => {
    isSidebarOpen.value = false;
    document.body.style.overflow = '';
  };

  onBeforeUnmount(() => {
    document.body.style.overflow = '';
  });


  // Watch for route query changes
  watch(() => route.query.page,
    async (page) => {
      const currentPage = parseInt(page) || 1
      if (currentPage !== pager.value.currentPage) {
        await fetchItems(currentPage);
      }
    },
    { immediate: true }
  );
</script>



<style scoped>
  .heading {
    font-size: 40px;
    font-weight: bolder;
    line-height: 1.1;
    color: #000;
    margin-bottom: 20px;
  }

  .card {
    border: 1px solid transparent;
    background-color: transparent;
    cursor: pointer;
  } 

  .btn-filter:hover {
    background-color: black;
    color: white;
  }

  .remove:hover {
    text-decoration: underline;
    text-decoration-thickness: 1.5px; 
    text-underline-offset: 3px; 
  }



  .previous-item .page-link, 
  .next-item .page-link,
  .previous-item .page-link:hover, 
  .next-item .page-link:hover {
    background-color: transparent !important; 
    border-radius: 0px !important;
    color: white; 
    background-color: #000000 !important;
    text-decoration: none;
  }
  
  .page-link {
    background-color: transparent !important; 
    border: none;
    color: black;
  }

  .disabled .page-link, .disabled .page-link:hover { 
    background-color: #dadada !important; 
    border: none;
    color: #555555;

  }

  .page-link:hover { 
    text-decoration: underline;
    text-decoration-thickness: 1.5px; 
    text-underline-offset: 3px;
    border: none;
    color: black;
  }

  .page-number .active, .page-number .active .page-link:hover {
    text-decoration: none;
    color: white;
    background-color: #b80000;
  }

  .sidebar {
    position: fixed;
    top: 0;
    right: -450px;  
    width: 450px;
    height: 100vh;
    background-color: white;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease-in-out;
    z-index: 1050;
    overflow-y: auto;
  }

  .sidebar-open {
    right: 0;  
  }

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #dee2e6;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 10;
  }

  .sidebar-body {
    padding: 1rem;
  }
 
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1040;
    transition: opacity 0.3s ease-in-out;
  } 

  .sidebar-body .input-group {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .sidebar-body .form-control {
    border: none;
    padding-left: 20px;
  }

  .sidebar-body .btn {
    border: none;
    border-radius: 0;
    padding: 10px 20px;
  }
</style>