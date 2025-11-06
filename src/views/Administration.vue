<template>
  <div class="container mb-5">
    <div v-if="auth.isAuthorised"> 
      <div class="row">
        <!-- Main Content -->
        <div class="col-12">
          <div class="pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Product Management
              <!-- Loading State -->
              <span v-if="isLoading" class="px-2 fw-normal">
                <span class="spinner-border text-danger" role="status">
                  <span class="visually-hidden">Loading...</span>
                </span>
              </span>
            </h1> 
          </div>

          <!-- Search and Add Product Button -->
          <div class="row mb-3">
            <div class="col-7 col-md-8">
              <div class="input-group"> 
                <input type="text" class="form-control border-0 rounded-0 py-2" placeholder="Search products by name, brand, or category...">
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
      <div class="modal fade" id="createModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add New Product</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="insertProduct">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Product Name</label>
                    <input type="text" class="form-control" placeholder="Enter product name" v-model="newProduct.name" required minlength="7">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Type</label>
                    <input type="text" class="form-control" placeholder="Enter type" v-model="newProduct.type" required>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Brand</label>
                    <input type="text" class="form-control" placeholder="Enter brand" v-model="newProduct.brand" required>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Category</label>
                    <select class="form-select" id="category" required v-model="newProduct.category">
                      <option value="">Select category</option> 
                      <option value="Casual">Casual</option>
                      <option value="Sportswear">Sportswear</option>
                      <option value="Streetwear">Streetwear</option>
                      <option value="Limited Edition">Limited Edition</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Price</label>
                    <input type="number" class="form-control" placeholder="0.00" step="0.01" min="1" v-model="newProduct.price" required>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Quantity</label>
                    <input type="number" class="form-control" placeholder="0" min="1" v-model="newProduct.quantity" required>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Gender</label>
                    <select class="form-select" id="gender" required v-model="newProduct.gender">
                      <option value="">Select gender</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Description</label>
                  <textarea class="form-control" rows="3" required minlength="20" placeholder="Enter product description" v-model="newProduct.description"></textarea>
                </div>
                <div class="mb-4">
                  <label class="form-label">Product Image URL (No Background)</label>
                  <input type="text" class="form-control" required pattern="^https:\/\/.*\.(jpg|jpeg|png|gif)$" placeholder="https://...." v-model="newProduct.image_url">
                  <small class="text-muted">.jpg, .jpeg, .png, .gif</small>
                </div>

                <div class="border-top pt-3 d-flex justify-content-end align-items-center">
                  <div v-if="isLoading" class="my-auto px-3 fw-normal">
                    <div class="spinner-border text-success" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" class="btn btn-success">Add Product</button> 
                </div>
              </form>
            </div> 
          </div>
        </div>
      </div>

      <!-- Update Product Modal -->
      <div class="modal fade" id="updateModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Product</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="updateProduct">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Product Name</label>
                    <input type="text" class="form-control" placeholder="Enter product name" required minlength="7" v-model="productDetails.name">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Type</label>
                    <input type="text" class="form-control" placeholder="Enter type" required v-model="productDetails.type">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Brand</label>
                    <input type="text" class="form-control" placeholder="Enter brand" required v-model="productDetails.brand">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Category</label>
                    <select class="form-select" id="category" v-model="productDetails.category" required>
                      <option value="">Select category</option> 
                      <option value="Casual">Casual</option>
                      <option value="Sportswear">Sportswear</option>
                      <option value="Streetwear">Streetwear</option>
                      <option value="Limited Edition">Limited Edition</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Price</label>
                    <input type="number" class="form-control" placeholder="0.00" step="0.01" required v-model="productDetails.price">
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Quantity</label>
                    <input type="number" class="form-control" placeholder="0" required v-model="productDetails.quantity">
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Gender</label>
                    <select class="form-select" id="gender" v-model="productDetails.gender" required>
                      <option value="">Select gender</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Description</label>
                  <textarea class="form-control" rows="3" required minlength="20" placeholder="Enter product description" v-model="productDetails.description"></textarea>
                </div>
                <div class="mb-4">
                  <label class="form-label">Product Image URL (No Background)</label>
                  <input type="text" class="form-control" required pattern="^https:\/\/.*\.(jpg|jpeg|png|gif)$" placeholder="https://...." v-model="productDetails.image_url">
                  <small class="text-muted">.jpg, .jpeg, .png, .gif</small>
                </div>

                <div class="border-top pt-3 d-flex justify-content-end">
                  <div v-if="isLoading" class="my-auto px-3 fw-normal">
                    <div class="spinner-border text-warning" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" class="btn btn-warning">Update Product</button> 
                </div>
              </form>
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

              <form @submit.prevent="deleteProduct" class="border-top pt-3 mt-2 d-flex justify-content-end">
                <div v-if="isLoading" class="my-auto px-3 fw-normal">
                  <div class="spinner-border text-danger" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-danger">Delete Product</button> 
              </form>
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
  const currentPage = ref(1);
  const pageSize = 20;
  const productDetails = ref([]);
  const productId = ref();
  const newProduct = ref({
    name: '', type: '', brand: '', description: '', 
    price: 0, gender: '', category: '', quantity: 0, 
    image_url: ''
  });


  onMounted(() => fetchProducts());

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

  const insertProduct = async () => {
    isLoading.value = true; 
    const formattedProduct = {
      ...newProduct.value,
      name: capitalizeWords(newProduct.value.name),
      brand: capitalizeWords(newProduct.value.brand),
      type: capitalizeWords(newProduct.value.type),
      category: capitalizeWords(newProduct.value.category), 
    };

    try {
      const res = await fetch(`${API}/products/insert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(formattedProduct)
      });

      if(!res.ok) {
        const error = await res.text();
        alert('Add new product failed: ', error);
        return;
      }

      const result = await res.json(); 
      if (result.success) {
        alert('Product added successfully!');
      }
    } catch (e) {
      console.error('An error occured: ', e);
      alert('An error occured: ', e);
    } finally {
      isLoading.value = false;
      window.location.reload();
    }
  };

  const deleteProduct = async () => {
    isLoading.value = true; 

    try {
      const res = await fetch(`${API}/products/delete/${productId.value}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        const error = await res.text();
        alert('Delete product failed: ', error);
        return;
      }

      const result = await res.json(); 
      if (result.success) {
        alert('Product deleted successfully!');
      } 
    } catch (e) {
      console.error('An error occured during deleting...', e);
      alert('An error occured during deleting...');
    } finally {
      isLoading.value = false;
      window.location.reload();
    }
  };

  const updateProduct = async () => {
    isLoading.value = true;
    const formattedProduct = {
      ...productDetails.value,
      name: capitalizeWords(productDetails.value.name),
      brand: capitalizeWords(productDetails.value.brand),
      type: capitalizeWords(productDetails.value.type),
      category: capitalizeWords(productDetails.value.category), 
    };

    try {
      const res = await fetch(`${API}/products/update/${productDetails.value.product_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(formattedProduct)
      });

      if(!res.ok) {
        const error = await res.text();
        alert('Update product failed: ', error);
        return;
      }

      const result = await res.json(); 
      if (result.success) {
        alert('Product updated successfully!');
      }
    } catch (e) {
      console.error('An error occured: ', e);
      alert('An error occured: ', e);
    } finally {
      isLoading.value = false;
      window.location.reload();
    }
  };

  function capitalizeWords(str) {
    if (!str) return '';
    return str.toLowerCase().split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }; 

  const resetFields = () => {
    newProduct.value = {
      name: '', type: '', brand: '', description: '', 
      price: 0, gender: '', category: '', quantity: 0, 
      image_url: ''
    };
  };

  const totalPages = computed(() => Math.ceil(products.value.length / pageSize))
  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return products.value.slice(start, start + pageSize);
  });

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