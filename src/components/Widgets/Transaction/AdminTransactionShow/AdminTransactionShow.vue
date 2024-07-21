<template>
  <div class="AdminTransactionShow"
       :style="localOptions.style">
    <div class="flex justify-end">
      <q-btn flat
             color="grey"
             @click="$router.go(-1)">
        بازگشت
        >
      </q-btn>
    </div>
    <entity-show v-if="mounted"
                 ref="entityEdit"
                 v-model:value="inputs"
                 title="اطلاعات پرداخت"
                 :api="api"
                 :entity-id-key="entityIdKey"
                 :index-route-name="'UserPanel.Wallet'"
                 :show-close-button="false"
                 :show-edit-button="false"
                 :show-expand-button="false"
                 :show-save-button="false"
                 :show-reload-button="false"
                 :redirect-after-edit="false"
                 :show-index-button="false"
                 :after-load-input-data="afterLoadInputData">
      <template #after-form-builder>
        <q-btn v-if="transaction.invoice"
               class="full-width q-mt-md"
               color="primary"
               @click="showInvoice">
          مشاهده سفارش
        </q-btn>
      </template>
    </entity-show>
  </div>
</template>

<script>
import { EntityShow } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Transaction } from 'src/models/Transaction.js'

export default {
  name: 'AdminTransactionShow',
  components: {
    EntityShow
  },
  mixins: [mixinWidget],
  data () {
    const transactionId = this.$route.params.id
    return {
      mounted: false,
      entityLoading: true,
      requestLoading: false,
      api: APIGateway.transaction.APIAdresses.byId(transactionId),
      transaction: new Transaction(),
      entityIdKey: 'id',
      inputs: [
        { type: 'separator', name: 'space', label: 'مشخصات کاربر', className: 'custom-separator', col: 'col-12' },
        { type: 'input', name: 'creator_info.firstname', responseKey: 'creator_info.firstname', label: 'نام', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'creator_info.lastname', responseKey: 'creator_info.lastname', label: 'نام خانوادگی', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'creator_info.mobile_number', responseKey: 'creator_info.mobile_number', label: 'تلفن همراه', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'creator_info.email', responseKey: 'creator_info.email', label: 'ایمیل', placeholder: ' ', col: 'col-md-3 col-12' },

        { type: 'separator', name: 'space', label: 'مشخصات حساب', className: 'custom-separator', col: 'col-12' },
        { type: 'input', name: 'id', responseKey: 'id', label: 'شناسه', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'input', name: 'reference_code', responseKey: 'reference_code', label: 'کد مرجع', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'input', name: 'authority_code', responseKey: 'authority_code', label: 'شناسه پرداخت', placeholder: ' ', col: 'col-md-4 col-12' },
        {
          type: 'select',
          name: 'status',
          responseKey: 'status',
          label: 'وضعیت',
          options: (new Transaction()).statusEnums,
          placeholder: ' ',
          col: 'col-md-4 col-12'
        },
        { type: 'input', name: 'amount', responseKey: 'amount', label: 'مبلغ کل(ریال)', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'dateTime', name: 'creation_time', responseKey: 'creation_time', outsideLabel: 'تاریخ ثبت', col: 'col-md-4 col-12' },
        { type: 'inputEditor', name: 'description', responseKey: 'description', label: 'توضیحات', placeholder: ' ', col: 'col-12' }
        // { type: 'input', name: 'IBAN', responseKey: 'IBAN', label: 'شماره شبا', placeholder: ' ', col: 'col-md-6 col-12' },
        // { type: 'input', name: 'receipt', responseKey: 'receipt', label: 'رسید پرداخت', placeholder: ' ', col: 'col-md-6 col-12' }
      ],
      requestInputs: [
        { type: 'file', name: 'receipt', label: 'فایل رسید پرداخت', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'InputEditor', name: 'description', label: 'توضیحات', placeholder: ' ', col: 'col-12' }
      ]
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    showInvoice () {
      const routeData = this.$router.resolve({ name: 'UserPanel.Invoice.Show', params: { id: this.transaction.invoice } })
      window.open(routeData.href, '_blank')
    },
    afterLoadInputData (data) {
      this.transaction = new Transaction(data)
      this.entityLoading = false
    }
  }
}
</script>

<style scoped lang="scss">
.AdminTransactionShow {
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
