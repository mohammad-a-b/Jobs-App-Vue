<script setup>
const model = defineModel();
defineProps({
  label: String,
  placeholder: String,
  isRequired: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div>
    <label class="input-label">
      {{ label }}
      <span class="red-star-input" v-if="isRequired">*</span>
    </label>
    <textarea v-model="model" :placeholder="placeholder" ></textarea>
  </div>
</template>

<style scoped>
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
