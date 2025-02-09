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
                  ref="entityIndex"
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
import { shallowRef } from 'vue'
import { EntityIndex } from 'quasar-crud'
import { Product } from 'src/models/Product.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BtnControl from 'src/components/Control/btn.vue'
import ContentCategorySelector from 'src/components/FormBuilderCustumComponents/ContentCategorySelector.vue'

const BtnControlComp = shallowRef(BtnControl)
const ContentCategorySelectorComp = shallowRef(ContentCategorySelector)

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
      inputs: [
        { type: ContentCategorySelectorComp, name: 'content_category', responseKey: 'content_category_info', categoryType: 'content', col: 'col-md-12 col-12' },
        { type: ContentCategorySelectorComp, name: 'store_category', responseKey: 'store_category_info', categoryType: 'store', col: 'col-md-12 col-12' },
        {
          type: 'input',
          name: 'search',
          label: 'جست جو',
          placeholder: ' ',
          col: 'col-md-4 col-12'
        },
        {
          type: 'select',
          name: 'is_hidden',
          label: 'وضعیت نمایش',
          options: (new Product()).is_hiddenEnums,
          placeholder: ' ',
          col: 'col-md-3 col-12'
        },
        {
          type: 'select',
          name: 'is_physical',
          label: 'نوع محصول',
          options: (new Product()).is_physicalEnums,
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
            name: 'store_category',
            required: true,
            label: 'دسته فروشگاه',
            align: 'left',
            field: row => (row.store_category_info?.parent?.parent?.title || '-') + '، ' + (row.store_category_info?.parent?.title || '-') + '، ' + (row.store_category_info?.title || '-')
          },
          {
            name: 'store_category1',
            required: true,
            label: 'دسته محتوا',
            align: 'left',
            field: row => (row.content_category_info?.parent?.parent?.title || '-') + '، ' + (row.content_category_info?.parent?.title || '-') + '، ' + (row.content_category_info?.title || '-')
          },
          {
            name: 'unit_price',
            required: true,
            label: 'قیمت',
            align: 'left',
            field: row => parseInt(row.unit_price.toString()).toLocaleString('fa')
          },
          {
            name: 'is_hidden',
            required: true,
            label: 'نمایش',
            align: 'left',
            field: row => (new Product(row)).is_hidden_info.label
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
  },
  methods: {
    search () {
      this.$refs.entityIndex.search()
    }
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
