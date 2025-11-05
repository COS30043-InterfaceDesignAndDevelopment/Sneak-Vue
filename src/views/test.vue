<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { supabase } from "@/supabaseClient"; // your connection

const route = useRoute();
const router = useRouter();

const products = ref([]);
const search = ref(route.query.search || "");
const category = ref(route.query.category || "All");
const currentPage = ref(Number(route.query.page) || 1);
const pageSize = 48;

// Load products once (all pages, since dataset small)
const loadProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) console.error(error);
  else products.value = data;
};

onMounted(loadProducts);

// Watch for changes and update URL query
watch([search, category, currentPage], () => {
  router.replace({
    query: {
      search: search.value || undefined,
      category: category.value !== "All" ? category.value : undefined,
      page: currentPage.value !== 1 ? currentPage.value : undefined,
    },
  });
});

// Filtering logic
const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    const matchSearch = p.name
      .toLowerCase()
      .includes(search.value.toLowerCase());
    const matchCategory =
      category.value === "All" || p.category === category.value;
    return matchSearch && matchCategory;
  });
});

// Pagination logic
const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / pageSize)
);
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredProducts.value.slice(start, start + pageSize);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
};
</script>

<template>
  <div class="container py-4">
    <!-- Filter/Search Controls -->
    <div class="d-flex mb-3">
      <input
        v-model="search"
        placeholder="Search products..."
        class="form-control me-2"
      />
      <select v-model="category" class="form-select" style="max-width: 200px">
        <option>All</option>
        <option>Streetwear</option>
        <option>Casual</option>
        <option>Sneakers</option>
      </select>
    </div>

    <!-- Product Grid -->
    <div class="row">
      <div
        v-for="product in paginatedProducts"
        :key="product.product_id"
        class="col-md-3 mb-4"
      >
        <div class="card h-100">
          <img :src="product.image_url" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.price }} USD</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" @click="goToPage(currentPage - 1)">Prev</a>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: page === currentPage }"
        >
          <a class="page-link" @click="goToPage(page)">{{ page }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: currentPage === totalPages }"
        >
          <a class="page-link" @click="goToPage(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
