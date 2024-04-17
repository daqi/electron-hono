<template>
  <h1>💖 Hello World!</h1>
  <p>Welcome to your Electron application.</p>
</template>

<script setup lang="ts">
console.log('👋 This message is being logged by "App.vue", included via Vite');

const fetch = window.electron.fetch || window.fetch;
fetch("/", { method: "POST", body: JSON.stringify({ name: "John" }) })
    .then((e) => e.json())
    .then(console.log);
</script>
