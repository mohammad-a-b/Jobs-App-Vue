
<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  inputType: { type: String, default: "text" },
  errorMessage: String,
  isRequired: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const localError = ref("");

const handleBlur = () => {
  if(props.isRequired){
  localError.value = props.modelValue ? "" : " نمی‌تواند خالی باشد";}
};

const blockInvalidKeys = (event) => {
  if (props.inputType === "number") {
    const invalidKeys = ["e", ".", "-", "+"];
    if (invalidKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
};
const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div>
    <label>{{ label }}
      <span v-if="isRequired" class="red-star-input">*</span>
    </label>
    <input
      :type="inputType"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
      @keydown="blockInvalidKeys"
      @blur="handleBlur"
    />
    <p v-if="(localError || errorMessage) && !modelValue" class="error-message">
      {{ localError || errorMessage }}
    </p>
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
input[type="number"] {
  -moz-appearance: textfield;
  -webkit-appearance: none;
  appearance: none;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
