<template>
  <div class="accordion accordion-flush px-0 mx-0 mb-2" id="filterAccordion">
    <div class="accordion-item py-1">
      <h2 class="accordion-header" id="price-heading">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#price-collapse" aria-expanded="false" aria-controls="price-collapse">
          PRICE RANGE
        </button>
      </h2>
      <div id="price-collapse" class="accordion-collapse collapse" aria-labelledby="price-heading" data-bs-parent="#filterAccordion">
        <div class="accordion-body pt-5 pb-4 px-4">
          <div class="px-2"> 
            <SliderElement
              v-model="priceRange"
              :format="{ prefix: '$', thousand: ' ' }"
              :step="5"
              :min="0"
              :max="1000"
              :merge="100"
            />   
          </div>
        </div>
      </div>
    </div>  

    <div class="accordion-item py-1">
      <h2 class="accordion-header" id="gender-heading">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#gender-collapse" aria-expanded="false" aria-controls="gender-collapse">
          GENDER
        </button>
      </h2>
      <div id="gender-collapse" class="accordion-collapse collapse" aria-labelledby="gender-heading" data-bs-parent="#filterAccordion">
        <div class="accordion-body">
          <div class="row g-2">
            <div class="col-4">
              <input type="radio" class="btn-check" name="gender-options" id="gender-all" value="all" v-model="gender" autocomplete="off" checked @change="resetPage">
              <label class="btn btn-outline-dark w-100" for="gender-all">All</label>
            </div>
            <div
              v-for="(pGender, index) in [...new Set(productStore.products.map(p => p.gender))]"
              :key="index" 
              class="col-4"
            > 
              <input type="radio" class="btn-check" name="gender-options" :id="pGender" :value="pGender" v-model="gender" autocomplete="off" @change="resetPage">
              <label class="btn btn-outline-dark w-100" :for="pGender">{{ pGender }}</label> 
            </div>
          </div>
        </div>
      </div> 
    </div>

    <div class="accordion-item py-1">
      <h2 class="accordion-header" id="type-heading">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#type-collapse" aria-expanded="false" aria-controls="type-collapse">
          TYPE
        </button>
      </h2>
      <div id="type-collapse" class="accordion-collapse collapse" aria-labelledby="type-heading" data-bs-parent="#filterAccordion">
        <div class="accordion-body">
          <div class="row g-2">
            <div class="col-4">
              <input type="radio" class="btn-check" name="type-options" id="type-all" value="all" v-model="type" autocomplete="off" checked @change="resetPage">
              <label class="btn btn-outline-dark w-100" for="type-all">All</label>
            </div>
            <div
              v-for="(pType, index) in [...new Set(productStore.products.map(p => p.type))]"
              :key="index" 
              class="col-4"
            > 
              <input type="radio" class="btn-check" name="type-options" :id="pType" :value="pType" v-model="type" autocomplete="off" @change="resetPage">
              <label class="btn btn-outline-dark w-100" :for="pType">{{ pType }}</label> 
            </div>
          </div>
        </div>
      </div>
    </div>  

    <div class="accordion-item py-1">
      <h2 class="accordion-header" id="category-heading">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#category-collapse" aria-expanded="false" aria-controls="category-collapse">
          CATEGORY
        </button>
      </h2>
      <div id="category-collapse" class="accordion-collapse collapse" aria-labelledby="category-heading" data-bs-parent="#filterAccordion">
        <div class="accordion-body">
          <div class="row g-2">
            <div class="col-4">
              <input type="radio" class="btn-check" name="category-options" id="category-all" value="all" v-model="category" autocomplete="off" checked @change="resetPage">
              <label class="btn btn-outline-dark w-100" for="category-all">All</label>
            </div>
            <div
              v-for="(pCategory, index) in [...new Set(productStore.products.map(p => p.category))]"
              :key="index" 
              class="col-4"
            > 
              <input type="radio" class="btn-check" name="category-options" :id="pCategory" :value="pCategory" v-model="category" autocomplete="off" @change="resetPage">
              <label class="btn btn-outline-dark w-100" :for="pCategory">{{ pCategory }}</label> 
            </div>
          </div>
        </div>
      </div> 
    </div>

    <div class="accordion-item py-1">
      <h2 class="accordion-header" id="brand-heading">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#brand-collapse" aria-expanded="false" aria-controls="brand-collapse">
          BRAND
        </button>
      </h2>
      <div id="brand-collapse" class="accordion-collapse collapse" aria-labelledby="brand-heading" data-bs-parent="#filterAccordion">
        <div class="accordion-body">
          <div class="row g-2">
            <div class="col-4">
              <input type="radio" class="btn-check" name="brand-options" id="brand-all" value="all" v-model="brand" autocomplete="off" checked @change="resetPage">
              <label class="btn btn-outline-dark w-100" for="brand-all">All</label>
            </div>
            <div
              v-for="(pBrand, index) in [...new Set(productStore.products.map(p => p.brand))]"
              :key="index" 
              class="col-4"
            > 
              <input type="radio" class="btn-check" name="brand-options" :id="pBrand" :value="pBrand" v-model="brand" autocomplete="off" @change="resetPage">
              <label class="btn btn-outline-dark w-100" :for="pBrand">{{ pBrand }}</label> 
            </div>
          </div>
        </div>
      </div> 
    </div>   
  </div>
</template>



<script setup>
  import { useProductStore } from '../stores/products';
  import SliderElement from '@vueform/slider';

  const productStore = useProductStore();
  const priceRange = defineModel('priceRange');
  const gender = defineModel('gender');
  const type = defineModel('type');
  const category = defineModel('category');
  const brand = defineModel('brand');

  const emit = defineEmits(['resetPage']);

  const resetPage = () => {
    emit('resetPage');
  };
</script>



<style scoped>

  .accordion {
    border-bottom: 1px solid #cacaca; 
  }

  .accordion .accordion-button {
    letter-spacing: 1px;
  }

  .accordion-body .btn {
    border-radius: 0;
  }

  .accordion-body .btn-check:checked + .btn-outline-dark {
    background-color: #b11414; 
    border-color: #b11414;
    color: white;
  }

</style>