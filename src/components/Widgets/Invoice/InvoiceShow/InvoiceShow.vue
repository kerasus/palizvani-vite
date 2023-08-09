<template>
  <div class="InvoiceShow"
       :style="localOptions.style">
    <div class="title q-pb-lg">
      <div class="static-title" />
      <div class="dynamic-title" />
      <div class="back-action">
        <q-btn flat
               :to="{name: 'UserPanel.Invoice.List'}"
               color="grey">
          بازگشت
          >
        </q-btn>
      </div>
    </div>
    <q-card v-if="invoice.item_info"
            class="q-mt-lg">
      <q-linear-progress v-if="invoice.loading"
                         indeterminate />
      <q-card-section>
        <div class="row">
          <div class="col-md-3 col-12">
            <q-banner>
              <q-icon name="isax:stickynote" />
              {{ getDateTime(invoice.creation_time) }}
            </q-banner>
          </div>
          <div class="col-md-3 col-12">
            <q-banner>
              {{ (invoice.amount ? invoice.amount.toLocaleString('fa') : 0) }}
              تومان
            </q-banner>
          </div>
          <div class="col-md-3 col-12">
            <q-banner>
              شماره پیگیری
              {{ invoice.id }}
            </q-banner>
          </div>
          <div class="col-md-3 col-12">
            <q-banner>
              وضعیت:
              {{ invoice.status_info.label }}
            </q-banner>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-12">
            <q-img :src="invoice.item_info.thumbnail"
                   width="100px" />
            {{ invoice.item_info.title }}
          </div>
          <div class="col-md-4 col-12">
            <q-img :src="invoice.item_info.thumbnail"
                   width="100px" />
            <q-icon name="isax:user" />
            استاد:
            {{ invoice.item_info.professor_info.firstname }}
            {{ invoice.item_info.professor_info.lastname }}
          </div>
          <div class="col-md-4 col-12">
            <q-img :src="invoice.item_info.thumbnail"
                   width="100px" />
            <q-icon name="isax:card" />
            قیمت:
            {{ invoice.item_info?.price ? invoice.item_info.price.toLocaleString('fa') : 0 }}
            تومان
          </div>
        </div>
      </q-card-section>
    </q-card>
    <div class="action q-mt-lg">
      <q-card v-if="invoice.status!=='PAYING' && invoice.status!=='PAID_FULL' && invoice.status!=='PAID_IN_INSTALMENT'"
              class="q-mb-md">
        <q-card-section>
          تنها در صورتی که وضعیت سفارش در حال پرداخت باشد امکان پرداخت با کیف پول وجود دارد
        </q-card-section>
      </q-card>
      <q-btn v-if="invoice.status!=='PAYING' && invoice.status!=='PAID_FULL' && invoice.status!=='PAID_IN_INSTALMENT'"
             color="green"
             :disable="invoice.status!=='PAYING'"
             class="q-px-xl"
             @click="pay">
        پرداخت با کیف پول
      </q-btn>
    </div>
  </div>
</template>

<script>
import Assist from 'assets/js/Assist.js'
import { Invoice } from 'src/models/Invoice.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'InvoiceShow',
  mixins: [mixinWidget],
  props: {
    invoiceId: {
      type: Number,
      default: null
    }
  },
  data: () => {
    return {
      invoice: new Invoice()
    }
  },
  mounted() {
    this.getInvoice()
  },
  methods: {
    getDateTime (dateTime) {
      return Assist.miladiToShamsi(dateTime)
    },
    pay () {
      this.invoice.loading = true
      APIGateway.invoice.pay(this.invoice.id)
        .then((message) => {
          this.payMessage = message
          this.invoice.loading = false
        })
        .catch(() => {
          this.invoice.loading = false
        })
    },
    getInvoice () {
      this.invoice.loading = true
      const invoiceId = this.$route.params.id
      APIGateway.invoice.get({ data: { id: invoiceId } })
        .then((invoice) => {
          this.invoice = new Invoice(invoice)
          this.invoice.loading = false
        })
        .catch(() => {
          this.invoice.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.InvoiceShow {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
    display: flex;
    flex-flow: row;
    position: relative;
    .static-title {

    }
    .dynamic-title {

    }
    .back-action {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  :deep(.form) {
    padding: 24px;
  }

}
</style>
