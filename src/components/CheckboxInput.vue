<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue']);
const checked = ref(false);

watch(() => props.modelValue, (newValue) => {
  checked.value = newValue;
});

watch(checked, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<template>
  <label class="input-label">
    <input type="checkbox" v-model="checked" />
    <span>{{ label }}</span>
  </label>
</template>

<style scoped>
input {
  padding: 7px;
  margin-top: 5px
}
.input-label {
  align-items: center;
  display: flex;
  cursor: pointer;
  width: max-content;
}

input[type="checkbox"] {
  margin-left: 10px;
  width: 22px;
  height: 21px;
  appearance: none;
  border: 2px solid #000;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}

input[type="checkbox"]:checked::after {
  content: url(../assets/icons/checked.svg);
  position: absolute;
  scale: 1.2;
  left: 3.5px;
  top: 1px;
  font-size: 14px;
  color: #000;
}

label {
  color: #000;
  user-select: none;
  font-size: 14px;
}
</style>
