<script setup>
import { ref, onMounted } from "vue";
const BASE_URL = "http://185.45.194.24:3000/api";
const jobs = ref([]);
const loading = ref(false);

const fetchJobs = async () => {
  loading.value = true;
  try {
    const response = await fetch(`${BASE_URL}/jobs`);
    if (!response.ok) throw new Error("خطا در بارگذاری شغل‌ها");
    jobs.value = await response.json();
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

onMounted(fetchJobs);
</script>
<template>
  <div class="job-list">
    <h1>شغل‌ها</h1>
    <div v-if="loading">در حال بارگذاری...</div>
    <div v-else>
      <p v-if="jobs.length === 0"></p>
      <div v-else>
        <div v-for="job in jobs" :key="job.id" class="job-item">
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
    <router-link to="/jobs/create">برو به صفحه ایجاد📄</router-link>
  </div>
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
  margin-top: 30px;
  border: 1px solid #000000;
  background-color: #f2f2f7;
  border-radius: 24px;
  box-shadow: 0px 9px 50px rgba(0, 0, 0, 0.43);
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
  gap: 6px;
}
</style>
