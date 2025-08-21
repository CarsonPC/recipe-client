<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notification";

defineOptions({ name: "LoginView" });

const email = ref("");
const password = ref("");

const router = useRouter();
const authStore = useAuthStore();
const notification = useNotificationStore();

const submit = async () => {
  notification.clear();
  try {
    await authStore.login({ email: email.value, password: password.value });
    router.push({ name: "recipes" });
  } catch {
    notification.setError("Login failed");
  }
};
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="submit">
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped></style>
