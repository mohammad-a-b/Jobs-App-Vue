<script setup>
import { ref, onMounted } from "vue";
import CheckboxInput from "../components/CheckboxInput.vue";
import ListInput from "../components/ListInput.vue";
import NormalInput from "../components/NormalInput.vue";
import SelectiveInput from "../components/SelectiveInput.vue";
import TextareaInput from "../components/TextareaInput.vue";
import { useRouter } from "vue-router";
import { fetchCompanies, createJob } from "@/api/jobs.js";
import { useToast } from "@/stores/toast-store.js";

const formData = ref({
  title: "",
  seniority: "",
  salary: "",
  skills: [],
  description: "",
  companyId: "",
  remotePossibility: false,
  immediateRequirement: false,
});

const errorMessages = ref({});
const companies = ref([]);
const seniorityOptions = ref([
  { value: "intern", label: "کارآموز" },
  { value: "less_than_one_year", label: "کمتر از یک سال" },
  { value: "one_to_three_years", label: "یک تا سه سال" },
  { value: "three_to_six_years", label: "سه تا شش سال" },
  { value: "more_than_six_years", label: "بیش از شش سال" },
]);

const router = useRouter();

const { showToast } = useToast();

onMounted(async () => {
  const data = await fetchCompanies();
  companies.value = data.map((company) => ({
    value: company._id,
    label: company.title,
  }));
});

const validateField = (field, message) => {
  errorMessages.value[field] = formData.value[field] ? "" : message;
};

const validateSkills = () => {
  errorMessages.value.skills =
    formData.value.skills.length > 0
      ? ""
      : "لیست مهارت‌ها نمی‌تواند خالی باشد.";
};

const validateForm = () => {
  validateField("title", "عنوان نمی‌تواند خالی باشد.");
  validateField("seniority", "سابقه کار نمی‌تواند خالی باشد.");
  validateField("salary", "حقوق نمی‌تواند خالی باشد.");
  validateSkills();
  validateField("description", "شرح نمی‌تواند خالی باشد.");
  validateField("companyId", "نام شرکت نمی‌تواند خالی باشد.");
};

const submitForm = async () => {
  validateForm();
  if (Object.values(errorMessages.value).some((msg) => msg)) return;
  try {
    await createJob(formData.value);
    showToast("شغل با موفقیت ایجاد شد.", "success");
    setTimeout(() => router.push("/jobs"), 1600);
  } catch {
    showToast("خطا در ایجاد شغل. دوباره تلاش کنید.", "error");
  }
};
</script>

<template>
  <main>
    <div class="link-container">
      <router-link to="/jobs">لیست شغل‌ها</router-link>
    </div>
    <form @keydown.enter.prevent @submit.prevent="submitForm">
      <h2>ایجاد شغل جدید</h2>
      <NormalInput
        v-model="formData.title"
        label="عنوان"
        placeholder="عنوان شغلی"
        :errorMessage="errorMessages.title"
      />
      <SelectiveInput
        v-model="formData.seniority"
        label="سابقه کار"
        :options="seniorityOptions"
        :errorMessage="errorMessages.seniority"
      />
      <NormalInput
        v-model="formData.salary"
        label="حقوق"
        placeholder="میزان حقوق ماهیانه"
        inputType="number"
        :errorMessage="errorMessages.salary"
      />
      <ListInput
        v-model="formData.skills"
        label="مهارت‌ها"
        :errorMessage="errorMessages.skills"
      />
      <TextareaInput
        v-model="formData.description"
        label="شرح"
        placeholder="شرح وظایف، امکانات فضای شغلی و..."
        :errorMessage="errorMessages.description"
      />
      <SelectiveInput
        v-model="formData.companyId"
        label="نام شرکت"
        :options="companies"
        :errorMessage="errorMessages.companyId"
      />
      <CheckboxInput
        class="m-top"
        v-model="formData.remotePossibility"
        label="امکان دورکاری"
      />
      <CheckboxInput
        v-model="formData.immediateRequirement"
        label="آگهی فوری"
      />
      <button class="submit-btn" type="submit">ثــبــت</button>
    </form>
  </main>
</template>

<style scoped>
h2 {
  margin-bottom: 20px;
}
main {
  position: relative;
  margin: 0 auto;
  max-width: 400px;
  padding: 20px 16px;
  margin-top: 62px;
  border: 1px solid #000000;
  background-color: #f2f2f7;
  border-radius: 24px;
  box-shadow: 0px 9px 50px rgba(0, 0, 0, 0.43);
}

.submit-btn {
  background-color: #30b0c7;
  color: #ffffff;
  width: 100%;
  border: 1px solid #000000;
  padding: 10px 0;
  font-size: 18px;
  border-radius: 4px;
  margin-top: 30px;
}

.toast {
  position: fixed;
  bottom: 25px;
  left: 20px;
  padding: 14px 25px;
  border-radius: 8px;
  font-size: 14.5px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
  animation: slide-in 0.5s, fade-out 0.5s 1.5s forwards;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-out {
  to {
    opacity: 0;
  }
}
.m-top {
  margin-top: 21px;
}
</style>
