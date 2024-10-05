
<script setup>
import { computed } from "vue";

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

const isInvalid = computed(() => props.isRequired && !modelValue.value);
</script>

<template>
  <div>
    <label class="input-label">
      {{ label }} <span v-if="isRequired" class="red-star-input">*</span>
    </label>
    <input :type="inputType" v-model="modelValue" :placeholder="placeholder" />
    <p v-if="isInvalid" class="error-message">باید پر شود.</p>
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
.error-message {
  color: red;
  font-size: 12px;
  font-weight: 700;
  margin-top: 5px;
}
</style>
