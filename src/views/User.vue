<template>
  <div class="container mb-5">
    <!-- Loading State -->
    <div v-if="authStore.isLoading" class="text-center py-5">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="authStore.error" class="d-flex align-items-center alert alert-danger rounded-0" role="alert">
      {{ authStore.error }}
      <div class="ms-auto">
        <button @click="authStore.logout()" class="btn btn-view py-2">
          <i class="bi bi-box-arrow-right me-2"></i>Login again
        </button> 
      </div>
    </div>

    <!-- User Profile -->
    <div v-else-if="authStore.user" class="row">
      <!-- Profile Card -->
      <div class="col-lg-4 mb-4">
        <div class="card shadow-sm">
          <div class="card-body text-center">
            <img 
              src="https://t3.ftcdn.net/jpg/08/05/28/22/360_F_805282248_LHUxw7t2pnQ7x8lFEsS2IZgK8IGFXePS.jpg" 
              alt="User Avatar" 
              class="rounded-circle mb-3 avatar"
            >
            <h4 class="card-title mb-1">{{ authStore.user.user_metadata.username }} 
              <span v-if="authStore.user.user_metadata.role === 'admin'">
                <i class="bi bi-person-check"></i>
              </span>
            </h4>
            <p class="text-muted mb-3">{{ authStore.user.user_metadata.email }}</p>
            <button @click="authStore.logout()" class="btn btn-view py-2 w-100">
              <i class="bi bi-box-arrow-right me-2"></i>Logout
            </button>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="card shadow-sm mt-3">
          <div class="card-body">
            <h6 class="card-subtitle mb-3 text-muted">Your Stats</h6>
            <div class="d-flex justify-content-between mb-2">
              <span>Cart items</span>
              <strong>12</strong>
            </div> 
            <div class="d-flex justify-content-between mb-2">
              <span>Favorite Items</span>
              <strong>{{ favoriteStore.favorites.length }}</strong>
            </div>
            <div class="d-flex justify-content-between">
              <span>Member Since</span>
              <strong>{{ creationYear }}</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="col-lg-8">
        <!-- Welcome Banner -->
        <div class="card welcome-banner text-white shadow-sm mb-4">
          <div class="card-body d-flex align-items-center">
            <div>
              <h3>Welcome back, {{ authStore.user.user_metadata.username }}!</h3>
              <p class="mb-0">Check out the latest sneaker drops and exclusive deals.</p> 
            </div>
            <div v-if="authStore.user.user_metadata.role === 'admin'" class="ms-auto">
              <button @click="toAdmin" class="btn btn-dark rounded-0 py-2 w-100">
                Admin <i class="bi bi-person-gear"></i>
              </button> 
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="card shadow-sm mb-4">
          <div class="card-header bg-white">
            <h5 class="mb-0">Recent Orders</h5>
          </div>
          <div class="card-body">
            <div class="list-group list-group-flush">
              <div class="list-group-item d-flex justify-content-between align-items-center px-0">
                <div>
                  <h6 class="mb-1">Nike Air Jordan 1 Retro High</h6>
                  <small class="text-muted">Order #12345 • Oct 28, 2024</small>
                </div> 
              </div> 
            </div>
          </div>
        </div> 
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/auth';
  import { useFavoriteStore } from '../stores/favorites';
  
  const authStore = useAuthStore();
  const favoriteStore = useFavoriteStore();
  const router = useRouter();
  const creationYear = ref();

  onMounted(() => {
    if (authStore.isAuthenticated) {
      authStore.getUserData();
    };
  });

  watch(() => authStore.user, (newUser) => {
    if (newUser?.email_confirmed_at) {
      const match = newUser.email_confirmed_at.match(/\d{4}/);
      creationYear.value = match ? match.toString() : '';
    }
  });
  
  const toAdmin = () => {
    router.push('/admin').then(() => {
      router.go(0);
    });
  };
</script>

<style scoped>
  .avatar {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: 4px solid #f8f9fa;
  }

  .welcome-banner {
    background-color: #b11414;
  }

  .card {
    border: none;
    transition: transform 0.2s;
    border-radius: 0px;
  } 
</style>