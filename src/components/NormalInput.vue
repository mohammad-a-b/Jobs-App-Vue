<script setup>
import { ref } from "vue";
defineProps({
  label: String,
  height: String,
  placeholder: String,
  star: {
    type: String,
    default: "*",
  }, 
  isRequired: {
    type: Boolean,
    default: true
  }
});
const Title = ref("");
</script>

<template>
  <div>
    <label
      >{{ label }} <span class="red-star-input">{{ star }}</span></label
    >
    <input
      :style="{ height: height }"
      type="text"
      v-model="Title"
      :placeholder="placeholder"
      :required="isRequired"
      
    />
  </div>
</template>

<style scoped>
div {
  margin-top: 10px;
}

</style>
