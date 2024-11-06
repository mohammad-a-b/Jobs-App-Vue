<script setup>
import { ref } from "vue";

const props = defineProps({
  label: String,
  errorMessage: String,
});

const model = defineModel();
const newSkill = ref("");

const addSkill = () => {
  if (newSkill.value.trim()) {
    model.value.push(newSkill.value.trim());
    newSkill.value = "";
  }
};

const removeSkill = (index) => {
  model.value.splice(index, 1);
};
</script>

<template>
  <div  class="container">
    <label>{{ label }}</label>
    <div>
      <input
        id="skills"
        v-model="newSkill"
        type="text"
        placeholder="مهارت جدید را وارد کنید"
        @keydown.enter.prevent="addSkill"
      />
    </div>

    <ul class="skills-list">
      <li v-for="(skill, index) in model" :key="index" class="skill-item">
        <span class="delete-item" @click="removeSkill(index)">✖</span>
        {{ skill }}
      </li>
    </ul>

    <p v-if="errorMessage && model.length === 0" class="error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
.container {
  margin-top: 20px;
}

.skills-list {
  margin-top: 10px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: end;
  flex-wrap: wrap;
}

li {
  display: flex;
  align-items: start;
}

.skill-item {
  background-color: #ffffff;
  padding: 0px 10px;
  border: 1px solid #000000;
  border-radius: 14px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.delete-item {
  cursor: pointer;
  margin-left: 8px;
  height: 5px;
}

#skills {
  margin: 5px 0;
  padding: 9px 12px;
  border-radius: 4px;
  border: 1px solid #000000;
}
</style>
