<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchJobs } from "@/api/jobs";

const jobs = ref([]);
const searchQuery = ref("");
const selectedCompany = ref("همه شرکت‌ها");
const selectedJobType = ref("");
const loading = ref(false);

const loadJobs = async () => {
  loading.value = true;
  try {
    jobs.value = await fetchJobs();
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const formatSalary = (salary) => {
  if (salary === 0) return "توافقی";
  return "ماهانه " + salary.toLocaleString("fa-IR") + " تومان";
};

const uniqueCompanies = computed(() => {
  const companies = jobs.value.map((job) => job.companyId.title);
  return ["همه شرکت‌ها", ...new Set(companies)];
});

const filteredJobs = computed(() => {
  let filtered = jobs.value;

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((job) =>
      job.title.toLowerCase().includes(query)
    );
  }

  if (selectedCompany.value !== "همه شرکت‌ها") {
    filtered = filtered.filter(
      (job) => job.companyId.title === selectedCompany.value
    );
  }

  if (selectedJobType.value === "remote") {
    filtered = filtered.filter((job) => job.remotePossibility);
  } else if (selectedJobType.value === "onsite") {
    filtered = filtered.filter((job) => !job.remotePossibility);
  }

  return filtered;
});

onMounted(loadJobs);
</script>

<template>
  <main>
    <div class="job-list">
      <div class="link-container">
        <router-link to="/jobs/create">صفحه ایجاد شغل</router-link>
      </div>
      <h1>شغل‌ها</h1>

      <input
        class="filter-input"
        v-model="searchQuery"
        placeholder="جست‌وجو..."
      />

      <div class="selectors">
        <div class="custom-select">
          <select v-model="selectedCompany">
            <option v-for="company in uniqueCompanies" :key="company">
              {{ company }}
            </option>
          </select>
        </div>
        <div class="custom-select">
          <select v-model="selectedJobType">
            <option value="">نوع همکاری</option>
            <option value="remote">دورکاری</option>
            <option value="onsite">حضوری</option>
          </select>
        </div>
      </div>

      <div v-if="loading">در حال بارگذاری...</div>
      <div v-else>
        <p v-if="filteredJobs.length === 0">هیچ شغلی یافت نشد</p>
        <div class="items" v-else>
          <div v-for="job in filteredJobs" :key="job.id" class="job-item">
            <router-link :to="`/jobs/${job._id}`">
              <div class="name-and-logo">
                <img
                  :src="job.companyId.logo"
                  alt="لوگوی شرکت"
                  class="company-logo"
                />
                <p class="company-title">{{ job.companyId.title }}</p>
              </div>
              <h2 :class="{ urgent: job.immediateRequirement }">
                {{ job.title }}
              </h2>
              <div class="description">
                <p>{{ job.remotePossibility ? "دورکاری" : "حضوری" }}</p>
                <p>&nbsp; | {{ formatSalary(job.salary) }}</p>
              </div>
            </router-link>
          </div>
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

.job-list {
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
  display: flex;
  flex-direction: column-reverse;
}

.job-item {
  margin-bottom: 16px;
  padding: 12px;
  background-color: #fff;
  border: 1px solid #000000;
  border-radius: 12px;
  cursor: pointer;
}

.company-title {
  font-size: 12px;
  font-weight: 400;
}

.company-logo {
  width: 32px;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 50%;
}

.description p {
  font-size: 12px;
  font-weight: 300;
  color: #8e8e93;
}

.description {
  display: flex;
  justify-content: end;
  align-items: end;
}
h2 {
  margin-top: 7px;
  font-size: 16px;
}

.urgent {
  color: #ff3b30;
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

.selectors {
  display: flex;
  margin: 11px 0 33px 0;
  gap: 18px;
}

.custom-select {
  position: relative;
  width: 100%;
}

.custom-select select {
  cursor: pointer;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #c7c7cc;
  border-radius: 4px;
  background-color: #fff;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  width: 100%;
}

.custom-select:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  pointer-events: none;
  width: 10px;
  height: 7px;
  background: url('data:image/svg+xml;utf8,<svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.38889L5 5.38889L9 1.38889" stroke="%231E1E1E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>')
    no-repeat;
}
</style>
