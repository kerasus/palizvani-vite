<template>
  <div class="AdminDiscountList"
       :style="localOptions.style">
    <div v-if="showBackBtn"
         class="more-action">
      <q-btn label="ایجاد تخفیف جدید"
             color="primary"
             :to="{name: 'Admin.Store.Discount.Create'}" />
    </div>
    <entity-index v-if="mounted"
                  v-model:value="inputs"
                  title="لیست تخفیفات"
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
                 :to="{name: 'Admin.Store.Discount.Show', params: {id: inputData.props.row.id}}">
            مشاهده جزییات
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
import Assist from 'assets/js/Assist.js'
import { EntityIndex } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'AdminStoreDiscountList',
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
      api: APIGateway.discount.APIAdresses.base,
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
            name: 'code',
            required: true,
            label: 'کد',
            align: 'left',
            field: row => row.code
          },
          {
            name: 'percent',
            required: true,
            label: 'درصد',
            align: 'left',
            field: row => row.percent
          },
          {
            name: 'expire_time',
            required: true,
            label: 'تاریخ انقضا',
            align: 'left',
            field: row => Assist.miladiToShamsi(row.expire_time)
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
.AdminDiscountList {
  .more-action {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
</style>
