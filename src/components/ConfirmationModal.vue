<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal-content">
      <h3>آیا از ارسال اطلاعات اطمینان دارید؟</h3>
      <div class="modal-actions">
        <button @click="confirmAction" class="confirm-btn">بله</button>
        <button @click="cancelAction" class="cancel-btn">خیر</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isVisible = ref(false);
const onConfirm = ref(null);

const showModal = (callback) => {
  isVisible.value = true;
  onConfirm.value = callback;
};

const confirmAction = () => {
  onConfirm.value();
  isVisible.value = false;
};

const cancelAction = () => {
  isVisible.value = false;
};

defineExpose({ showModal });
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-actions {
  margin-top: 20px;
}

.confirm-btn,
.cancel-btn {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.confirm-btn {
  background-color: #30b0c7;
  color: white;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}
</style>
