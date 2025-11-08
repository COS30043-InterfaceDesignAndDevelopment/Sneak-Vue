import { defineStore } from "pinia";
import { ref } from "vue";

export const useReviewStore = defineStore('reviews', () => {
  const API = "http://127.0.0.1:8000";  
  const error = ref(''); 
  const isLoading = ref(false);
  const isSending = ref(false);
  const reviews = ref([]);
  
  // ACTIONS
  const fetchReviews = async (productId, userId = null) => {
    isLoading.value = true;
    try {
      const url = userId 
        ? `${API}/reviews/${productId}?user_id=${userId}`
        : `${API}/reviews/${productId}`;
        
      const res = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      reviews.value = await res.json();
    } catch (e) {
      console.error('Error fetching reviews:', e); 
      error.value = 'Failed to fetch reviews data';
      alert('Failed to fetch reviews data');
    } finally {
      isLoading.value = false;
    }
  };
 

  const insertReview = async (newReview, userId, productId) => {
    isSending.value = true;  

    if (!newReview || !userId || !productId) {
      alert('Invalid review data.');
      return;
    };

    const review = { userId, productId, ...newReview };

    try {
      const res = await fetch(`${API}/reviews/insert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(review)
      });

      if(!res.ok) {
        const error = await res.text();
        alert('Add new review failed: ' + error);
        return;
      };

    } catch (e) {
      console.error('An error occured: ', e);
      alert('An error occured: ' + e);
    } finally {
      isSending.value = false;
    }
  };


  const actionReview = async (reviewId, action, userId) => { 
    if (!reviewId || !action || !userId) {
      console.error('Invalid action/data.');
      return false;
    };

    try {
      const res = await fetch(`${API}/reviews/action`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({reviewId, action, userId})
      });

      if(!res.ok) {
        const errorText = await res.text();
        console.error('Action failed: ' + errorText);
        return false;
      };

      const data = await res.json();
      
      const reviewIndex = reviews.value.findIndex(r => r.review_id === reviewId);
      if (reviewIndex !== -1 && data) {
        reviews.value[reviewIndex] = {
          ...reviews.value[reviewIndex],
          likes: data.likes,
          dislikes: data.dislikes,
          userLiked: data.userLiked,
          userDisliked: data.userDisliked
        };
      }

      return true;

    } catch (e) {
      console.error('An error occured: ', e);
      return false;
    } 
  };
 


  return { 
    error,
    isLoading,  
    isSending,
    reviews,
    fetchReviews,
    insertReview,
    actionReview
  }
});