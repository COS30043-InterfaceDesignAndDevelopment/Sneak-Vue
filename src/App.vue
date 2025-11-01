<template>
  <div class="site">
    <Header v-if="!$route.meta.hideComponents"></Header>
    <main>
      <router-view></router-view>
    </main>
    <Footer v-if="!$route.meta.hideComponents"></Footer>  
  </div>
</template>

<script setup>
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue'; 
</script>