<template>
  <div class="container-fluid px-0">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="container pb-3 pt-5">
        <h1 class="display-6 text-center mb-2">ABOUT ME</h1>
        <p class="lead text-center mb-0">Get to know the developer behind this project</p>
      </div>
    </div>

    <div class="container my-5">
      <div class="row g-3">
        <!-- Left Column: Profile & Project Info -->
        <div class="col-lg-7">
          <!-- Profile Section -->
          <div class="profile-card bg-white border border-2 p-4 mb-3">
            <div class="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom border-2">
              <img 
                class="profile-image border border-dark border-3" 
                src="../assets/images/dgh.jpg" 
                alt="Do Gia Huy - Project Developer"
              />
              <div class="flex-grow-1">
                <h2 class="h3 fw-bold mb-1">Do Gia Huy</h2>
                <div class="text-secondary fw-semibold text-uppercase small" style="letter-spacing: 1px;">Project Developer</div>
              </div>
            </div>
            
            <div class="mb-4 mt-4">
              <p class="text-secondary lh-lg mb-0">
                The purpose of this project is to demonstrate my proficiency in VueJS and Bootstrap framework. 
                This application provides a modern e-commerce platform specializing in sneakers from various 
                premium brands, designed to deliver an intuitive shopping experience that meets and exceeds 
                user expectations for product discovery, comparison, and seamless checkout functionality.
              </p>
            </div>

            <div class="text-center">
              <a 
                href="mailto:104988294@student.swin.edu.au" 
                class="btn btn-dark border-2 px-4 py-2 fw-semibold btn-contact rounded-0"
                style="letter-spacing: 1px;"
              > 
                <i class="bi bi-envelope-fill me-2"></i>
                <span>Send Email</span>
              </a>
            </div>
          </div>

          <!-- Project Features Section -->
          <div class="features-card bg-white border border-2 p-4">
            <h3 class="h5 fw-bold text-uppercase mb-4 pb-3 border-bottom border-danger border-3" style="letter-spacing: 2px;">Project Features</h3>
            
            <div class="row g-0">
              <div class="col-12">
                <div class="d-flex gap-3 mb-4 pb-4 border-bottom feature-item">
                  <div class="feature-icon bg-dark text-white d-flex align-items-center justify-content-center flex-shrink-0" style="width: 50px; height: 50px;">
                    <i class="bi bi-grid-3x3-gap-fill fs-4"></i>
                  </div>
                  <div class="flex-grow-1">
                    <h5 class="fw-bold mb-2">Product Catalog</h5>
                    <p class="text-secondary small mb-0 lh-base">Browse through an extensive collection of premium sneakers with detailed product information, high-quality images, and comprehensive filtering options.</p>
                  </div>
                </div>

                <div class="d-flex gap-3 mb-4 pb-4 border-bottom feature-item">
                  <div class="feature-icon bg-dark text-white d-flex align-items-center justify-content-center flex-shrink-0" style="width: 50px; height: 50px;">
                    <i class="bi bi-search fs-4"></i>
                  </div>
                  <div class="flex-grow-1">
                    <h5 class="fw-bold mb-2">Advanced Search & Filter</h5>
                    <p class="text-secondary small mb-0 lh-base">Powerful search functionality with multiple filter options including brand, price range, size, and category to help users find their perfect sneakers.</p>
                  </div>
                </div>

                <div class="d-flex gap-3 mb-4 pb-4 border-bottom feature-item">
                  <div class="feature-icon bg-dark text-white d-flex align-items-center justify-content-center flex-shrink-0" style="width: 50px; height: 50px;">
                    <i class="bi bi-cart-check-fill fs-4"></i>
                  </div>
                  <div class="flex-grow-1">
                    <h5 class="fw-bold mb-2">Shopping Cart</h5>
                    <p class="text-secondary small mb-0 lh-base">Intuitive shopping cart system with real-time updates, quantity adjustments, and persistent storage for a seamless shopping experience.</p>
                  </div>
                </div>

                <div class="d-flex gap-3 mb-4 pb-4 border-bottom feature-item">
                  <div class="feature-icon bg-dark text-white d-flex align-items-center justify-content-center flex-shrink-0" style="width: 50px; height: 50px;">
                    <i class="bi bi-newspaper fs-4"></i>
                  </div>
                  <div class="flex-grow-1">
                    <h5 class="fw-bold mb-2">News & Updates</h5>
                    <p class="text-secondary small mb-0 lh-base">Stay informed with the latest sneaker releases, industry news, and trends through our integrated news feed with advanced search capabilities.</p>
                  </div>
                </div>

                <div class="d-flex gap-3 mb-4 pb-4 border-bottom feature-item">
                  <div class="feature-icon bg-dark text-white d-flex align-items-center justify-content-center flex-shrink-0" style="width: 50px; height: 50px;">
                    <i class="bi bi-phone-fill fs-4"></i>
                  </div>
                  <div class="flex-grow-1">
                    <h5 class="fw-bold mb-2">Responsive Design</h5>
                    <p class="text-secondary small mb-0 lh-base">Fully responsive layout built with Bootstrap, ensuring optimal viewing experience across all devices from mobile phones to desktop computers.</p>
                  </div>
                </div>

                <div class="d-flex gap-3 feature-item">
                  <div class="feature-icon bg-dark text-white d-flex align-items-center justify-content-center flex-shrink-0" style="width: 50px; height: 50px;">
                    <i class="bi bi-lightning-charge-fill fs-4"></i>
                  </div>
                  <div class="flex-grow-1">
                    <h5 class="fw-bold mb-2">Modern Vue.js Architecture</h5>
                    <p class="text-secondary small mb-0 lh-base">Built with Vue 3 Composition API, providing fast performance, reactive data handling, and maintainable code structure for scalability.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Feedback Form -->
        <div class="col-lg-5">
          <div class="feedback-card bg-white border border-2 p-4 position-sticky" style="top: 20px;">
            <h3 class="h5 fw-bold text-uppercase mb-3 pb-3 border-bottom border-danger border-3" style="letter-spacing: 2px;">Feedback</h3>
            
            <h5 class="text-center fw-semibold mb-3 pb-3 border-bottom">
              Thanks for visiting, <span class="text-danger fw-bold">{{ name }}</span>!
            </h5>
            
            <form method="post" action="http://mercury.swin.edu.au/it000000/formtest.php">
              <!-- Name Fields -->
              <div class="row g-3 mb-3">
                <div class="col-12">
                  <input 
                    type="text" 
                    id="fName" 
                    name="firstName" 
                    v-model="fname" 
                    placeholder="First name *" 
                    required 
                    pattern="^[a-zA-Z]+$" 
                    class="form-control border-dark py-2 rounded-0"
                  />
                </div>
                <div class="col-12">
                  <input 
                    type="text" 
                    id="lName" 
                    name="lastName" 
                    v-model="lname" 
                    placeholder="Last name *" 
                    required 
                    pattern="^[a-zA-Z]+$" 
                    class="form-control border-dark py-2 rounded-0"
                  />
                </div>
              </div>

              <!-- Message Field -->
              <div class="mb-4">
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4" 
                  placeholder="Enter your message" 
                  class="form-control border-dark rounded-0"
                ></textarea>
              </div>

              <!-- Side Question Divider -->
              <div class="text-center position-relative mb-4 mt-5">
                <hr class="text-secondary">
                <span class="position-absolute top-50 start-50 translate-middle bg-white px-3 fw-semibold text-dark">Ronaldo or Messi?</span>
              </div>

              <!-- Radio Buttons -->
              <div class="d-flex justify-content-center gap-2 mb-3">
                <input 
                  type="radio" 
                  id="cr7" 
                  value="Cristiano Ronaldo" 
                  name="footballer" 
                  v-model="footballer" 
                  class="btn-check" 
                  checked
                />
                <label class="btn btn-outline-dark border-2 px-3 py-2 small fw-semibold radio-btn" for="cr7">
                  C. Ronaldo
                </label>

                <input 
                  type="radio" 
                  id="lm10" 
                  value="Lionel Messi" 
                  name="footballer" 
                  v-model="footballer" 
                  class="btn-check"
                />
                <label class="btn btn-outline-dark border-2 px-3 py-2 small fw-semibold radio-btn" for="lm10">
                  L. Messi
                </label>
              </div>

              <!-- Player Image -->
              <div class="mb-4 overflow-hidden border border-dark">
                <div v-if="footballer === 'Cristiano Ronaldo'" class="player-image">
                  <img 
                    src="https://wallpapercat.com/w/full/a/8/c/101161-3840x2160-desktop-4k-cristiano-ronaldo-wallpaper-photo.jpg" 
                    alt="Cristiano Ronaldo" 
                    class="img-fluid w-100"
                  />
                </div>
                <div v-else class="player-image">
                  <img 
                    src="https://thanhnien.mediacdn.vn/Uploaded/sontung/2022_12_03/000-32wv86k-1653.jpg" 
                    alt="Lionel Messi" 
                    class="img-fluid w-100"
                  />
                </div>
              </div>

              <!-- Submit Button -->
              <div class="d-grid">
                <button type="submit" class="btn btn-view border-2 fw-bold" style="letter-spacing: 1px; padding: 0.7rem 0 !important;">
                  <span>SUBMIT</span>
                  <i class="bi bi-arrow-right ms-2"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';

  const fname = ref('');
  const lname = ref('');
  const footballer = ref('Cristiano Ronaldo')

  const name = computed(() => {
    return `${fname.value} ${lname.value}`.trim() || 'Stranger'
  })
</script>

<style scoped>  

  .hero-section .lead { 
    font-size: 1.1rem;
  }

  .profile-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    transition: all 0.3s ease;
  }

  .profile-image:hover {
    transform: scale(1.05);
    border-color: #b11414 !important;
  }

  .btn-contact:hover {
    background-color: #b11414 !important;
    border-color: #b11414 !important;
    transform: translateY(-2px);
  }

  .feature-icon {
    transition: all 0.3s ease;
  }

  .feature-item:hover .feature-icon {
    background-color: #b11414 !important;
    transform: scale(1.1);
  }

  .form-control:focus {
    border-color: #b11414 !important;
    box-shadow: 0 0 0 0.2rem rgba(177, 20, 20, 0.08) !important;
  }

  .btn-check + .radio-btn { 
    border-radius: 0px;
  }

  .btn-check:checked + .radio-btn {
    background-color: #2d2d2d !important;
    border-color: #2d2d2d !important;
    color: white !important;
    border-bottom: 3px solid #b11414 !important;
  }

  .radio-btn:hover {
    background-color: #2d2d2d !important;
    border-color: #2d2d2d !important;
    color: white !important;
  }

  .player-image img {
    transition: transform 0.3s ease;
  }

  .player-image:hover img {
    transform: scale(1.05);
  }

  .btn-danger {
    background-color: #b11414 !important;
    border-color: #b11414 !important;
  }

  .btn-danger:hover {
    background-color: #2d2d2d !important;
    border-color: #2d2d2d !important;
    transform: translateY(-2px);
  }

  @media (max-width: 991px) {
    .position-sticky {
      position: static !important;
    }

    .d-flex.align-items-center {
      flex-direction: column;
      text-align: center;
    }
  }

  @media (max-width: 576px) {
    .d-flex.justify-content-center.gap-2 {
      flex-direction: column;
    }
  }
</style>