<template>
  <div>
    <div class="row mt-3">
      <div class="col-md-12">
        <button class="btn btn-dark" @click="$router.push(`/customers/`)">
          <Icon name="ic:baseline-keyboard-return" /> Back
        </button>
      </div>
      <div
        class="row d-flex justify-content-center align-items-center h-100 mt-5"
      >
        <div class="col-12 col-md-9 col-lg-7 col-xl-10">
          <div class="card" style="border-radius: 15px">
            <div class="card-body p-5">
              <h3 class="text-uppercase text-center mb-5">
                Installment Pay to Stripe<span><hr /></span>
              </h3>

              <h5>Customer Name: {{ customer.name }}</h5>
              <h6>Total Installment: {{ customer.installments.length }}</h6>

              <div class="table-responsive mt-3">
                <table class="table table-hover table-striped">
                  <thead>
                    <th>#</th>

                    <th>Installment</th>
                    <th>Expiry Date</th>
                    <th>Actions</th>
                  </thead>
                  <tbody>
                    <template
                      v-for="(installment, index) in customer.installments"
                      :key="index"
                    >
                      <tr>
                        <th>{{ index + 1 }}</th>
                        <td>{{ installment.amount }} €</td>
                        <td>{{ installment.expire_date }}</td>
                        <td>
                          <button
                            v-if="installment.status == 0"
                            class="btn btn-success me-2"
                            @click="pay(installment)"
                          >
                            <Icon name="ic:baseline-credit-card" />
                            PAY
                          </button>
                          <button v-else class="btn btn-success me-2" disabled>
                            <Icon name="ic:baseline-credit-card" />
                            PAID
                          </button>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
                <template v-if="show">
                  <h4 class="mt-5">
                    Card Details (paying {{ selected_installment.amount }} €)
                  </h4>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-outline mb-2">
                        <label class="form-label">Card Number</label>
                        <input
                          v-model="card_number"
                          type="text"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-outline mb-2">
                        <label class="form-label">CVC</label>
                        <input
                          v-model="cvc"
                          type="email"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-outline mb-2">
                        <label class="form-label">Expiry Month</label>
                        <input
                          v-model="exp_month"
                          type="text"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-outline mb-2">
                        <label class="form-label">Expiry Year</label>
                        <input
                          v-model="exp_year"
                          type="text"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md-12">
                      <button class="btn btn-danger" @click="hide">
                        Cancel
                      </button>
                      <button @click="submit" class="btn btn-success float-end">
                        Pay
                      </button>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import { useTokenStore } from "@/stores/token";
import axios from "axios";

export default {
  async setup() {
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

    const customer = response._rawValue.data;

    return { customer: customer };
  },
  name: "payInstallment",
  data() {
    return {
      card_number: "",
      cvc: "",
      exp_month: "",
      exp_year: "",
      show: false,
      selected_installment: {},
    };
  },
  methods: {
    pay(installment) {
      this.show = true;
      this.selected_installment = installment;
    },
    hide() {
      this.show = false;
    },
    async submit() {
      const runtimeConfig = useRuntimeConfig();
      const tokenStore = useTokenStore();

      const apiUrl =
        runtimeConfig.public.baseUrl + "api/v1/installments/payment";
      const paymentData = {
        id: this.selected_installment.id,
        card_number: this.card_number,
        cvc: this.cvc,
        exp_month: this.exp_month,
        exp_year: this.exp_year,
      };
      const config = {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      };
      console.log(paymentData);
      await axios
        .post(apiUrl, paymentData, config)
        .then(async (response) => {
          console.log(response.data);
          if (response.data.status) {
            alert("Payment made");
            await this.$router.push("/customers");
          }
          else {
            console.log(response.data);
          }
        });
    },
  },
};
</script>

<style>
.table-responsive::-webkit-scrollbar {
  height: 8px;
}
</style>
