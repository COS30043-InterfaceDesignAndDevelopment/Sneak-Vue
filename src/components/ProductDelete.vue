<template>
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

          <form @submit.prevent="handleDelete" class="border-top pt-3 mt-2 d-flex justify-content-end">
            <div v-if="productStore.isProcessing" class="my-auto px-3 fw-normal">
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
</template>



<script setup>
  import { useProductStore } from '../stores/products';

  const props = defineProps({ productId: String });
  const productStore = useProductStore();

  const handleDelete = () => {
    if (!props.productId) return;
    productStore.deleteProduct(props.productId);
  };
</script>