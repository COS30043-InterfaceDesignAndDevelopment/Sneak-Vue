<template>
  <div class="container mb-5">
    <!-- <h1>This is protected content</h1>
    <p v-if="user">Username: {{ user.user_metadata.username }}</p>
    <p v-if="user">Email: {{ user.user_metadata.email }}</p> 
    <p v-else>Loading...</p>
		<button @click="logout"> Logout </button> -->

    <div class="row">
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>

      <div class="col-lg-6 col-xl-4 mb-3">

      </div>

    </div>


  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router'

  const API = "http://127.0.0.1:8000";
  const router = useRouter();
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);

  onMounted(() => {
    fetchUser();
    console.log(user.value);
  });

  const fetchUser = async () => {
    const access_token = localStorage.getItem('token');
    
    if (!access_token) {
      error.value = 'No token found. Please login.';
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const res = await fetch(`${API}/user/information`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        user.value = data.user;
      } else {
        error.value = data.message;
        alert(data.message);
      }
    } catch (e) {
      console.error('Error fetching user:', e);
      error.value = 'Failed to fetch user information';
      alert('Failed to fetch user information');
    } finally {
      loading.value = false;
    }
  };


  // Logout function 
  const logout = async () => {  
    const res = await fetch(`${API}/user/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json());

    if (res.success) {
      alert('Logged out successful!');
      localStorage.removeItem('token');
      router.push('/login');
    } else {
      alert(res.message);
    }
  };

</script>