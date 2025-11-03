import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const authStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null);

  // Check authentication reactive
  const isAuthenticated = computed(() => !!token.value);

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
    login,
    logout
  }
});
