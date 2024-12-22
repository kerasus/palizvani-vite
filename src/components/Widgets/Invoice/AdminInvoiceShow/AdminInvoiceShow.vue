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
          <div v-if="invoice.item_type==='CLASSROOM'"
               class="col-md-4 col-12 flex items-center justify-start">
            <q-img :src="invoice.item_info.thumbnail"
                   width="100px" />
            {{ invoice.item_info.title }}
          </div>
          <div v-else
               class="col-md-4 col-12 flex items-center justify-start">
            {{ invoice.title }}
          </div>
          <div v-if="invoice.item_type==='CLASSROOM'"
               class="col-md-4 col-12">
            <q-icon name="isax:user" />
            استاد:
            {{ invoice.item_info.professor_info.firstname }}
            {{ invoice.item_info.professor_info.lastname }}
          </div>
          <div v-else-if="invoice.item_type==='STORE_BASKET'"
               class="col-md-4 col-12">
            <q-icon name="isax:user" />
            کد سفارش:
            {{ invoice.item_info.id }}
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
    <div v-if="invoice.item_type==='STORE_BASKET'"
         class="q-mt-md">
      <entity-index v-model:value="tableInputs"
                    title="لیست محصولات سفارش"
                    :table="table"
                    :loaded-data="invoice.item_info"
                    :table-keys="tableKeys"
                    :show-search-button="false"
                    :show-expand-button="false"
                    :show-reload-button="false">
        <template #entity-index-table-cell="{inputData}">
          <template v-if="inputData.col.name === 'number'">
            {{ inputData.rowNumber }}
          </template>
          <template v-else-if="inputData.col.name === 'thumbnail'">
            <q-img :src="inputData.col.value"
                   width="100px" />
          </template>
          <template v-else-if="inputData.col.name === 'download'">
            <q-btn v-if="!inputData.col.value"
                   color="primary"
                   @click="openDownloadDialog(inputData.props.row)">
              <q-icon name="download"
                      class="q-mr-sm" />
              دانلود
            </q-btn>
            <template v-else>
              {{}}
            </template>
          </template>
          <template v-else-if="inputData.col.name === 'action'">
            <q-btn color="primary"
                   outline
                   :to="{name: inputData.props.row.product ? 'Admin.Store.Product.Show' : 'Admin.Store.Package.Show', params: {id: inputData.props.row.product || inputData.props.row.package}}">
              <q-icon name="visibility"
                      class="q-mr-sm" />
              مشاهده
            </q-btn>
          </template>
          <template v-else>
            {{ inputData.col.value }}
          </template>
        </template>
      </entity-index>
      <q-dialog v-model="downloadDialog">
        <q-card style="width: 800px; max-width: 95%;">
          <q-card-section>
            محتوای قابل دانلود
          </q-card-section>
          <q-separator />
          <q-card-section>
            <product-or-package-medias :basket-item="selectedBasketItem" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import Assist from 'assets/js/Assist.js'
import { User } from 'src/models/User.js'
import { EntityIndex } from 'quasar-crud'
import { Wallet } from 'src/models/Wallet.js'
import { Product } from 'src/models/Product.js'
import { Invoice } from 'src/models/Invoice.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import InvoicePaymentCard from 'src/components/InvoicePaymentCard/InvoicePaymentCard.vue'
import ProductOrPackageMedias from 'src/components/Widgets/Store/Basket/UserStoreBasketShow/ProductOrPackageMedias.vue'

export default {
  name: 'AdminInvoiceShow',
  components: { InvoicePaymentCard, EntityIndex, ProductOrPackageMedias },
  mixins: [mixinWidget],
  props: {
    invoiceId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      user: new User(),
      wallet: new Wallet(),
      invoice: new Invoice(),
      defaultOptions: {
        showBackBtn: true
      },

      downloadDialog: false,
      selectedBasketItem: null,
      tableKeys: {
        data: 'items_info.list',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      tableInputs: [],
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
            field: row => row.product_info?.id ? row.product_info.id : row.package_info.id
          },
          {
            name: 'title',
            required: true,
            label: 'نام محصول',
            align: 'left',
            field: row => (row.product_info?.id ? row.product_info : row.package_info).title
          },
          {
            name: 'is_package_or_product',
            required: true,
            label: 'نوع محصول',
            align: 'left',
            field: row => row.package ? 'بسته' : 'تکی'
          },
          {
            name: 'store_category',
            required: true,
            label: 'دسته فروشگاه',
            align: 'left',
            field: row => ((row.product_info?.id ? row.product_info : row.package_info).store_category_info?.parent?.parent?.title || '-') + '، ' + ((row.product_info || row.package_info).store_category_info?.parent?.title || '-') + '، ' + ((row.product_info || row.package_info).store_category_info?.title || '-')
          },
          {
            name: 'store_category1',
            required: true,
            label: 'دسته محتوا',
            align: 'left',
            field: row => ((row.product_info?.id ? row.product_info : row.package_info).content_category_info?.parent?.parent?.title || '-') + '، ' + ((row.product_info || row.package_info).content_category_info?.parent?.title || '-') + '، ' + ((row.product_info || row.package_info).content_category_info?.title || '-')
          },
          {
            name: 'count',
            required: true,
            label: 'تعداد',
            align: 'left',
            field: row => row.count
          },
          {
            name: 'is_physical_info',
            required: true,
            label: 'نوع جنس',
            align: 'left',
            field: row => (row.product_info?.id ? row.product_info : row.package_info).is_physical_info.label
          },
          {
            name: 'physical_type_info',
            required: true,
            label: 'نوع محصول',
            align: 'left',
            field: row => row.product_info ? (new Product(row.product_info)).physical_type_info.label : '-'
          },
          {
            name: 'unit_price',
            required: true,
            label: 'قیمت',
            align: 'left',
            field: row => parseInt((row.product_info?.id ? row.product_info : row.package_info).unit_price?.toString()).toLocaleString('fa')
          },
          {
            name: 'download',
            required: true,
            label: 'دانلود',
            align: 'left',
            field: row => (row.product_info?.id ? row.product_info : row.package_info).is_physical
          },
          {
            name: 'action',
            required: true,
            label: 'عملیات',
            align: 'left',
            field: row => ''
          }
        ]
      }
    }
  },
  mounted() {
    this.loadAuthData()
    this.getMyWallet()
    this.getInvoice()
  },
  methods: {
    openDownloadDialog (basketItem) {
      this.selectedBasketItem = basketItem
      this.downloadDialog = true
    },
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
