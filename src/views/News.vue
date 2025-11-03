<template>
  <div class="container mb-5">    
    <h3 class="text-center mb-5" style="letter-spacing: 2px;">UPDATE NEWS</h3> 

    <div class="row">
      <div class="col-lg-6 col-xl-4 mb-3">
        <div class="card shadow-sm border-0 rounded-0 sticky-top pb-3" style="top: 20px; z-index: 1;">
          <h5 class="text-center" style="letter-spacing: 2px; margin-top: 2rem;">Find articles</h5> 
          <div class="p-4 pt-2 pb-2 mx-auto w-100" style="max-width: 500px;">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search..." aria-label="Search" aria-describedby="search-addon" v-model="searchInfo" @input="searchNews">
              <button class="btn btn-outline-secondary" type="button" id="search-addon">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>

          <div class="p-4 d-flex flex-wrap justify-content-center gap-2">
            <div>
              <input type="radio" class="btn-check" name="options-outlined" id="all" value="all" v-model="filterItem" autocomplete="off" checked @change="searchNews">
              <label class="btn btn-outline-dark text-nowrap" for="all">All</label>
            </div>
            <div>
              <input type="radio" class="btn-check" name="options-outlined" id="title" value="title" v-model="filterItem" autocomplete="off" @change="searchNews">
              <label class="btn btn-outline-dark text-nowrap" for="title">Title</label>
            </div>
            <div>
              <input type="radio" class="btn-check" name="options-outlined" id="content" value="content" v-model="filterItem" autocomplete="off" @change="searchNews">
              <label class="btn btn-outline-dark text-nowrap" for="content">Content</label>
            </div>
            <div>
              <input type="radio" class="btn-check" name="options-outlined" id="category" value="category" v-model="filterItem" autocomplete="off" @change="searchNews">
              <label class="btn btn-outline-dark text-nowrap" for="category">Category</label>
            </div>
            <div>
              <input type="radio" class="btn-check" name="options-outlined" id="date" value="date" v-model="filterItem" autocomplete="off" @change="searchNews">
              <label class="btn btn-outline-dark text-nowrap" for="date">Date</label>
            </div>
          </div>

          <div class="ps-4">
            <p>{{ filteredNews.length }} articles found.</p>
          </div>
        </div>
      </div>

      <div class="col-lg-6 col-xl-8">
        <div class="card p-4 shadow-sm border-0 rounded-0">
          <div 
            v-for="(newItem, index) in paginatedItems"
            :key="index"
            class=""
          >
            <div class="news-item">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <span class="badge bg-warning">{{ newItem.category }}</span>
                <small class="text-muted">{{ newItem.date }}</small>
              </div>
              <h5 class="mb-2">{{ newItem.title }}</h5>
              <p class="text-muted mb-0">{{ newItem.content }}</p>
            </div>
            <hr class="text-black-50"></hr> 
          </div>

          <!-- Pagination controls -->
          <div class="pagination-controls p-3">
            <button 
              @click="prevPage" 
              :disabled="currentPage === 1" 
              style="clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%); padding-left: 22px;"
              >Previous
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              :class="{ active: currentPage === page }"
            >
              {{ page }}
            </button>
            <button 
              @click="nextPage" 
              :disabled="currentPage === totalPages" 
              style="clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 100%, 0 100%); padding-right: 22px;"
              >Next
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>



<script setup>
  import { ref, onMounted, computed } from 'vue';
  import newsData from '../assets/data/sneaker-news.json';

  const news = ref([]);
  const filteredNews = ref([]);
  const searchInfo = ref("");
  const currentPage = ref(1);
  const itemsPerPage = ref(5);
  const filterItem = ref('all');

  onMounted(() => {
    news.value = newsData.map(d => d);
    filteredNews.value = newsData.map(d => d); 
  });

  const paginatedItems = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value; 
    return filteredNews.value.slice(startIndex, endIndex);
  });

  const totalPages = computed(() => {
    return Math.ceil(filteredNews.value.length / itemsPerPage.value);
  });

  const searchNews = () => {
    currentPage.value = 1;
    if (filterItem.value === "all") {
      filteredNews.value = news.value.filter(n => {
        const matchTitle = n.title.toLowerCase().includes(searchInfo.value.toLowerCase());
        const matchContent = n.content.toLowerCase().includes(searchInfo.value.toLowerCase());
        const matchCategory = n.category.toLowerCase().includes(searchInfo.value.toLowerCase());
        const matchDate = n.date.toLowerCase().includes(searchInfo.value.toLowerCase());
        return matchTitle || matchContent || matchCategory || matchDate;
      })
    } else {
      filteredNews.value = searchInfo.value ? news.value.filter(n => n[filterItem.value].toLowerCase().includes(searchInfo.value.toLowerCase())) : news.value; 
      console.log(news.value.filter(n => n[filterItem.value]?.toLowerCase().includes(searchInfo.value.toLowerCase())));
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  }

  const goToPage = (page) => {
    currentPage.value = page;
  }
</script>



<style scoped>
  .subtitle {
    font-size: 1.2rem;
    font-weight: bold;
    color: #666; 
  }

  .badge-news { 
    background-color: #ddba20; 
  }

  .heading {
    font-size: 64px;
    font-weight: bolder;
    line-height: 1.1;
    color: #000; 
  }

  .card .input-group {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .card .form-control {
    border: none;
    padding-left: 20px;
  }

  .card .btn {
    border: none;
    border-radius: 0;
    padding: 10px 20px;
  }

  .pagination-controls {
    display: flex;
    justify-content: center;
  }

  .pagination-controls button {
    margin: 0 5px;
    padding: 8px 12px;
    cursor: pointer;
    border: none;
    border-radius: 0;
  }

  .pagination-controls button.active {
    background-color: #b11414;
    color: white;
  }

  .pagination-controls button:disabled {
    cursor: not-allowed;
  }

  @media (min-width: 992px) {
    .subtitle {
      padding-left: 7rem;
      padding-right: 7rem;
    }
  }
</style>