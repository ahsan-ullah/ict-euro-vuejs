<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/customers">Customers</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/installments">Installments</a>
            </li>
          </ul>
          <ul class="navbar-nav d-flex">
            <li class="nav-item">
              <NuxtLink to="/login" event="" @click="logout" class="nav-link">
                Logout
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { useTokenStore } from "@/stores/token";

export default {
  setup() {
    const tokenStore = useTokenStore();
    return { setToken: tokenStore.setToken };
  },
  name: "navbar",
  methods: {
    async logout() {
      this.setToken("");
      await this.$router.push("/login");
    },
  },
};
</script>
