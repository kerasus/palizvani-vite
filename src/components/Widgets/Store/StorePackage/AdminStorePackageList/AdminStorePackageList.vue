<template>
  <div class="AdminStorePackageList"
       :style="localOptions.style">
    <div class="more-action">
      <q-tab-panels v-model="tab">
        <q-tab-panel name="products"
                     class="q-pa-none">
          <q-btn label="ایجاد محصول جدید"
                 color="primary"
                 :to="{name: 'Admin.Store.Product.Create'}" />
        </q-tab-panel>
        <q-tab-panel name="packages"
                     class="q-pa-none">
          <q-btn label="ایجاد بسته جدید"
                 color="primary"
                 :to="{name: 'Admin.Store.Package.Create'}" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <q-card>
      <div class="q-pa-sm">
        <q-tabs v-model="tab"
                align="left"
                active-bg-color="primary"
                active-color="white">
          <q-tab name="products"
                 label="محصولات" />
          <q-tab name="packages"
                 label="بسته ها" />
        </q-tabs>
      </div>
      <q-separator />
      <div>
        <q-tab-panels v-model="tab">
          <q-tab-panel name="products"
                       class="q-pa-none">
            <admin-store-product-list :show-back-btn="false" />
          </q-tab-panel>
          <q-tab-panel name="packages"
                       class="q-pa-none">
            <entity-index v-if="mounted"
                          v-model:value="inputs"
                          title="لیست بسته ها"
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
                         :to="{name: 'Admin.Store.Package.Show', params: {id: inputData.props.row.id}}">
                    مشاهده جزییات
                  </q-btn>
                </template>
                <template v-else>
                  {{ inputData.col.value }}
                </template>
              </template>
            </entity-index>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-card>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { Package } from 'src/models/Package.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import AdminStoreProductList from 'components/Widgets/Store/StoreProduct/AdminStoreProductList/AdminStoreProductList.vue'

export default {
  name: 'AdminStorePackageList',
  components: { EntityIndex, AdminStoreProductList },
  mixins: [mixinWidget],
  data () {
    return {
      tab: 'packages',
      api: APIGateway.package.APIAdresses.base,
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
            name: 'title',
            required: true,
            label: 'جنس',
            align: 'left',
            field: row => (new Package(row)).is_physical_info.label
          },
          {
            name: 'category_info',
            required: true,
            label: 'بخش',
            align: 'left',
            field: row => row.content_category
          },
          {
            name: 'category_info',
            required: true,
            label: 'قیمت',
            align: 'left',
            field: row => parseInt(row.unit_price.toString()).toLocaleString('fa')
          },
          {
            name: 'category_info',
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
.AdminStorePackageList {
  .more-action {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
</style>
