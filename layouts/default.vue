<template>
  <div v-if="auth()">
    <Navbar />
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<script>
import { useTokenStore } from "@/stores/token";

export default {
  setup() {
    const tokenStore = useTokenStore();
    return { token: tokenStore.token };
  },
  name: "home",
  methods: {
    auth() {
      if (this.token) {
        return true;
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>
