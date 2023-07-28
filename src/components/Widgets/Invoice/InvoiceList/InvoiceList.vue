<template>
  <div class="InvoiceList"
       :style="localOptions.style">
    <div class="title">
      صورت‌حساب‌ها
    </div>
    <q-card class="list"
            flat>
      <entity-index v-if="mounted"
                    v-model:value="inputs"
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
                   :to="{name: 'UserPanel.Invoice.Show', params: {id: inputData.props.row.id}}">
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
import Assist from 'assets/js/Assist.js'
import { EntityIndex } from 'quasar-crud'
import { Invoice } from 'src/models/Invoice.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'InvoiceList',
  components: { EntityIndex },
  mixins: [mixinWidget],
  data: () => {
    return {
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
            name: 'creation_time',
            required: true,
            label: 'تاریخ صورت‌حساب',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.creation_time)
          },
          {
            name: 'creation_time',
            required: true,
            label: 'تاریخ سررسید',
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
      mounted: false,
      createRouteName: ''
    }
  },
  mounted() {
    this.mounted = true
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
