<template>
  <div class="InvoiceShow"
       :style="localOptions.style">
    <div class="title">
      <div class="static-title">
        مشاهده صورتحساب
        شماره:
      </div>
      <div class="dynamic-title">
        <template v-if="entityLoading">
          <q-skeleton type="text"
                      class="q-ml-lg"
                      width="100px" />
        </template>
        <template v-else>
          {{ entityId }}
        </template>
      </div>
      <div class="back-action">
        <q-btn flat
               :to="{name: 'UserPanel.Invoice.List'}"
               color="grey">
          بازگشت
          >
        </q-btn>
      </div>
    </div>
    <q-card class="form"
            flat>
      <entity-show v-if="mounted"
                   ref="entityEdit"
                   v-model:value="inputs"
                   :api="api"
                   :entity-id-key="entityIdKey"
                   :entity-param-key="entityParamKey"
                   :show-route-name="showRouteName"
                   :show-close-button="false"
                   :show-edit-button="false"
                   :show-expand-button="false"
                   :show-save-button="false"
                   :show-reload-button="false"
                   :default-layout="false"
                   :redirect-after-edit="false"
                   :after-load-input-data="afterLoadInputData" />
    </q-card>
    <q-card v-if="invoice.products_info.list.length > 0"
            class="q-mt-lg">
      <q-card-section>
        <div class="selectedProductsList">
          <div class="selectedProductsList-row head">
            <div class="selectedProductsList-title">
              شرح خدمات
            </div>
            <div class="selectedProductsList-price">
              مبلغ
            </div>
          </div>
          <div v-for="item in invoice.products_info.list[0].registrations_info.list"
               :key="item.id"
               class="selectedProductsList-row">
            <div class="selectedProductsList-title">
              {{ item.item_info.title }}
            </div>
            <div class="selectedProductsList-price">
              {{ (item.count * item.item_info.unit_price).toLocaleString('fa') }}
              تومان
            </div>
          </div>
          <div class="selectedProductsList-row footer">
            <div class="selectedProductsList-title">
              قابل پرداخت
            </div>
            <div class="selectedProductsList-price">
              {{ (invoice.products_info.list[0].amount) ? invoice.products_info.list[0].amount.toLocaleString('fa') : 0 }}
              تومان
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <div class="action q-mt-lg">
      <q-card v-if="invoice.status!=='PAYING'"
              class="q-mb-md">
        <q-card-section>
          تنها در صورتی که وضعیت سفارش در حال پرداخت باشد امکان پرداخت با کیف پول وجود دارد
        </q-card-section>
      </q-card>
      <q-btn color="green"
             :disable="invoice.status!=='PAYING'"
             class="q-px-xl"
             @click="pay">
        پرداخت با کیف پول
      </q-btn>
    </div>
  </div>
</template>

<script>
import { EntityShow } from 'quasar-crud'
import { Invoice } from 'src/models/Invoice.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'InvoiceShow',
  components: {
    EntityShow
  },
  mixins: [mixinWidget],
  props: {
    invoiceId: {
      type: Number,
      default: null
    }
  },
  data: () => {
    return {
      mounted: false,
      entityLoading: true,
      invoice: new Invoice(),
      entityId: '',
      api: null,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'UserPanel.Invoice.Show',
      indexRouteName: 'UserPanel.Invoice.List',
      inputs: [
        {
          type: 'date',
          name: 'creation_time',
          responseKey: 'creation_time',
          label: 'تاریخ صورت‌حساب',
          placeholder: ' ',
          col: 'col-md-6 col-12'
        },
        {
          type: 'select',
          name: 'status',
          responseKey: 'status',
          label: 'وضعیت',
          placeholder: ' ',
          options: (new Invoice()).statusEnums,
          col: 'col-md-6 col-12'
        },
        {
          type: 'hidden',
          name: 'id',
          responseKey: 'id'
        }
      ]
    }
  },
  computed: {
    localInvoiceId () {
      return this.invoiceId || this.$route.params.id
    }
  },
  mounted() {
    this.api = APIGateway.invoice.APIAdresses.byId(this.localInvoiceId)
    this.mounted = true
  },
  methods: {
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
    onUpdateServices () {
      this.$refs.entityEdit.getData()
    },
    afterLoadInputData (response) {
      this.invoice = new Invoice(response)
      this.entityId = response.id
      this.entityLoading = false
    },
    edit() {
      this.entityLoading = true
      this.$refs.entityEdit.editEntity()
        .then(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
        })
        .catch(() => {
          this.$refs.entityEdit.getData()
          this.entityLoading = false
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

  .selectedProductsList {
    width: 100%;

    .selectedProductsList-row {
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;
      padding: 16px 0;
      border-bottom: solid 1px #F6F6F6;

      &.head {
        .selectedProductsList-title {
          color: #6589C3;
          font-size: 16px;
          font-weight: 700;
          line-height: 140%;
        }

        .selectedProductsList-price {
          color: #6589C3;
          font-size: 16px;
          font-weight: 700;
          line-height: 140%;
        }
      }

      &.footer {
        .selectedProductsList-title {
          color: #2FA84A;
          font-size: 16px;
          font-weight: 700;
          line-height: 140%;
        }

        .selectedProductsList-price {
          color: #2FA84A;
          font-size: 16px;
          font-weight: 700;
          line-height: 140%;
        }
      }

      .selectedProductsList-title {
        width: calc(100% - 150px);
        color: #272727;
        font-size: 16px;
        font-weight: 500;
        line-height: 140%;
      }

      .selectedProductsList-price {
        width: 150px;
        color: #272727;
        font-size: 16px;
        line-height: 140%;
      }
    }

    :deep(.form) {
      padding: 24px;

      .action {
        display: flex;
        flex-flow: row;
        justify-content: flex-end;
        margin-top: 32px;
      }
    }
  }
}
</style>
