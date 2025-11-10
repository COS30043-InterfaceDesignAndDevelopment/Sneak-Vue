<template>
  <div class="row g-3 mb-5"> 
    <div class="col-md-6 col-lg-7">
      <div class="mb-3">
        <img :src="selectedImage" alt="Product Image" class="product-image">
      </div>
      <div class="d-flex gap-2 flex-wrap">
        <img v-for="(img, index) in productImages" 
          :key="index"
          :src="img" 
          :class="['thumbnail-img', { active: selectedImage === img }]"
          @click="selectedImage = img"
          alt="Thumbnail">
      </div>
    </div>

    
    <div class="col-md-6 col-lg-5">
      <div class="product-info-card border-0 shadow-sm">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <div>
            <span class="badge bg-danger badge-custom me-2">{{ product.category }}</span>
            <span class="badge bg-success badge-custom">{{ product.gender }}</span>
          </div>
          <div class="rating-stars">
            <i v-for="n in 5" :key="n" 
                :class="n <= Math.round(averageRating) ? 'fas fa-star' : 'far fa-star'"></i>
            <span class="ms-2 text-muted">({{ reviewStore.reviews.length }} reviews)</span>
          </div>
        </div>

        <h1 class="h3 mb-1 text-uppercase" style="letter-spacing: 2px;">{{ product.name }}</h1>
        <p class="text-muted small">Brand: <strong>{{ product.brand }}</strong> | Type: <strong>{{ product.type }}</strong></p> 
        <h3 class="mb-4 mt-4">${{ product.price.toFixed(2) }}</h3> 
        <p class="mb-4">{{ product.description }}</p>

        <!-- Colors -->
        <div class="mb-4">
          <h6 class="mb-3">Color: <span class="text-muted fw-normal">{{ selectedColor.name }}</span></h6>
          <div class="d-flex gap-2">
            <div v-for="color in colors" 
              :key="color.name"
              :class="['color-option', { active: selectedColor.name === color.name }]"
              :style="{ backgroundColor: color.hex }"
              @click="selectedColor = color"
              :title="color.name">
            </div>
          </div>
        </div>

        <!-- Size Selection -->
        <div class="mb-4">
          <h6 class="fw-bold mb-3">Size: <span class="text-muted fw-normal">{{ selectedSize || 'Select size' }}</span></h6>
          <div class="d-flex gap-2 flex-wrap">
            <div v-for="size in hardcodedSizes" 
              :key="size"
              :class="['size-option', { active: selectedSize === size }]"
              @click="selectedSize = size"
              >{{ size }}
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="d-flex gap-3">
          <button class="btn btn-add-cart flex-grow-1" @click="addToCart">
            <i class="fas fa-shopping-cart me-2"></i>ADD TO CART
          </button>
          <button :class="['btn btn-favorite', { active: isFavorite }]" @click="toggleFavorite">
            <i :class="isFavorite ? 'bi bi-suit-heart-fill' : 'bi bi-suit-heart'"></i>
          </button>
        </div>

        <div class="alert alert-info alert-custom mt-3 mb-0" v-if="cartMessage">
          <i class="bi bi-bag-check me-2"></i> {{ cartMessage }}
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
  import { ref, computed, onMounted } from 'vue'; 
  import { useRouter } from 'vue-router';
  import { useReviewStore } from '../stores/reviews'; 
  import { useFavoriteStore } from '../stores/favorites';
  import { useCartItemStore } from '../stores/cartItems';
  import { useAuthStore } from '../stores/auth'; 


  const reviewStore = useReviewStore(); 
  const favoriteStore = useFavoriteStore();
  const cartItemStore = useCartItemStore();
  const authStore = useAuthStore();
  const router = useRouter();
  const product = defineModel();
  const props = defineProps({ productId: String });
  
  const selectedSize = ref(null);
  const isFavorite = ref(false);
  const cartMessage = ref('');
  const productImages = ref([]);
  const selectedImage = ref('');
  const hardcodedSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Navy', hex: '#1e3a8a' },
    { name: 'Gray', hex: '#6b7280' }
  ];
  const selectedColor = ref(colors[0]);


  const currentUserId = computed(() => authStore.user?.user_metadata?.sub || null);
  const averageRating = computed(() => {
    if (reviewStore.reviews.length === 0) return 0;
    const sum = reviewStore.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviewStore.reviews.length;
  });
  

  const addToCart = async () => {
    if (!selectedSize.value) {
      cartMessage.value = 'Please select a size first!';
      setTimeout(() => cartMessage.value = '', 3000);
      return;
    }

    // Check authentication
    if (!authStore.isAuthenticated || !currentUserId.value) {
      alert('Please login!');
      router.push('/login');
      return;
    }

    // Add to cart
    await cartItemStore.insertCartItem(
      currentUserId.value, 
      props.productId, 
      selectedColor.value.name, 
      selectedSize.value
    );

    cartMessage.value = `Added ${product.value.name} (Size: ${selectedSize.value}, Color: ${selectedColor.value.name}) to cart!`;
    setTimeout(() => cartMessage.value = '', 3000);
  };

  const checkIfFavorite = () => {
    if (!currentUserId.value) return false;
    return favoriteStore.favorites.some(fav => fav.product_id === props.productId);
  };

  const toggleFavorite = async () => {
    // Check authentication
    if (!authStore.isAuthenticated || !currentUserId.value) {
      alert('Please login!');
      router.push('/login');
      return;
    }

    if (isFavorite.value) { 
      const favoriteItem = favoriteStore.favorites.find(fav => fav.product_id === props.productId);
      if (favoriteItem) {
        await favoriteStore.removeFavorite(favoriteItem.favorite_id);
        isFavorite.value = false;
      }
    } else { 
      await favoriteStore.insertFavorite(currentUserId.value, props.productId);
      isFavorite.value = true;
    }
  }; 



  onMounted(async () => {
    // Fetch favorites if user is logged in
    if (currentUserId.value) {
      await favoriteStore.fetchFavorites(currentUserId.value);
      isFavorite.value = checkIfFavorite();
    }
   
    if (product.value) {
      productImages.value = [
        product.value?.image_url || 'https://placehold.co/600x600?text=Main+Image',
        'https://placehold.co/600x600?text=Image+2',
        'https://placehold.co/600x600?text=Image+3',
        'https://placehold.co/600x600?text=Image+4'
      ];
      selectedImage.value = productImages.value[0];
    }
  });

</script>



<style scoped>
  .letter-spacing {
    letter-spacing: 2px;
  }

  .product-image {
    width: 100%;  
    height: 560px;
    object-fit: contain;
    border-radius: 0;
    box-shadow: none;
    border: 1px solid #e5e7eb;
    background-color: #eeeff0;
    transition: all 0.3s ease;
  } 

  .thumbnail-img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 0;
    cursor: pointer;
    border: 2px solid #e5e7eb;
    transition: all 0.2s ease;
  }

  .thumbnail-img:hover, .thumbnail-img.active {
    border: 1px solid #000;
  }

  .color-option {
    width: 30px;
    height: 30px;
    border-radius: 0;
    cursor: pointer;
    border: 1px solid #e5e7eb;
    transition: all 0.2s ease;
    display: inline-block;
  }

  .color-option:hover, .color-option.active {
    border-color: #000;
    transform: none;
  }

  .size-option {
    min-width: 35px;
    padding: 7px 14px; 
    border-radius: 0;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center; 
    background-color: #e9ebee;
    color: #000;
  }

  .size-option:hover {
    background-color: #f5f5f5;
  }

  .size-option.active {
    border-color: #000;
    background-color: #000;
    color: white;
  }

  .btn-add-cart {
    background-color: #b11414;
    color: white;
    padding: 10px 40px;
    border-radius: 0;
    font-weight: 700;
    transition: all 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .btn-add-cart:hover {
    border: 1px solid #000;
    background-color: #fff;
    color: #b11414;
    transform: none;
    box-shadow: none;
  }

  .btn-favorite {
    border: 1px solid #000; 
    border-radius: 0;
    font-size: 1.4rem;
    transition: all 0.2s ease;
    background-color: #fff;
  }

  .btn-favorite:hover {
    background-color: #e9ebee; 
  } 

  .btn-favorite.active i {
    color: #b11414;
  }

  .product-info-card {
    background: white;
    border-radius: 0;
    padding: 35px;
    border: 1px solid #e5e7eb;
    background-color: #fcfdff; 
    box-shadow: none;
  }

  .badge-custom {
    padding: 7px 14px;
    border-radius: 0; 
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.65rem;
  }
  
  .alert-custom {
    border-radius: 0;
    border: 1px solid #0dcaf0;
  }
</style>