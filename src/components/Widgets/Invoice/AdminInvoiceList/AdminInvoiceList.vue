<template>
  <div class="AdminInvoiceList"
       :style="localOptions.style">
    <div class="title">
      سفارشات
    </div>
    <q-card class="list"
            flat>
      <entity-index v-model:value="inputs"
                    title=""
                    :api="api"
                    :table="table"
                    :table-keys="tableKeys"
                    :create-route-name="createRouteName"
                    :show-search-button="false"
                    :show-expand-button="false"
                    :show-reload-button="false"
                    :default-layout="false">
        <template #entity-index-table-cell="{inputData}">
          <template v-if="inputData.col.name === 'action'">
            <q-btn flat
                   color="primary"
                   :to="{name: 'AdminPanel.Invoice.Show', params: {id: inputData.props.row.id}}">
              مشاهده جزییات
            </q-btn>
          </template>
          <template v-else>
            {{ inputData.col.value }}
          </template>
        </template>
      </entity-index>
    </q-card>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import Assist from 'assets/js/Assist'
import { Invoice } from 'src/models/Invoice'

export default {
  name: 'AdminInvoiceList',
  components: { EntityIndex },
  mixins: [mixinWidget],
  data: () => {
    return {
      defaultOptions: {
        invoiceType: null
      },
      api: APIGateway.invoice.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [],
      table: {
        columns: [
          {
            name: 'id',
            required: true,
            label: 'صورت‌حساب',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'title',
            required: true,
            label: 'پکیج یا خدمت',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'owner_info',
            required: true,
            label: 'صاحب سفارش',
            align: 'left',
            field: row => row.owner_info.firstname + ' ' + row.owner_info.lastname
          },
          {
            name: 'creation_time',
            required: true,
            label: 'تاریخ صورت‌حساب',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.creation_time)
          },
          {
            name: 'amount',
            required: true,
            label: 'کل',
            align: 'left',
            field: row => row.amount.toLocaleString('fa')
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Invoice(row)).status_info.label
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
      createRouteName: ''
    }
  },
  created() {
    const shopServiceNameInRouteParams = this.$route.params?.shopServiceName
    if (shopServiceNameInRouteParams) {
      this.inputs.push({
        type: 'hidden',
        name: 'type',
        value: shopServiceNameInRouteParams.toUpperCase()
      })
    } else {
      this.inputs.push({
        type: 'hidden',
        name: 'type',
        value: 'SERVICE'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.AdminInvoiceList {
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
