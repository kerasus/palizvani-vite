<template>
  <div class="MyWallet"
       :style="localOptions.style">
    <div class="header">
      جزییات کیف پول
    </div>
    <div class="body">
      <div class="card-column">
        <div class="card">
          <div class="photo">
            <q-img src="/assets/images/web/user-top-menu-logo.png"
                   width="33px" />
          </div>
          <div class="title">
            کیف پول شما
          </div>
          <div class="inventory">
            {{ wallet.inventory.toLocaleString('fa') }}
            <span class="unit">
              ریال
            </span>
          </div>
        </div>
      </div>
      <div class="actions-column">
        <div class="deposit-section">
          <div class="row q-col-gutter-md">
            <div class="col-md-5 col-12">
              <div>افزایش موجودی</div>
              <q-input v-model="depositAmount"
                       dense
                       placeholder="لطفا مبلغ مورد نظر خود را مشخص کنید" />
            </div>
            <div class="col-md-7 col-12">
              <q-btn class="btn-deposit"
                     color="primary"
                     :loading="wallet.loading"
                     @click="deposit">
                <q-icon name="add_circle_outline"
                        class="q-mr-sm" />
                افزایش موجودی
              </q-btn>
            </div>
          </div>
        </div>
        <div class="withdraw-section q-mt-md">
          <div class="row q-col-gutter-sm">
            <div class="col-md-5 col-12">
              <div class="title-of-input">
                <div>
                  برداشت از کیف پول
                </div>
                <q-btn flat
                       color="primary"
                       @click="setWithdrawAmountForAll">
                  برداشت همه
                </q-btn>
              </div>
              <q-input v-model="withdrawAmount"
                       dense
                       placeholder="لطفا مبلغ مورد نظر خود را مشخص کنید" />
            </div>
            <div class="col-md-4 col-12">
              <div class="title-of-input">شماره شبا</div>
              <q-input v-model="shabaNumber"
                       dense
                       placeholder="شماره شبای خود را وارد نمایید" />
            </div>
            <div class="col-md-3 col-12">
              <q-btn class="btn-withdraw"
                     color="red"
                     outline
                     :loading="wallet.loading"
                     @click="withdraw">
                <q-icon name="remove_circle_outline"
                        class="q-mr-sm" />
                برداشت از حساب
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import { Wallet } from 'src/models/Wallet.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'MyWallet',
  mixins: [mixinWidget],
  data: () => {
    return {
      user: new User(),
      wallet: new Wallet(),
      shabaNumber: null,
      withdrawAmount: null,
      depositAmount: null
    }
  },
  mounted() {
    this.loadAuthData()
    this.getMyWallet()
  },
  methods: {
    loadAuthData() { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
    },
    getMyWallet () {
      this.wallet.loading = true
      APIGateway.wallet.getMyWallet(this.user.id)
        .then((wallet) => {
          this.wallet = new Wallet(wallet)
          this.wallet.loading = false
        })
        .catch(() => {
          this.wallet.loading = false
        })
    },
    deposit () {
      if (isNaN(this.depositAmount) || this.depositAmount === 0) {
        return
      }
      this.wallet.loading = true
      APIGateway.wallet.deposit({ amount: this.depositAmount })
        .then((url) => {
          window.location.href = url
        })
        .catch(() => {
          this.wallet.loading = false
        })
    },
    withdraw () {
      if (isNaN(this.withdrawAmount) || this.withdrawAmount === 0) {
        return
      }
      this.wallet.loading = true
      APIGateway.payment.requestWithdraw({ IBAN: this.shabaNumber, amount: this.withdrawAmount })
        .then(() => {
          this.shabaNumber = null
          this.withdrawAmount = null
          this.getMyWallet()
          this.$bus.emit('ReloadUserPayments')
        })
        .catch(() => {
          this.wallet.loading = false
        })
    },
    setWithdrawAmountForAll () {
      this.withdrawAmount = this.wallet.inventory
    }
  }
}
</script>

<style scoped lang="scss">
.MyWallet {
  background: #FFFFFF;
  border: 1px solid #DFE1EC;
  border-radius: 8px;
  .header {
    padding-left: 21px;
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
    letter-spacing: 0;
    color: #212121;
    height: 70px;
    border-bottom: 1px solid #DFE1EC;
  }
  .body {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    padding: 45px 16px;
    $cardColumn: 380px;
    .card-column {
      width: $cardColumn;
      @media screen and (max-width: 1024px) {
        width: 100%;
      }
      .card {
        max-width: 357px;
        width: 100%;
        height: 165px;
        background: transparent linear-gradient(-242deg, #8AB890 0%, #5B7A5F 100%) 0 0 no-repeat padding-box;
        border-radius: 20px;
        position: relative;
        .photo {
          position: absolute;
          top: 20px;
          left: 20px;
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 10px;
          display: flex;
          flex-flow: row;
          justify-content: center;
          align-items: center;
        }
        .title {
          position: absolute;
          top: 41px;
          left: 90px;
          color: #FFFFFF;
          font-size: 16px;
        }
        .inventory {
          position: absolute;
          top: 108px;
          left: 105px;
          color: #FFFFFF;
          font-size: 24px;
          @media screen and (max-width: 500px) {
            left: 50px;
          }
          .unit {
            font-size: 18px;
          }
        }
      }
    }
    .actions-column {
      width: calc( 100% - #{$cardColumn} );
      @media screen and (max-width: 1024px) {
        width: 100%;
        margin-top: 32px;
      }
      .deposit-section {
        .btn-deposit {
          margin-top: 25px;
        }
      }
      .withdraw-section {
        .title-of-input {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 32px;
        }
        .btn-withdraw {
          margin-top: 35px;
        }
      }
    }
  }
}
</style>
