<template>
  <div class="row mt-4">
    <div class="row mt-3">
      <div class="col-md-6">
        <h1 class="display-6">Installment List</h1>
      </div>
      <div class="col-md-6">
        <a
          class="btn btn-dark float-end mt-2"
          href="/installments/createInstallment"
        >
          Create Installment
        </a>
      </div>
    </div>
    <div class="table-responsive mt-3">
      <table class="table table-hover table-striped">
        <thead>
          <th>#</th>
          <th>Customer Name</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Expiry Date</th>
          <th>Actions</th>
        </thead>
        <tbody>
          <template
            v-for="(installment, index) in installments"
            :key="installment.id"
          >
            <tr>
              <td>{{ index + 1 }}</td>
              <td>{{ installment.customer.name }}</td>
              <td>{{ installment.amount }}</td>
              <td>{{ installment.status }}</td>
              <td>{{ installment.expire_date }}</td>
              <td>
                <button class="btn btn-success me-2">
                  <Icon name="ic:baseline-credit-card" />
                  PAY
                </button>
                <button class="btn btn-outline-secondary me-2">
                    <Icon name="ic:baseline-edit"/>
                </button>
                <button class="btn btn-outline-danger">
                    <Icon name="ic:baseline-delete"/>
                </button>
                
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useTokenStore } from "@/stores/token";

const runtimeConfig = useRuntimeConfig();
const tokenStore = useTokenStore();

const {
  data: response,
  error,
  refresh,
  pending,
} = await useFetch(`api/v1/installments/index`, {
  headers: {
    Authorization: `Bearer ${tokenStore.token}`,
  },
  baseURL: runtimeConfig.public.baseUrl,
});

const installments = response._rawValue.data;
</script>

<style lang="scss" scoped></style>
