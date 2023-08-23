<template>
  <div class="AdminInvoiceList"
       :style="localOptions.style">
    <entity-index v-if="mounted"
                  ref="entityIndex"
                  v-model:value="inputs"
                  title="لیست صورتحساب ها"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :create-route-name="createRouteName"
                  :show-search-button="false"
                  :show-expand-button="false"
                  :show-reload-button="false">
      <template #entity-index-table-cell="{inputData}">
        <template v-if="inputData.col.name === 'number'">
          {{ inputData.rowNumber }}
        </template>
        <template v-else-if="inputData.col.name === 'action'">
          <q-btn color="primary"
                 :to="{name: 'Admin.Invoice.Show', params: {id: inputData.props.row.id}}">
            جزییات جزییات
          </q-btn>
        </template>
        <template v-else>
          {{ inputData.col.value }}
        </template>
      </template>
    </entity-index>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import Assist from 'assets/js/Assist.js'
import { EntityIndex } from 'quasar-crud'
import { Invoice } from 'src/models/Invoice.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AdminInvoiceList',
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
      inputs: [
        {
          type: 'date',
          name: 'creation_time',
          label: 'از تاریخ',
          placeholder: ' ',
          col: 'col-md-3 col-12'
        },
        {
          type: 'date',
          name: 'creation_time',
          label: 'تا تاریخ',
          placeholder: ' ',
          col: 'col-md-3 col-12'
        },
        { type: 'select', name: 'category', options: [], label: 'وضعیت تراکنش', placeholder: ' ', col: 'col-md-2 col-12' },
        { type: 'hidden', name: 'per_page', value: 5 },
        { type: 'input', name: 'category', label: 'نوع صورتحساب', placeholder: ' ', col: 'col-md-2 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'جستجو', placeholder: ' ', atClick: () => {}, col: 'col-md-2 col-12' }
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
            name: 'id',
            required: true,
            label: 'سفارش دهنده',
            align: 'left',
            field: row => row.owner_info.firstname + ' ' + row.owner_info.lastname
          },
          {
            name: 'id',
            required: true,
            label: 'نوع صورتحساب',
            align: 'left',
            field: row => (new Invoice(row)).type_info.label
          },
          {
            name: 'amount',
            required: true,
            label: 'مبلغ تراکنش(ریال)',
            align: 'left',
            field: row => row.amount.toLocaleString('fa')
          },
          {
            name: 'id',
            required: true,
            label: 'وضعیت تراکنش',
            align: 'left',
            field: row => (new Invoice(row)).status_info.label
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
            label: 'زمان آخرین بروز رسانی',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.last_modification_time)
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
    this.setActionBtn()
    this.mounted = true
  },
  methods: {
    setActionBtn () {
      this.inputs.forEach((item, index) => {
        if (item.name === 'btn') {
          this.inputs[index].atClick = this.search
        }
      })
    },
    search () {
      this.$refs.entityIndex.search()
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
