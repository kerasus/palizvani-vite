<template>
  <div class="UserStoreBasketShow"
       :style="localOptions.style">
    <div class="flex justify-end">
      <q-btn flat
             color="grey"
             @click="$router.go(-1)">
        بازگشت
        >
      </q-btn>
    </div>
    <entity-show v-if="mounted"
                 ref="entityShow"
                 v-model:value="inputs"
                 title="جزییات صورتحساب"
                 :api="api"
                 :entity-id-key="entityIdKey"
                 :entity-param-key="entityParamKey"
                 :show-close-button="false"
                 :show-edit-button="false"
                 :show-expand-button="false"
                 :show-reload-button="false"
                 :show-index-button="false"
                 :after-load-input-data="afterLoadInputData">
      <template #before-form-builder>
        <div class="basket-form-header row">
          <div class="col-md-4 col-12 flex justify-start items-center">
            <q-icon name="shopping_cart" />
            شناسه:
            {{ basket.id }}
          </div>
          <div class="col-md-8 col-12">
            <span class="text-info">
              {{ basket.status_info.label }}
            </span>
            <q-linear-progress :value="basketStatusProgress"
                               color="info"
                               size="16px"
                               rounded
                               class="q-mt-سپ" />
          </div>
        </div>
      </template>
    </entity-show>

    <div class="q-mt-md">
      <entity-index v-if="basket.id"
                    v-model:value="tableInputs"
                    title="لیست محصولات سفارش"
                    :table="table"
                    :loaded-data="basket"
                    :table-keys="tableKeys"
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
                   outline
                   :to="{name: inputData.props.row.product ? 'Public.Product' : 'Public.Package', params: {id: inputData.props.row.product || inputData.props.row.package}}">
              <q-icon name="visibility"
                      class="q-mr-sm" />
              مشاهده
            </q-btn>
          </template>
          <template v-else>
            {{ inputData.col.value }}
          </template>
        </template>
      </entity-index>
    </div>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { Package } from 'src/models/Package'
import { Basket } from 'src/models/Basket.js'
import { Product } from 'src/models/Product.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { EntityShow, EntityIndex } from 'quasar-crud'
import { FormBuilderAssist } from 'quasar-form-builder'
import FormBuilderDateTime from 'src/components/FormBuilderCustumComponents/FormBuilderDateTime.vue'

const FormBuilderDateTimeComp = shallowRef(FormBuilderDateTime)

export default {
  name: 'AdminStoreBasketShow',
  components: {
    EntityShow,
    EntityIndex
  },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      entityLoading: false,
      api: APIGateway.basket.APIAdresses.byId(this.$route.params.id),
      entityIdKey: 'id',
      entityParamKey: 'id',
      indexRouteName: 'UserPanel.MyOrders.List',
      inputs: [],

      tableKeys: {
        data: 'items_info.list',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      tableInputs: [],
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
            field: row => (row.product_info || row.package_info).title
          },
          {
            name: 'is_package_or_product',
            required: true,
            label: 'نوع محصول',
            align: 'left',
            field: row => row.package ? 'بسته' : 'تکی'
          },
          {
            name: 'content_category',
            required: true,
            label: 'دسته بندی اصلی',
            align: 'left',
            field: row => row.content_category
          },
          {
            name: 'count',
            required: true,
            label: 'تعداد',
            align: 'left',
            field: row => row.count
          },
          {
            name: 'is_physical_info',
            required: true,
            label: 'نوع جنس',
            align: 'left',
            field: row => row.product_info ? (new Product(row.product_info)).is_physical_info.label : (new Package(row.product_info)).is_physical_info.label
          },
          {
            name: 'physical_type_info',
            required: true,
            label: 'نوع محصول',
            align: 'left',
            field: row => row.product_info ? (new Product(row.product_info)).physical_type_info.label : '-'
          },
          {
            name: 'unit_price',
            required: true,
            label: 'قیمت',
            align: 'left',
            field: row => parseInt((row.product_info || row.package_info).unit_price?.toString()).toLocaleString('fa')
          },
          {
            name: 'action',
            required: true,
            label: 'عملیات',
            align: 'left',
            field: row => ''
          }
        ]
      },

      basket: new Basket()
    }
  },
  computed: {
    basketStatusProgress () {
      if (this.basket.status === 'OPEN') {
        return 0.1
      }
      if (this.basket.status === 'CANCELED') {
        return 0
      }
      if (this.basket.status === 'PAID') {
        return 0.5
      }
      if (this.basket.status === 'CLOSED') {
        return 1
      }
      if (this.basket.status === 'SENT') {
        return 1
      }
      return 0.5
    }
  },
  created() {
    this.inputs = [
      { type: 'separator', name: 'space1', label: 'مشخصات سفارش', className: 'custom-separator', col: 'col-12' },
      { type: 'input', name: 'id', responseKey: 'id', label: 'شناسه', placeholder: ' ', disable: true, col: 'col-md-2 col-12' },
      { type: 'input', name: 'items_info.length', responseKey: 'items_info.length', label: 'تعداد اقلام', placeholder: ' ', disable: true, col: 'col-md-2 col-12' },
      { type: FormBuilderDateTimeComp, name: 'creation_time', responseKey: 'creation_time', outsideLabel: 'تاریخ ثبت', placeholder: ' ', disable: true, col: 'col-md-3 col-12' },
      { type: 'input', name: 'overall_order_price', responseKey: 'overall_order_price', label: 'قیمت کل(تومان)', placeholder: ' ', disable: true, col: 'col-md-3 col-12' }
    ]
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    afterLoadInputData (data) {
      this.entityLoading = false
      this.basket = new Basket(data)

      FormBuilderAssist.setAttributeByName(this.inputs, 'overall_order_price', 'value', parseInt(data.overall_order_price).toLocaleString('fa'))
    }
  }
}
</script>

<style scoped lang="scss">
.UserStoreBasketShow {
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
  .basket-form-header {
    background: #FCF9F4;
    border: 1px solid #DFE1EC;
    margin: -16px -16px 0  -16px;
    padding: 16px 40px;
    .q-icon {
      color: #AAA095;
    }
  }
  :deep(.form) {
    padding: 24px;
  }
  :deep(.entity-index) {
    .entity-crud-formBuilder {
      display: none;
    }
    .q-table__bottom {
      display: none;
    }
  }
}
</style>
