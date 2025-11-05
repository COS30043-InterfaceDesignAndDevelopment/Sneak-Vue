<template>
  <div class="site">
    <Header></Header>
    <main>
      <router-view></router-view>
      <ScrollTop></ScrollTop>
    </main>
    <Footer></Footer>  
  </div>
</template> 

<script setup>
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue'; 
  import ScrollTop from './components/ScrollTop.vue';
</script>