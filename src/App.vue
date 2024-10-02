<!-- <script setup>
import { ref } from "vue";
import CheckboxInput from "./components/CheckboxInput.vue";
import ListInput from "./components/ListInput.vue";
import NormalInput from "./components/NormalInput.vue";
import SelectiveInput from "./components/SelectiveInput.vue";
import TextareaInput from "./components/textareaInput.vue";

const formData = ref({
  title: "",
  seniority: "",
  stipend: "",
  skills: [],
  description: "",
  companyName: "",
  remoteWork: "",
  urgentAd: "",
});
</script>

<template>
  <header>
    <a href="/home"> <img src="./assets/icons/logo.svg" alt="" /></a>
  </header>
  <main>
    <form @keydown.enter.prevent>
      <h2>ایجاد شغل جدید</h2>
      <NormalInput
        v-model="formData.title"
        label="عنوان"
        placeholder="عنوان شغلی"
      />
      <p>{{ formData.title }}</p>
      <SelectiveInput
        v-model="formData.seniority"
        label="سابقه کار"
        :options="[
          'کاراموز',
          'کمتر از یک سال',
          'یک تا سه سال',
          'سه تا شش سال',
          'بیش از شش سال',
        ]"
      />
      <p>{{ formData.seniority }}</p>
      <Normal-input
        v-model="formData.stipend"
        :isRequired="false"
        label="حقوق"
        placeholder="میزان حقوق ماهیانه به میلیون تومان"
      />
      <p>{{ formData.stipend }}</p>
      <ListInput v-model="formData.skills" />
      <p>{{ formData.skills }}</p>
      <TextareaInput
        v-model="formData.description"
        label="شرح"
        placeholder="شرح وظایف، امکانات فضای شغلی و..."
      />
      <p>{{ formData.description }}</p>
      <Selective-input
        v-model="formData.companyName"
        label="نام شرکت"
        :options="['شرکت1', 'شرکت2', 'شرکت3', 'شرکت4']"
      />
      <p>{{ formData.companyName }}</p>
      <CheckboxInput v-model="formData.remoteWork" label="امکان دورکاری" />
      <p>{{ formData.remoteWork }}</p>
      <CheckboxInput v-model="formData.urgentAd" label="آگهی فوری" />
      <p>{{ formData.urgentAd }}</p>

      <button class="submit-btn" type="submit">ثــبــت</button>
    </form>
  </main>
</template>

<style>
main h2 {
  font-size: 20px;
  font-weight: 700;
}
main {
  max-width: 400px;
  padding: 20px 16px;
  margin-top: 30px;
  border: 1px solid #000000;
  background-color: #f2f2f7;
  border-radius: 24px;
}

.red-star-input {
  color: #ff3b30;
}
.submit-btn {
  background-color: #30b0c7;
  color: #ffffff;
  width: 100%;
  border: 1px solid #000000;
  padding: 10px 0;
  font-size: 18px;

  border-radius: 16px;
  margin-top: 30px;
}
</style> -->


<script setup>
import { ref, onMounted } from "vue";
import CheckboxInput from "./components/CheckboxInput.vue";
import ListInput from "./components/ListInput.vue";
import NormalInput from "./components/NormalInput.vue";
import SelectiveInput from "./components/SelectiveInput.vue";
import TextareaInput from "./components/TextareaInput.vue";

const formData = ref({
  title: "",
  seniority: "",
  stipend: "",
  skills: [] ,
  description: "",
  companyName: "",
  remoteWork: false,
  urgentAd: false,
});

const companies = ref([]);

onMounted(async () => {
  try {
    const response = await fetch("http://185.45.194.24:3000/api/companies");
    const data = await response.json();
    companies.value = data.map(company => ({
      id: company.id,
      title: company.title,
    }));
  } catch (error) {
    console.error("Error fetching companies:", error);
  }
});
</script>

<template>
  <header>
    <a href="/home"> <img src="./assets/icons/logo.svg" alt="" /></a>
  </header>
  <main>
    <form @keydown.enter.prevent>
      <h2>ایجاد شغل جدید</h2>
      <NormalInput
        v-model="formData.title"
        label="عنوان"
        placeholder="عنوان شغلی"
      />
      <p>{{ formData.title }}</p>
      <SelectiveInput
        v-model="formData.seniority"
        label="سابقه کار"
        :options="[ 'کاراموز', 'کمتر از یک سال', 'یک تا سه سال', 'سه تا شش سال', 'بیش از شش سال' ]"
      />
      <p>{{ formData.seniority }}</p>
      <NormalInput
        v-model="formData.stipend"
        :isRequired="false"
        label="حقوق"
        placeholder="میزان حقوق ماهیانه به میلیون تومان"
      />
      <p>{{ formData.stipend }}</p>
      <ListInput v-model="formData.skills" />
      <p>{{ formData.skills }}</p>
      <TextareaInput
        v-model="formData.description"
        label="شرح"
        placeholder="شرح وظایف، امکانات فضای شغلی و..."
      />
      <p>{{ formData.description }}</p>
      <SelectiveInput
        v-model="formData.companyName"
        label="نام شرکت"
        :options="companies.map(company => company.title)"
      />
      <p>{{ formData.companyName }}</p>
      <CheckboxInput v-model="formData.remoteWork" label="امکان دورکاری" />
      <p>{{ formData.remoteWork }}</p>
      <CheckboxInput v-model="formData.urgentAd" label="آگهی فوری" />
      <p>{{ formData.urgentAd }}</p>

      <button class="submit-btn" type="submit">ثــبــت</button>
    </form>
  </main>
</template>

<style>
main h2 {
  font-size: 20px;
  font-weight: 700;
}
main {
  max-width: 400px;
  padding: 20px 16px;
  margin-top: 30px;
  border: 1px solid #000000;
  background-color: #f2f2f7;
  border-radius: 24px;
}

.red-star-input {
  color: #ff3b30;
}
.submit-btn {
  background-color: #30b0c7;
  color: #ffffff;
  width: 100%;
  border: 1px solid #000000;
  padding: 10px 0;
  font-size: 18px;
  border-radius: 16px;
  margin-top: 30px;
}
</style>
