<script setup>
import { ref } from "vue";

const props = defineProps({
  errorMessage: String,
  label: String,
  isRequired: {
    type: Boolean,
    default: true,
  },  
});

const emit = defineEmits(["file-selected"]);

const selectedFile = ref(null);

const handleFileChange = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    selectedFile.value = files[0];
    emit("file-selected", files[0]);
  }
};
</script>

<template>
  <div class="main">
    
      <p class="title">{{ label }} <span v-if=" isRequired" class="red-star-input">*</span></p>
      
    
    <div class="file-input">
      <input
        id="fileInput"
        type="file"
        class="hidden"
        @change="handleFileChange"
      />
      <label for="fileInput" class="file-btn">آپلود (png/jpg/jpeg)</label>
      <p v-if="selectedFile" class="file-name">{{ selectedFile.name }}</p>
      <p class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.main {
  margin: 10px 0;
}
.hidden {
  display: none;
}
.file-input {
  text-align: center;
}
.file-btn {
  width: 100%;
  display: inline-block;
  background-color: #ffffff;
  padding: 8px 0;
  border: 1px solid #000000;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}
.file-name {
  margin-top: 5px;
  font-size: 14px;
  color: #555;
}
</style>
