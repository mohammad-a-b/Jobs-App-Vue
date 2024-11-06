<script setup>
import { ref } from 'vue';

const props = defineProps({
  label: String,
  placeholder: String,
  isRequired: {
    type: Boolean,
    default: true,
  },
  errorMessage: {
    type: String,
    default: ""
  }
});

const modelValue = defineModel({
  value: String,
  required: true,
});

const showError = ref(false);
const errorMsg = ref("");

const validateInput = () => {
  if (props.isRequired && !modelValue.value) {
    errorMsg.value = "این فیلد الزامی است.";
    showError.value = true;
  } else {
    errorMsg.value = "";
    showError.value = false;
  }
};

const handleBlur = () => {
  validateInput();
};
</script>

<template>
  <div>
    <label class="input-label">
      {{ label }} <span v-if="props.isRequired" class="red-star-input">*</span>
    </label>
    <textarea
      v-model="modelValue"
      :placeholder="placeholder"
      @blur="handleBlur"
    ></textarea>
    <p v-if="(showError || errorMessage) && !modelValue" class="error-message">{{ errorMessage || errorMsg }}</p>
  </div>
</template>

<style scoped>
div{
  margin-top: 20px;
}
textarea {
  width: 100%;
  min-height: 155px;
  max-height: 400px;
  padding: 9px 12px;
  border-radius: 4px;
  border: 1px solid #000000;
  resize: vertical;
}
textarea:focus {
  border-color: #30b0c7;
  outline: none;
}
</style>
