<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notification";

defineOptions({ name: "RegisterView" });

const name = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");

const router = useRouter();
const authStore = useAuthStore();
const notification = useNotificationStore();

const submit = async () => {
  notification.clear();
  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    });
    router.push({ name: "recipes" });
  } catch {
    notification.setError("Registration failed");
  }
};
</script>

<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="submit">
      <div>
        <label for="name">Name</label>
        <input id="name" v-model="name" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" required />
      </div>
      <div>
        <label for="password_confirmation">Confirm Password</label>
        <input
          id="password_confirmation"
          type="password"
          v-model="passwordConfirmation"
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped></style>
