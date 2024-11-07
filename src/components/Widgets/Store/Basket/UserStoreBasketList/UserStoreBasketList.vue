<template>
  <div class="UserStoreBasketList"
       :style="localOptions.style">
    <entity-index v-if="mounted"
                  v-model:value="inputs"
                  title="لیست سفارشات"
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
        <template v-else-if="inputData.col.name === 'thumbnail'">
          <q-img :src="inputData.col.value"
                 width="100px" />
        </template>
        <template v-else-if="inputData.col.name === 'action'">
          <q-btn color="primary"
                 :to="{name: 'UserPanel.MyOrders.Show', params: {id: inputData.props.row.id}}">
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
import { EntityIndex } from 'quasar-crud'
import { Basket } from 'src/models/Basket.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import Assist from 'assets/js/Assist'

export default {
  name: 'UserStoreBasketList',
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
      inputs: [],
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
            field: () => '-'
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
            name: 'creation_time',
            required: true,
            label: 'تاریخ ثبت',
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
    this.mounted = true
  }
}
</script>

<style scoped lang="scss">
.UserStoreBasketList {
  :deep(.entity-index) {
    .entity-crud-formBuilder {
      display: none;
    }
  }
  .more-action {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
</style>
