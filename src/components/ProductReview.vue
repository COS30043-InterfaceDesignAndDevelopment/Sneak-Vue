<template>
  <div class="row">
    <div class="col-12">
      <h3 class="mb-4 text-uppercase text-center" style="letter-spacing: 2px;">Reviews</h3>

      <!-- Loading State -->
      <div v-if="reviewStore.isLoading" class="text-center py-5">
        <div class="spinner-border text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Write Review -->
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
</template>



<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/auth'; 
  import { useReviewStore } from '../stores/reviews'; 

  const reviewStore = useReviewStore();
  const router = useRouter();
  const authStore = useAuthStore();
  const props = defineProps({ productId: String });
  const hoverRating = ref(0);
  const newReview = ref({
    rating: 0,
    comment: ''
  });
 

  const currentUserId = computed(() => authStore.user?.user_metadata?.sub || null);

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
      props.productId
    );
 
    // Refetch reviews with userId to update the list
    await reviewStore.fetchReviews(props.productId, currentUserId.value);
    newReview.value = { rating: 0, comment: '' }; 
  };

  const reactReview = async (reviewId, action) => {
    if (!authStore.isAuthenticated || !currentUserId.value) {
      alert('Please login to react to reviews!');
      router.push('/login');
      return;
    }

    await reviewStore.actionReview(reviewId, action, currentUserId.value); 
  };
  

  onMounted(async () => {  
    await reviewStore.fetchReviews(props.productId, currentUserId.value);
  });
</script>



<style scoped>
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
 
</style>