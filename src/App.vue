<script setup>
import CheckboxInput from "./components/CheckboxInput.vue";
import ListInput from "./components/ListInput.vue";
import NormalInput from "./components/NormalInput.vue";
import SelectiveInput from "./components/SelectiveInput.vue";
const required = false;
</script>

<template>
  <header>
    <a href="/home"> <img src="./assets/icons/logo.svg" alt="" /></a>
  </header>
  <main>
    <form @keydown.enter.prevent>
      <h2>ایجاد شغل جدید</h2>
      <Normal-input label="عنوان" placeholder="عنوان شغلی" />
      <Selective-input
        label="سابقه کار"
        :options="[
          'کاراموز',
          'کمتر از یک سال',
          'یک تا سه سال',
          'سه تا شش سال',
          'بیش از شش سال',
        ]"
      />
      <Normal-input
        star=""
        :isRequired="required"
        label="حقوق"
        placeholder="میزان حقوق ماهیانه به میلیون تومان"
      />
      <ListInput />
      <Normal-input
        height="140px"
        label="شرح"
        placeholder="شرح وظایف، امکانات فضای شغلی و."
      />
      <Selective-input
        label="نام شرکت"
        :options="['شرکت1', 'شرکت2', 'شرکت3', 'شرکت4']"
      />
      <CheckboxInput label="امکان دورکاری" />
      <CheckboxInput label="آگهی فوری"/>

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
  display: flex;
  flex-direction: column;
  max-width: 400px;
  padding: 20px 16px;
  margin-top: 30px;
  border: 1px solid #000000;
  background-color: #f2f2f7;
  border-radius: 24px;
}
label {
  font-weight: 500;
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
  margin: 30px 0 0 0;
}
</style>
