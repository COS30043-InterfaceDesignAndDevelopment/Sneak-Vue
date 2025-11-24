import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useFavoriteStore = defineStore('favorites', () => {
  const API = "http://127.0.0.1:8000"; 
  const favorites = ref([]); 
  const error = ref('');
  const isLoadingFavorites = ref(false);
  const isWorking = ref(false);
  const favoriteLength = computed(() => {
    return favorites.value.length;
  });

  // ACTIONS
  const fetchFavorites = async (userId) => {
    isLoadingFavorites.value = true;
    
    try {
      const res = await fetch(`${API}/favorites/${userId}`);
      favorites.value = await res.json();
    } catch (e) {
      console.error('Error fetching favorites list:', e); 
      error.value = 'Failed to fetch favorites list'; 
    } finally {
      isLoadingFavorites.value = false;
    }
  };

  
  const insertFavorite = async (userId, productId) => {
    isWorking.value = true;  

    try {
      const res = await fetch(`${API}/favorites/insert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({userId, productId})
      });

      if(!res.ok) {
        const error = await res.text();
        alert('Favorite add failed: ' + error);
        return;
      };
      
    } catch (e) {
      console.error('An error occured: ', e);
      alert('An error occured: ' + e);
    } finally {
      isWorking.value = false;
    }
  };
 

  const removeFavorite = async (favoriteId) => {
    isWorking.value = true; 

    try {
      const res = await fetch(`${API}/favorites/delete/${favoriteId}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        const error = await res.text();
        alert('Delete favorite item failed: ' + error);
        return;
      };
      
    } catch (e) {
      console.error('An error occured during removing...', e);
      alert('An error occured during removing...');
    } finally {
      isWorking.value = false;
    }
  }; 


  return { 
    favorites, 
    favoriteLength,
    error,
    isLoadingFavorites,
    isWorking,
    fetchFavorites, 
    insertFavorite,
    removeFavorite
  }
});
