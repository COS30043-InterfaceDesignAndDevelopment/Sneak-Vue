<template>
  <div class="container mt-5">
    <div class="row" style="min-height: 55vh; margin-bottom: 7rem;">
      <!-- Left Column - Image/Branding -->
      <div class="col-lg-6 d-flex align-items-center justify-content-center px-3">
        <div class="mb-3">  
          <div class="full-image-section mt-4 d-flex align-items-center justify-content-center">
            <h1 class="display-6 text-white text-center fw-bold z-1">Experience your Journey <div>with <span class="badge bg-white rounded-0 text-black">Sneak<span style="color: red;">Vue</span></span></div></h1>
          </div> 
        </div>
      </div>

      
      <!-- Right Column - Login Form -->
      <div class="col-lg-6 d-flex align-items-center px-3">
        <div class="w-100">
          <h4 class="mb-2 fw-bold" style="letter-spacing: 1px;">
            <span v-if="isRegistering">SIGN UP</span>
            <span v-else>LOGIN</span>
          </h4> 
          <p class="mb-3">Enjoy members-only access to exclusive products, experiences, offers and more.</p>

          <div class="row mb-4 mx-0 gap-2 pb-4 border-bottom border-black">
            <div class="login-icon"><i class="bi bi-google text-danger"></i></div>
            <div class="login-icon"><i class="bi bi-apple text-success"></i></div>
            <div class="login-icon"><i class="bi bi-facebook text-primary"></i></div>  
          </div>

          <form @submit.prevent="isRegistering ? authStore.register(userData) : authStore.login(userData)">
            <div id="registration" class="collapse col-12 mb-2">
              <input 
                type="text" 
                id="username" 
                name="username" 
                v-model="userData.username"
                placeholder="Username *"  
                :required="isRegistering" 
                minlength="5"
                maxlength="20"
                class="form-control rounded-0 py-2 border-black"/> 
            </div>

            <input 
              type="email" 
              id="email" 
              name="email" 
              v-model="userData.email"
              placeholder="Email address *" 
              required 
              pattern=".+@.+\..+"
              class="form-control mb-2 rounded-0 py-2 border-black"
            />
            
            <small class="text-muted">Must be at least 8 characters and include one special character ($%^&*).</small>

            <div class="input-group">
              <input 
                :type="passwordFieldType" 
                id="password" 
                name="password" 
                placeholder="Password *" 
                v-model="userData.password"
                required 
                minlength="8" 
                pattern="^(?=.*[$%^&*]).{8,}$" 
                class="form-control mb-2 rounded-0 py-2 border-black"/>

              <button class="btn btn-transparent mb-2 rounded-0 py-2 border-black" type="button" @click="togglePasswordVisibility">
                <i :class="eyeIconClass"></i>
              </button>
            </div>

            
            <div id="registration" class="collapse col-12 mb-2">
              <input 
                type="password" 
                id="confirmpassword" 
                name="confirmPassword" 
                placeholder="Confirm password *" 
                v-model="confirmPassword" 
                :required="isRegistering" 
                minlength="8" 
                pattern="^(?=.*[$%^&*]).{8,}$" 
                class="form-control rounded-0 py-2 border-black"
                @input="passwordMatch"/> 

              <div v-if="passwordError" class="text-danger mt-2">
                {{ passwordError }}
              </div>
            </div>


            <div class="mb-3">
              <span v-if="isRegistering">Already have account? </span>
              <span v-else>Don't have an account? </span>
              <button 
                type="button" 
                class="text-success fw-bold border-0 bg-transparent p-0"
                data-bs-toggle="collapse" 
                data-bs-target="#registration"
                @click="isRegistering = !isRegistering; passwordError = ''; confirmPassword = ''" 
                ><span v-if="isRegistering">Login</span>
                <span v-else>Create account</span>
              </button>
            </div>

            <div class="form-check mb-3">
              <input type="checkbox" id="terms" required class="form-check-input rounded-0 border-black">
              <label class="form-check-label small" for="terms">
                I have read and accept the 
                <button 
                  type="button"
                  class="fw-bold border-0 bg-transparent p-0"
                  data-toggle="modal" 
                  data-target="#termsModal"
                  >Terms and Conditions</button> of SneakVue
              </label>
            </div>

            <div class="d-flex align-items-center">
              <button type="submit" :disabled="hasError" class="btn btn-view" style="font-size: 0.8rem !important;">CONTINUE <i class="bi bi-arrow-right"></i></button>

              <div v-if="authStore.isLoading" class="spinner-border text-danger ms-3" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </form>

          <!-- Modal -->
          <div class="modal fade" id="termsModal" tabindex="-1" role="dialog" aria-labelledby="termsCondition" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="termsCondition">Terms and Conditions</h5> 
                </div>
                <div class="modal-body">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                  <br/><br/>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. 
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
  import { ref, computed } from 'vue';
  import { useAuthStore } from '../stores/auth'; 

  const authStore = useAuthStore();
  const userData = ref({username: '', email: '', password: ''});
  const showPassword = ref(false);
  const confirmPassword = ref('');
  const passwordError = ref('');
  const isRegistering = ref(false);
  
  const passwordFieldType = computed(() => showPassword.value ? 'text' : 'password'); 
  const eyeIconClass = computed(() => showPassword.value ? 'bi bi-eye-slash' : 'bi bi-eye');
  const togglePasswordVisibility = () => showPassword.value = !showPassword.value;
  const passwordMatch = () => userData.value.password !== confirmPassword.value ? passwordError.value = "Passwords do not match!" : passwordError.value = ""; 
  const hasError = computed(() => isRegistering.value && passwordError.value.length > 0);
</script>



<style scoped>  
  .text-logo {
    font-family: 'Amarante', serif;
    font-size: 2rem;
  }

  .full-image-section {
    height: 420px; 
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
    padding: 6.5rem;
  }

  .login-icon {
    border: 1px solid black;
    background-color: white;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    width: 45px;
    cursor: pointer;
  }

  .img-fluid {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 992px)  {
    .full-image-section h1 {
      position: relative;  
      z-index: 1;
      padding: 10rem;
    }  
  }
</style>