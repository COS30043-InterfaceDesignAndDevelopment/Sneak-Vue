import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from 'vue-router'; 


export const useAuthStore = defineStore('auth', () => {
  const API = "http://127.0.0.1:8000"; 
  const router = useRouter();
  const isLoading = ref(false);
  const error = ref('');
  const token = ref(localStorage.getItem('token') || null);
  const user = ref(JSON.parse(localStorage.getItem('user_data')) || null);

  // Check authentication reactive
  const isAuthenticated = computed(() => !!token.value);
  const isAuthorised = computed(() => {
    if (user.value) {
      return !!(user.value.user_metadata.role === 'admin');
    }
  })

  // ACTION
  const login = async (userData) => {
    isLoading.value = true;
    
    try {
      const res = await fetch(`${API}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password
        })
      });

      if(!res.ok) {
        const error = await res.text();
        alert('Log in failed: ' + JSON.parse(error).message);
        return;
      };

      const result = await res.json(); 
      if (result.success) {
        alert('Logged in successfully!');
        token.value = result.token; 
        localStorage.setItem('token', result.token); 
        router.push('/user');
      };

    } catch (e) {
      console.error('An error occured: ', e);
      alert('An error occured: ' + e);
    } finally { 
      isLoading.value = false; 
    }
  };


  const register = async (userData) => {  
    isLoading.value = true;

    try {
      const res = await fetch(`${API}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password
        })
      });

      if(!res.ok) {
        const error = await res.text();
        alert('Registration failed: ' + JSON.parse(error).message);
        return;
      };

      const result = await res.json(); 
      if (result.success) {
        alert('Registration successful! Please confirm your email.');
        window.location.reload(); 
        router.push('/login');
      };

    } catch (e) {
      console.error('An error occured: ', e);
      alert('An error occured: ' + e); 
    } finally {
      isLoading.value = false; 
    };
  }; 


  const logout = async () => {  
    isLoading.value = true;

    try {
      const res = await fetch(`${API}/user/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if(!res.ok) {
        const error = await res.text();
        alert('Log out failed: ' + JSON.parse(error).message);
        return;
      };

      const result = await res.json(); 
      if (result.success) {
        alert('Logged out successful!');
        localStorage.removeItem('token');
        localStorage.removeItem('user_data');
        router.push('/login');
      };

    } catch (e) {
      console.error('An error occured: ', e);
      alert('An error occured: ' + e); 
    } finally {
      isLoading.value = false;
    };
  };


  const getUserData = async () => {    
    if (!token.value) {
      error.value = 'No token found. Please login.';
      return;
    };
    
    isLoading.value = true;
    error.value = null;

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
      } else {
        error.value = data.message;
        alert(data.message);
      };

    } catch (e) {
      console.error('An error occured: ', e);
      alert('An error occured: ' + e);
      error.value = 'Failed to fetch user information';
    } finally {
      isLoading.value = false;
    }
  };


  return {
    token,
    user,
    isLoading,  
    error,
    isAuthenticated,
    isAuthorised,
    login,
    register,
    logout,
    getUserData
  }
});