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
          <div class="product-info-card">
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
                <i :class="isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
              </button>
            </div>

            <div class="alert alert-info alert-custom mt-3 mb-0" v-if="cartMessage">
              <i class="bi bi-bag-check me-2"></i> {{ cartMessage }}
            </div>
          </div>
        </div>
      </div>

      
      <hr class="container text-black-50 mb-5"></hr>



      <!-- Reviews Section -->
      <div class="row">
        <div class="col-12">
          <h3 class="mb-4 text-uppercase text-center" style="letter-spacing: 2px;">Reviews</h3>

          <!-- Loading State -->
          <div v-if="reviewStore.isLoading" class="text-center py-5">
            <div class="spinner-border text-danger" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <!-- Write Review Form -->
          <div class="write-review-card">
            <h5 class="fw-bold mb-3">Write a Review</h5>
            <div class="mb-3">
              <label class="form-label fw-semibold small">Your Rating</label>
              <div class="star-rating-input">
                <i v-for="n in 5" 
                  :key="n"
                  :class="['bi bi-star me-2', { active: n <= newReview.rating }]"
                  @click="newReview.rating = n"
                  @mouseover="hoverRating = n"
                  @mouseleave="hoverRating = 0"></i>
              </div> 
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold small">Your Review</label>
              <textarea v-model="newReview.comment" 
                class="form-control form-control-custom" 
                rows="3" 
                placeholder="Share your experience with this product..."></textarea>
            </div>
            <div class="d-flex align-items-center">
              <button class="btn btn-dark btn-custom" @click="submitReview">
                <i class="bi bi-send-fill me-2"></i>SUBMIT REVIEW
              </button>

              <div v-if="reviewStore.isSending" class="text-center ps-3 my-auto">
                <span class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </span>
              </div>

            </div>
          </div>

          <!-- Reviews List -->
          <div v-for="(review, index) in reviewStore.reviews" :key="review.review_id || index" class="review-card">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="fw-bold mb-0">{{ review.username }}</h6>
                <div class="rating-stars mb-2">
                  <i v-for="n in 5" :key="n" class="me-1" 
                    :class="n <= review.rating ? 'bi bi-star-fill' : 'bi bi-star'"></i>
                </div>
              </div>
              <small class="text-muted">{{ review.date }}</small>
            </div>
            <p class="mb-3">{{ review.comment }}</p>
            <div class="d-flex gap-2">
              <span :class="['like-btn', { active: review.userLiked }]" 
                  @click="reactReview(review.review_id, 'like')">
                <i class="bi bi-hand-thumbs-up me-1"></i>{{ review.likes }}
              </span>
              <span :class="['dislike-btn', { active: review.userDisliked }]" 
                  @click="reactReview(review.review_id, 'dislike')">
                <i class="bi bi-hand-thumbs-down me-1"></i>{{ review.dislikes }}
              </span>
            </div>
          </div>
        </div>
      </div> 
    </div> 
  </div>
</template>



<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useProductStore } from '../stores/products';
  import { useReviewStore } from '../stores/reviews'; 
  import { useAuthStore } from '../stores/auth'; 

  const route = useRoute();
  const router = useRouter();
  const authStore = useAuthStore();
  const productStore = useProductStore();
  const reviewStore = useReviewStore();
  const productId = route.params.id; 
  const product = ref(null);
  const productImages = ref([]);
  
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Navy', hex: '#1e3a8a' },
    { name: 'Gray', hex: '#6b7280' }
  ];
  
  const hardcodedSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const selectedImage = ref('');
  const selectedColor = ref(colors[0]);
  const selectedSize = ref(null);
  const isFavorite = ref(false);
  const cartMessage = ref('');
  const newReview = ref({
    rating: 0,
    comment: ''
  });
  const hoverRating = ref(0);

  // Computed property to get current user ID
  const currentUserId = computed(() => {
    return authStore.user?.user_metadata?.sub || null;
  });

  const averageRating = computed(() => {
    if (reviewStore.reviews.length === 0) return 0;
    const sum = reviewStore.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviewStore.reviews.length;
  });


  const addToCart = () => {
    if (!selectedSize.value) {
      cartMessage.value = 'Please select a size first!';
      setTimeout(() => cartMessage.value = '', 3000);
      return;
    }
    cartMessage.value = `Added ${product.value.name} (Size: ${selectedSize.value}, Color: ${selectedColor.value.name}) to cart!`;
    setTimeout(() => cartMessage.value = '', 3000);
  };

  const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
  }; 

  const submitReview = async () => {
    // Check authentication
    if (!authStore.isAuthenticated || !currentUserId.value) {
      alert('Please login to submit a review!');
      router.push('/login');
      return;
    }

    if (newReview.value.rating === 0) {
      alert('Please select a rating!');
      return;
    }

    if (newReview.value.comment.trim() === '') {
      alert('Please write a review!');
      return;
    }
    
    await reviewStore.insertReview(
      newReview.value, 
      currentUserId.value, 
      productId
    );
 
    // Refetch reviews with userId to update the list
    await reviewStore.fetchReviews(productId, currentUserId.value);
    newReview.value = { rating: 0, comment: '' }; 
  };

  const reactReview = async (reviewId, action) => {
    // Check authentication
    if (!authStore.isAuthenticated || !currentUserId.value) {
      alert('Please login to react to reviews!');
      router.push('/login');
      return;
    }

    await reviewStore.actionReview(reviewId, action, currentUserId.value); 
  };


  onMounted(async () => {  
    product.value = productStore.products.find(p => p.product_id === productId);

    if (!product.value) {
      await productStore.fetchSingleProduct(productId);
      product.value = productStore.productValue; 
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
 
    await reviewStore.fetchReviews(productId, currentUserId.value);
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

  .rating-stars i {
    color: #000;
    font-size: 0.7rem; 
  }

  .review-card {
    background: #f9fafb;
    border-radius: 0;
    padding: 25px;
    margin-bottom: 15px;
    border: 1px solid #e5e7eb;
    box-shadow: none;
  }

  .like-btn, .dislike-btn {
    border: 1px solid #d1d5db;
    padding: 5px 12px;
    border-radius: 0;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    cursor: pointer;
    background-color: #fff;
    font-weight: 600;
  }

  .like-btn:hover {
    background-color: #000;
    color: #fff;
    border-color: #000;
  }

  .like-btn.active {
    border-color: #000;
    background-color: #000;
    color: #fff;
  }

  .dislike-btn:hover {
    background-color: #000;
    color: #fff;
    border-color: #000;
  }

  .dislike-btn.active {
    border-color: #000;
    background-color: #000;
    color: #fff;
  }

  .product-info-card {
    background: white;
    border-radius: 0;
    padding: 35px;
    border: 1px solid #e5e7eb;
    box-shadow: none;
  }

  .badge-custom {
    padding: 7px 14px;
    border-radius: 0; 
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.65rem;
  }
  
  .write-review-card {
    background: #f9fafb;
    border-radius: 0;
    padding: 30px;
    margin-bottom: 25px;
    border: 1px solid #e5e7eb;
    box-shadow: none;
  }

  .star-rating-input i {
    cursor: pointer;
    font-size: 1.1rem;
    color: #d1d5db;
    transition: color 0.2s ease;
  }

  .star-rating-input i:hover,
  .star-rating-input i.active {
    color: #000;
  }

  .form-control-custom {
    border-radius: 0;
    border: 1px solid #d1d5db;
  }

  .form-control-custom:focus {
    border-color: #000;
    box-shadow: none;
  }

  .btn-custom {
    background-color: #1431b1;
    border-radius: 0;
    padding: 10px 30px;  
    letter-spacing: 1px; 
  }

  .btn-dark.btn-custom:hover {
    background-color: #fff;
    color: #1431b1;
  }

  .alert-custom {
    border-radius: 0;
    border: 1px solid #0dcaf0;
  }
</style>