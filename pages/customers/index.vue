<template>
  <div class="row mt-3">
    <div class="col-md-6">
      <h1 class="display-6">Customer List</h1>
    </div>
    <div class="col-md-6">
      <a class="btn btn-dark float-end mt-2" href="/customers/createCustomer">
        Create Customer
      </a>
    </div>
  </div>
  <div class="table-responsive mt-3">
    <table class="table table-hover table-striped">
      <thead>
        <th>Name</th>
        <th>Phone</th>
        <th>Installments</th>
        <th>No. of Installments</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <template v-for="customer in customers" :key="customer.id">
          <tr>
            <td>{{ customer.name }}</td>
            <td>{{ customer.phone }}</td>
            <td v-if="customer.installments.length != 0">
              <span
                v-for="(installment, index) in customer.installments"
                :key="index"
              >
                {{ installment.amount }}€
              </span>
            </td>
            <td v-else>
              <span> No Installments </span>
            </td>

            <td>{{ customer.installments.length }}</td>
            <td>
              <button
                v-if="customer.installments.length != 0"
                class="btn btn-success me-2"
                @click="
                  $router.push(`/customers/payInstallments/${customer.id}`)
                "
              >
                <Icon name="ic:baseline-credit-card" />
                PAY
              </button>
              <button
                v-else
                class="btn btn-success me-2"
                disabled
              >
                <Icon name="ic:baseline-credit-card" />
                PAY
              </button>
              <button
                @click="
                  $router.push(`/customers/updateCustomer/${customer.id}`)
                "
                class="btn btn-outline-dark"
              >
                <Icon name="ic:baseline-edit" />
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useTokenStore } from "@/stores/token";

export default {
  async setup() {
    const runtimeConfig = useRuntimeConfig();
    const tokenStore = useTokenStore();

    const {
      data: response,
      error,
      refresh,
      pending,
    } = await useFetch(`api/v1/customers/index`, {
      headers: {
        Authorization: `Bearer ${tokenStore.token}`,
      },
      baseURL: runtimeConfig.public.baseUrl,
    });

    const customers = response._rawValue.data;

    return {
      customers,
    };
  },
};
</script>

<style></style>
