<script setup>
import { ref } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  checkedValue: {
    type: Boolean,
    default: false,
  },
});

const checked = ref(props.checkedValue);

const toggleCheck = () => {
  checked.value = !checked.value;
};
</script>

<template>
  <div class="checkbox-container" @click="toggleCheck">
    <input type="checkbox" v-model="checked" />
    <label>{{ label }}</label>
  </div>
</template>

<style scoped>
input {
  padding: 7px;
}
.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: max-content;
}

input[type="checkbox"] {
  margin-left: 10px;
  width: 22px;
  height: 21px;
  background-color: #fff;
  appearance: none;
  border: 2px solid #000;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  display: inline-block;
}

input[type="checkbox"]:checked::after {
  content: "✔";
  position: absolute;
  scale: 1.2;
  left: 4px;
  top: -2px;
  font-size: 14px;
  color: #000;
}

label {
  color: #000;
  user-select: none;
  font-size: 14px;
  font-weight: 500;
}
</style>
