<template>
  <div class="shop-widget"
       :style="localOptions.style">
    <q-banner>
      محصولات
    </q-banner>
    <div class="shop-widget__content">
      <div class="shop-widget__sidebar">
        shop-widget__sidebar
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
          shop-widget__result
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { EntityIndex } from 'quasar-crud'
import { Ticket } from 'src/models/Ticket.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'ContentList',
  // components: { EntityIndex },
  mixins: [mixinWidget],
  data: () => {
    return {
      searchTab: 'product',
      filters: {
        search: null,
        sort: 'sort1'
      },
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
      api: APIGateway.ticket.APIAdresses.base,
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
            name: 'title',
            required: true,
            label: 'موضوع پیام',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'sender',
            required: true,
            label: 'فرستنده',
            align: 'left',
            field: row => row.creator_info.firstname + ' ' + row.creator_info.lastname
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => (new Ticket(row)).status_info.label
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
      .shop-widget__result {

      }
    }
  }
}
</style>
