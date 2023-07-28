<template>
  <div class="AdminInvoiceShow"
       :style="localOptions.style">
    <div class="title">
      <div class="static-title">
        سفارش
      </div>
      <div class="dynamic-title">
        <template v-if="entityLoading">
          <q-skeleton type="text"
                      class="q-ml-lg"
                      width="100px" />
        </template>
        <template v-else>
          {{ serviceTitle }}
        </template>
      </div>
      <div class="back-action">
        <q-btn flat
               :to="{name: 'AdminPanel.Invoice.List'}"
               color="grey">
          بازگشت
          >
        </q-btn>
      </div>
    </div>
    <q-card class="form"
            flat>
      <entity-edit v-if="mounted"
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
      <div class="action">
        <div class="row q-mt-lg justify-end">
          <div class="col-md-4 col-12">
            <q-btn color="primary"
                   class="full-width"
                   :loading="entityLoading"
                   @click="edit">
              ثبت تغییرات
            </q-btn>
          </div>
        </div>
      </div>
    </q-card>
    <q-card v-if="invoice.products_info.list.length > 0"
            class="q-mt-lg">
      <q-card-section>
        <div class="selectedProductsList">
          <div class="selectedProductsList-row head">
            <div class="selectedProductsList-title">
              شرح خدمات
            </div>
            <div class="selectedProductsList-count">
              تعداد
            </div>
            <div class="selectedProductsList-price">
              مبلغ
            </div>
          </div>
          <div v-for="item in invoice.products_info.list"
               :key="item.id">
            <template v-if="item.registrations_info.list.length > 0">
              <div v-for="registrationsInfoItem in item.registrations_info.list"
                   :key="registrationsInfoItem.id"
                   class="selectedProductsList-row">
                <div class="selectedProductsList-title">
                  {{ registrationsInfoItem.item_info.title }}
                </div>
                <div class="selectedProductsList-count">
                  {{ registrationsInfoItem.count }}
                </div>
                <div class="selectedProductsList-price">
                  {{ (registrationsInfoItem.item_info.unit_price).toLocaleString('fa') }}
                  تومان
                </div>
              </div>
            </template>
            <template v-else>
              <div class="selectedProductsList-row">
                <div class="selectedProductsList-title">
                  {{ item.title }}
                </div>
                <div class="selectedProductsList-count">
                  -
                </div>
                <div class="selectedProductsList-price">
                  {{ (item.unit_price).toLocaleString('fa') }}
                  تومان
                </div>
              </div>
            </template>
          </div>
          <div class="selectedProductsList-row footer">
            <div class="selectedProductsList-title">
              قابل پرداخت
            </div>
            <div class="selectedProductsList-count" />
            <div class="selectedProductsList-price">
              {{ (invoice.amount) ? invoice.amount.toLocaleString('fa') : 0 }}
              تومان
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { EntityEdit } from 'quasar-crud'
import { Invoice } from 'src/models/Invoice.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'AdminInvoiceShow',
  components: {
    EntityEdit
  },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      entityLoading: true,
      serviceTitle: '',
      services: [],
      invoice: new Invoice(),
      api: APIGateway.invoice.APIAdresses.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'AdminPanel.Invoice.Show',
      indexRouteName: 'AdminPanel.Invoice.List',
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
          type: 'date',
          name: 'creation_time',
          responseKey: 'creation_time',
          label: 'تاریخ سررسید',
          placeholder: ' ',
          col: 'col-md-6 col-12'
        },
        {
          type: 'input',
          name: 'amount',
          responseKey: 'amount',
          label: 'مبلغ کل',
          placeholder: ' ',
          disable: true,
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
          type: 'input',
          name: 'amount',
          responseKey: 'owner_info.firstname',
          label: 'نام صاحب سفارش',
          placeholder: ' ',
          disable: true,
          col: 'col-md-6 col-12'
        },
        {
          type: 'input',
          name: 'amount',
          responseKey: 'owner_info.lastname',
          label: 'نام خانوادگی صاحب سفارش',
          placeholder: ' ',
          disable: true,
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
  created() {
    this.api = this.api + '/' + this.$route.params.id
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    onUpdateServices () {
      this.$refs.entityEdit.getData()
    },
    afterLoadInputData (response) {
      this.invoice = new Invoice(response)
      this.serviceTitle = response.title
      this.entityLoading = false
    },
    edit() {
      this.entityLoading = true
      this.$refs.entityEdit.editEntity(false)
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

        .selectedProductsList-price,
        .selectedProductsList-count {
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
        width: calc(100% - 200px);
        color: #272727;
        font-size: 16px;
        font-weight: 500;
        line-height: 140%;
      }

      .selectedProductsList-count {
        width: 50px;
        color: #272727;
        font-size: 16px;
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
