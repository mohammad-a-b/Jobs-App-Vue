<script setup>
import Toast from "@/components/Toast.vue";
</script>
<template>
  <div id="app">
    <header>
      <router-link to="/jobs/create"
        ><img src="./assets/icons/logo.svg" alt="Logo"
      /></router-link>
    </header>
    <main>
      <Toast />
      <router-view />
    </main>
  </div>
</template>

<style>
header {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #c6c6c6;
}

.link-container a.list {
  position: absolute;
  top: -42px;
  left: 0;
}
.link-container {
  font-size: 14px;
  width: fit-content;
  font-weight: 300;
}
.link-container a {
  border-bottom: 1px solid #000000;
}
.red-star-input {
  color: #ff3b30;
}
</style>
