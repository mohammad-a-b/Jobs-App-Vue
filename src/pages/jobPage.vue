<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchJobDetail } from "@/api/jobs";

const route = useRoute();
const jobId = route.params.id;
const job = ref(null);
const loading = ref(true);

const seniorityLabels = {
  intern: "کارآموز",
  less_than_one_year: "کمتر از یک سال",
  one_to_three_years: "یک تا سه سال",
  three_to_six_years: "سه تا شش سال",
  more_than_six_years: "بیش از شش سال",
};

const loadJobDetail = async () => {
  loading.value = true;
  try {
    job.value = await fetchJobDetail(jobId);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const getSeniorityLabel = (seniority) => {
  return seniorityLabels[seniority] || "ناشناخته";
};

const formatSalary = (salary) => {
  return salary === 0
    ? "توافقی"
    : `ماهانه ${salary.toLocaleString("fa-IR")} تومان`;
};

onMounted(loadJobDetail);
</script>
<template>
  <div>
    <div v-if="loading">در حال بارگذاری...</div>
    <div v-else-if="job">
      <div class="company-info">
        <img :src="job.companyId.logo" alt="لوگوی شرکت" class="company-logo" />
        <h2 class="company-title">{{ job.companyId.title }}</h2>
      </div>
      <div class="i-f">
        <p class="job-title">{{ job.title }}</p>
        <span v-if="job.immediateRequirement" class="urgent"
          >(استخدام فوری)</span
        >
      </div>
      <div class="job-detail">
        <h1>اطلاعات بیشتر</h1>
        <div class="detail-item">
          <p class="detail-title">سابقه کاری:</p>
          <p class="detail-value">{{ getSeniorityLabel(job.seniority) }}</p>
        </div>
        <div class="detail-item">
          <p class="detail-title">مهارت‌های موردنیاز</p>
          <ul class="skills-list">
            <li v-for="skill in job.skills" :key="skill" class="skill-item">
              {{ skill }}
            </li>
          </ul>
        </div>
        <div class="detail-item">
          <p class="detail-title">میزان حقوق</p>
          <p class="detail-value">{{ formatSalary(job.salary) }}</p>
        </div>
        <div class="detail-item">
          <p class="detail-title">نوع همکاری:</p>
          <p class="detail-value">
            {{ job.remotePossibility ? "دورکاری" : "حضوری" }}
          </p>
        </div>
        <div class="detail-item item-description">
          <p class="detail-title">شرح موقعیت شغلی</p>
          <p class="detail-value job-description">{{ job.description }}</p>
        </div>
        <router-link to="/jobs">
          <button class="back-button">⇦</button></router-link
        >
      </div>
    </div>
    <div v-else>شغلی پیدا نشد</div>
  </div>
</template>

<style scoped>
.job-detail {
  margin: 20px auto;
  max-width: 400px;
  padding: 20px;
  background-color: #f2f2f7;
  border-radius: 24px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #000000;
  position: relative;
}

.back-button {
  position: absolute;
  top: 13px;
  left: 20px;
  scale: 1.4;
  font-size: 24px;
  cursor: pointer;
  color: #b2b2b2af;
}

h1 {
  font-size: 22px;
  margin-bottom: 10px;
  text-align: right;
  padding: 10px;
}

.company-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.company-title {
  font-size: 16px;
  font-weight: 500;
  margin-left: 10px;
}

.i-f {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.urgent {
  font-weight: 400;
  margin-left: 5px;
}

.company-logo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.job-title {
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  padding: 5px 0;
}

.detail-title {
  font-weight: 500;
  font-size: 14px;
  color: #8e8e93;
}

.detail-value {
  font-size: 14px;
  font-weight: 400;
}

.skills-list {
  margin-top: 10px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: end;
  flex-wrap: wrap;
}

.skill-item {
  background-color: #e5e5ea;
  padding: 4px 8px;
  border-radius: 14px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 12px;
}

.item-description {
  display: flex;
  flex-direction: column;
}
</style>
