<template>
  <div class="PaymentList"
       :style="localOptions.style">
    <entity-index v-if="mounted"
                  ref="entityIndex"
                  v-model:value="inputs"
                  title="لیست تراکنش ها"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :create-route-name="createRouteName"
                  :table-grid-size="$q.screen.lt.sm"
                  :show-search-button="false"
                  :show-expand-button="false"
                  :show-reload-button="false">
      <template #entity-index-table-cell="{inputData}">
        <template v-if="inputData.col.name === 'action'">
          <q-btn color="primary"
                 :to="{name: 'UserPanel.Invoice.Show', params: {id: inputData.props.row.id}}">
            مشاهده جزییات
          </q-btn>
        </template>
        <template v-else>
          {{ inputData.col.value }}
        </template>
      </template>
      <template #entity-index-table-item-cell="{inputData}">
        <entity-index-grid-item :input-data="inputData">
          <template #col="{col, row}">
            <template v-if="col.name === 'action'">
              <q-btn color="primary"
                     :to="{name: 'UserPanel.Invoice.Show', params: {id: row.id}}">
                مشاهده جزییات
              </q-btn>
            </template>
          </template>
        </entity-index-grid-item>
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
import EntityIndexGridItem from 'src/components/EntityIndexGridItem.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'PaymentList',
  components: { EntityIndex, EntityIndexGridItem },
  mixins: [mixinWidget],
  data: () => {
    return {
      api: APIGateway.payment.APIAdresses.base,
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
        { type: 'select', name: 'category', options: [], label: 'نوع تراکنش', placeholder: ' ', col: 'col-md-2 col-12' },
        { type: 'input', name: 'category', label: 'عنوان تراکنش', placeholder: ' ', col: 'col-md-2 col-12' },
        { type: BtnControlComp, name: 'btn', responseKey: 'btn', label: 'جستجو', placeholder: ' ', atClick: () => {}, col: 'col-md-2 col-12' }
      ],
      table: {
        columns: [
          {
            name: 'id',
            required: true,
            label: 'شناسه',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'invoice_info.title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.invoice_info?.title
          },
          {
            name: 'type',
            required: true,
            label: 'نوع تراکنش',
            align: 'left',
            field: row => (row.type === 'WITHDRAW') ? 'برداشت' : 'واریز'
          },
          {
            name: 'invoice_info.status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Invoice(row.invoice_info)).status_info.label
          },
          {
            name: 'amount',
            required: true,
            label: 'مبلغ تراکنش (تومان)',
            align: 'left',
            field: row => row.amount.toLocaleString('fa')
          },
          {
            name: 'creation_time',
            required: true,
            label: 'زمان',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.creation_time)
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
.PaymentList {
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
