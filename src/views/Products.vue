<template>
  <div class="container mb-5"> 
    <div class="d-flex align-items-center">
      <h1 class="heading">NEW-INS <span class="h6 text-muted">[{{ filteredProducts.length }}]</span></h1>
      <button 
        @click="toggleSidebar" 
        class="btn btn-filter border-black px-4 rounded-0 ms-auto"
        ><i class="bi bi-funnel"></i> Filter
      </button>
    </div>
    <hr class="container text-black-50"></hr>

    
    <!-- Loading State -->
    <div v-if="productStore.isLoadingDataset" class="text-center py-5">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>


    <!-- Main Products Content -->
    <div class="row row-cols-2 row-cols-lg-3 row-cols-xl-4">
      <div
        v-for="product in paginatedProducts"
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

    <div class="page-number d-flex justify-content-center px-3 mt-5">
      <ul v-if="totalPages > 1" class="pagination"> 
        <li :class="{'disabled': currentPage === 1}" class="page-item previous-item">
          <a
            @click="goToPage(currentPage - 1)"
            class="page-link me-3"
            style="clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%); padding-left: 22px;"
            >Previous
          </a>
        </li> 
        <p class="my-auto px-3" style="letter-spacing: 1.5px;">Page {{ currentPage }} of {{ totalPages }}</p> 
        <li :class="{'disabled': currentPage === totalPages }" class="page-item next-item">
          <a
            @click="goToPage(currentPage + 1)"
            class="page-link ms-3" 
            style="clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 100%, 0 100%); padding-right: 22px;"
            >Next
          </a>
        </li> 
      </ul>
    </div>


    <!-- Side Bar Filter -->  
    <div 
      v-if="isSidebarOpen" 
      class="sidebar-overlay"
      @click="closeSidebar"
    ></div>
 
    <div :class="['sidebar', { 'sidebar-open': isSidebarOpen }]">
      <div class="sidebar-header">
        <h5 class="pt-2">Filter & Search</h5>
        <div class="d-flex align-items-center">
          <p 
            type="button" 
            class="remove my-auto"   
            @click="resetFilter"
          >Remove all</p>
          <button 
            type="button" 
            class="btn-close ms-3 pe-0" 
            @click="closeSidebar"
            aria-label="Close"
          ></button> 
        </div>
      </div>
      
      <div class="sidebar-body">
        <div class="py-4 px-3 w-100" style="max-width: 500px;">
          <div class="input-group">
            <input 
              type="text" 
              class="search" 
              placeholder="Search by name..." 
              aria-label="Search" 
              aria-describedby="search-addon"
              v-model="search"
              @input="resetPage">
            <button class="delete-ic me-1 btn-outline-secondary ms-auto" @click="deleteSearch" type="button" id="search-addon">
              <i class="bi bi-x-circle"></i>
            </button>
          </div>
        </div>  
 
        <!-- Filter accordion -->
        <FilterAccordion
          v-model:priceRange="priceRange"
          v-model:gender="gender"
          v-model:type="type"
          v-model:category="category"
          v-model:brand="brand"
          @resetPage="resetPage"
        /> 
      </div>
    </div> 
  </div>
</template>



<script setup>
  import { ref, onMounted, watch, onBeforeUnmount, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router'; 
  import { useProductStore } from '../stores/products';  
  import FilterAccordion from '../components/FilterAccordion.vue';

  const route = useRoute();
  const router = useRouter();
  const productStore = useProductStore();
  const isSidebarOpen = ref(false); 
  const search = ref(route.query.search || '');
  const gender = ref(route.query.gender || 'all');
  const type = ref(route.query.type || 'all');
  const category = ref(route.query.category || 'all');
  const brand = ref(route.query.brand || 'all');
  const currentPage = ref(Number(route.query.page) || 1);
  const priceRange = ref(route.query.priceRange || [0, 1000]);
  const pageSize = 48;


  onMounted(() => {
    if (route.query.gender) {
      gender.value = route.query.gender;
    };

    if (route.query.type) {
      type.value = route.query.type;
    };

    if (!productStore.products.length) {
      productStore.fetchProducts();
    };
  }); 

  const filteredProducts = computed(() => { 
    return productStore.products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.value.toLowerCase());
      const matchPriceRange = (priceRange.value[0] === 0 && priceRange.value[1] === 1000) 
        || (p.price >= priceRange.value[0] && p.price <= priceRange.value[1]);
      const matchGender = gender.value === 'all' || p.gender === gender.value;
      const matchType = type.value === 'all' || p.type === type.value;
      const matchCategory = category.value === 'all' || p.category === category.value;
      const matchBrand = brand.value === 'all' || p.brand === brand.value;
      return matchSearch && matchPriceRange && matchGender && matchType && matchCategory && matchBrand;
    });
  });

  const totalPages = computed(() => Math.ceil(filteredProducts.value.length / pageSize));
  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return filteredProducts.value.slice(start, start + pageSize);
  });

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) currentPage.value = page;
  }; 

  watch([search, priceRange, gender, type, category, brand, currentPage], () => {
    router.replace({
      query: {
        search: search.value || undefined,
        priceRange: (priceRange.value[0] !== 0 || priceRange.value[1] !== 1000) ? priceRange.value : undefined,
        gender: gender.value !== 'all' ? gender.value : undefined,
        type: type.value !== 'all' ? type.value : undefined,
        category: category.value !== 'all' ? category.value : undefined,
        brand: brand.value !== 'all' ? brand.value : undefined,
        page: currentPage.value !== 1 ? currentPage.value : undefined
      }
    });
  });

  watch(() => route.query, (newQuery) => {
    if (newQuery.gender) gender.value = newQuery.gender;
    if (newQuery.type) type.value = newQuery.type; 
  });

  onBeforeUnmount(() => {
    document.body.style.overflow = '';
  }); 

  const deleteSearch = () => search.value = '';
  const resetPage = () => currentPage.value = 1;
  const resetFilter = () => {
    priceRange.value = [0, 1000];
    gender.value = 'all';
    category.value = 'all';
    type.value = 'all';
    brand.value = 'all';
    search.value = '';
    resetPage();
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
</script>



<style scoped> 
  .heading {
    font-size: 35px;
    font-weight: bolder; 
    color: #000; 
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

  .remove:hover {
    text-decoration: underline;
    text-decoration-thickness: 1.5px; 
    text-underline-offset: 3px; 
  } 

  .sidebar-body .input-group { 
    border: none;
    border-bottom: 1px solid #cacaca;
    overflow: hidden; 
  }

  .sidebar-body .search {
    outline: none;
    border: none; 
    width: 90%;
  }

  .sidebar-body .delete-ic {
    border: none;
    border-radius: 0;
    padding: 10px 0px;
    background-color: transparent;
  }
</style>