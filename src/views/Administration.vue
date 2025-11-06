<template>
  <div class="container mb-5">
    <div v-if="auth.isAuthorised"> 
      <div class="row">
        <!-- Main Content -->
        <div class="col-12">
          <div class="pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Product Management</h1>
          </div>

          <!-- Search and Add Product Button -->
          <div class="row mb-3">
            <div class="col-7 col-md-8">
              <div class="input-group"> 
                <input type="text" class="form-control border-0 rounded-0 py-2" placeholder="Search products by name, brand, or category...">
              </div>
            </div>
            <div class="col-5 col-md-4 text-end">
              <button class="btn btn-add-products rounded-0 py-2" data-bs-toggle="modal" data-bs-target="#createModal">
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
                      v-for="(product, index) in products"
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
                        <button class="btn btn-sm me-1" data-bs-toggle="modal" data-bs-target="#editModal">
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal">
                          <i class="bi bi-trash text-danger"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div> 

      <!-- Create Product Modal -->
      <div class="modal fade" id="createModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add New Product</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Product Name</label>
                    <input type="text" class="form-control" placeholder="Enter product name">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Type</label>
                    <input type="text" class="form-control" placeholder="Enter type">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Brand</label>
                    <input type="text" class="form-control" placeholder="Enter brand">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Category</label>
                    <select class="form-select">
                      <option>Select category</option>
                      <option>Sports</option>
                      <option>Casual</option>
                      <option>Fashion</option>
                      <option>Electronics</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Price</label>
                    <input type="number" class="form-control" placeholder="0.00" step="0.01">
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Quantity</label>
                    <input type="number" class="form-control" placeholder="0">
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Gender</label>
                    <select class="form-select">
                      <option>Select gender</option>
                      <option>Men</option>
                      <option>Women</option>
                      <option>Unisex</option>
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Description</label>
                  <textarea class="form-control" rows="3" placeholder="Enter product description"></textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label">Product Image</label>
                  <input type="file" class="form-control" accept="image/*">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary">Add Product</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Product Modal -->
      <div class="modal fade" id="editModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Product</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Product Name</label>
                    <input type="text" class="form-control" value="Running Shoes Pro">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Type</label>
                    <input type="text" class="form-control" value="Footwear">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Brand</label>
                    <input type="text" class="form-control" value="Nike">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Category</label>
                    <select class="form-select">
                      <option>Sports</option>
                      <option>Casual</option>
                      <option>Fashion</option>
                      <option>Electronics</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Price</label>
                    <input type="number" class="form-control" value="89.99" step="0.01">
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Quantity</label>
                    <input type="number" class="form-control" value="45">
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Gender</label>
                    <select class="form-select">
                      <option>Men</option>
                      <option>Women</option>
                      <option>Unisex</option>
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Description</label>
                  <textarea class="form-control" rows="3">High-performance running shoes with excellent cushioning.</textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label">Product Image</label>
                  <input type="file" class="form-control" accept="image/*">
                  <small class="text-muted">Leave empty to keep current image</small>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-warning">Update Product</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div class="modal fade" id="deleteModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-danger text-white">
              <h5 class="modal-title">Confirm Delete</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this product?</p>
              <p class="text-muted mb-0">This action cannot be undone.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger">Delete Product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="d-flex align-items-center alert alert-danger rounded-0 fw-bold" role="alert">  
      You don't have permission to perform this!!  
    </div>
  </div>
</template>



<script setup>
  import { ref, onMounted, computed } from 'vue'; 
  import { useAuthStore } from '../stores/auth';
 
  const API = "http://127.0.0.1:8000";
  const auth = useAuthStore();
  const products = ref([]);
  const error = ref('');
  const isLoading = ref(false);
  const pageSize = 48;

  onMounted(() => {
    fetchProducts();
  })


  const fetchProducts = async () => {
    isLoading.value = true;
    try {
      const res = await fetch(`${API}/products`);
      products.value = await res.json();
    } catch (e) {
      console.error('Error fetching all products:', e);
      error.value = 'Failed to fetch all products information';
      alert('Failed to fetch all products information');
    } finally {
      isLoading.value = false;
    }
  };

  const totalPages = computed(() => Math.ceil(products.value.length / pageSize));
  const paginatedProducts

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