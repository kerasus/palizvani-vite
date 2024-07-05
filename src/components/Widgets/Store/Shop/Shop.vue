<template>
  <div class="shop-widget"
       :style="localOptions.style">
    <q-banner>
      محصولات
    </q-banner>
    <div class="shop-widget__content">
      <div class="shop-widget__sidebar">
        <div class="shop-widget__sidebar-header">
          <div class="shop-widget__sidebar-header-title">
            فیلترها
          </div>
          <q-btn flat
                 class="shop-widget__sidebar-header-remove-filters">
            <q-icon name="delete_outline" />
            حذف فیلترها
          </q-btn>
        </div>
        <div class="shop-widget__sidebar-selected-filters">
          <div class="shop-widget__sidebar-selected-filter">
            <div class="shop-widget__sidebar-selected-filter-title">
              استاد مطهری
            </div>
            <q-btn class="shop-widget__sidebar-selected-filter-btn-remove"
                   flat
                   icon="close" />
          </div>
          <div class="shop-widget__sidebar-selected-filter">
            <div class="shop-widget__sidebar-selected-filter-title">
              سیر مطالعاتی
            </div>
            <q-btn class="shop-widget__sidebar-selected-filter-btn-remove"
                   flat
                   icon="close" />
          </div>
        </div>
        <q-separator />
        <div class="shop-widget__sidebar-price-filter">
          <q-range v-model="filters.price"
                   :min="0"
                   :step="100"
                   :max="1500000" />
          <div class="shop-widget__sidebar-price-label">
            <div class="shop-widget__sidebar-price-label-min">
              از
              {{ parseInt(filters.price.min.toString()).toLocaleString('fa') }}
              تومان
            </div>
            <div class="shop-widget__sidebar-price-label-max">
              تا
              {{ parseInt(filters.price.max.toString()).toLocaleString('fa') }}
              تومان
            </div>
          </div>
        </div>
        <q-separator />
        <div class="shop-widget__sidebar-exist-filter">
          <div class="shop-widget__sidebar-exist-label">
            فقط محصولات موجود
          </div>
          <q-toggle v-model="filters.exist" />
        </div>
        <q-separator />
        <div class="shop-widget__sidebar-category-filter">
          <q-expansion-item expand-separator
                            label="دسته بندی ها">
            <q-tree v-model:ticked="filters.categories"
                    class="col-12 col-sm-6"
                    :nodes="simple"
                    children-key="children"
                    label-key="label"
                    node-key="id"
                    tick-strategy="leaf" />
          </q-expansion-item>

        </div>
        <q-separator />
        <div class="shop-widget__sidebar-type-filter">
          <q-expansion-item expand-separator
                            label="نوع">
            <q-tree v-model:ticked="filters.categories"
                    class="col-12 col-sm-6"
                    :nodes="types"
                    children-key="children"
                    label-key="label"
                    node-key="value"
                    tick-strategy="leaf" />
          </q-expansion-item>

        </div>
      </div>
      <div class="shop-widget__main">
        <div class="shop-widget__main-top-filter">
          <div class="shop-widget__main-top-filter-tools">
            <div class="shop-widget__main-top-filter-txt">
              <q-input v-model="filters.search"
                       label="جستجوی محصولات">
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
                <q-select v-model="filters.sort"
                          emit-value
                          map-options
                          :options="sortOptions" />
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
        <div class="shop-widget__result">
          <entity-index v-if="mounted"
                        ref="entityIndex"
                        v-model:value="inputs"
                        :default-layout="false"
                        :api="api"
                        :table="table"
                        :table-keys="tableKeys"
                        :table-grid-size="true"
                        :show-expand-button="false"
                        :show-reload-button="false"
                        :show-search-button="false">
            <template #entity-index-table-item-cell="{inputData}">
              <product-item class="shop-widget__result-product-item"
                            :product="getProduct(inputData.props.row)" />
            </template>
          </entity-index>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { Product } from 'src/models/Product.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import ProductItem from './components/productItem.vue'

export default {
  name: 'ContentList',
  components: { EntityIndex, ProductItem },
  mixins: [mixinWidget],
  data () {
    return {
      searchTab: 'product',
      filters: {
        search: null,
        exist: false,
        sort: 'sort1',
        categories: [], // content_category
        price: {
          min: 100, // unit_price__gte
          max: 1000000 // unit_price__lt
        }
      },
      simple: [
        {
          label: 'شهید مطهری',
          id: 1,
          children: [
            {
              label: 'سطح 6',
              id: 11
            },
            {
              label: 'سطح ۱',
              id: 3,
              children: [
                {
                  label: 'سطح ۲',
                  id: 4,
                  children: [
                    {
                      label: 'سطح ۳',
                      id: 5
                    },
                    {
                      label: 'سطح 4',
                      id: 9
                    },
                    {
                      label: 'سطح 5',
                      id: 10
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: 'جریان شناسی',
          id: 2,
          children: [
            {
              label: 'سطح ۱',
              id: 6,
              children: [
                {
                  label: 'سطح ۲',
                  id: 7,
                  children: [
                    {
                      label: 'سطح ۳',
                      id: 8
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      types: [
        {
          label: 'مجازی',
          value: 'virtual',
          children: [
            {
              label: 'ویدیو',
              value: 'VIDEO'
            },
            {
              label: 'صوت',
              value: 'SOUND'
            },
            {
              label: 'متن',
              value: 'TEXT'
            },
            {
              label: 'تصویر',
              value: 'IMAGE'
            }
          ]
        },
        {
          label: 'فیزیکی',
          value: 'physical',
          children: [
            {
              label: 'کتاب',
              value: 'BOOK'
            },
            {
              label: 'جزوه',
              value: 'MANUSCRIPT'
            },
            {
              label: 'لوج فشرده',
              value: 'CD'
            }
          ]
        }
      ],
      sortOptions: [
        {
          label: 'پرفروش ترین',
          value: 'sort1'
        },
        {
          label: 'گران ترین',
          value: 'sort2'
        },
        {
          label: 'ارزان ترین',
          value: 'sort3'
        }
      ],
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
        columns: []
      },
      mounted: false,
      createRouteName: ''
    }
  },
  mounted() {
    this.mounted = true
  },
  methods: {
    getProduct (data) {
      return new Product(data)
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
      background: #F6F6F6;
      border-radius: 20px;
      padding: 24px;
      .shop-widget__sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        .shop-widget__sidebar-header-title {
          font: normal normal medium 16px/21px AzarMehr;
          letter-spacing: 0;
        }
        .shop-widget__sidebar-header-remove-filters {
          color: #FF3D3D;
        }
      }
      .shop-widget__sidebar-selected-filters {
        display: flex;
        gap: 8px;
        justify-content: flex-start;
        .shop-widget__sidebar-selected-filter {
          border: 1px solid #ABABAB;
          border-radius: 20px;
          padding: 8px;
          display: flex;
          justify-content: space-between;
          gap: 8px;
          align-items: center;
          background: #FFFFFF;
          .shop-widget__sidebar-selected-filter-title {
            font-size: 14px;
            color: #212121;
          }
          :deep(.shop-widget__sidebar-selected-filter-btn-remove) {
            @mixin set-btn-min-max () {
              $btn-size: 20px;
              max-height: $btn-size;
              max-width: $btn-size;
              min-width: $btn-size;
              min-height: $btn-size;
            }
            padding: 1px;
            @include set-btn-min-max;
            .q-focus-helper {
              @include set-btn-min-max;
            }
            .q-btn__content {
              @include set-btn-min-max;
              .q-icon {
                font-size: 18px;
              }
            }
          }
        }
      }
      .q-separator {
        margin: 18px 0;
      }
      .shop-widget__sidebar-price-filter {
        .shop-widget__sidebar-price-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: #212121;
          .shop-widget__sidebar-price-label-min {}
          .shop-widget__sidebar-price-label-max {}
        }
      }
      .shop-widget__sidebar-exist-filter {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
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
        .quasar-crud-index-table {
          .q-table__grid-content {
            gap: 36px;
            .shop-widget__result-product-item {
              width: 33%;
              flex: 0 0 auto;
            }
          }
        }
      }
    }
  }
}
</style>
