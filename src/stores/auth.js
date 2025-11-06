import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null);
  const user = ref(JSON.parse(localStorage.getItem('user_data')) || null);

  // Check authentication reactive
  const isAuthenticated = computed(() => !!token.value);
  const isAuthorised = computed(() => {
    if (user.value) {
      return !!(user.value.user_metadata.role === 'admin');
    }
  })

  // Action functions
  function login(aToken) {
    token.value = aToken;
    localStorage.setItem('token', aToken);
  };

  function logout() {
    token.value = null;
    localStorage.removeItem('token');
  };

  return {
    token,
    isAuthenticated,
    isAuthorised,
    login,
    logout
  }
});
