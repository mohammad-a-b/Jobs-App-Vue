<script setup>
import { ref } from "vue";

const newSkill = ref("");
const skills = ref([]);
const addSkill = () => {
  console.log(newSkill.value);
  if (newSkill.value.trim()) {
    skills.value.push(newSkill.value.trim());
    newSkill.value = "";
  }
};
const deleteSkill = (i) => {
  skills.value.splice(i, 1);
};
</script>
<template>
  <div>
    <label for="skills">مهارت‌ها  <span class="red-star-input">*</span> </label>
    <input
      id="skills"
      type="text"
      v-model="newSkill"
      placeholder="مهارت را وارد کنید و Enter بزنید..."
      @keyup.enter.prevent="addSkill"
      required
      
    />
    <ul class="skills-list">
      <li v-for="(skill, index) in skills" :key="index" class="skill-item">
        <button @click.prevent="deleteSkill(index)" class="delete-item"> <img src="../assets/icons/deleteSkill.svg" alt=""></button>
        {{ skill }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
div {
  margin-top: 10px;
}
.skills-list {
  margin-top: 10px;
  display: flex;
  justify-content: end;
  flex-wrap: wrap;
  
}
li{
  display: flex;
  align-items: start;
}

.skill-item {
  background-color: #ffffff;
  padding: 0px 10px;
  border: 1px solid #000000;
  border-radius: 15px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 14px;
}
.delete-item {
  cursor: pointer;
  margin-left: 8px;
  height: 5px;
}
</style>
