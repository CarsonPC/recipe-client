import { defineStore } from "pinia";
import {
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
  type LoginPayload,
  type RegisterPayload,
} from "@/services/authService";

interface User {
  email: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem("token") as string | null,
  }),
  actions: {
    async login(payload: LoginPayload) {
      const response = await loginRequest(payload);
      const token = response.data?.data?.token;
      if (token) {
        this.token = token;
        localStorage.setItem("token", token);
      }
      this.user = { email: payload.email };
      return response;
    },
    async register(payload: RegisterPayload) {
      const response = await registerRequest(payload);
      const token = response.data?.data?.token;
      if (token) {
        this.token = token;
        localStorage.setItem("token", token);
      }
      this.user = { email: payload.email };
      return response;
    },
    async logout() {
      await logoutRequest();
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
