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
const imagePreview = ref(null);

const handleFileChange = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    selectedFile.value = files[0];
    emit("file-selected", files[0]);

    // Generate image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(files[0]);
  }
};
</script>

<template>
  <div class="main">
    <p class="title">
      {{ label }} <span v-if="isRequired" class="red-star-input">*</span>
    </p>
    <div class="file-input">
      <p v-if="selectedFile" class="file-name">{{ selectedFile.name }}</p>
      <input
        id="fileInput"
        type="file"
        class="hidden"
        @change="handleFileChange"
      />
      <label
        for="fileInput"
        class="file-btn"
        :style="
          imagePreview
            ? {
                backgroundImage: `url(${imagePreview})`,
                
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : {}
        "
      >
        آپلود (png/jpg/jpeg)
      </label>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
  position: relative;
  text-align: center;
}
.file-name {
  position: absolute;
  top: -25px;
  left: 0;
  font-size: 11px;
  color: #555;
  padding: 2px 6px;
  border-radius: 4px;
  background: #f9f9f9;
  border: 1px solid #dddddd76;
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
  color: #000;
  text-align: center;
}
.error-message {
  color: red;
  margin-top: 5px;
  font-size: 12px;
}
.title {
  margin-bottom: 8px;
  font-weight: bold;
}
.red-star-input {
  color: red;
}
</style>
