<template>
  <button
    v-show="isScrollVisible"
    @click="scrollToTop"
    class="btn rounded-0 text-white scroll-to-top-btn"
  >
    <i class="bi bi-arrow-up"></i> GO TO TOP
  </button>
</template>



<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';

  const isScrollVisible = ref(false);
  
  onMounted(() => window.addEventListener('scroll', handleScroll));
  onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll));

  const handleScroll = () => isScrollVisible.value = window.scrollY > 200;
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'  
    });
  };

</script>



<style scoped> 
  .scroll-to-top-btn {
    font-size: 0.8rem;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000; 
    background-color: #b80000;
    border: 2px solid transparent;
    letter-spacing: 1.5px; 
  }

  .scroll-to-top-btn:hover { 
    background-color: #fafafa;
    border: 2px solid #b80000;
    color: #b80000 !important;
    letter-spacing: 1.5px; 
  }
</style>