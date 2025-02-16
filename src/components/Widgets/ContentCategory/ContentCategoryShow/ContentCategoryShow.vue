<template>
  <div class="ContentCategoryShow"
       :class="localOptions.listType"
       :style="localOptions.style">
    <div class="ContentCategory-info-wrapper">
      <breadcrumbs class="q-mb-xl"
                   style="margin-top: 29px; margin-bottom: 19px;" />
      <div v-if="contentCategory.id"
           class="ContentCategory-info">
        <div class="ContentCategory-thumbnail">
          <q-img :src="contentCategory.thumbnail" />
        </div>
        <div class="ContentCategory-meta">
          <q-banner>
            {{ contentCategory.title }}
          </q-banner>
          <div class="ContentCategory-desc"
               v-html="contentCategory.description" />
        </div>
      </div>
    </div>
    <q-banner class="ContentCategoryShow-banner">
      محتواهای
      {{ contentCategory.title }}
    </q-banner>
    <entity-index v-if="mounted && contentCategory.id"
                  ref="entityIndex"
                  v-model:value="contentInputs"
                  class="product-index"
                  :api="contentApi"
                  :table="table"
                  :table-keys="tableKeys"
                  :table-grid-size="true"
                  :default-layout="false"
                  :show-search-button="false"
                  :show-expand-button="false"
                  :show-reload-button="false">
      <template #entity-index-table-item-cell="{inputData}">
        <content-item :content="getContent(inputData.props.row)" />
      </template>
    </entity-index>
    <q-banner class="ContentCategoryShow-banner">
      محصولات
      {{ contentCategory.title }}
    </q-banner>
    <entity-index v-if="mounted && contentCategory.id"
                  ref="entityIndex"
                  v-model:value="productInputs"
                  class="product-index"
                  :api="productApi"
                  :table="table"
                  :table-keys="tableKeys"
                  :table-grid-size="true"
                  :default-layout="false"
                  :show-search-button="false"
                  :show-expand-button="false"
                  :show-reload-button="false">
      <template #entity-index-table-item-cell="{inputData}">
        <product-item :product="getProduct(inputData.props.row)" />
      </template>
    </entity-index>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { Content } from 'src/models/Content.js'
import { Product } from 'src/models/Product.js'
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import { ContentCategory } from 'src/models/ContentCategory.js'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'
import productItem from 'src/components/Widgets/Store/Shop/components/productItem.vue'
import ContentItem from './ContentItem.vue'

export default {
  name: 'ContentCategoryShow',
  components: { EntityIndex, Breadcrumbs, productItem, ContentItem },
  mixins: [mixinWidget, mixinPrefetchServerData],
  data () {
    return {
      productApi: APIGateway.product.APIAdresses.base,
      contentApi: APIGateway.content.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      productInputs: [
        { type: 'hidden', name: 'content_category', value: null },
        { type: 'hidden', name: 'per_page', value: 12 }
      ],
      contentInputs: [
        { type: 'hidden', name: 'category', value: null },
        { type: 'hidden', name: 'per_page', value: 12 }
      ],
      table: {
        columns: []
      },
      mounted: false,
      contentCategory: new ContentCategory(),
      contentCategoryParent: new ContentCategory(),
      contentCategoryParentParent: new ContentCategory(),
      defaultOptions: {
        listType: 'category_parent_parent'
      }
    }
  },
  computed: {
    showCategoryRouteName () {
      if (this.localOptions.listType === 'category_parent_parent') {
        return 'Public.ContentCategoryParentParent.Show'
      } else if (this.localOptions.listType === 'category_parent') {
        return 'Public.ContentCategoryParent.Show'
      } else if (this.localOptions.listType === 'category') {
        return 'Public.ContentCategory.Show'
      }
      return 'Public.ContentCategory.Show'
    },
    breadcrumbsPath () {
      const path = [
        {
          label: 'محتوا',
          to: { name: 'Public.ContentCategoryParentParent.List' }
        }
      ]

      if (this.contentCategoryParentParent.id) {
        path.push({
          label: this.contentCategoryParentParent.title,
          to: { name: 'Public.ContentCategoryParentParent.Show', params: { category_id: this.contentCategoryParentParent.id } }
        })
      }
      if (this.contentCategoryParent.id) {
        path.push({
          label: this.contentCategoryParent.title,
          to: { name: 'Public.ContentCategoryParent.Show', params: { category_id: this.contentCategoryParent.id } }
        })
      }
      if (this.contentCategory.id) {
        path.push({
          label: this.contentCategory.title,
          to: { name: 'Public.ContentCategory.Show', params: { category_id: this.contentCategory.id } }
        })
      }
      return path
    },
    contentCategoryId () {
      if (this.$route.params.category_id) {
        return this.$route.params.category_id
      }

      return null
    }
  },
  mounted () {
    this.updateBreadcrumbs()
    this.mounted = true
  },
  methods: {
    prefetchServerDataPromise () {
      FormBuilderAssist.setAttributeByName(this.productInputs, 'content_category', 'value', this.contentCategoryId)
      FormBuilderAssist.setAttributeByName(this.contentInputs, 'category', 'value', this.contentCategoryId)
      if (this.contentCategoryId) {
        this.contentCategory.loading = true
        return this.getContentCategoryInfo(this.contentCategoryId)
      }

      return Promise.resolve(null)
    },
    prefetchServerDataPromiseThen (contentCategory) {
      this.contentCategory = new ContentCategory(contentCategory)
      this.updateBreadcrumbs()
      if (this.contentCategory.parent) {
        this.getContentCategoryInfo(this.contentCategory.parent)
          .then((parentContentCategory) => {
            this.contentCategoryParent = new ContentCategory(parentContentCategory)
            this.updateBreadcrumbs()
            if (this.contentCategoryParent.parent) {
              this.getContentCategoryInfo(this.contentCategoryParent.parent)
                .then((parentParentContentCategory) => {
                  this.contentCategoryParentParent = new ContentCategory(parentParentContentCategory)
                  this.updateBreadcrumbs()
                })
                .finally(() => {
                  this.contentCategory.loading = false
                })
            }
          })
          .finally(() => {
            this.contentCategory.loading = false
          })
      }
    },
    prefetchServerDataPromiseCatch () {
      this.contentCategory.loading = false
    },

    getContent (data) {
      return new Content(data)
    },
    getProduct (data) {
      return new Product(data)
    },
    getContentCategory (data) {
      return new ContentCategory(data)
    },
    loadContentCategory () {
      this.contentCategory.loading = true
      this.getContentCategoryInfo(this.contentCategoryId)
        .then((contentCategory) => {
          this.contentCategory = new ContentCategory(contentCategory)
          this.updateBreadcrumbs()
          if (this.contentCategory.parent) {
            this.getContentCategoryInfo(this.contentCategory.parent)
              .then((parentContentCategory) => {
                this.contentCategoryParent = new ContentCategory(parentContentCategory)
                this.updateBreadcrumbs()
                if (this.contentCategoryParent.parent) {
                  this.getContentCategoryInfo(this.contentCategoryParent.parent)
                    .then((parentParentContentCategory) => {
                      this.contentCategoryParentParent = new ContentCategory(parentParentContentCategory)
                      this.updateBreadcrumbs()
                    })
                    .finally(() => {
                      this.contentCategory.loading = false
                    })
                }
              })
              .finally(() => {
                this.contentCategory.loading = false
              })
          }
        })
        .finally(() => {
          this.contentCategory.loading = false
        })
    },
    loadContentCategory1 () {
      this.contentCategory.loading = true
      this.getContentCategoryInfo(this.contentCategoryId)
        .then((contentCategory) => {
          this.contentCategory = new ContentCategory(contentCategory)
          this.updateBreadcrumbs()
          if (this.contentCategory.parent) {
            this.getContentCategoryInfo(this.contentCategory.parent)
              .then((parentContentCategory) => {
                this.contentCategoryParent = new ContentCategory(parentContentCategory)
                this.updateBreadcrumbs()
                if (this.contentCategoryParent.parent) {
                  this.getContentCategoryInfo(this.contentCategoryParent.parent)
                    .then((parentParentContentCategory) => {
                      this.contentCategoryParentParent = new ContentCategory(parentParentContentCategory)
                      this.updateBreadcrumbs()
                    })
                    .finally(() => {
                      this.contentCategory.loading = false
                    })
                }
              })
              .finally(() => {
                this.contentCategory.loading = false
              })
          }
        })
        .finally(() => {
          this.contentCategory.loading = false
        })
    },
    getContentCategoryInfo (contentCategoryId) {
      return APIGateway.contentCategory.get({ data: { id: contentCategoryId } })
    },
    updateBreadcrumbs () {
      const breadcrumbs = {
        visible: true,
        loading: false,
        path: this.breadcrumbsPath
      }

      this.$store.commit('AppLayout/updateBreadcrumbs', breadcrumbs)
    }
  }
}
</script>

<style scoped lang="scss">
.ContentCategoryShow {
  .ContentCategoryShow-banner {
    margin-bottom: 39px;
    margin-top: 50px;
  }
  :deep(.entity-index) {
    margin-top: 24px;
    .quasar-crud-index-table {
      .q-table__top {
        display: none;
      }
      .q-table__grid-content {
        $gap: 24px;
        flex-wrap: wrap;
        gap: $gap;
        justify-content: center;
        .product-item {
          flex: 0 0 calc( 25% - #{$gap} );
          box-sizing: border-box;
        }
      }
      .q-table__bottom {
        .q-table__control {
          display: none;
        }
      }
    }
  }
  .ContentCategory-info-wrapper {
    background: white;
    width: 100%;
    .ContentCategory-info {
      background: #F7E9F0;
      padding: 24px;
      border: 1px solid #DFE1EC;
      display: flex;
      justify-content: flex-start;
      .ContentCategory-thumbnail {
        width: 189px;
        border-radius: 8px;
        margin-right: 24px;
        overflow: hidden;
      }
      .ContentCategory-meta {
        width: calc( 100% - 213px );
        .q-banner {
          margin-bottom: 21px;
          border-color: $primary;
        }
        .ContentCategory-desc {

        }
      }
    }
  }
}
</style>
