import { defineStore } from "pinia";

export const useTokenStore = defineStore("token", {
  state: () => {
    return { token: "" };
  },
  actions: {
    setToken(val) {
      this.token = val;
      return this.token;
    },
  },
  persist: true,
});
