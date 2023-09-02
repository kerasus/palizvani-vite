<template>
  <div class="Instalments">
    <template v-if="invoice.instalments_info && invoice.instalments_info.length > 0">
      <q-banner class="q-mb-md">
        لیست اقساط
      </q-banner>
      <q-card class="q-mb-sm sm-hide">
        <q-card-section>
          <div class="Instalment row">
            <div class="Instalments-col col-md-1">
              شماره
            </div>
            <div class="Instalments-col col-md-1">
              شناسه
            </div>
            <div class="Instalments-col col-md-2">
              مبلغ(ریال)
            </div>
            <div class="Instalments-col col-md-2">
              تاریخ سررسید
            </div>
            <div class="Instalments-col col-md-3">
              تاریخ پرداخت
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card v-for="(instalment, instalmentIndex) in invoice.instalments_info"
              :key="instalment.id"
              class="Instalment q-mb-sm">
        <q-card-section>
          <div class="row">
            <div class="Instalments-col col-md-1 col-12">
              <span class="lt-md">
                شماره:
              </span>
              {{ instalmentIndex + 1 }}
            </div>
            <div class="Instalments-col col-md-1 col-12">
              <span class="lt-md">
                شناسه:
              </span>
              {{ instalment.id }}
            </div>
            <div class="Instalments-col col-md-2 col-12">
              <span class="lt-md">
                مبلغ(ریال):
              </span>
              {{ instalment.amount.toLocaleString('fa') }}
            </div>
            <div class="Instalments-col col-md-2 col-12">
              <span class="lt-md">
                تاریخ سررسید:
              </span>
              {{ getDueDate(instalment.due_date) }}
            </div>
            <div class="Instalments-col col-md-3 col-12">
              <span class="lt-md">
                تاریخ پرداخت:
              </span>
              {{ getPaidTime(instalment.paid_time) }}
            </div>
            <div class="Instalments-col col-md-3 col-12">
              <q-btn v-if="!instalment.paid_time"
                     color="primary"
                     :loading="payLoading"
                     @click="pay(instalment)">
                پرداخت
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </template>
  </div>
</template>

<script>
import Assist from 'src/assets/js/Assist.js'
import { Wallet } from 'src/models/Wallet.js'
import { Invoice } from 'src/models/Invoice.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'Instalments',
  props: {
    invoice: {
      type: Invoice,
      default: new Invoice()
    },
    wallet: {
      type: Wallet,
      default: new Wallet()
    }
  },
  emits: ['onInstalmentPayed'],
  data: () => {
    return {
      payLoading: false
    }
  },
  methods: {
    getDueDate (dueDate) {
      return Assist.miladiToShamsi(dueDate, 'jYYYY/jMM/jDD')
    },
    getPaidTime (paidTime) {
      return Assist.miladiToShamsi(paidTime)
    },
    amountOfDepositWalletNeeded (instalmentAmount) {
      return instalmentAmount - this.wallet.inventory
    },
    pay (instalment) {
      if (this.amountOfDepositWalletNeeded(instalment.amount) > 0) {
        this.payInstalmentByDepositWallet(instalment.id, instalment.amount)
      } else {
        this.payInstalmentByWallet(instalment.id)
      }
    },
    payInstalmentByWallet (instalmentId) {
      this.payLoading = true
      APIGateway.instalment.pay(instalmentId)
        .then((message) => {
          this.payLoading = false
          this.$emit('onInstalmentPayed')
          this.$q.notify({
            message,
            type: 'positive'
          })
        })
        .catch(() => {
          this.payLoading = false
        })
    },
    payInstalmentByDepositWallet (instalmentId, instalmentAmount) {
      this.payLoading = true
      APIGateway.wallet.deposit({
        amount: instalmentAmount,
        instalment: instalmentId
      })
        .then((url) => {
          window.location.href = url
        })
        .catch(() => {
          this.payLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.Instalments {
}
</style>
