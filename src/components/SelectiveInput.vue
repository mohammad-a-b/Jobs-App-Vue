<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  label: String,
  options: Array,
  modelValue: String,
  star: {
    type: String,
    default: "*",
  },
});

const emit = defineEmits(['update:modelValue']);

const selectedExperience = ref(props.modelValue);

watch(selectedExperience, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<template>
  <div>
    <label class="input-label">{{ label }} <span class="red-star-input">{{ star }}</span></label>
    <select v-model="selectedExperience" required>
      <option disabled value="" class="disabled-option">انتخاب کنید...</option> 
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style scoped>
div {
  margin-top: 10px;
}
select {
  margin: 5px 0;
  width: 100%;
  padding: 7.2px 12px;
  border: 1px solid #000000;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
}

select:focus {
  border: 1px #3abed5 solid;
  outline: none;
}

.placeholder-active {
  color: #c7c7cc;
  font-size: 15px;
  font-weight: 200;
}
</style>
