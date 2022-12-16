<template>
  <div class="row d-flex justify-content-center align-items-center h-100 mt-5">
    <div class="col-md-8">
      <div class="card" style="border-radius: 15px">
        <div class="card-body p-5">
          <h2 class="text-uppercase text-center mb-5">Create Installments</h2>

          <form>
            <div class="form-outline mb-2">
              <select @change.prevent="selectCustomer($event)" class="form-select">
                <option value="">Select Customer</option>
                <template v-for="customer in customers" :key="customer.id">
                  <option :value="customer.id">{{ customer.name }}</option>
                </template>
              </select>
            </div>

            <div class="table-responsive mt-4">
              <table class="table table-hover table-striped">
                <thead>
                  <th>#</th>
                  <th>Amount</th>
                  <th>Expiry Date</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in tableRows" :key="item.id">
                    <th>{{ index + 1 }}</th>
                    <td>
                      <input
                        type="number"
                        class="form-control"
                        v-model="item.amount"
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        class="form-control"
                        v-model="item.expire_date"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        v-model="item.note"
                      />
                    </td>
                    <td>
                      <button class="btn btn-danger" @click.prevent="removeRow(index)">
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button @click.prevent="insert_Row" class="btn btn-primary">
              Add Installment
            </button>
          </form>
          <div class="d-flex justify-content-center">
            <button
              type="submit"
              class="btn btn-success btn-block btn-lg gradient-custom-4 text-light mt-4"
              @click="submit"
            >
              Create Installments
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br />
</template>

<script>
import axios from "axios";
import { useTokenStore } from "@/stores/token";

export default {
  async setup() {
    const runtimeConfig = useRuntimeConfig();
    const tokenStore = useTokenStore();
    //FETCH CUSTOMERS
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
      customers: customers,
    };
  },
  name: "createInstallment",
  data() {
    return {
      customer_id: 0,
      tableRows: [],
    };
  },
  methods: {
    insert_Row() {
      if (this.customer_id == 0) {
        alert("Please select a Customer");
      } else {
        let date = new Date().toJSON().slice(0, 10);
        this.tableRows.push({
          customer_id: this.customer_id,
          amount: 0,
          note: "",
          expire_date: date,
        });
      }
      //   console.log(this.tableRows);
    },

    removeRow(index) {
      this.tableRows.splice(index, 1);
      console.log(this.tableRows);
    },

    selectCustomer(e) {
      this.customer_id = parseInt(e.target.value);
      console.log(this.customer_id);
    },

    async submit() {
      const runtimeConfig = useRuntimeConfig();
      const tokenStore = useTokenStore();

      const apiUrl =
        runtimeConfig.public.baseUrl + "api/v1/installments/create";
      const installmentData = this.tableRows;
      const config = {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      };
      await axios
        .post(apiUrl, installmentData, config)
        .then(async (response) => {
          if (response.data.status) {
            alert("Installments Created!");
            await this.$router.push("/installments");
          }
        });
    },
  },
};
</script>

<style></style>
