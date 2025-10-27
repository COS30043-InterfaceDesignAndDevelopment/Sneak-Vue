<template>
  <div>
    <Header></Header>
    <main class="container">
      <router-view></router-view>
    </main>
    <Footer></Footer>  
  </div>
</template>

<script setup>
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';

</script>

<style scoped>

</style>