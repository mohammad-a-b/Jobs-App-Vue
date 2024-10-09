<script setup></script>
<template>
  <div id="app">
    <header>
      <a href="/jobs/create"
        ><img src="./assets/icons/logo.svg" alt="Logo"
      /></a>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
body {
  background-color: #0094e9ac;
  background-image: linear-gradient(64deg, #1588b2 0%, #aaf3f5 95%);
}
.red-star-input {
  color: #ff3b30;
}
</style>
