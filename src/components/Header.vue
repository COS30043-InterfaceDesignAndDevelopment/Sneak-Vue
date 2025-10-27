<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-info">
    <div class="container position-relative">

      <!-- Toggler -->
      <button
        class="navbar-toggler position-absolute start-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Centered logo -->
      <a class="navbar-brand mx-auto position-absolute start-50 translate-middle-x" href="/">
        <img src="/sneakvue-logo.png" alt="" width="30" height="24" class="d-inline-block align-text-center">
        <span class="logo-text ms-2 fw-bold">Sneak<span class="text-danger">Vue</span></span>
      </a>

      <!-- Menu -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/products">Products</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/news">News</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/about">About</router-link></li>
        </ul>
      </div>

      <!-- Login -->
      <form class="d-flex ms-auto">
        <button class="btn btn-outline-success me-2" type="button">Main button</button>
        <button class="btn btn-sm btn-outline-secondary" type="button">Smaller button</button>
      </form>

    </div>
  </nav>

</template> 

<style scoped>
  .logo-text {
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    letter-spacing: 0.1em;
  }
</style>