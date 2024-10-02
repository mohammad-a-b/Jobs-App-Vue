<script setup>
defineProps({
  label: String,
  placeholder: String,
  modelValue: String,
  isRequired: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <label class="input-label">
      {{ label }} <span v-if="isRequired" class="red-star-input"> * </span>
    </label>
    <input
      type="text"
      :value="modelValue"
      @input="(event) => emit('update:modelValue', event.target.value)"
      :placeholder="placeholder"
      :required="isRequired"
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
</style>
