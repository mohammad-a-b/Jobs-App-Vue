<script setup>
const props = defineProps({
  label: String,
  placeholder: String,
  inputType: {
    type: String,
    default: "text",
  },
  isRequired: {
    type: Boolean,
    default: true,
  },
});

const modelValue = defineModel({
  value: String,
  required: true,
});
</script>

<template>
  <div>
    <label class="input-label">
      {{ label }} <span v-if="isRequired" class="red-star-input">*</span>
    </label>
    <input
      class="no-spinner"
      :type="inputType"
      v-model="modelValue"
      :placeholder="placeholder"
    />
  </div>
</template>

<style scoped>
div {
  margin-top: 10px;
}
input {
  margin: 5px 0;
  padding: 9px 12px;
  border-radius: 4px;
}
.no-spinner {
  -moz-appearance: textfield;
  -webkit-appearance: none;
  appearance: none;
}

.no-spinner::-webkit-inner-spin-button,
.no-spinner::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.error-message {
  color: red;
  font-size: 12px;
  font-weight: 700;
  margin-top: 5px;
}
</style>
