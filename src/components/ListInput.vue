<!-- <script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const newSkill = ref("");
const skills = ref([...props.modelValue]);
const emit = defineEmits(["update:modelValue"]);

const addSkill = () => {
  const skill = newSkill.value.trim();
  if (skill) {
    skills.value.push(skill);
    newSkill.value = "";
    emit("update:modelValue", skills.value);
  }
};

const deleteSkill = (index) => {
  skills.value.splice(index, 1);
  emit("update:modelValue", skills.value);
};

watch(
  () => props.modelValue,
  (newValue) => {
    skills.value = [...newValue];
  }
);
</script>

<template>
  <div>
    <label class="input-label" for="skills">
      مهارت‌ها <span class="red-star-input">*</span>
    </label>
    <input
      id="skills"
      type="text"
      v-model="newSkill"
      placeholder="مهارت را وارد کنید و Enter بزنید..."
      @keyup.enter.prevent="addSkill"
    />
    <ul class="skills-list">
      <li v-for="(skill, index) in skills" :key="index" class="skill-item">
        <button type="button" @click="deleteSkill(index)" class="delete-item">
          <img src="../assets/icons/deleteSkill.svg" alt="حذف مهارت" />
        </button>
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
#skills {
  margin: 5px 0;
  padding: 9px 12px;
  border-radius: 4px;
}
</style> -->
<script setup>
const model = defineModel();
const newItem = defineModel(" ");

const addItem = () => {
  const item = newItem.value.trim();
  if (item) {
    model.value.push(item);
    newItem.value = "";
  }
};

const deleteItem = (index) => {
  model.value.splice(index, 1);
};
</script>

<template>
  <div>
    <label class="input-label"
      >آیتم‌ها <span class="red-star-input">*</span></label
    >
    <input
      type="text"
      v-model="newItem"
      placeholder="آیتم را وارد کنید و Enter بزنید..."
      @keyup.enter.prevent="addItem"
      id="skills"
    />
    <ul class="skills-list">
      <li v-for="(item, index) in model" :key="index" class="skill-item">
        <button type="button" @click="deleteItem(index)" class="delete-item">
          <img src="../assets/icons/deleteSkill.svg" alt="حذف مهارت" />
        </button>
        {{ item }}
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
}
</style>
