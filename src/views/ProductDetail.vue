<template>
  <div class="container mb-5">
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <router-link class="breadcrumb-item text-decoration-none" to="/">Home</router-link>
        <router-link class="breadcrumb-item text-decoration-none" to="/products">Products</router-link>
        <li class="breadcrumb-item active">{{ product?.name }}</li>
      </ol>
    </nav>

    <!-- Loading State -->
    <div v-if="productStore.isProcessing" class="text-center py-5">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="!product" class="text-center py-5 text-muted">
      <p>Product not found.</p>
    </div>


    <!-- Product Detail Section -->
    <div v-else-if="product">    
      <ProductInfo v-model="product" :productId="productId" />
      
      <hr class="container text-black-50 mb-5"></hr>

      <ProductReview :productId="productId" />
    </div> 
  </div>
</template>



<script setup>
  import { ref, onMounted, defineAsyncComponent } from 'vue';
  import { useRoute } from 'vue-router';
  import { useProductStore } from '../stores/products'; 

  // Lazy components
  const ProductInfo = defineAsyncComponent(() => import('../components/ProductInfo.vue'));
  const ProductReview = defineAsyncComponent(() => import('../components/ProductReview.vue'));

  const route = useRoute();
  const productStore = useProductStore();
  const productId = route.params.id; 
  const product = ref(null);


  onMounted(async () => {  
    product.value = productStore.products.find(p => p.product_id === productId);

    if (!product.value) {
      await productStore.fetchSingleProduct(productId);
      product.value = productStore.productValue; 
    }
  });
</script>