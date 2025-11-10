<template>
  <div class="container mb-5">    
    <h3 class="text-center mb-5" style="letter-spacing: 2px;">ABOUT ME</h3> 
      
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8"> 
        <div class="text-center">
          <img 
            class="profile-image mb-4" 
            src="../assets/images/dgh.jpg" 
            alt="Do Gia Huy - Project Developer"
          />
          <h3 class="fw-bold mb-2">Do Gia Huy</h3>
          <div class="text-muted mb-4">
            <span class="subtitle">Project Developer</span>
          </div>
          <p class="lh-md mb-4">
            The purpose of this project is to demonstrate my proficiency in VueJS and Bootstrap framework. 
            This application provides a modern e-commerce platform specializing in sneakers from various 
            premium brands, designed to deliver an intuitive shopping experience that meets and exceeds 
            user expectations for product discovery, comparison, and seamless checkout functionality.
          </p>
          <div class="d-grid gap-2 col-md-8 mx-auto">
            <a 
              href="mailto:104988294@student.swin.edu.au" 
              class="btn btn-view"
            > 
              <span>Send Email</span>
            </a>
          </div>
        </div>
      </div> 
    </div> 


    <hr class="text-black-50 mt-5 mb-5"/>

    
    <div>
      <h5 class="text-center mb-5" style="letter-spacing: 2px;">FEEDBACK</h5>  
      <div class="d-flex justify-content-center">
        <div class="card text-center border-0 shadow rounded-0 p-4 pt-2 h-100 w-100" style="width: 700px !important; background-color: #fcfdff;">
          <div class="card-body">
            <h4 class="card-title border-bottom pb-3 mb-3 px-5">Thanks for visit, <span class="text-danger">{{ name }}</span> !!</h4> 
            <form method="post" action="http://mercury.swin.edu.au/it000000/formtest.php">
              <div class="row pt-2"> 
                <div class="col-md-6 mb-4"> 
                  <input type="text" id="fName" name="firstName" v-model="fname" placeholder="First name *" required pattern="^[a-zA-Z]+$" class="form-control rounded-0"/>
                </div>  
                <div class="col-md-6 mb-4"> 
                  <input type="text" id="lName" name="lastName" v-model="lname" placeholder="Last name *" required pattern="^[a-zA-Z]+$" class="form-control rounded-0"/>
                </div>    

                <div class="mb-2"> 
                  <textarea id="message" name="message" rows="5" cols="30" placeholder="Enter your message" class="form-control rounded-0"></textarea>
                </div>

                <div><hr class="col-12 text-black-50"/> </div>
                            
                <p class="text-center mb-2" style="letter-spacing: 2px; font-size: 1.15rem;">Side question: Ronaldo or Messi?</p>  

                <div class="d-flex justify-content-center mb-4 g-2">
                  <input type="radio" id="cr7" value="Cristiano Ronaldo" name="footballer" autocomplete="off" v-model="footballer" class="btn-check" checked/>
                  <label class="btn btn-outline-dark me-3" for="cr7" style="border-radius: 0;">Cristiano Ronaldo</label> 

                  <input type="radio" id="lm10" value="Lionel Messi" name="footballer" autocomplete="off" v-model="footballer" class="btn-check"/>
                  <label class="btn btn-outline-dark" for="lm10" style="border-radius: 0;">Lionel Messi</label>
                </div>

                <div class="mb-4">
                  <div v-if="footballer === 'Cristiano Ronaldo'">
                    <img src="https://wallpapercat.com/w/full/a/8/c/101161-3840x2160-desktop-4k-cristiano-ronaldo-wallpaper-photo.jpg" width="500px" alt="Cristiano Ronaldo" class="img-fluid" />
                  </div>
                  <div v-else>
                    <img src="https://thanhnien.mediacdn.vn/Uploaded/sontung/2022_12_03/000-32wv86k-1653.jpg" width="500px" alt="Lionel Messi" class="img-fluid" />
                  </div>
                </div>
                <div class="text-center border-0">
                  <button type="submit" class="btn btn-view">SUBMIT <i class="bi bi-arrow-right"></i></button>
                </div>
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
  .profile-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 2px solid #202020;
    object-fit: cover;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .profile-image:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }  

  .subtitle {
    font-size: 1rem;
    font-weight: bold;
    color: #666;
    margin-bottom: 15px;
  } 
</style>