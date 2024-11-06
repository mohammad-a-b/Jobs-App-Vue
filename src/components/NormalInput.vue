<!-- <script setup>
import { ref } from "vue";

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

const handleBlur = () => {
  if (props.isRequired && !modelValue.value) {
    showError.value = true;
  } else {
    showError.value = false;
  }
};

const blockInvalidKeys = (event) => {
  if (props.inputType === 'number') {
    const invalidKeys = ['e', '.', '-', '+'];
    if (invalidKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
};
</script>

<template>
  <div>
    <label class="input-label">
      {{ label }} <span v-if="isRequired" class="red-star-input">*</span>
    </label>
    <input
      :type="inputType"
      v-model="modelValue"
      :placeholder="placeholder"
      @keydown="blockInvalidKeys"
      @blur="handleBlur"
    />
    <p v-if="(showError || errorMessage)&&!modelValue" class="error-message">{{ errorMessage || "این فیلد الزامی است" }}</p>
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

</style> -->
<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  inputType: { type: String, default: "text" },
  errorMessage: String,
});

const emit = defineEmits(["update:modelValue"]);

const localError = ref("");

const handleBlur = () => {
  localError.value = props.modelValue ? "" : "عنوان نمی‌تواند خالی باشد";
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
    <label>{{ label }}</label>
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
