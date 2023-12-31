<template>
  <div class="InvoiceList"
       :style="localOptions.style">

    <q-banner inline-actions
              class="text-white bg-red q-mb-md text-center">
      لطفا اقساط معوقه خود را پرداخت کنید.
    </q-banner>
    <q-banner class="q-mb-md">
      موجودی کیف پول:
      <template v-if="!wallet.loading">
        {{ wallet.inventory ? wallet.inventory.toLocaleString('fa') : 0 }}
      </template>
      <template v-else>
        <q-skeleton type="text"
                    width="100px"
                    class="inline-block" />
      </template>
      ریال
    </q-banner>
    <entity-index v-if="mounted"
                  ref="entityIndex"
                  v-model:value="inputs"
                  title="لیست اقساط معوقه"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :create-route-name="createRouteName"
                  :table-grid-size="$q.screen.lt.sm"
                  :show-search-button="false"
                  :show-expand-button="false"
                  :show-reload-button="false"
                  @on-page-changed="onPageChanged">
      <template #entity-index-table-cell="{inputData}">
        <template v-if="inputData.col.name === 'number'">
          {{ inputData.rowNumber }}
        </template>
        <template v-else-if="inputData.col.name === 'action'">
          <q-btn color="primary"
                 :loading="payLoading || wallet.loading"
                 @click="pay(inputData.props.row)">
            پرداخت
          </q-btn>
        </template>
        <template v-else>
          {{ inputData.col.value }}
        </template>
      </template>
      <template #entity-index-table-item-cell="{inputData}">
        <entity-index-grid-item :input-data="inputData">
          <template #col="{col, row}">
            <template v-if="col.name === 'number'">
              {{ inputData.rowNumber }}
            </template>
            <template v-else-if="col.name === 'action'">
              <q-btn color="primary"
                     :loading="payLoading || wallet.loading"
                     @click="pay(row)">
                پرداخت
              </q-btn>
            </template>
          </template>
        </entity-index-grid-item>
      </template>
    </entity-index>
  </div>
</template>

<script>
import Assist from 'assets/js/Assist.js'
import { EntityIndex } from 'quasar-crud'
import { Wallet } from 'src/models/Wallet.js'
import { Invoice } from 'src/models/Invoice.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import EntityIndexGridItem from 'src/components/EntityIndexGridItem.vue'
import { User } from 'src/models/User'

export default {
  name: 'InvoiceList',
  components: { EntityIndex, EntityIndexGridItem },
  mixins: [mixinWidget],
  data: () => {
    return {
      user: new User(),
      wallet: new Wallet(),
      api: APIGateway.instalment.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        { type: 'hidden', name: 'type', value: 'overdue' }
      ],
      table: {
        columns: [
          {
            name: 'number',
            required: true,
            label: 'شماره',
            align: 'left',
            field: () => ''
          },
          {
            name: 'id',
            required: true,
            label: 'شناسه',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.invoice_info.title
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Invoice(row.invoice_info)).status_info.label
          },
          {
            name: 'amount',
            required: true,
            label: 'مبلغ صورتحساب(ریال)',
            align: 'left',
            field: row => row.invoice_info.amount.toLocaleString('fa')
          },
          {
            name: 'amount',
            required: true,
            label: 'مبلغ قسط(ریال)',
            align: 'left',
            field: row => row.amount.toLocaleString('fa')
          },
          {
            name: 'creation_time',
            required: true,
            label: 'زمان ثبت',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.creation_time)
          },
          {
            name: 'creation_time',
            required: true,
            label: 'تاریخ سررسید',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.due_date, 'jYYYY/jMM/jDD')
          },
          {
            name: 'action',
            required: true,
            label: 'جزییات',
            align: 'left',
            field: row => ''
          }
        ]
      },
      mounted: false,
      payLoading: false,
      createRouteName: ''
    }
  },
  mounted() {
    this.loadAuthData()
    this.setOwner()
    this.setActionBtn()
    this.getMyWallet()
    this.mounted = true
  },
  methods: {
    loadAuthData() { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
    },
    setOwner () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'owner', 'value', this.user.id)
    },
    setActionBtn () {
      FormBuilderAssist.setAttributeByName(this.inputs, 'btn', 'atClick', this.search)
    },
    search () {
      this.$refs.entityIndex.search()
    },
    onPageChanged (response) {
      if (response.data.results.length === 0) {
        this.redirectTo()
      }
    },
    redirectTo () {
      let redirectTo = this.$store.getters['Auth/redirectTo']
      if (redirectTo === null || typeof redirectTo !== 'object') {
        redirectTo = { name: 'Public.Home' }
      }
      this.$router.push(redirectTo)
      this.$store.commit('Auth/updateRedirectTo', null)
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
          this.search()
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
.InvoiceList {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #424242;
    margin-bottom: 27px;
  }
  :deep(.list) {
    .quasar-crud-index-table {
      padding: 0;
      .q-table__container {
        background-color: transparent;
        box-shadow: none;
        border: none;
        .q-table__top {
          display: none;
        }
      }
    }
  }
}
</style>
