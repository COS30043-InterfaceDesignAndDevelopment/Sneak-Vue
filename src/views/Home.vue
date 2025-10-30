<template>
  <div>
    <div class="container">
      <!-- Section: Introduction -->
      <div class="position-relative mb-5" style="z-index: 1;">
        <div class="row g-5 align-items-center min-vh-75">
          <!-- Text Column -->
          <div class="col-md-6 pe-lg-5">
            <div class="subtitle">Premium Performance Footwear</div>
            <h1 class="heading">Step into comfort that moves with you every mile</h1>
            <p class="mb-4">Discover our collection of Performance Footwear, engineered for optimal support and responsiveness. Every step you take is cushioned and propelled, giving you lasting comfort whether you’re covering a short distance or going the extra mile.</p>
            <div class="btn-discover-wrapper">
              <a class="btn btn-discover pe-5">Shop Now</a>
            </div>
          </div>

          <!-- Image Column -->
          <div class="col-md-6 d-flex justify-content-end position-relative">
            <div class="position-relative">
              <div class="position-absolute bottom-0 start-0 shadow-circle" style="transform: translate(35%, 80%);"></div>
              <img
                src="../assets/images/nike-jordan.png"
                alt="Event Image"
                class="img-fluid position-relative"
                style="transition: transform 0.3s ease; z-index: 2; width: 450px;"
                onmouseover="this.style.transform='scale(1.02)';"
                onmouseout="this.style.transform='scale(1)';"
              />
            </div>
          </div>
        </div>
      </div>


      <hr class="container text-black-50"></hr>

      
      <!-- Section: Footwear -->
      <div>
        <h5 class="text-center mt-5 mb-4" style="letter-spacing: 2px;">FOOTWEAR</h5>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4">
          <div
            v-for="(product, index) in sneakerData.splice(0, 4)"
            :key="index"
            class="col mb-1 g-3"
          >
            <div class="card shadow-md rounded-0">
              <img
                class="card-img-top rounded-0"
                :src="product.imageUrl"
                alt="Product image"
                style="height: 400px; width: 100%; object-fit: contain; object-position: center; background-color: #eeeff0;"
              />
              <div class="card-body ps-0 pe-0">
                <p class="h6" style="margin-bottom: 2px;">{{ product.product_name }}</p>
                <p class="h6 mb-2 text-secondary">{{ product.brand }}</p>
                <p class="">${{ product.price }}</p> 
              </div>
            </div>
          </div> 
          <div class="col-12 mx-auto mt-4 m-5">
            <div class="text-center border-0">
              <button class="btn btn-view">VIEW ALL PRODUCTS <i class="bi bi-arrow-right"></i></button>
            </div>
          </div>
        </div>
      </div>


      <hr class="container text-black-50"></hr>


      <!-- Section: Clothing -->
      <div>
        <h5 class="text-center mt-5 mb-4" style="letter-spacing: 2px;">CLOTHING</h5>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4">
          <div
            v-for="(product, index) in clothingData.splice(0, 4)"
            :key="index"
            class="col mb-1 g-3"
          >
            <div class="card shadow-md rounded-0">
              <img
                class="card-img-top rounded-0"
                :src="product.imageUrl"
                alt="Product image"
                style="height: 400px; width: 100%; object-fit: contain; object-position: center; background-color: #eeeff0;"
              />
              <div class="card-body ps-0 pe-0">
                <p class="h6" style="margin-bottom: 2px;">{{ product.product_name }}</p>
                <p class="h6 mb-2 text-secondary">{{ product.brand }}</p>
                <p class="">${{ product.price }}</p> 
              </div>
            </div>
          </div> 
          <div class="col-12 mx-auto mt-4 m-5">
            <div class="text-center border-0">
              <button class="btn btn-view">VIEW ALL PRODUCTS <i class="bi bi-arrow-right"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="full-image-section mt-4 d-flex align-items-center justify-content-center">
      <h1 class="display-3 text-white text-center fw-bold z-1">Experience your Journey <div>with <span class="badge bg-white rounded-0 text-black">Sneak<span style="color: red;">Vue</span></span></div></h1>
    </div>
  </div>
</template>



<script setup>
  import { ref, onMounted } from 'vue';
  import mockData from '../assets/mock-sneaker-data.json';

  const data = ref([]);
  const sneakerData = ref([]);
  const clothingData = ref([]);

  onMounted(() => {
    data.value = mockData.map(d => d);
    sneakerData.value = mockData.filter(d => d.type === "Sneakers").map(d => d);
    clothingData.value = mockData.filter(d => d.type !== "Sneakers").map(d => d);
  })

</script>



<style scoped>
  .shadow-circle {
    width: 300px;
    height: 45px;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 70%);
    border-radius: 50%;
    filter: blur(8px);
    opacity: 0.6;
  }

  .subtitle {
    font-size: 1.2rem;
    font-weight: bold;
    color: #666;
    margin-bottom: 15px;
  }

  .heading {
    font-size: 64px;
    font-weight: bolder;
    line-height: 1.1;
    color: #000;
    margin-bottom: 20px;
  }
 
  .btn-discover-wrapper {
    display: inline-block;
    filter: drop-shadow(8px 8px 0px #b11414);
    transition: filter 0.3s ease, transform 0.3s ease;
  }

  .btn-discover-wrapper:hover {
    filter: none;
    transform: translateY(-3px);
  }

  .btn-discover {
    padding: 16px 40px;
    background: #f8fafd;
    color: rgb(0, 0, 0);
    font-weight: 600;
    border-radius: 0;
    border: 1px solid black;
    clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 100%, 0 100%);
    transition: all 0.3s ease;
  }

  .btn-discover:hover {
    background-color: #b11414;
    color: white;
    border: 1px solid transparent;
  }

  .card {
    border: 1px solid transparent;
    background-color: transparent;
  } 

  .btn-view {
    padding: 10px 40px;
    background: #f8fafd;
    filter: drop-shadow(3px 3px 0px #b11414);
    color: #000000;
    font-weight: 600;
    border-radius: 0;
    border: 1px solid black;
    transition: all 0.3s ease;
  }

  .btn-view:hover {
    background-color: #b11414;
    filter: none;
    transform: translateY(-3px);
    color: white;
    border: 1px solid transparent;
  }

  .full-image-section {
    height: 500px; 
    background-image: url('https://images.unsplash.com/photo-1577309753037-3074a5ff9d69?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8');
    background-size: cover;       
    background-position: center; 
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
  }

  .full-image-section::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.459); 
    z-index: 0;
  }

  .full-image-section h1 {
    position: relative;  
    z-index: 1;
  }
</style>
