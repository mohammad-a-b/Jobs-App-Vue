<script setup></script>
<template>
  <div id="app">
    <header>
      <router-link to ="/jobs/create"
        ><img src="./assets/icons/logo.svg" alt="Logo"
        
      /></router-link>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
header {
 margin-bottom: 20px;
 display: flex;
 justify-content: center;
 border-bottom: 1px solid #c6c6c6;
}


.red-star-input {
  color: #ff3b30;
}
</style>
