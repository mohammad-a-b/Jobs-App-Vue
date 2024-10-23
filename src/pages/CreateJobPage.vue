<!-- 
<script setup>
import { ref, onMounted } from "vue";
import CheckboxInput from "../components/CheckboxInput.vue";
import ListInput from "../components/ListInput.vue";
import NormalInput from "../components/NormalInput.vue";
import SelectiveInput from "../components/SelectiveInput.vue";
import TextareaInput from "../components/TextareaInput.vue";
import { useRouter } from "vue-router";

const BASE_URL = "http://185.45.194.24:3000/api";

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

const errorMessages = ref({
  title: "",
  salary: "",
  description: "",
});

const companies = ref([]);
const seniorityOptions = ref([
  { value: "intern", label: "کارآموز" },
  { value: "less_than_one_year", label: "کمتر از یک سال" },
  { value: "one_to_three_years", label: "یک تا سه سال" },
  { value: "three_to_six_years", label: "سه تا شش سال" },
  { value: "more_than_six_years", label: "بیش از شش سال" },
]);

const router = useRouter();

onMounted(async () => {
  try {
    const response = await fetch(`${BASE_URL}/companies`);
    const data = await response.json();
    companies.value = data.map((company) => ({
      value: company._id,
      label: company.title,
    }));
  } catch (error) {
    console.error("Error fetching companies:", error);
  }
});

const validateForm = () => {
  errorMessages.value.title = formData.value.title
    ? ""
    : "عنوان نمی‌تواند خالی باشد.";
  errorMessages.value.seniority = formData.value.seniority
    ? ""
    : "سابقه کار نمی‌تواند خالی باشد.";
  errorMessages.value.salary = formData.value.salary
    ? ""
    : "حقوق نمی‌تواند خالی باشد.";
  errorMessages.value.description = formData.value.description
    ? ""
    : "شرح نمی‌تواند خالی باشد.";
  errorMessages.value.companyId = formData.value.companyId
    ? ""
    : "نام شرکت نمی‌تواند خالی باشد.";
};

const submitForm = async () => {
  validateForm(); 
  if (Object.values(errorMessages.value).some((msg) => msg)) {
    return; 
  }

  try {
    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
    });

    if (!response.ok) {
      throw new Error("Failed to create job");
    }

    await response.json();
    router.push("/jobs");
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
</script>

<template>
  <main>
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
      />
      <NormalInput
        v-model="formData.salary"
        label="حقوق"
        placeholder="میزان حقوق ماهیانه به میلیون تومان"
        inputType="number"
        :errorMessage="errorMessages.salary"
      />
      <ListInput v-model="formData.skills" />
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
      />
      <CheckboxInput
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
  margin: 0 auto; 
  max-width: 400px;
  padding: 20px 16px;
  margin-top: 30px;
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
</style> -->
<script setup>
import { ref, onMounted } from "vue";
import CheckboxInput from "../components/CheckboxInput.vue";
import ListInput from "../components/ListInput.vue";
import NormalInput from "../components/NormalInput.vue";
import SelectiveInput from "../components/SelectiveInput.vue";
import TextareaInput from "../components/TextareaInput.vue";
import { useRouter } from "vue-router";

const BASE_URL = "http://185.45.194.24:3000/api";

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

const errorMessages = ref({
  title: "",
  seniority: "",
  salary: "",
  skills: "",
  description: "",
  companyId: "",
});

const companies = ref([]);
const seniorityOptions = ref([
  { value: "intern", label: "کارآموز" },
  { value: "less_than_one_year", label: "کمتر از یک سال" },
  { value: "one_to_three_years", label: "یک تا سه سال" },
  { value: "three_to_six_years", label: "سه تا شش سال" },
  { value: "more_than_six_years", label: "بیش از شش سال" },
]);

const router = useRouter();

onMounted(async () => {
  try {
    const response = await fetch(`${BASE_URL}/companies`);
    const data = await response.json();
    companies.value = data.map((company) => ({
      value: company._id,
      label: company.title,
    }));
  } catch (error) {
    console.error("Error fetching companies:", error);
  }
});

const validateForm = () => {
  errorMessages.value.title = formData.value.title
    ? ""
    : "عنوان نمی‌تواند خالی باشد.";
  errorMessages.value.seniority = formData.value.seniority
    ? ""
    : "سابقه کار نمی‌تواند خالی باشد.";
  errorMessages.value.salary = formData.value.salary
    ? ""
    : "حقوق نمی‌تواند خالی باشد.";
    errorMessages.value.skills = formData.value.skills.length
    ? ""
    : "لیست مهارت‌ها نمی‌تواند خالی باشد."; 
  errorMessages.value.description = formData.value.description
    ? ""
    : "شرح نمی‌تواند خالی باشد.";
  errorMessages.value.companyId = formData.value.companyId
    ? ""
    : "نام شرکت نمی‌تواند خالی باشد.";
};
const submitForm = async () => {
  validateForm();
  if (Object.values(errorMessages.value).some((msg) => msg)) {
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
    });

    if (!response.ok) {
      throw new Error("Failed to create job");
    }

    await response.json();
    router.push("/jobs");
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
</script>

<template>
  <main>
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
  margin: 0 auto; 
  max-width: 400px;
  padding: 20px 16px;
  margin-top: 30px;
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
</style>
