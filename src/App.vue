<template>
  <h1>💖 Hello World!</h1>
  <p>Welcome to your Electron application.</p>
</template>

<script setup lang="ts">
console.log('👋 This message is being logged by "App.vue", included via Vite');

const fetch = window.electron.fetch || window.fetch;
(async () => {
    await fetch("/users", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ name: "John" }),
    })
        .then((e) => e.text())
        .then(console.log);
    await fetch("/posts", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ name: "John first post", content: "John first post content", ownerId: 1 }),
    })
        .then((e) => e.text())
        .then(console.log);
})();
</script>
