<template>
  <div class="InvoiceShow"
       :style="localOptions.style">
    <div class="title q-pb-lg">
      <div class="static-title" />
      <div class="dynamic-title" />
      <div class="back-action">
        <q-btn flat
               :to="{name: 'UserPanel.Invoice.List'}"
               color="grey">
          بازگشت
          >
        </q-btn>
      </div>
    </div>
    <entity-show v-if="mounted"
                 ref="entityEdit"
                 v-model:value="inputs"
                 :title="'مشاهده صورتحساب شماره: ' + entityId"
                 :api="api"
                 :entity-id-key="entityIdKey"
                 :entity-param-key="entityParamKey"
                 :show-route-name="showRouteName"
                 :show-close-button="false"
                 :show-edit-button="false"
                 :show-expand-button="false"
                 :show-save-button="false"
                 :show-reload-button="false"
                 :redirect-after-edit="false"
                 :show-index-button="false"
                 :after-load-input-data="afterLoadInputData" />
    <q-card v-if="invoice.item_info"
            class="q-mt-lg">
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
              تومان
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
        <div class="row">
          <div class="col-md-4 col-12">
            <q-img :src="invoice.item_info.thumbnail"
                   width="100px" />
            {{ invoice.item_info.title }}
          </div>
          <div class="col-md-4 col-12">
            <q-img :src="invoice.item_info.thumbnail"
                   width="100px" />
            <q-icon name="isax:user" />
            استاد:
            {{ invoice.item_info.professor_info.firstname }}
            {{ invoice.item_info.professor_info.lastname }}
          </div>
          <div class="col-md-4 col-12">
            <q-img :src="invoice.item_info.thumbnail"
                   width="100px" />
            <q-icon name="isax:card" />
            قیمت:
            {{ invoice.item_info?.price ? invoice.item_info.price.toLocaleString('fa') : 0 }}
            تومان
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
import Assist from 'assets/js/Assist.js'
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
    getDateTime (dateTime) {
      return Assist.miladiToShamsi(dateTime)
    },
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

}
</style>
