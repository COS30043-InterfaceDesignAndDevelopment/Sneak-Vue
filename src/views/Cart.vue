<template>
  <div class="container my-5">
    <h1 class="mb-4">Shopping Cart</h1>

    <!-- Loading State -->
    <div v-if="cartItemStore.isLoadingCartItems" class="text-center py-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3">Loading cart...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!cartItemStore.cartItems || cartItemStore.cartItems.length === 0" class="text-center py-5">
      <p class="text-muted fs-5">Your cart is empty</p>
      <p class="text-muted">Add some products to get started!</p>
    </div>

    <!-- Cart Items -->
    <div v-else class="row g-3">
      <div class="col-lg-8">
        <div v-for="item in cartItemStore.cartItems" :key="item.cart_id" class="cart-item-card mb-3" style="background-color: #fcfdff;">
          <div class="row g-3">
            <div class="col-3 col-md-2">
              <img :src="item.image_url" :alt="item.name" class="cart-item-image">
            </div>
            <div class="col-9 col-md-10">
              <div class="d-flex justify-content-between align-items-start">
                <div class="flex-grow-1">
                  <h5 class="mb-1">{{ item.name }}</h5>
                  <p class="text-muted small mb-1">{{ item.brand }}</p>
                  <p class="text-muted small mb-2">
                    Color: <strong>{{ item.color }}</strong> | Size: <strong>{{ item.size }}</strong>
                  </p>
                  <p class="fw-bold mb-0">${{ item.price.toFixed(2) }}</p>
                </div>
                <button 
                  @click="handleRemove(item.cart_id)" 
                  class="btn btn-remove"
                  :disabled="cartItemStore.isWorking"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
              <div class="d-flex align-items-center gap-2 mt-3">
                <button 
                  @click="handleQuantityChange(item.cart_id, 'decrement')" 
                  class="btn btn-quantity"
                  :disabled="item.quantity <= 1"
                >
                  <i class="bi bi-dash"></i>
                </button>
                <span class="quantity-display">{{ item.quantity }}</span>
                <button 
                  @click="handleQuantityChange(item.cart_id, 'increment')" 
                  class="btn btn-quantity"
                >
                  <i class="bi bi-plus"></i>
                </button>
                <span class="ms-3 fw-bold">
                  Subtotal: ${{ (item.price * item.quantity).toFixed(2) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="col-lg-4">
        <div class="cart-summary" style="background-color: #fcfdff;">
          <h4 class="mb-4">Order Summary</h4>
          <div class="d-flex justify-content-between mb-3">
            <span>Total Items:</span>
            <strong>{{ totalItems }}</strong>
          </div>
          <hr>
          <div class="d-flex justify-content-between mb-4">
            <span class="fs-5">Total:</span>
            <strong class="fs-4">${{ totalPrice.toFixed(2) }}</strong>
          </div>
          <button class="btn btn-checkout w-100">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
  import { onMounted, computed } from 'vue';
  import { useCartItemStore } from '../stores/cartItems';
  import { useAuthStore } from '../stores/auth';

  const cartItemStore = useCartItemStore();
  const authStore = useAuthStore();


  const userId = computed(() => authStore.user?.user_metadata?.sub);
  const totalItems = computed(() => {
    return cartItemStore.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return cartItemStore.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  });


  onMounted(async () => {
    if (userId.value) {
      await cartItemStore.fetchCartItems(userId.value);
    }
  });

  const handleQuantityChange = async (cartId, action) => {
    if (userId.value) {
      const success = await cartItemStore.actionCartQuantity(userId.value, cartId, action);
      if (!success) {
        alert('Failed to update quantity');
      }
    }
  };

  const handleRemove = async (cartId) => {
    if (confirm('Remove this item from cart?')) {
      await cartItemStore.removeCartItem(cartId);
      if (userId.value) {
        await cartItemStore.fetchCartItems(userId.value);
      }
    }
  };
</script>



<style scoped>
  .cart-item-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0;
    padding: 20px;
  }

  .cart-item-image {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 0;
    border: 1px solid #e5e7eb;
  }

  .btn-remove {
    background-color: transparent;
    border: 1px solid #dc3545;
    color: #dc3545;
    border-radius: 0;
    padding: 8px 12px;
    transition: all 0.2s;
  }

  .btn-remove:hover {
    background-color: #dc3545;
    color: white;
  }

  .btn-quantity {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 0;
    padding: 6px 12px;
    transition: all 0.2s;
  }

  .btn-quantity:hover:not(:disabled) {
    background-color: #e9ecef;
    border-color: #000;
  }

  .btn-quantity:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .quantity-display {
    min-width: 40px;
    text-align: center;
    font-weight: 600;
    font-size: 1.1rem;
  }

  .cart-summary {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0;
    padding: 30px;
    position: sticky;
    top: 20px;
  }

  .btn-checkout {
    background-color: #b11414;
    color: white;
    padding: 10px 40px;
    border-radius: 0;
    font-weight: 700;
    transition: all 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .btn-checkout:hover {
    border: 1px solid #000;
    background-color: #fff;
    color: #b11414;
    transform: none;
    box-shadow: none;
  }

  hr {
    border-color: #dee2e6;
  }

  h5 {
    font-size: 1rem;
    font-weight: 600;
  }

</style>