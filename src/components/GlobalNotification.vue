<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()
const { message } = storeToRefs(notificationStore)
</script>

<template>
  <div v-if="message" class="notification">{{ message }}</div>
</template>

<style scoped>
.notification {
  background-color: #f56565;
  color: #fff;
  padding: 1rem;
  margin: 1rem;
  border-radius: 4px;
}
</style>
