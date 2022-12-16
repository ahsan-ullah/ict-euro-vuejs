<template>
  <div>
    <div
      class="row d-flex justify-content-center align-items-center h-100 mt-5"
    >
      <div class="col-12 col-md-9 col-lg-7 col-xl-6">
        <div class="card" style="border-radius: 15px">
          <div class="card-body p-5">
            <h2 class="text-uppercase text-center mb-5">Update Customer</h2>

            <form @submit.prevent="submit">
              <div class="form-outline mb-2">
                <label class="form-label">Name</label>
                <input v-model="name" type="text" class="form-control" />
              </div>

              <div class="form-outline mb-2">
                <label class="form-label">Email</label>
                <input v-model="email" type="email" class="form-control" />
              </div>

              <div class="form-outline mb-2">
                <label class="form-label">Phone</label>
                <input v-model="phone" type="text" class="form-control" />
              </div>

              <div class="form-outline mb-2">
                <label class="form-label">Address</label>
                <input v-model="address" type="text" class="form-control" />
              </div>

              <div class="d-flex justify-content-center">
                <button
                  type="submit"
                  class="btn btn-success btn-block btn-lg gradient-custom-4 text-light mt-4"
                >
                  Update Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script setup>
import { useTokenStore } from "@/stores/token";

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const tokenStore = useTokenStore();

const {
  data: response,
  error,
  refresh,
  pending,
} = await useFetch(`api/v1/customers/show/${route.params.id}`, {
  headers: {
    Authorization: `Bearer ${tokenStore.token}`,
  },
  baseURL: runtimeConfig.public.baseUrl,
});

const name = response._rawValue.data.name;
const address = response._rawValue.data.address;
const email = response._rawValue.data.email;
const phone = response._rawValue.data.phone;

const submit = async () => {
  const apiUrl = "http://127.0.0.1:8000/api/v1/customers/update";
  const customerData = {
    name: name,
    email: email,
    address: address,
    phone: phone,
    id: parseInt(route.params.id),
  };
  const config = {
    headers: { Authorization: `Bearer ${tokenStore.token}` },
  };
  console.log(customerData);
  // await axios.post(apiUrl, customerData, config).then(async (response) => {
  //   if (response.data.status) {
  //     alert("Customer Created!");
  //     await this.$router.push("/customers");
  //   }
  // });
};
</script>

<style lang="scss" scoped></style>
