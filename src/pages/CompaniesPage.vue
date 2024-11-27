<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchCompanies } from "@/api/jobs.js";

const companies = ref([]);
const searchQuery = ref("");
const loading = ref(false);

const filteredCompanies = computed(() => {
  let filtered = companies.value;

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((company) =>
      company.title.toLowerCase().includes(query)
    );
  }

  return filtered;
});

onMounted(async () => {
  loading.value = true;
  companies.value = await fetchCompanies();
  loading.value = false;
});
</script>

<template>
  <main>
    <div class="company-list">
      <div class="link-container">
        <router-link class="list" to="/create/company">صفحه ایجاد شرکت</router-link>
      </div>
      <h1>شرکت‌ها</h1>

      <input
        class="filter-input"
        v-model="searchQuery"
        placeholder="جست‌وجو..."
      />

      <div v-if="loading"><div class="loader"></div></div>
      <div v-else>
        <p v-if="filteredCompanies.length === 0">هیچ شرکتی یافت نشد</p>
        <div class="items" v-else>
          <ul v-for="company in filteredCompanies" :key="company.id" class="company-item">
            <li :to="`/companies/${company._id}`">
              <div class="name-and-logo">
                <img
                  :src="company.logo"
                  alt="لوگوی شرکت"
                  class="company-logo"
                />
                <p class="company-title">{{ company.title }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
h1 {
  margin-bottom: 20px;
  font-size: 20px;
}

.company-list {
  margin: 0 auto;
  max-width: 400px;
  padding: 20px 16px;
  margin-top: 62px;
  border: 1px solid #000000;
  background-color: #f2f2f7;
  border-radius: 24px;
  box-shadow: 0px 9px 50px rgba(0, 0, 0, 0.43);
  position: relative;
}

.items {
  margin-top: 40px;
  display: flex;
  flex-direction: column-reverse;
}

.company-item {
  margin-bottom: 16px;
  padding: 12px;
  background-color: #fff;
  border: 1px solid #000000;
  border-radius: 12px;
  cursor: pointer;
}

.company-title {
  font-size: 14px;
  font-weight: 500;
}

.company-logo {
  width: 40px;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 50%;
}

.name-and-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-input {
  width: 100%;
  background-color: #fff;
  border: 1px solid #c7c7cc;
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  outline: none;
}

.loader {
  width: 17px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #000;
  box-shadow: 0 0 0 0 #0004;
  animation: l2 1.5s infinite linear;
  position: relative;
  margin: 0 auto;
}

.loader:before,
.loader:after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 0 0 0 #0004;
  animation: inherit;
  animation-delay: -0.1s;
}

.loader:after {
  animation-delay: 0;
}

@keyframes l2 {
  100% {
    box-shadow: 0 0 0 40px #0000;
  }
}
</style>
