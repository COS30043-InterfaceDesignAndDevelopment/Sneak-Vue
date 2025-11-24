<template>
  <div class="container my-5">
    <h1 class="mb-4">My Favorites</h1>

    <!-- Loading State -->
    <div v-if="favoriteStore.isLoadingFavorites" class="text-center py-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3">Loading favorites...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!favoriteStore.favorites || favoriteStore.favorites.length === 0" class="text-center py-5">
      <p class="text-muted fs-5">No favorites yet</p>
      <p class="text-muted">Start adding products to your favorites!</p>
    </div>

    <!-- Favorites Grid -->
    <div v-else class="row g-4">
      <div v-for="item in favoriteStore.favorites" :key="item.favorite_id" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div 
          class="card h-100 favorite-card"
          @click="goToProductDetail(item.product_id)">
          <div class="position-relative">
            <img :src="item.image_url" :alt="item.name" class="card-img-top favorite-image">
            <button 
              @click.stop="handleRemove(item.favorite_id)" 
              class="btn btn-danger btn-sm remove-btn py-auto px-auto"
              :disabled="favoriteStore.isWorking"
            >
              <span v-if="!favoriteStore.isWorking"><i class="bi bi-trash" style="font-size: 1.2rem;"></i></span>
              <span v-else class="spinner-border spinner-border-sm"></span>
            </button>
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-truncate" :title="item.name">{{ item.name }}</h5>
            <p class="card-text text-muted small mb-1">{{ item.brand }}</p>
            <p class="card-text text-muted small mb-2">
              {{ item.category }} • {{ item.gender }} • {{ item.type }}
            </p>
            <p class="card-text fw-bold mt-auto">${{ item.price.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
  import { onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useFavoriteStore } from '../stores/favorites';
  import { useAuthStore } from '../stores/auth';

  const favoriteStore = useFavoriteStore();
  const authStore = useAuthStore();
  const router = useRouter();

  const userId = computed(() => authStore.user?.user_metadata?.sub);

  onMounted(async () => {
    if (userId.value) {
      await favoriteStore.fetchFavorites(userId.value);
    } else { 
      router.push('/login');
    }
  });

  const handleRemove = async (favoriteId) => { 
    await favoriteStore.removeFavorite(favoriteId);
    if (userId.value) {
      await favoriteStore.fetchFavorites(userId.value);
    } 
  }; 
  
  const goToProductDetail = (productId) => {
    router.push({ 
      name: 'product-detail', 
      params: { id: productId } 
    });
  }; 
</script>



<style scoped>
  .favorite-card {
    border: 1px solid #dee2e6;
    border-radius: 0;
    transition: box-shadow 0.2s;
  }

  .favorite-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .favorite-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 0;
  }

  .remove-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
    padding: 0;
    border-radius: 0;
    font-size: 24px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
  }

  .remove-btn:hover {
    background-color: #dc3545;
  }

  .card-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .btn {
    border-radius: 0;
  }

  .card {
    border-radius: 0;
    background-color: #fcfdff; 
  }
</style>