<template>
  <div class="site">
    <Header></Header>
    <main>
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