<template>
  <div class="AdminContentList"
       :style="localOptions.style">
    <div v-if="showBackBtn"
         class="more-action">
      <q-btn label="ایجاد محصول جدید"
             color="primary"
             :to="{name: 'Admin.Store.Product.Create'}" />
    </div>
    <entity-index v-if="mounted"
                  v-model:value="inputs"
                  title="لیست محصولات"
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
                 :to="{name: 'Admin.Store.Product.Show', params: {id: inputData.props.row.id}}">
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
import { EntityIndex } from 'quasar-crud'
import { Product } from 'src/models/Product.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'AdminContentList',
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
      api: APIGateway.product.APIAdresses.base,
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
            name: 'title',
            required: true,
            label: 'نام محصول',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'is_physical_info',
            required: true,
            label: 'جنس',
            align: 'left',
            field: row => (new Product(row)).is_physical_info.label
          },
          {
            name: 'content_category',
            required: true,
            label: 'بخش',
            align: 'left',
            field: row => row.content_category
          },
          {
            name: 'unit_price',
            required: true,
            label: 'قیمت',
            align: 'left',
            field: row => parseInt(row.unit_price.toString()).toLocaleString('fa')
          },
          {
            name: 'is_visible',
            required: true,
            label: 'نمایش',
            align: 'left',
            field: '-'
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
.AdminContentList {
  .more-action {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
</style>
