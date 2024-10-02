<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  label: String,
  placeholder: String,
  modelValue: {
    type: String,
    default: "",
  },
  isRequired: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:modelValue']);
const textValue = ref(props.modelValue);

const updateValue = () => {
  emit('update:modelValue', textValue.value);
};

watch(() => props.modelValue, (newValue) => {
  textValue.value = newValue;
});
</script>

<template>
  <div>
    <label class="input-label">
      {{ label }}
      <span class="red-star-input" v-if="isRequired">*</span>
    </label>
    <textarea
      v-model="textValue"
      :placeholder="placeholder"
      @input="updateValue"
      required
    ></textarea>
  </div>
</template>

<style scoped>
textarea {
  width: 100%;
  min-height: 150px;
  max-height: 600px;
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
