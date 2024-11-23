<script setup>
import { reactive, ref } from "vue";
import NormalInput from "@/components/NormalInput.vue";
import SelectiveInput from "@/components/SelectiveInput.vue";
import TextareaInput from "@/components/TextareaInput.vue";
import { BASE_URL } from "@/config/apiConfig";
import { useToast } from "@/stores/toast-store.js";

const formData = reactive({
  name: "",
  email: "",
  population: "",
  website: "",
  logo: null,
  description: "",
});

const populations = ref([
  { value: "less_than_10", label: "کمتر از 10 نفر" },
  { value: "10_to_50", label: "بین 10 تا 50 نفر" },
  { value: "50_to_200", label: "بین 50 تا 200 نفر" },
  { value: "200_to_1000", label: "بین 200 تا 1000 نفر" },
  { value: "more_than_1000", label: "بیش از 1000 نفر" },
]);

const errors = ref({});

const { showToast } = useToast();
const validateForm = () => {
  errors.value = {};
  if (!formData.name) errors.value.name = "نام الزامی است.";
  if (!formData.email) errors.value.email = "ایمیل الزامی است.";
  if (!formData.population) errors.value.population = "جمعیت الزامی است.";
  if (!formData.description) errors.value.description = "شرح الزامی است.";
  if (!formData.logo) errors.value.logo = "لوگو الزامی است.";
  return Object.keys(errors.value).length === 0;
};

const submitForm = async () => {
  if (!validateForm()) return;

  const data = new FormData();
  data.append("name", formData.name);
  data.append("email", formData.email);
  data.append("population", formData.population);
  data.append("website", formData.website);
  data.append("logo", formData.logo);
  data.append("description", formData.description);

  try {
    const response = await fetch(`${BASE_URL}/companies`, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      throw new Error("خطا در ارسال فرم");
    }

    showToast("فرم با موفقیت ارسال شد!", "success");
  } catch (error) {
    showToast(error.message, "error");
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
        v-model="formData.name"
        label="نام"
        placeholder="نام رسمی یا مشهور شرکت"
        :errorMessage="errors.name"
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
      <NormalInput
        v-model="formData.logo"
        label="لوگو"
        placeholder="png/jpg/jpeg"
        inputType="file"
        :errorMessage="errors.logo"
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
