<template>
  <div class="AdminInvoiceShow"
       :style="localOptions.style">
    <div class="title q-pb-lg">
      <div class="static-title" />
      <div class="dynamic-title" />
      <div v-if="localOptions.showBackBtn"
           class="back-action">
        <q-btn flat
               :to="{name: 'Admin.Invoice.List'}"
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
        صورتحساب شناسه
        {{ invoice.id }}
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-banner>
          مشخصات خریدار
        </q-banner>
        <div class="row q-mt-md">
          <div class="col-md-3 col-12">
            نام و نام خانوادگی:
            {{ invoice.owner_info?.firstname }}
            {{ invoice.owner_info?.lastname }}
          </div>
          <div class="col-md-3 col-12">
            کد ملی:
            {{ invoice.owner_info?.national_code }}
          </div>
          <div class="col-md-3 col-12">
            تلفن همراه:
            {{ invoice.owner_info?.mobile_number }}
          </div>
          <div v-if="invoice.owner_info?.id"
               class="col-md-3 col-12">
            <q-btn outline
                   color="primary"
                   :to="{name: 'Admin.User.Show', params: {id: invoice.owner_info.id}}">
              مشخصات کاربر
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator />
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
              ریال
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
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row">
          <div class="col-md-4 col-12 flex items-center justify-start">
            <q-img :src="invoice.item_info.thumbnail"
                   width="100px" />
            {{ invoice.item_info.title }}
          </div>
          <div class="col-md-4 col-12">
            <q-icon name="isax:user" />
            استاد:
            {{ invoice.item_info.professor_info.firstname }}
            {{ invoice.item_info.professor_info.lastname }}
          </div>
          <div class="col-md-4 col-12">
            <q-icon name="isax:card" />
            قیمت:
            {{ invoice.item_info?.price ? invoice.item_info.price.toLocaleString('fa') : 0 }}
            ریال
          </div>
        </div>
      </q-card-section>
    </q-card>
    <div class="action q-mt-lg">
      <q-card>
        <q-card-section>
          پرداخت
        </q-card-section>
        <q-separator />
        <q-card-section>
          <invoice-payment-card v-if="!invoice.loading && invoice.status!=='PAID_FULL'"
                                :wallet="wallet"
                                :invoice="invoice"
                                :show-invoice-link="false"
                                :show-timer="false"
                                :show-message="false"
                                :show-wallet="false"
                                :can-action="false"
                                class="payment-card"
                                @onCancel="onCancel"
                                @onAccept="onAccept"
                                @onInstalmentPayed="onInstalmentPayed" />
        </q-card-section>
      </q-card>

    </div>
  </div>
</template>

<script>
import Assist from 'assets/js/Assist.js'
import { User } from 'src/models/User.js'
import { Wallet } from 'src/models/Wallet.js'
import { Invoice } from 'src/models/Invoice.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import InvoicePaymentCard from 'src/components/InvoicePaymentCard/InvoicePaymentCard.vue'

export default {
  name: 'AdminInvoiceShow',
  components: { InvoicePaymentCard },
  mixins: [mixinWidget],
  props: {
    invoiceId: {
      type: Number,
      default: null
    }
  },
  data: () => {
    return {
      user: new User(),
      wallet: new Wallet(),
      invoice: new Invoice(),
      defaultOptions: {
        showBackBtn: true
      }
    }
  },
  mounted() {
    this.loadAuthData()
    this.getMyWallet()
    this.getInvoice()
  },
  methods: {
    loadAuthData() { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
    },
    getDateTime (dateTime) {
      return Assist.miladiToShamsi(dateTime)
    },
    onCancel () {
      this.invoice.loading = true
      APIGateway.invoice.cancel(this.invoice.id)
        .then((message) => {
          this.invoice.loading = false
          this.getInvoice()
          this.$q.notify({
            message,
            type: 'positive'
          })
        })
        .catch(() => {
          this.invoice.loading = false
        })
    },
    onAccept () {
      this.payInvoice()
    },
    onInstalmentPayed () {
      this.getMyWallet()
      this.getInvoice()
    },
    getMyWallet () {
      this.wallet.loading = true
      APIGateway.wallet.getMyWallet(this.user.id)
        .then((wallet) => {
          this.wallet = new Wallet(wallet)
          this.wallet.loading = false
          this.walletLoaded = true
        })
        .catch(() => {
          this.wallet.loading = false
        })
    },
    amountOfDepositWalletNeeded () {
      return this.invoice.amount - this.wallet.inventory
    },
    payInvoice () {
      if (this.amountOfDepositWalletNeeded() > 0) {
        this.payInvoiceByDepositWallet()
      } else {
        this.payInvoiceByWallet()
      }
    },
    payInvoiceByWallet () {
      this.invoice.loading = true
      APIGateway.invoice.pay(this.invoice.id)
        .then((message) => {
          this.invoice.loading = false
          this.getInvoice()
          this.$q.notify({
            message,
            type: 'positive'
          })
        })
        .catch(() => {
          this.invoice.loading = false
        })
    },
    payInvoiceByDepositWallet () {
      this.invoice.loading = true
      APIGateway.wallet.deposit({
        amount: this.amountOfDepositWalletNeeded(),
        invoice: this.invoice.id
      })
        .then((url) => {
          window.location.href = url
        })
        .catch(() => {
          this.depositLoading = false
        })
    },
    getInvoiceId () {
      return this.localOptions.invoiceId || this.$route.params.id
    },
    getInvoice () {
      this.invoice.loading = true
      const invoiceId = this.getInvoiceId()
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
.AdminInvoiceShow {
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
}
</style>
