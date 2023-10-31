<template>
  <div class="InvoiceShow"
       :style="localOptions.style">
    <div class="row justify-center items-center">
      <div class="col-md-6 q-mt-lg">
        <q-card>
          <q-card-section class="text-center">
            <div v-if="$route.query.status === 'true'">
              پرداخت با موفقیت انجام شد
            </div>
            <div v-else>
              پرداخت نا موفق بود
            </div>
            <div>
              کد پیگیری:
              {{ $route.query.code }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-if="$route.query.invoice && !invoice.loading"
         class="row justify-center items-center">
      <div class="col-md-6 q-mt-lg">
        <invoice-show :options="{invoiceId: $route.query.invoice, invoice: invoice}" />
      </div>
    </div>
    <div v-if="!invoice.loading"
         class="flex justify-center q-mt-md">
      <q-btn v-if="invoice.type === 'CLASSROOM'"
             color="primary"
             :to="{name: 'UserPanel.Profile.AllClassrooms'}">
        مشاهده دوره های من
      </q-btn>
      <q-btn v-if="invoice.type === 'EVENT'"
             color="primary"
             :to="{name: 'UserPanel.Profile.AllEvents'}">
        مشاهده رویدادهای من
      </q-btn>
    </div>
  </div>
</template>

<script>
import { Invoice } from 'src/models/Invoice.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import InvoiceShow from 'src/components/Widgets/Invoice/InvoiceShow/InvoiceShow.vue'

export default {
  name: 'InvoiceThankyou',
  components: {
    InvoiceShow
  },
  mixins: [mixinWidget],
  data () {
    return {
      invoice: new Invoice()
    }
  },
  created() {
    this.invoice.loading = true
  },
  mounted() {
    this.getInvoice()
  },
  methods: {
    getInvoice () {
      this.invoice.loading = true
      APIGateway.invoice.get({ data: { id: this.$route.query.invoice } })
        .then(invoice => {
          this.invoice = invoice
          this.invoice.loading = false
        })
        .catch(() => {
          this.invoice.loading = false
        })
    }
  }
}
</script>
