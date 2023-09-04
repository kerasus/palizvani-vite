<template>
  <div class="PaymentShow"
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
      </template>
    </entity-show>
  </div>
</template>

<script>
import { EntityShow } from 'quasar-crud'
import { Payment } from 'src/models/Payment.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'PaymentShow',
  components: {
    EntityShow
  },
  mixins: [mixinWidget],
  data: () => {
    return {
      mounted: false,
      entityLoading: true,
      api: null,
      payment: new Payment(),
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Content.Show',
      indexRouteName: 'Admin.Content.List',
      inputs: [
        { type: 'input', name: 'amount', responseKey: 'amount', label: 'مبلغ', placeholder: ' ', col: 'col-md-4 col-12' },
        { type: 'dateTime', name: 'creation_time', responseKey: 'creation_time', label: 'تاریخ ایجاد', placeholder: ' ', col: 'col-md-4 col-12' },
        {
          type: 'select',
          name: 'type',
          responseKey: 'type',
          label: 'نوع',
          options: [
            {
              label: 'برداشت',
              value: 'WITHDRAW'
            },
            {
              label: 'درخواست برداشت',
              value: 'WITHDRAW_REQUEST'
            },
            {
              label: 'برداشت رد شده',
              value: 'WITHDRAW_REJECT'
            },
            {
              label: 'واریز',
              value: 'DEPOSIT'
            }
          ],
          placeholder: ' ',
          col: 'col-md-4 col-12'
        },
        { type: 'input', name: 'creator_info.firstname', responseKey: 'creator_info.firstname', label: 'نام پرداخت کننده', placeholder: ' ', col: 'col-md-6 col-12' },
        { type: 'input', name: 'creator_info.lastname', responseKey: 'creator_info.lastname', label: 'نام خانوادگی پرداخت کننده', placeholder: ' ', col: 'col-md-6 col-12' }
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
.PaymentShow {
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
