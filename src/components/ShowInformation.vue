<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <h3>اطلاعات ثبت شده</h3>
      <div class="modal-content">
        <p><strong>عنوان:</strong> {{ formData.title }}</p>
        <p><strong>سابقه کار:</strong> {{ formData.seniority }}</p>
        <p><strong>حقوق:</strong> {{ formData.salary }}</p>
        <p><strong>مهارت‌ها:</strong> {{ formData.skills.join(', ') }}</p>
        <p><strong>شرح:</strong> {{ formData.description }}</p>
        <p><strong>شرکت:</strong> {{ getCompanyLabel(formData.companyId) }}</p>
        <p><strong>امکان دورکاری:</strong> {{ formData.remotePossibility ? 'بله' : 'خیر' }}</p>
        <p><strong>آگهی فوری:</strong> {{ formData.immediateRequirement ? 'بله' : 'خیر' }}</p>
      </div>
      <button @click="closeModal">بستن</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
  formData: Object,
  companies: Array,
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

const getCompanyLabel = (id) => {
  const company = props.companies.find(company => company.value === id);
  return company ? company.label : 'ERROR';
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 600px;
  animation: fadeIn 0.3s;
}

.modal-content {
  margin-bottom: 20px;
}

button {
  background-color: #30b0c7;
  color: #ffffff;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #28a3b2;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
