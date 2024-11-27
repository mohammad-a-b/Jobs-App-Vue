


<script setup>
import { reactive, ref } from "vue";
import NormalInput from "@/components/NormalInput.vue";
import SelectiveInput from "@/components/SelectiveInput.vue";
import TextareaInput from "@/components/TextareaInput.vue";
import { useToast } from "@/stores/toast-store.js";
import FileInput from "@/components/FileInput.vue";
import { createCompany } from "@/api/jobs.js";

const formData = reactive({
  title: "",
  email: "",
  population: "",
  website: "",
  logo: null,
  description: "",
});

const populations = ref([
  { value: "کمتر از 10 نفر", label: "کمتر از 10 نفر" },
  { value: "بین 10 تا 50 نفر", label: "بین 10 تا 50 نفر" },
  { value: "بین 50 تا 200 نفر", label: "بین 50 تا 200 نفر" },
  { value: "بین 200 تا 1000 نفر", label: "بین 200 تا 1000 نفر" },
  { value: "بیش از 1000 نفر", label: "بیش از 1000 نفر" },
]);

const errors = ref({});
const { showToast } = useToast();

const validateForm = () => {
  errors.value = {};
  if (!formData.title) errors.value.title = "نام الزامی است.";
  if (!formData.email) errors.value.email = "ایمیل الزامی است.";
  if (!formData.population) errors.value.population = "جمعیت الزامی است.";
  if (!formData.description) errors.value.description = "شرح الزامی است.";
  if (!formData.logo) errors.value.logo = "لوگو الزامی است.";
  return Object.keys(errors.value).length === 0;
};

const submitForm = async () => {
  if (!validateForm()) return;

  try {
    await createCompany(formData);
    showToast("فرم با موفقیت ارسال شد!", "success");
    
  } catch (error) {
    showToast(error.message || "خطا در ارسال فرم", "error");
  }
};
</script>

<template>
  <main>
    <div class="link-container">
      <a href="/companies" class="list">لیست شرکت‌ها</a>
    </div>
    <form @keydown.enter.prevent @submit.prevent="submitForm">
      <h2>ایجاد شرکت جدید</h2>
      <NormalInput
        v-model="formData.title"
        label="نام"
        placeholder="نام رسمی یا مشهور شرکت"
        :errorMessage="errors.title"
      />
      <NormalInput
        class="email"
        v-model="formData.email"
        label="ایمیل"
        placeholder="ایمیل رسمی شرکت"
        inputType="email"
        :errorMessage="errors.email"
      />
      <SelectiveInput
        v-model="formData.population"
        :options="populations"
        label="جمعیت"
        :errorMessage="errors.population"
      />
      <NormalInput
        class="web"
        v-model="formData.website"
        label="وب‌سایت"
        placeholder="وب‌سایت شرکت به‌صورت https://example.com"
        :errorMessage="errors.website"
        :isRequired="false"
      />
      <FileInput
        label="لوگو"
        :errorMessage="errors.logo"
        @file-selected="(file) => (formData.logo = file)"
      />
      <TextareaInput
        v-model="formData.description"
        label="شرح"
        placeholder="شرح مختصری از شرکت"
        :errorMessage="errors.description"
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
.email,
.web {
  margin-top: 20px;
}
</style>