<template>
  <div class="AdminBasketList"
       :style="localOptions.style">
    <div v-if="showBackBtn"
         class="more-action">
         <!--      <q-btn color="primary">-->
         <!--        <q-icon name="file_download" />-->
         <!--        دریافت-->
         <!--      </q-btn>-->
    </div>
    <entity-index v-if="mounted"
                  ref="entityIndex"
                  v-model:value="inputs"
                  title="لیست سفارشات"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :create-route-name="createRouteName"
                  :show-search-button="false"
                  :show-expand-button="false"
                  :show-reload-button="false">
      <template #toolbar>
        <q-btn color="primary"
               :loading="exportReportLoading"
               @click="getBasketsListExcel">
          دریافت
        </q-btn>
      </template>
      <template #entity-index-table-cell="{inputData}">
        <template v-if="inputData.col.name === 'number'">
          {{ inputData.rowNumber }}
        </template>
        <template v-else-if="inputData.col.name === 'thumbnail'">
          <q-img :src="inputData.col.value"
                 width="100px" />
        </template>
        <template v-else-if="inputData.col.name === 'action'">
          <q-btn color="primary"
                 :to="{name: 'Admin.Store.Basket.Show', params: {id: inputData.props.row.id}}">
            جزییات
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
import { Basket } from 'src/models/Basket.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'

const BtnControlComp = shallowRef(BtnControl)

export default {
  name: 'AdminBasketList',
  components: { EntityIndex },
  mixins: [mixinWidget],
  props: {
    showBackBtn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      api: APIGateway.basket.APIAdresses.listOrders,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        {
          type: 'input',
          name: 'search',
          label: 'جست جو',
          placeholder: ' ',
          col: 'col-md-4 col-12'
        },
        {
          type: 'select',
          name: 'order_type',
          label: 'نوع سفارش',
          options: (new Basket()).order_typeEnums,
          placeholder: ' ',
          col: 'col-md-3 col-12'
        },
        {
          type: 'select',
          name: 'status',
          label: 'وضعیت',
          options: [
            {
              label: 'پرداخت شده',
              value: 'PAID'
            },
            {
              label: 'ارسال شده',
              value: 'SENT'
            }],
          placeholder: ' ',
          col: 'col-md-3 col-12'
        },
        { type: BtnControlComp, name: 'btn', label: 'جستجو', placeholder: ' ', atClick: this.search, col: 'col-md-2 col-12' }
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
            name: 'owner_info',
            required: true,
            label: 'نام خریدار',
            align: 'left',
            field: row => row.owner_info?.firstname + ' ' + row.owner_info?.lastname
          },
          {
            name: 'items_info_length',
            required: true,
            label: 'تعداد اقلام',
            align: 'left',
            field: row => row.items_info.length
          },
          {
            name: 'order_type',
            required: true,
            label: 'نوع سفارش',
            align: 'left',
            field: (row) => row.order_type ? new Basket(row).order_type_info.label : '-'
          },
          {
            name: 'overall_order_price',
            required: true,
            label: 'قیمت کل(ریال)',
            align: 'left',
            field: row => parseInt(row.overall_order_price).toLocaleString('fa')
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Basket(row)).status_info.label
          },
          {
            name: 'order_time',
            required: true,
            label: 'تاریخ ثبت',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.order_time)
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
      exportReportLoading: false,
      createRouteName: ''
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    search () {
      this.$refs.entityIndex.search()
    },
    getBasketsListExcel () {
      this.exportReportLoading = true
      const filter = this.$refs.entityIndex.createParams()
      filter.report_type = 'baskets_list'
      APIGateway.basket.exportBasketReport(filter)
        .then((xlsxData) => {
          // Assist.saveXlsx(xlsxData, this.classroomId)
          Assist.saveXlsx(xlsxData, 'سفارش ها')
          this.exportReportLoading = false
        })
        .catch((e) => {
          this.exportReportLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.AdminBasketList {
  .more-action {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
</style>
