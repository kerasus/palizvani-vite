<template>
  <div class="shop-widget"
       :style="localOptions.style">
    <q-banner>
      محصولات
    </q-banner>
    <div class="shop-widget__content">
      <div class="shop-widget__sidebar">
        <sidebar :type="searchTab"
                 @onChangeFilters="onChangeSidebarFilters" />
      </div>
      <div class="shop-widget__main">
        <div class="shop-widget__main-top-filter">
          <div class="shop-widget__main-top-filter-tools">
            <div class="shop-widget__main-top-filter-txt">
              <q-input v-model="topFilters.search"
                       :debounce="300"
                       placeholder="جستجوی محصولات"
                       @update:model-value="search">
                <template #prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
            <div class="shop-widget__main-top-filter-sort">
              <div class="shop-widget__main-top-filter-sort-label">
                ترتیب نمایش
              </div>
              <div class="shop-widget__main-top-filter-sort-select">
                <q-select v-model="topFilters.sort"
                          emit-value
                          map-options
                          :options="sortOptions"
                          @update:model-value="search" />
              </div>
            </div>
          </div>
          <div class="shop-widget__main-top-filter-tabs">
            <q-tabs v-model="searchTab"
                    align="left"
                    active-bg-color="primary"
                    active-color="white">
              <q-tab label="محصولات"
                     name="product" />
              <q-tab label="بسته"
                     name="package" />
            </q-tabs>
          </div>
        </div>
        <div v-if="mounted"
             class="shop-widget__result">
          <q-tab-panels v-model="searchTab"
                        animated>
            <q-tab-panel name="product">
              <entity-index ref="productEntityIndex"
                            v-model:value="productInputs"
                            :default-layout="false"
                            :api="productApi"
                            :table="tableColumns"
                            :table-keys="tableKeys"
                            :table-grid-size="true"
                            :show-expand-button="false"
                            :show-reload-button="false"
                            :show-search-button="false">
                <template #entity-index-table-item-cell="{inputData}">
                  <div class="shop-widget__result-product-item">
                    <product-item :product="getProduct(inputData.props.row)" />
                  </div>
                </template>
              </entity-index>
            </q-tab-panel>
            <q-tab-panel name="package">
              <entity-index ref="packageEntityIndex"
                            v-model:value="packageInputs"
                            :default-layout="false"
                            :api="packageApi"
                            :table="tableColumns"
                            :table-keys="tableKeys"
                            :table-grid-size="true"
                            :show-expand-button="false"
                            :show-reload-button="false"
                            :show-search-button="false">
                <template #entity-index-table-item-cell="{inputData}">
                  <div class="shop-widget__result-product-item">
                    <package-item :package-item="getPackage(inputData.props.row)" />
                  </div>
                </template>
              </entity-index>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import Sidebar from './components/sidebar.vue'
import { Product } from 'src/models/Product.js'
import { Package } from 'src/models/Package.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import ProductItem from './components/productItem.vue'
import PackageItem from './components/packageItem.vue'
import { FormBuilderAssist } from 'quasar-form-builder'

export default {
  name: 'ContentList',
  components: { EntityIndex, ProductItem, PackageItem, Sidebar },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      searchTab: 'package', // product - package
      topFilters: {
        search: null,
        sort: 'BEST_SELLING'
      },
      sidebarFilters: {},
      sortOptions: [
        {
          label: 'پرفروش ترین',
          value: 'BEST_SELLING'
        },
        {
          label: 'گران ترین',
          value: 'MOST_EXPENSIVE'
        },
        {
          label: 'ارزان ترین',
          value: 'LEAST_EXPENSIVE'
        }
      ],
      tableColumns: {
        columns: []
      },
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      productApi: APIGateway.product.APIAdresses.base,
      packageApi: APIGateway.package.APIAdresses.base,
      productInputs: [
        { type: 'hidden', name: 'search', value: null },
        { type: 'hidden', name: 'sort', value: null },
        { type: 'hidden', name: 'unit_price__lt', value: null },
        { type: 'hidden', name: 'unit_price__gte', value: null },
        { type: 'hidden', name: 'inventory__gte', value: null },
        { type: 'hidden', name: 'physical_type__in', value: null },
        { type: 'hidden', name: 'medias__type__in', value: null }
      ],
      packageInputs: [
        { type: 'hidden', name: 'search', value: null },
        { type: 'hidden', name: 'sort', value: null },
        { type: 'hidden', name: 'unit_price__lt', value: null },
        { type: 'hidden', name: 'unit_price__gte', value: null },
        { type: 'hidden', name: 'inventory__gte', value: null }
      ]
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    onChangeSidebarFilters (filters) {
      this.sidebarFilters = filters
      this.search()
    },
    search () {
      this.updateFilters()
      if (this.searchTab === 'product') {
        this.searchProducts()
      }
      if (this.searchTab === 'package') {
        this.searchPackage()
      }
    },
    updateFilters () {
      this.updateProductFilters()
      this.updatePackageFilters()
    },
    updateProductFilters () {
      // topFilters
      FormBuilderAssist.setAttributeByName(this.productInputs, 'sort', 'value', this.topFilters.sort)
      FormBuilderAssist.setAttributeByName(this.productInputs, 'search', 'value', this.topFilters.search)

      // sidebarFilters
      FormBuilderAssist.setAttributeByName(this.productInputs, 'unit_price__lt', 'value', this.sidebarFilters.unit_price__lt)
      FormBuilderAssist.setAttributeByName(this.productInputs, 'unit_price__gte', 'value', this.sidebarFilters.unit_price__gte)
      FormBuilderAssist.setAttributeByName(this.productInputs, 'inventory__gte', 'value', this.sidebarFilters.inventory__gte)
      FormBuilderAssist.setAttributeByName(this.productInputs, 'physical_type__in', 'value', this.sidebarFilters.physical_type__in)
      FormBuilderAssist.setAttributeByName(this.productInputs, 'medias__type__in', 'value', this.sidebarFilters.medias__type__in)
    },
    updatePackageFilters () {
      // topFilters
      FormBuilderAssist.setAttributeByName(this.packageInputs, 'sort', 'value', this.topFilters.sort)
      FormBuilderAssist.setAttributeByName(this.packageInputs, 'search', 'value', this.topFilters.search)

      // sidebarFilters
      FormBuilderAssist.setAttributeByName(this.packageInputs, 'unit_price__lt', 'value', this.sidebarFilters.unit_price__lt)
      FormBuilderAssist.setAttributeByName(this.packageInputs, 'unit_price__gte', 'value', this.sidebarFilters.unit_price__gte)
      FormBuilderAssist.setAttributeByName(this.packageInputs, 'inventory__gte', 'value', this.sidebarFilters.inventory__gte)
    },
    searchProducts () {
      if (!this.$refs.productEntityIndex) {
        return
      }

      this.$refs.productEntityIndex.search()
    },
    searchPackage () {
      if (!this.$refs.packageEntityIndex) {
        return
      }

      this.$refs.packageEntityIndex.search()
    },
    getProduct (data) {
      return new Product(data)
    },
    getPackage (data) {
      return new Package(data)
    }
  }
}
</script>

<style scoped lang="scss">
.shop-widget {
  .shop-widget__content {
    display: flex;
    gap: 24px;
    justify-content: flex-start;
    $sidebar-width: 312px;
    .shop-widget__sidebar {
      width: $sidebar-width;
    }
    .shop-widget__main {
      width: calc( 100% - #{$sidebar-width} );
      .shop-widget__main-top-filter {
        .shop-widget__main-top-filter-tools {
          display: flex;
          justify-content: flex-start;
          gap: 24px;
          $sort-width: 312px;
          margin-bottom: 20px;
          .shop-widget__main-top-filter-sort {
            width: $sort-width;
            gap: 24px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .shop-widget__main-top-filter-sort-label {}
            .shop-widget__main-top-filter-sort-select {
              flex: 1;
            }
          }
          .shop-widget__main-top-filter-txt {
            width: calc( 100% - #{$sort-width} );
            :deep(.q-field) {
              .q-field__inner {
                .q-field__control {
                  .q-field__prepend {
                    padding: 0;
                    width: 36px;
                    justify-content: flex-end;
                    height: 100%;
                    font-size: 26px;
                  }
                  .q-field__control-container {
                    .q-field__native {
                      padding-left: 4px;
                    }
                    .q-field__label {
                      margin-left: 4px;
                    }
                  }
                }
              }
            }
          }
        }
        .shop-widget__main-top-filter-tabs {
          padding: 12px 20px;
          border: 1px solid #DFE1EC;
          border-radius: 8px 8px 0 0;
          margin-bottom: 27px;
          :deep(.q-tabs) {
            .q-tabs__content {
              .q-tab {
                border-radius: 8px;
                min-height: 45px;
                width: 160px;
                .q-tab__indicator {
                  display: none;
                }
              }
            }
          }
        }
      }
      :deep(.shop-widget__result) {
        .q-tab-panel {
          padding: 0;
          .quasar-crud-index-table {
            padding: 0;
            .q-table__grid-content {
              margin: -18px;
              .shop-widget__result-product-item {
                width: 33%;
                padding: 18px;
                flex: 0 0 auto;
              }
            }
          }
        }
      }
    }
  }
}
</style>
