<script setup>
import { useToast } from "@/stores/toast-store";
const { toastData } = useToast();
</script>
<template>
  <div v-if="toastData.visible" :class="['toast', toastData.type]">
    {{ toastData.message }}
  </div>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 25px;
  left: 20px;
  padding: 14px 25px;
  border-radius: 8px;
  font-size: 14.5px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
  animation: slide-in 0.4s, fade-out 0.5s 1.5s forwards;
  z-index: 9;
}

.toast.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.toast.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-out {
  to {
    opacity: 0;
  }
}
</style>
