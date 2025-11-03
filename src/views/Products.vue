<template>
  <div class="container mb-5"> 
    <div class="d-flex align-items-center">
      <h1 class="heading">NEW-INS</h1>
      <button class="btn btn-filter border-black px-4 rounded-0 ms-auto"><i class="bi bi-funnel"></i> Filter</button>
    </div>
    <hr class="container text-black-50"></hr>

    
    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>


    <div class="row row-cols-2 row-cols-md-2 row-cols-lg-4">
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
        <li :class="{'disable': pager.currentPage === 1}" class="page-item previous-item">
          <router-link :to="{ query: { page: pager.currentPage - 1 }}" class="page-link">Previous</router-link>
        </li>
        <li 
          v-for="page in pager.pages"
          :key="page"
          :class="{'active': pager.currentPage === page}"
          class="page-item number-item">
          <router-link :to="{ query: { page: page }}" class="page-link">{{ page }}</router-link>
        </li>
        <li :class="{'disabled': pager.currentPage === pager.totalPages }" class="page-item next-item">
          <router-link :to="{ query: { page: pager.currentPage + 1 }}" class="page-link">Next</router-link>
        </li> 
      </ul>
    </div>
  </div>
</template>



<script setup>
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  const API = "http://127.0.0.1:8000";
  const route = useRoute();
  const pager = ref({});
  const pageOfProducts = ref([]);
  const isLoading = ref(false);
  const error = ref('');

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
</style>