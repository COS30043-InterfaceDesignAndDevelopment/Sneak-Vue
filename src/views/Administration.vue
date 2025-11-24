<template>
  <div class="container mb-5 mt-5">
    <div v-if="authStore.isAuthorised"> 
      <div class="row">
        <!-- Main Content -->
        <div class="col-12">
          <div class="pt-2 pb-2 mb-3 border-bottom">
            <h3 class="text-center mb-4" style="letter-spacing: 2px;">PRODUCT MANAGEMENT</h3> 
            <!-- Loading State -->
            <div v-if="productStore.isLoadingDataset" class="px-2 mb-3 fw-normal text-center">
              <span class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </span>
            </div>
          </div>

          <!-- Search and Add Product Button -->
          <div class="row mb-3">
            <div class="col-7 col-md-8">
              <div class="input-group"> 
                <input type="text" class="form-control border-0 rounded-0 py-2" placeholder="Search products by name, brand, or category..." v-model="search" @input="resetPages">
              </div>
            </div>
            <div class="col-5 col-md-4 text-end">
              <button class="btn btn-add-products rounded-0 py-2" @click="resetFields" data-bs-toggle="modal" data-bs-target="#createModal">
                <i class="bi bi-plus-circle me-2"></i>Add New Product
              </button>
            </div>
          </div>

          <!-- Products Table -->
          <div class="card p-3 border-0 rounded-0">
            <div class="card-body">
              <h5 class="card-title mb-4">Product List</h5>
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Brand</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      v-for="(product, index) in paginatedProducts"
                      :key="index"
                      >
                      <td class="align-middle">
                        <img 
                          :src=product.image_url 
                          class="product-image rounded" 
                          alt="Product">
                      </td>
                      <td class="align-middle">{{ product.name }}</td>
                      <td class="align-middle">{{ product.type }}</td>
                      <td class="align-middle">{{ product.brand }}</td>
                      <td class="align-middle">{{ product.category }}</td>
                      <td class="align-middle">{{ product.price }}</td>
                      <td class="align-middle">{{ product.quantity }}</td>
                      <td class="align-middle">
                        <button class="btn btn-sm me-1" data-bs-toggle="modal" data-bs-target="#updateModal" @click="updateProductValue(product)">
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal" @click="setProductId(product.product_id)">
                          <i class="bi bi-trash text-danger"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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

        </div>
      </div> 

      <!-- Create Product Modal -->
      <ProductInsert v-model="newProduct" />

      <!-- Update Product Modal -->
      <ProductUpdate v-model="productDetails" />

      <!-- Delete Confirmation Modal -->
      <ProductDelete :productId="productId" />
    </div>
    <div v-else class="d-flex align-items-center alert alert-danger rounded-0 fw-bold" role="alert">  
      You don't have permission to perform this!!  
    </div>
  </div>
</template>



<script setup>
  import { ref, onMounted, computed, watch, defineAsyncComponent } from 'vue'; 
  import { useAuthStore } from '../stores/auth';  
  import { useProductStore } from '../stores/products';  
  import { useRouter, useRoute } from 'vue-router'; 

  // Lazy components
  const ProductInsert = defineAsyncComponent(() => import('../components/ProductInsert.vue'));
  const ProductUpdate = defineAsyncComponent(() => import('../components/ProductUpdate.vue'));
  const ProductDelete = defineAsyncComponent(() => import('../components/ProductDelete.vue'));

  const authStore = useAuthStore();
  const productStore = useProductStore(); 
  const route = useRoute();
  const router = useRouter(); 
  const search = ref(route.query.search || ''); 
  const currentPage = ref(1);
  const pageSize = 20;
  const productDetails = ref([]);
  const productId = ref();
  const newProduct = ref({
    name: '', type: '', brand: '', description: '', 
    price: 0, gender: '', category: '', quantity: 0, 
    image_url: ''
  });


  onMounted(() => {  
    if (!productStore.products.length) {
      productStore.fetchProducts();
    };
  });
  
  const resetFields = () => {
    newProduct.value = {
      name: '', type: '', brand: '', description: '', 
      price: 0, gender: '', category: '', quantity: 0, 
      image_url: ''
    };
  };

  const totalPages = computed(() => Math.ceil(filteredProducts.value.length / pageSize))
  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return filteredProducts.value.slice(start, start + pageSize);
  });

  watch([search, currentPage], () => {
    router.replace({
      query: {
        search: search.value || undefined,
        page: currentPage.value !== 1 ? currentPage.value : undefined
      }
    });
  });

  const filteredProducts = computed(() => { 
    return productStore.products.filter(p => {
      const q = search.value.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.price.toString().includes(q) ||
        p.gender.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  });

  const resetPages = () => currentPage.value = 1;
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) currentPage.value = page;
  }; 

  const setProductId = (id) => productId.value = id;
  const updateProductValue = (product) => productDetails.value = product; 
</script>



<style scoped>       
  .product-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
  } 
 
  .btn-add-products {
    background-color: #b11414;
    color: white;
    border: 1px solid transparent;
  }

  .btn-add-products:hover {
    background-color: white;
    color: #b11414;
    border: 1px solid #b11414;
  }
</style>