<template>
  <div class="step3">
    <q-linear-progress v-if="basket.loading"
                       indeterminate />
    <template v-if="!basket.loading">
      <invoice-info v-if="!invoice.loading"
                    :invoice="invoice"
                    :basket="basket"
                    class="invoice-info" />
      <invoice-payment-card v-if="!invoice.loading"
                            :wallet="wallet"
                            :invoice="invoice"
                            class="payment-card"
                            @onCancel="onCancel"
                            @onAccept="onAccept" />
    </template>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import InvoiceInfo from './InvoiceInfo.vue'
import { Wallet } from 'src/models/Wallet.js'
import { Basket } from 'src/models/Basket.js'
import { mixinAuth } from 'src/mixin/Mixins.js'
import { Invoice } from 'src/models/Invoice.js'
import { APIGateway } from 'src/api/APIGateway.js'
import InvoicePaymentCard from 'src/components/InvoicePaymentCard/InvoicePaymentCard.vue'

export default {
  name: 'step3',
  components: { InvoicePaymentCard, InvoiceInfo },
  mixins: [mixinAuth],
  props: {
    type: {
      type: String,
      default: 'product'
    }
  },
  emits: ['complete'],
  data () {
    return {
      user: new User(),
      wallet: new Wallet(),
      invoice: new Invoice()
    }
  },
  computed: {
    basket: {
      get () {
        return this.$store.getters['Shop/basket']
      },
      set (newValue) {
        this.$store.commit('Shop/updateBasket', newValue)
      }
    }
  },
  mounted() {
    this.getMyWallet()
    this.checkoutReview()
    this.getBasketInvoice()
  },
  methods: {
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
    checkoutReview () {
      this.basket.loading = true
      APIGateway.basket.checkoutReview()
        .then((basket) => {
          this.basket = new Basket(basket)
        })
        .finally(() => {
          this.basket.loading = false
        })
    },
    getBasketInvoice () {
      this.invoice.loading = true
      APIGateway.basket.createInvoice(this.basket.id, this.user.id)
        .then((invoice) => {
          this.invoice = new Invoice(invoice)
        })
        .finally(() => {
          this.invoice.loading = false
        })
    },
    onCancel () {
      this.invoice.loading = true
      APIGateway.invoice.cancel(this.invoice.id)
        .then(() => {
          this.invoice.loading = false
          this.goToShop()
        })
        .finally(() => {
          this.invoice.loading = false
        })
    },
    goToShop () {
      this.$router.push({ name: 'Public.Shop' })
    },
    onAccept () {
      this.payInvoice()
    },
    payInvoice () {
      if (this.amountOfDepositWalletNeeded() > 0) {
        this.payInvoiceByDepositWallet()
      } else {
        this.payInvoiceByWallet()
      }
    },
    amountOfDepositWalletNeeded () {
      return this.invoice.amount - this.wallet.inventory
    },
    payInvoiceByWallet () {
      this.invoice.loading = true
      APIGateway.invoice.pay(this.invoice.id)
        .then((message) => {
          this.payMessage = message
          this.goToShop()
        })
        .finally(() => {
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
    }
  }
}
</script>

<style scoped lang="scss">
.step3 {
  .invoice-info {
    margin-bottom: 24px;
  }
}

:global(.step2__confirm-dialog) {
  width: 900px;
  max-width: 90vw;
}
</style>
