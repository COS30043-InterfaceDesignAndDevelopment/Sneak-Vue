<template>
  <div class="container mb-5">
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <router-link class="breadcrumb-item text-decoration-none" to="/">Home</router-link>
        <router-link class="breadcrumb-item text-decoration-none" to="/products">Products</router-link>
        <li class="breadcrumb-item active">{{ product.name }}</li>
      </ol>
    </nav>

    <!-- Product Detail Section -->
    <div class="row g-4 mb-5"> 
      <div class="col-lg-6">
        <div class="mb-3">
          <img :src="selectedImage" alt="Product Image" class="product-image">
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <img v-for="(img, index) in product.images" 
                :key="index"
                :src="img" 
                :class="['thumbnail-img', { active: selectedImage === img }]"
                @click="selectedImage = img"
                alt="Thumbnail">
        </div>
      </div>

      
      <div class="col-lg-6">
        <div class="product-info-card">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <span class="badge bg-dark badge-custom me-2">{{ product.category }}</span>
              <span class="badge bg-secondary badge-custom">{{ product.gender }}</span>
            </div>
            <div class="rating-stars">
              <i v-for="n in 5" :key="n" 
                  :class="n <= Math.round(averageRating) ? 'fas fa-star' : 'far fa-star'"></i>
              <span class="ms-2 text-muted">({{ reviews.length }} reviews)</span>
            </div>
          </div>

          <h1 class="h2 fw-bold mb-2 text-uppercase letter-spacing">{{ product.name }}</h1>
          <p class="text-muted mb-3 text-uppercase small">Brand: <strong>{{ product.brand }}</strong> | Type: <strong>{{ product.type }}</strong></p>
          
          <h3 class="fw-bold mb-4">${{ product.price.toFixed(2) }}</h3>

          <p class="mb-4">{{ product.description }}</p>

          <!-- Color Selection -->
          <div class="mb-4">
            <h6 class="fw-bold mb-3 text-uppercase">Color: <span class="text-muted fw-normal">{{ selectedColor.name }}</span></h6>
            <div class="d-flex gap-2">
              <div v-for="color in product.colors" 
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
            <h6 class="fw-bold mb-3 text-uppercase">Size (US): <span class="text-muted fw-normal">{{ selectedSize || 'Select Size' }}</span></h6>
            <div class="d-flex gap-2 flex-wrap">
              <div v-for="size in product.sizes" 
                    :key="size"
                    :class="['size-option', { active: selectedSize === size }]"
                    @click="selectedSize = size">
                {{ size }}
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="d-flex gap-3 mb-3">
            <button class="btn btn-add-cart flex-grow-1" @click="addToCart">
              <i class="fas fa-shopping-cart me-2"></i>ADD TO CART
            </button>
            <button :class="['btn btn-favorite', { active: isFavorite }]" @click="toggleFavorite">
              <i :class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
            </button>
          </div>

          <div class="alert alert-info alert-custom" v-if="cartMessage">
            <i class="fas fa-check-circle me-2"></i>{{ cartMessage }}
          </div>
        </div>
      </div>
    </div>

    <!-- Reviews Section -->
    <div class="row">
      <div class="col-12">
        <h3 class="fw-bold mb-4 text-uppercase letter-spacing">Customer Reviews</h3>

        <!-- Write Review Form -->
        <div class="write-review-card">
          <h5 class="fw-bold mb-3 text-uppercase">Write a Review</h5>
          <div class="mb-3">
            <label class="form-label fw-semibold text-uppercase small">Your Rating</label>
            <div class="star-rating-input">
              <i v-for="n in 5" 
                  :key="n"
                  :class="['fas fa-star', { active: n <= newReview.rating }]"
                  @click="newReview.rating = n"
                  @mouseover="hoverRating = n"
                  @mouseleave="hoverRating = 0"></i>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold text-uppercase small">Your Review</label>
            <textarea v-model="newReview.comment" 
                      class="form-control form-control-custom" 
                      rows="3" 
                      placeholder="Share your experience with this product..."></textarea>
          </div>
          <button class="btn btn-dark btn-custom" @click="submitReview">
            <i class="fas fa-paper-plane me-2"></i>SUBMIT REVIEW
          </button>
        </div>

        <!-- Reviews List -->
        <div v-for="(review, index) in reviews" :key="index" class="review-card">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h6 class="fw-bold mb-1 text-uppercase">{{ review.user }}</h6>
              <div class="rating-stars mb-2">
                <i v-for="n in 5" :key="n" 
                    :class="n <= review.rating ? 'fas fa-star' : 'far fa-star'"></i>
              </div>
            </div>
            <small class="text-muted text-uppercase">{{ review.date }}</small>
          </div>
          <p class="mb-3">{{ review.comment }}</p>
          <div class="d-flex gap-2">
            <span :class="['like-btn', { active: review.userLiked }]" 
                  @click="toggleLike(index)">
              <i class="fas fa-thumbs-up me-1"></i>{{ review.likes }}
            </span>
            <span :class="['dislike-btn', { active: review.userDisliked }]" 
                  @click="toggleDislike(index)">
              <i class="fas fa-thumbs-down me-1"></i>{{ review.dislikes }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const productId = route.params.id; 


  




  const product = ref({
    name: 'Nike Air Max 270',
    brand: 'Nike',
    type: 'Running Shoes',
    category: 'Lifestyle',
    gender: 'Unisex',
    price: 159.99,
    description: 'The Nike Air Max 270 delivers visible cushioning under every step. The design is inspired by two icons of big Air: the Air Max 180 and Air Max 93. It features Nike\'s biggest heel Air unit yet for a super-soft ride that feels as impossible as it looks.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600',
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600'
    ],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Red', hex: '#DC3545' },
      { name: 'Blue', hex: '#0D6EFD' }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12]
  });

  const selectedImage = ref('');
  const selectedColor = ref({});
  const selectedSize = ref(null);
  const isFavorite = ref(false);
  const cartMessage = ref('');
  const newReview = ref({
    rating: 0,
    comment: ''
  });
  const hoverRating = ref(0);
  const reviews = ref([
    {
      user: 'John Smith',
      rating: 5,
      comment: 'Absolutely love these sneakers! Super comfortable and stylish. Perfect for everyday wear.',
      date: '2 days ago',
      likes: 12,
      dislikes: 0,
      userLiked: false,
      userDisliked: false
    },
    {
      user: 'Sarah Johnson',
      rating: 4,
      comment: 'Great quality and design. The Air Max cushioning is amazing. Only downside is they run slightly large.',
      date: '1 week ago',
      likes: 8,
      dislikes: 1,
      userLiked: false,
      userDisliked: false
    },
    {
      user: 'Mike Davis',
      rating: 5,
      comment: 'Best sneakers I\'ve ever owned! Worth every penny. The comfort level is unmatched.',
      date: '2 weeks ago',
      likes: 15,
      dislikes: 0,
      userLiked: false,
      userDisliked: false
    },
    {
      user: 'Emily Brown',
      rating: 4,
      comment: 'Really nice shoes with excellent cushioning. Would recommend sizing down half a size.',
      date: '3 weeks ago',
      likes: 6,
      dislikes: 2,
      userLiked: false,
      userDisliked: false
    }
  ]);

  const averageRating = computed(() => {
    if (reviews.value.length === 0) return 0;
    const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.value.length;
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

  const toggleLike = (index) => {
    if (reviews.value[index].userDisliked) {
      reviews.value[index].dislikes--;
      reviews.value[index].userDisliked = false;
    }
    if (reviews.value[index].userLiked) {
      reviews.value[index].likes--;
      reviews.value[index].userLiked = false;
    } else {
      reviews.value[index].likes++;
      reviews.value[index].userLiked = true;
    }
  };

  const toggleDislike = (index) => {
    if (reviews.value[index].userLiked) {
      reviews.value[index].likes--;
      reviews.value[index].userLiked = false;
    }
    if (reviews.value[index].userDisliked) {
      reviews.value[index].dislikes--;
      reviews.value[index].userDisliked = false;
    } else {
      reviews.value[index].dislikes++;
      reviews.value[index].userDisliked = true;
    }
  };

  const submitReview = () => {
    if (newReview.value.rating === 0) {
      alert('Please select a rating!');
      return;
    }
    if (newReview.value.comment.trim() === '') {
      alert('Please write a review!');
      return;
    }
    reviews.value.unshift({
      user: 'You',
      rating: newReview.value.rating,
      comment: newReview.value.comment,
      date: 'Just now',
      likes: 0,
      dislikes: 0,
      userLiked: false,
      userDisliked: false
    });
    newReview.value = { rating: 0, comment: '' };
  };

  onMounted(() => {
    selectedImage.value = product.value.images[0];
    selectedColor.value = product.value.colors[0];
  }); 
</script>



<style scoped>
  .letter-spacing {
    letter-spacing: 2px;
  }

  .product-image {
    width: 100%;
    border-radius: 0;
    box-shadow: none;
    border: 1px solid #e0e0e0;
    transition: all 0.3s ease;
  }

  .product-image:hover {
    transform: none;
    border-color: #000;
  }

  .thumbnail-img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 0;
    cursor: pointer;
    border: 2px solid #e0e0e0;
    transition: all 0.2s ease;
  }

  .thumbnail-img:hover, .thumbnail-img.active {
    border-color: #000;
  }

  .color-option {
    width: 45px;
    height: 45px;
    border-radius: 0;
    cursor: pointer;
    border: 3px solid #e0e0e0;
    transition: all 0.2s ease;
    display: inline-block;
  }

  .color-option:hover, .color-option.active {
    border-color: #000;
    transform: none;
  }

  .size-option {
    min-width: 65px;
    padding: 12px 16px;
    border: 2px solid #000;
    border-radius: 0;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
    font-weight: 600;
    background-color: #fff;
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
    background-color: #000;
    color: white;
    padding: 14px 40px;
    border-radius: 0;
    font-weight: 700;
    border: 2px solid #000;
    transition: all 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .btn-add-cart:hover {
    background-color: #fff;
    color: #000;
    transform: none;
    box-shadow: none;
  }

  .btn-favorite {
    border: 2px solid #000;
    padding: 14px 20px;
    border-radius: 0;
    transition: all 0.2s ease;
    background-color: #fff;
  }

  .btn-favorite:hover {
    background-color: #000;
    color: #fff;
  }

  .btn-favorite.active {
    border-color: #000;
    background-color: #000;
    color: #fff;
  }

  .btn-favorite.active i {
    color: #dc3545;
  }

  .rating-stars i {
    color: #000;
    font-size: 1.1rem;
  }

  .review-card {
    background: #f9f9f9;
    border-radius: 0;
    padding: 25px;
    margin-bottom: 15px;
    border: 1px solid #e0e0e0;
    box-shadow: none;
  }

  .like-btn, .dislike-btn {
    border: 1px solid #000;
    padding: 6px 16px;
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
  }

  .like-btn.active {
    border-color: #000;
    background-color: #000;
    color: #fff;
  }

  .dislike-btn:hover {
    background-color: #000;
    color: #fff;
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
    border: 1px solid #e0e0e0;
    box-shadow: none;
  }

  .badge-custom {
    padding: 8px 16px;
    border-radius: 0;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.75rem;
  }
  
  .write-review-card {
    background: #f9f9f9;
    border-radius: 0;
    padding: 30px;
    margin-bottom: 25px;
    border: 1px solid #e0e0e0;
    box-shadow: none;
  }

  .star-rating-input i {
    cursor: pointer;
    font-size: 1.5rem;
    color: #e0e0e0;
    transition: color 0.2s ease;
  }

  .star-rating-input i:hover,
  .star-rating-input i.active {
    color: #000;
  }

  .form-control-custom {
    border-radius: 0;
    border: 2px solid #000;
  }

  .form-control-custom:focus {
    border-color: #000;
    box-shadow: none;
  }

  .btn-custom {
    border-radius: 0;
    padding: 12px 30px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 2px solid #000;
  }

  .btn-dark.btn-custom:hover {
    background-color: #fff;
    color: #000;
  }

  .alert-custom {
    border-radius: 0;
    border: 2px solid #0dcaf0;
  }

</style>