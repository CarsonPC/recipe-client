<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import GlobalNotification from '@/components/GlobalNotification.vue'
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
      <RouterLink to="/recipes">Recipes</RouterLink>
    </nav>
    <GlobalNotification />
    <RouterView />
  </div>
</template>

<style scoped>
nav {
  background-color: #f0f0f0;
  padding: 1rem;
  display: flex;
  gap: 1rem;
}

nav a {
  color: #333;
  text-decoration: none;
}

nav a.router-link-exact-active {
  font-weight: bold;
}
</style>
