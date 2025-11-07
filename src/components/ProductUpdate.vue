<template>
  <div class="modal fade" id="updateModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-warning text-white">
          <h5 class="modal-title">Edit Product</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleUpdate">
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
              <div v-if="productStore.isProcessing" class="my-auto px-3 fw-normal">
                <div class="spinner-border text-warning" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-warning text-white">Update Product</button> 
            </div>
          </form>
        </div> 
      </div>
    </div>
  </div>
</template>



<script setup>
  import { useProductStore } from '../stores/products';

  const productDetails = defineModel();
  const productStore = useProductStore();

  const handleUpdate = () => {
    if (!productDetails.value) return;
    productStore.updateProduct(productDetails.value);
  };
</script>