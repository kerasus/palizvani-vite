<template>
  <div class="InvoicePaymentCard">
    <div class="InvoicePaymentCard-head">
      <div class="InvoicePaymentCard-head-title">
        پرداخت از طریق کیف پول
      </div>
      <div v-if="showMessage"
           class="InvoicePaymentCard-head-caption">
        <!--        خرید شما قطعی نشده است و در صورت عدم پرداخت تا پایان زمان، صورتحساب شما لغو خواهد شد-->
        خرید شما قطعی نشده است و در صورت عدم پرداخت تا ۲۴ ساعت بعد از ایجاد آن، صورتحساب شما لغو خواهد شد.
      </div>
      <div v-if="showTimer"
           class="InvoicePaymentCard-head-remaining-time">
           <!--        <q-icon name="schedule" />-->
           <!--        زمان باقی مانده :-->
           <!--        {{ timerString }}-->
      </div>
    </div>
    <div class="InvoicePaymentCard-body">
      <div class="final-price">
        <div class="final-price-label">
          <q-img src="/assets/images/web/user-top-menu-logo.png"
                 width="32px" />
          خرید محصول از فروشگاه
        </div>
        <div class="final-price-value">
          {{ invoice.amount ? invoice.amount.toLocaleString('fa') : 0 }}
          <span class="unit">
            ریال
          </span>
        </div>
      </div>
      <div class="other-items">
        <div v-if="showWallet"
             class="other-item">
          <div class="other-item-label">
            <q-icon name="isax:wallet" />
            موجودی کیف پول
          </div>
          <div class="other-item-value">
            <q-skeleton v-if="wallet.loading"
                        type="text"
                        width="200px" />
            <template v-else>
              {{ wallet.inventory ? wallet.inventory.toLocaleString('fa') : 0 }}
            </template>
            <span class="unit">
              ریال
            </span>
          </div>
        </div>
        <div v-if="needToDeposit"
             class="other-item">
          <div class="other-item-label">
            <q-icon name="isax:card" />
            نیازمند افزایش موجودی
          </div>
          <div class="other-item-value">
            {{ (invoice.amount - wallet.inventory) ? (invoice.amount - wallet.inventory).toLocaleString('fa') : 0 }}
            <span class="unit">
              ریال
            </span>
          </div>
        </div>
      </div>
      <div v-if="(!invoice.instalments_info || invoice.instalments_info.length === 0) && canAction"
           class="action-area">
        <q-btn color="red"
               class="btn-cancel"
               outline
               :disable="invoice.status==='PAYING_IN_INSTALMENT'"
               :loading="invoice.loading || wallet.loading"
               @click="onCancel">
          انصراف
        </q-btn>
        <q-btn color="primary"
               class="btn-pay"
               :loading="invoice.loading || wallet.loading"
               @click="onAccept">
          <template v-if="amountOfDepositWalletNeeded > 0">
            افزایش موجودی و پرداخت
          </template>
          <template v-else>
            برداشت از کیف پول و برداشت
          </template>
        </q-btn>
      </div>
      <div v-if="showInvoiceLinkBtn && showInvoiceLink"
           class="show-invoice-row">
        <q-btn class="btn-show-invoice"
               color="primary"
               flat
               :to="{name: 'UserPanel.Invoice.Show', params: {id: invoice.id}}">
          مشاهده صورتحساب
        </q-btn>
      </div>

      <div>
        <instalments :wallet="wallet"
                     :invoice="invoice"
                     :can-action="true"
                     @onInstalmentPayed="onInstalmentPayed" />
      </div>
    </div>
  </div>
</template>

<script>
import { Wallet } from 'src/models/Wallet.js'
import { Invoice } from 'src/models/Invoice.js'
import Instalments from './components/Instalments.vue'

export default {
  name: 'InvoicePaymentCard',
  components: {
    Instalments
  },
  props: {
    invoice: {
      type: Invoice,
      default: new Invoice()
    },
    wallet: {
      type: Wallet,
      default: new Wallet()
    },
    showInvoiceLink: {
      type: Boolean,
      default: true
    },
    showTimer: {
      type: Boolean,
      default: true
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    showWallet: {
      type: Boolean,
      default: true
    },
    canAction: {
      type: Boolean,
      default: true
    }
  },
  emits: ['onCancel', 'onAccept', 'onInstalmentPayed'],
  data: () => {
    return {
      walletLoaded: false,
      needToDeposit: false,
      timer: 10 * 60,
      timerString: '10:00',
      min: 0,
      sec: 0,
      interval: null
    }
  },
  computed: {
    showInvoiceLinkBtn () {
      return this.$route.name !== 'UserPanel.Invoice.Show'
    },
    amountOfDepositWalletNeeded () {
      return this.invoice.amount - this.wallet.inventory
    }
  },
  mounted() {
    this.runTimer()
  },
  methods: {
    onCancel () {
      this.$emit('onCancel')
    },
    onAccept () {
      this.$emit('onAccept')
    },
    onInstalmentPayed () {
      this.$emit('onInstalmentPayed')
    },
    checkForNeedToDeposit () {
      this.needToDeposit = this.invoice.amount > this.wallet.inventory
    },
    runTimer () {
      this.interval = setInterval(() => {
        this.updateTimer()
      }, 1000)
    },
    updateTimer () {
      this.timer--
      if (this.timer < 0) {
        this.stopTimer()
        return
      }
      const min = String(Math.floor(this.timer / 60)).padStart(2, '0')
      const sec = String(this.timer % 60).padStart(2, '0')
      this.timerString = min + ':' + sec
    },
    stopTimer () {
      clearInterval(this.interval)
    }
  }
}
</script>

<style scoped lang="scss">
.InvoicePaymentCard{
  background: #F5F5F5;
  border: 1px solid #DFE1EC;
  border-radius: 8px;
  .InvoicePaymentCard-head {
    background: #FFFFFF;
    border-bottom: 1px solid #DFE1EC;
    border-radius: 8px 8px 0 0;
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    .InvoicePaymentCard-head-title {
      margin-top: 24px;
      width: 100%;
      text-align: left;
      font-size: 18px;
      letter-spacing: 0;
      color: #212121;
      padding-left: 12px;
      margin-bottom: 21px;
      @media screen and (max-width: 600px) {
        margin-bottom: 35px;
      }
    }
    .InvoicePaymentCard-head-caption {
      margin-bottom: 17px;
      width: 100%;
      text-align: left;
      font-size: 14px;
      letter-spacing: 0;
      color: #212121;
      padding-left: 53px;
      padding-right: 20px;
      @media screen and (max-width: 600px) {
        padding-left: 20px;
      }
    }
    .InvoicePaymentCard-head-remaining-time {
      position: absolute;
      right: 23px;
      top: 26px;
      .q-icon {
        color: #AAA095;
      }
      @media screen and (max-width: 600px) {
        top: 55px;
      }
    }
  }
  .InvoicePaymentCard-body {
    padding: 20px 22px 26px;
    color: #212121;
    .final-price {
      display: flex;
      flex-wrap: wrap !important;
      flex-flow: row;
      justify-content: space-between;
      padding: 13px 22px 13px 27px;
      margin-bottom: 33px;
      background: #FFFFFF;
      border-radius: 8px;
      .final-price-label {
        display: flex;
        flex-flow: row;
        justify-content: flex-start;
        align-items: center;
        font-size: 17px;
        @media screen and (max-width: 599px) {
          width: 100%;
        }
        .q-img {
          width: 32px;
          margin-right: 15px;
        }
      }
      .final-price-value {
        font-size: 20px;
        font-weight: bold;
        @media screen and (max-width: 599px) {
          width: 100%;
          text-align: right;
        }
        .unit {
          font-size: 17px;
          font-weight: normal;
        }
      }
    }
    .other-items {
      margin-bottom: 60px;
      .other-item {
        display: flex;
        flex-flow: row;
        flex-wrap: wrap !important;
        justify-content: space-between;
        padding: 19px 22px 18px 27px;
        border-bottom: 1px solid #E1E3ED;
        .other-item-label {
          display: flex;
          flex-flow: row;
          justify-content: flex-start;
          align-items: center;
          font-size: 16px;
          @media screen and (max-width: 599px) {
            width: 100%;
          }
          .q-icon {
            color: #475F4A;
            margin-right: 10px;
          }
        }
        .other-item-value {
          display: flex;
          flex-flow: row;
          justify-content: flex-end;
          align-items: center;
          font-size: 18px;
          font-weight: bold;
          @media screen and (max-width: 599px) {
            width: 100%;
            text-align: right;
          }
          .unit {
            font-size: 16px;
            font-weight: normal;
          }
        }
      }
    }
    .action-area {
      display: flex;
      flex-flow: row;
      flex-wrap: wrap !important;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 28px;
      .btn-pay {
        width: 60%;
        margin-left: 19px;
        @media screen and (max-width: 599px) {
          width: 100%;
          margin-bottom: 16px;
          margin-left: 0;
          order: 1;
        }
      }
      .btn-cancel {
        width: calc( 40% - 19px );
        @media screen and (max-width: 599px) {
          margin-bottom: 16px;
          width: 100%;
          order: 2;
        }
      }
    }
    .show-invoice-row {
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
