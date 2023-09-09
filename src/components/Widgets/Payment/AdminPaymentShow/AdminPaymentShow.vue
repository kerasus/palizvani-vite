<template>
  <div class="AdminPaymentShow"
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
        <q-btn v-if="payment.invoice_info?.id"
               class="full-width q-mt-md"
               color="primary"
               @click="showInvoice">
          مشاهده سفارش
        </q-btn>
        <div v-if="payment.description"
             class="q-my-md">
          توضیحات:
          <div v-html="payment.description" />
        </div>
        <div v-if="payment.receipt || payment.IBAN">
          <div class="row q-col-gutter-md q-mt-lg">
            <div class="col-md-6 col-12">
              رسید پرداخت:
              <div>
                <q-img :src="payment.receipt" />
              </div>
            </div>
            <div class="col-md-6 col-12">
              شماره شبا:
              {{ payment.IBAN }}
            </div>
          </div>
          <form-builder v-if="payment.type === 'WITHDRAW_REQUEST'"
                        ref="requestForm"
                        v-model:value="requestInputs"
                        :loading="requestLoading"
                        class="q-mt-md" />
        </div>
      </template>
    </entity-show>
    <div v-if="payment.type === 'WITHDRAW_REQUEST'"
         class="row q-col-gutter-md q-mt-md">
      <div class="col-md-6 col-12" />
      <div class="col-md-3 col-12">
        <q-btn color="primary"
               class="full-width"
               :loading="requestLoading"
               @click="confirmWithdraw">
          تایید درخواست
        </q-btn>
      </div>
      <div class="col-md-3 col-12">
        <q-btn color="red"
               class="full-width"
               :loading="requestLoading"
               outline
               @click="rejectWithdraw">
          رد درخواست
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { EntityShow } from 'quasar-crud'
import { FormBuilder, FormBuilderAssist } from 'quasar-form-builder'
import { Payment } from 'src/models/Payment.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'AdminPaymentShow',
  components: {
    EntityShow,
    FormBuilder
  },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      entityLoading: true,
      requestLoading: false,
      api: null,
      payment: new Payment(),
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Content.Show',
      indexRouteName: 'Admin.Content.List',
      inputs: [
        { type: 'separator', name: 'space', label: 'مشخصات کاربر', className: 'custom-separator', col: 'col-12' },
        { type: 'input', name: 'creator_info.firstname', responseKey: 'creator_info.firstname', label: 'نام', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'creator_info.lastname', responseKey: 'creator_info.lastname', label: 'نام خانوادگی', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'creator_info.mobile_number', responseKey: 'creator_info.mobile_number', label: 'تلفن همراه', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'creator_info.email', responseKey: 'creator_info.email', label: 'ایمیل', placeholder: ' ', col: 'col-md-3 col-12' },

        { type: 'separator', name: 'space', label: 'مشخصات حساب', className: 'custom-separator', col: 'col-12' },
        { type: 'input', name: 'id', responseKey: 'id', label: 'شناسه', placeholder: ' ', col: 'col-md-2 col-12' },
        {
          type: 'select',
          name: 'type',
          responseKey: 'type',
          label: 'نوع درخواست',
          options: (new Payment()).typeEnums,
          placeholder: ' ',
          col: 'col-md-3 col-12'
        },
        { type: 'input', name: 'amount', responseKey: 'amount', label: 'مبلغ کل(ریال)', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'dateTime', name: 'creation_time', responseKey: 'creation_time', label: 'تاریخ ثبت', placeholder: ' ', col: 'col-md-4 col-12' }
        // { type: 'input', name: 'IBAN', responseKey: 'IBAN', label: 'شماره شبا', placeholder: ' ', col: 'col-md-6 col-12' },
        // { type: 'input', name: 'receipt', responseKey: 'receipt', label: 'رسید پرداخت', placeholder: ' ', col: 'col-md-6 col-12' }
      ],
      requestInputs: [
        { type: 'file', name: 'receipt', label: 'فایل رسید پرداخت', placeholder: ' ', col: 'col-md-3 col-12' },
        { type: 'InputEditor', name: 'description', label: 'توضیحات', placeholder: ' ', col: 'col-12' }
      ]
    }
  },
  created() {
    this.api = APIGateway.payment.APIAdresses.byId(this.$route.params.id)
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    showInvoice () {
      const routeData = this.$router.resolve({ name: 'UserPanel.Invoice.Show', params: { id: this.payment.invoice_info.id } })
      window.open(routeData.href, '_blank')
    },
    setActionBtn () {
      this.inputs.forEach((item, index) => {
        if (item.name === 'btn') {
          this.inputs[index].atClick = this.edit
        }
      })
    },
    afterLoadInputData (data) {
      this.payment = new Payment(data)
      this.entityLoading = false
    },
    edit() {
      this.entityLoading = true
      this.$refs.entityEdit.editEntity(false)
        .then(() => {
          this.refreshPaymentData()
          this.entityLoading = false
        })
        .catch(() => {
          this.refreshPaymentData()
          this.entityLoading = false
        })
    },
    refreshPaymentData () {
      this.$refs.entityEdit.getData()
    },
    confirmWithdraw () {
      this.requestLoading = true
      APIGateway.payment.confirmWithdraw(this.payment.id, this.getRequestFormData())
        .then(() => {
          this.refreshPaymentData()
          this.requestLoading = false
        })
        .catch(() => {
          this.refreshPaymentData()
          this.requestLoading = false
        })
    },
    rejectWithdraw () {
      this.requestLoading = true
      APIGateway.payment.rejectWithdraw({
        paymentId: this.payment.id,
        description: FormBuilderAssist.getInputsByName(this.requestInputs, 'description').value
      })
        .then(() => {
          this.refreshPaymentData()
          this.requestLoading = false
        })
        .catch(() => {
          this.refreshPaymentData()
          this.requestLoading = false
        })
    },
    getRequestFormData () {
      return this.$refs.requestForm.getFormData()
    },
    reloadData () {
      return this.$refs.entityEdit.getData()
    }
  }
}
</script>

<style scoped lang="scss">
.AdminPaymentShow {
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
