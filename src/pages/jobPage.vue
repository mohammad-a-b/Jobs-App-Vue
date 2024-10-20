<template>
  <div>
    <div v-if="loading">در حال بارگذاری...</div>
    <div v-else-if="job">
      <div class="company-info">
        <img :src="job.companyId.logo" alt="لوگوی شرکت" class="company-logo" />
        <h2 class="company-title">
          {{ job.companyId.title }}
        </h2>
      </div>
      <div class="i-f"> 
      <p class="job-title">{{ job.title }}</p>
      <span v-if="job.immediateRequirement" class="urgent">(استخدام فوری)</span>
    </div>
      <div class="job-detail">
        <h1>اطلاعات بیشتر</h1>
  
        <div class="detail-item">
          <p class="detail-title">میزان حقوق</p>
          <p class="detail-value">{{ formatSalary(job.salary) }}</p>
        </div>
        <div class="detail-item">
          <p class="detail-title">نوع همکاری:</p>
          <p class="detail-value">{{ job.remotePossibility ? "دورکاری" : "حضوری" }}</p>
        </div>
        <div class="detail-item">
          <p class="detail-title">سابقه کاری:</p>
          <p class="detail-value">{{ job.experience }} سال</p>
        </div>
        <div class="detail-item">
          <p class="detail-title">مهارت‌های موردنیاز</p>
          <ul class="skills-list">
            <li v-for="skill in job.skills" :key="skill" class="skill-item">{{ skill }}</li>
          </ul>
        </div>
        <div class="detail-item">
          <p class="detail-title">شرح موقعیت شغلی</p>
          <p class="detail-value">{{ job.description }}</p>
        </div>
      </div>
    </div>
    <div v-else>شغلی پیدا نشد</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const jobId = route.params.id;
const job = ref(null);
const loading = ref(true);

const fetchJobDetail = async () => {
  loading.value = true;
  try {
    const response = await fetch(`http://185.45.194.24:3000/api/jobs/${jobId}`);
    if (!response.ok) throw new Error('خطا در بارگذاری جزئیات شغل');
    job.value = await response.json();
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const formatSalary = (salary) => {
  if (salary === 0) return "توافقی";
  return "ماهانه " + (salary * 1000000).toLocaleString("fa-IR") + " تومان";
};

onMounted(fetchJobDetail);
</script>

<style scoped>
.job-detail {
  margin: 20px auto;
  max-width: 400px;
  padding: 20px;
  background-color: #f2f2f7;
  border-radius: 24px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
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
.i-f{
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
  padding: 5px 0;}

.detail-title {
  font-weight: bold;
  flex: 1;
  text-align: right;
}

.detail-value {
  flex: 2;
  text-align: right;
}

.skills-list {
  margin-top: 10px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: end;
  flex-wrap: wrap;
}

.skill-item {
  background-color: #E5E5EA;
  padding: 4px 8px;
  border-radius: 14px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 12px;
}
</style>
