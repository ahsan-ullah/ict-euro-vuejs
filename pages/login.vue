<template>
  <NuxtLayout :name="layout">
    <div class="container" v-if="auth()">
      <div class="row mt-5">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <form @submit.prevent="submit">
            <div class="form-group">
              <label>Email address</label>
              <input
                v-model="email"
                type="email"
                class="form-control mt-2"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label class="mt-2">Password</label>
              <input
                v-model="password"
                type="password"
                class="form-control mt-2"
                placeholder="Password"
              />
            </div>
            <button class="btn btn-primary mt-2">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
import axios from "axios";
import { useTokenStore } from "@/stores/token";

definePageMeta({
  layout: "loginLayout",
});

export default {
  setup() {
    const tokenStore = useTokenStore();
    return { setToken: tokenStore.setToken, token: tokenStore.token };
  },
  name: "login",
  data() {
    return { email: "", password: "" };
  },
  methods: {
    async submit() {
      const apiUrl = "http://127.0.0.1:8000/api/v1/auth/login";
      const authData = {
        email: this.email,
        password: this.password,
        returnSecureToken: true,
      };
      await axios.post(apiUrl, authData).then(async (response) => {
        if (response.data.status) {
          this.setToken(response.data.authorisation.token);
          await this.$router.push("/");
        }
      });
    },
    auth() {
      if (this.token) {
        this.$router.push("/");
      } else return true;
    },
  },
};
</script>

<style scoped></style>
