<template>
  <div class="container-fluid px-0">    
    <div class="hero-section">
      <div class="container pb-3 pt-5">
        <h1 class="display-6 text-center mb-2">NEWS FEED</h1>
        <p class="lead text-center mb-0">Stay updated with the latest articles</p>
      </div>
    </div>

    <div class="container my-5">
      <div class="row g-3">
        <!-- Search & Filter Sidebar -->
        <div class="col-lg-4">
          <div class="search-panel">
            <h5 class="fw-bold mb-4 text-uppercase ls-2">Search Articles</h5>
            
            <!-- Search Input -->
            <div class="search-box mb-4">
              <input 
                type="text" 
                class="form-control form-control-lg" 
                placeholder="Type to search..." 
                v-model="searchInfo" 
                @input="searchNews"
              >
              <i class="bi bi-search search-icon"></i>
            </div>

            <!-- Filter Options -->
            <div class="filter-section mb-4">
              <label class="form-label fw-bold text-uppercase small mb-3">Filter By</label>
              <div class="d-grid gap-2">
                <input type="radio" class="btn-check" name="filter" id="all" value="all" v-model="filterItem" @change="searchNews" checked>
                <label class="filter-btn" for="all">
                  <i class="bi bi-grid-3x3-gap-fill me-2"></i>All Fields
                </label>

                <input type="radio" class="btn-check" name="filter" id="title" value="title" v-model="filterItem" @change="searchNews">
                <label class="filter-btn" for="title">
                  <i class="bi bi-text-left me-2"></i>Title
                </label>

                <input type="radio" class="btn-check" name="filter" id="content" value="content" v-model="filterItem" @change="searchNews">
                <label class="filter-btn" for="content">
                  <i class="bi bi-file-text me-2"></i>Content
                </label>

                <input type="radio" class="btn-check" name="filter" id="category" value="category" v-model="filterItem" @change="searchNews">
                <label class="filter-btn" for="category">
                  <i class="bi bi-tag-fill me-2"></i>Category
                </label>

                <input type="radio" class="btn-check" name="filter" id="date" value="date" v-model="filterItem" @change="searchNews">
                <label class="filter-btn" for="date">
                  <i class="bi bi-calendar-event me-2"></i>Date
                </label>
              </div>
            </div>

            <!-- Results Count -->
            <div class="results-count">
              <span class="fw-bold">{{ filteredNews.length }}</span> articles found
            </div>
          </div>
        </div>

        <!-- News List -->
        <div class="col-lg-8">
          <div class="news-container">
            <div 
              v-for="(newItem, index) in paginatedItems"
              :key="index"
              class="news-card"
            >
              <div class="news-header">
                <span class="category-badge">{{ newItem.category }}</span>
                <span class="news-date">
                  <i class="bi bi-calendar3 me-1"></i>{{ newItem.date }}
                </span>
              </div>
              <h4 class="news-title">{{ newItem.title }}</h4>
              <p class="news-content">{{ newItem.content }}</p>
            </div>

            <!-- Pagination -->
            <nav class="pagination-nav mt-5" v-if="totalPages > 1">
              <ul class="pagination-list">
                <li>
                  <button 
                    @click="prevPage" 
                    :disabled="currentPage === 1"
                    class="page-btn page-prev"
                  >
                    <i class="bi bi-chevron-left"></i>
                  </button>
                </li>
                <li v-for="page in totalPages" :key="page">
                  <button
                    @click="goToPage(page)"
                    :class="['page-btn', { 'active': currentPage === page }]"
                  >
                    {{ page }}
                  </button>
                </li>
                <li>
                  <button 
                    @click="nextPage" 
                    :disabled="currentPage === totalPages"
                    class="page-btn page-next"
                  >
                    <i class="bi bi-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
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
  .hero-section .lead { 
    font-size: 1.1rem;
  }

  .ls-2 {
    letter-spacing: 2px;
  }

  .search-panel {
    background: #ffffff;
    border: 2px solid #e8e8e8;
    padding: 2rem;
    position: sticky;
    top: 20px;
  }

  .search-box {
    position: relative;
  }

  .search-box input {
    border: 1px solid #2d2d2d;
    border-radius: 0px;
    padding: 0.75rem 3rem 0.75rem 1rem;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .search-box input:focus {
    border-color: #b11414;
    box-shadow: 0 0 0 3px rgba(177, 20, 20, 0.08);
  }

  .search-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    font-size: 1.2rem;
  }

  .filter-section label.form-label {
    color: #2d2d2d;
    letter-spacing: 1px;
  }

  .filter-btn {
    display: flex;
    align-items: center;
    padding: 0.875rem 1.25rem;
    background: #fafafa;
    border: 2px solid #e8e8e8;
    color: #2d2d2d;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
  }

  .filter-btn:hover {
    background: #2d2d2d;
    color: white;
    border-color: #2d2d2d;
  }

  .btn-check:checked + .filter-btn {
    background: #2d2d2d;
    color: white;
    border-color: #2d2d2d;
    border-left: 3px solid #b11414;
  }

  .results-count {
    padding: 1rem;
    background: #fafafa;
    border-left: 3px solid #b11414;
    font-size: 0.95rem;
    color: #666;
  }

  .results-count .fw-bold {
    color: #2d2d2d;
  }

  .news-container {
    background: #ffffff;
    border: 2px solid #e8e8e8;
    padding: 2rem;
  }

  .news-card {
    padding: 2rem 0;
    border-bottom: 1px solid #e8e8e8;
    transition: all 0.3s ease;
  }

  .news-card:first-child {
    padding: 0 0 2rem;
  }

  .news-card:last-child {
    border-bottom: none;
  }

  .news-card:hover {
    transform: translateX(8px);
    border-left: 3px solid #b11414;
    padding-left: 1rem;
  }

  .news-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .category-badge {
    display: inline-block;
    padding: 0.375rem 1rem;
    background: #e9b006;
    color: white;
    font-weight: 700;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .news-date {
    color: #999;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .news-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 0.75rem;
    line-height: 1.3;
    transition: color 0.3s ease;
  }

  .news-card:hover .news-title {
    color: #b11414;
  }

  .news-content {
    color: #666;
    line-height: 1.7;
    margin: 0;
  } 

  .pagination-list {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .page-btn {
    min-width: 45px;
    height: 45px;
    border: 1px solid #2d2d2d;
    background: white;
    color: #2d2d2d;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .page-btn:hover:not(:disabled) {
    background: #2d2d2d;
    color: white;
  }

  .page-btn.active {
    background: #b11414;
    border-color: #b11414;
    color: white;
  }

  .page-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 991px) {
    .search-panel {
      position: static;
      margin-bottom: 2rem;
    }
  }
</style>