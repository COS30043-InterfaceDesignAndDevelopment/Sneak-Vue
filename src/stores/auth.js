import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore('auth', () => {
  const API = "http://127.0.0.1:8000";
  const token = ref(localStorage.getItem('token') || null);
  const user = ref(JSON.parse(localStorage.getItem('user_data') || 'null'));

  // Computed states
  const isAuthenticated = computed(() => !!token.value);
  const isAuthorised = computed(() => user.value?.user_metadata?.role === 'admin');

  // Fetch user data
  const getUserData = async () => {      
    try {
      const res = await fetch(`${API}/user/information`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`
        }
      });

      const data = await res.json();

      if (data.success) {
        user.value = data.user;
        localStorage.setItem('user_data', JSON.stringify(data.user));
        return data.user;
      } else { 
        alert(data.message);
      }
    } catch (e) {
      console.error('Error fetching user:', e); 
      alert('Failed to fetch user information');
    }  
  };

  // Logout
  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
  }

  return {
    token,
    user,
    isAuthenticated,
    isAuthorised, 
    getUserData,
    logout
  }
});
