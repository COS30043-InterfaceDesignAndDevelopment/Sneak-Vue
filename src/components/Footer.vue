<template>
  <footer class="bg-black text-white">
    <!-- Social media -->
    <section class="p-4 border-bottom footer-social">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 text-start">Get connected with me on social networks:</div>
          <div class="col-lg-6 text-end">
            <a href="" class="me-4 text-reset"><i class="bi bi-facebook"></i></a>
            <a href="" class="me-4 text-reset"><i class="bi bi-instagram"></i></a>
            <a href="https://www.linkedin.com/in/do-huy-294353354/" class="me-4 text-reset"><i class="bi bi-linkedin"></i></a>
            <a href="https://github.com/Robertise" class="text-reset"><i class="bi bi-github"></i></a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Links  -->
    <section class="footer-links">
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-4">
            <h6 class="text-uppercase mb-3" style="letter-spacing: 2px;">Information</h6>
            <p>Name: Do Gia Huy</p>
            <p>Student ID: 104988294</p>
            <p>Mail: 104988294@student.swin.edu.au</p>
          </div>

          <div class="col-md-4 text-center">
            <h6 class="text-uppercase mb-4" style="letter-spacing: 2px;">Navigation</h6>
            <p><router-link class="nav-link" to="/">Home</router-link></p>
            <p><router-link class="nav-link" to="/news">News</router-link></p>
            <p><router-link class="nav-link" to="/about">About</router-link></p>
          </div>

          <div class="col-md-4 text-end">
            <h6 class="text-uppercase mb-4" style="letter-spacing: 2px;">Contact</h6>
            <p>Swinburne, HCMC Tan Binh District<i class="bi bi-house-door-fill ms-3"></i></p>
            <p>huydo170705@gmail.com<i class="bi bi-envelope-fill ms-3"></i></p>
            <p>+84 86 216 5876<i class="bi bi-telephone-fill ms-3"></i></p>
          </div>
        </div>
      </div>
    </section>

    <!-- Copyright -->
    <div class="copyright text-center p-4">© 2025 Do Gia Huy Copyright</div>
  </footer> 
</template>



<script setup>

</script>



<style scoped>
  .footer-links a {
    color: #ffffff;
  }

  .footer-links a.router-link-exact-active {
    color: #ffffff;
    font-weight: bold;
    text-decoration: none;
  }

  .copyright {color: #ffffff80;}

  /* md breakpoint 768px */
  @media only screen and (max-width: 768px) {
    .footer-social .col-lg-6 {
      text-align: center !important;
      margin-bottom: 1rem !important;
    }

    .footer-links .col-md-4 {
      text-align: center !important;
      margin-bottom: 3rem !important;
    }
  }
</style>