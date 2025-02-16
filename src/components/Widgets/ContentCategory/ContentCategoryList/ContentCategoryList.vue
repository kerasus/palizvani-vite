<template>
  <div class="ContentCategoryList"
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
    <q-banner class="ContentCategoryList-banner">
      <span v-if="localOptions.listType === 'category_parent_parent'">
        دسته بندی های کلی
      </span>
      <span v-if="localOptions.listType === 'category_parent'">
        دسته بندی اصلی
      </span>
      <span v-if="localOptions.listType === 'category'">
        دسته بندی جزئی
      </span>
    </q-banner>
    <filters :show-category-route-name="showCategoryRouteName"
             :content-categories="contentCategories"
             @filter="onChangeFilter" />
    <div class="contents row justify-center">
      <q-linear-progress v-if="contents.loading"
                         class="q-my-md"
                         indeterminate />
      <template v-else>
        <div v-for="(content, contentIndex) in contents.list"
             :key="contentIndex"
             class="col-md-4">
          <content-item :content="content" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Filters from './filters.vue'
import ContentItem from './ContentItem.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { ContentList } from 'src/models/Content.js'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'
import { ContentCategory, ContentCategoryList } from 'src/models/ContentCategory.js'

export default {
  name: 'ContentCategoryList',
  components: { Breadcrumbs, Filters, ContentItem },
  mixins: [mixinWidget],
  data () {
    return {
      api: APIGateway.contentCategory.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        { type: 'hidden', name: 'parent__isnull', value: false },
        { type: 'hidden', name: 'parent', value: null }
      ],
      table: {
        columns: []
      },
      mounted: false,
      subFilterExpanded: false,
      contents: new ContentList(),
      contentCategories: new ContentCategoryList(),
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
          label: 'خانه',
          to: { name: 'Public.Home' }
        },
        {
          label: 'آرشیو محتوا',
          to: { name: 'Public.ContentCategoryParentParent.List' }
        }
      ]

      if (this.localOptions.listType === 'category_parent') {
        if (this.contentCategory.id) {
          path.push({
            label: this.contentCategory.title,
            to: { name: 'Public.ContentCategoryParentParent.Show', params: { category_id: this.contentCategory.id } }
          })
        }
      } else if (this.localOptions.listType === 'category') {
        if (this.contentCategoryParent.id) {
          path.push({
            label: this.contentCategoryParent.title,
            to: { name: 'Public.ContentCategoryParentParent.Show', params: { category_id: this.contentCategoryParent.id } }
          })
        }
        if (this.contentCategory.id) {
          path.push({
            label: this.contentCategory.title,
            to: { name: 'Public.ContentCategoryParent.Show', params: { category_id: this.contentCategory.id } }
          })
        }
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
  created() {
    this.updateBreadcrumbs()
  },
  mounted () {
    if (this.contentCategoryId) {
      this.loadContentCategory()
    }
    this.getContentCategories()
    this.getContents({ selected_category: this.contentCategoryId })
    this.mounted = true
  },
  methods: {
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
    },

    getFilterOfCategorySearch () {
      const filter = {}
      if (this.localOptions.listType === 'category_parent_parent') {
        filter.parent__isnull = true
      } else if (this.localOptions.listType === 'category_parent') {
        filter.parent__isnull = null
        filter.parent = this.contentCategoryId
      } else if (this.localOptions.listType === 'category') {
        filter.parent__isnull = null
        filter.parent = this.contentCategoryId
      }

      return filter
    },
    getContents (filters) {
      this.contents.loading = true
      APIGateway.content.index({ ...filters, per_page: 9999 })
        .then(({ list }) => {
          this.contents = new ContentList(list)
        })
        .finally(() => {
          this.contents.loading = false
        })
    },
    getContentCategories () {
      const filter = this.getFilterOfCategorySearch()
      this.contentCategories.loading = true
      APIGateway.contentCategory.index({ ...filter, per_page: 9999 })
        .then(({ list }) => {
          this.contentCategories = new ContentCategoryList(list)
        })
        .finally(() => {
          this.contentCategories.loading = false
        })
    },
    onChangeFilter (newFilter) {
      this.getContents({ ...newFilter, selected_category: this.contentCategoryId })
    }
  }
}
</script>

<style scoped lang="scss">
.ContentCategoryList {
  .ContentCategoryList-banner {
    margin-bottom: 39px;
    margin-top: 50px;
  }
  //:deep(.entity-index) {
  //  margin-top: 24px;
  //  .quasar-crud-index-table {
  //    .q-table__top {
  //      display: none;
  //    }
  //    .q-table__grid-content {
  //      $gap: 24px;
  //      flex-wrap: wrap;
  //      gap: $gap;
  //      .ContentCategoryItem {
  //        flex: 0 0 calc( 33.33% - #{$gap} );
  //        box-sizing: border-box;
  //      }
  //    }
  //    .q-table__bottom {
  //      .q-table__control {
  //        display: none;
  //      }
  //    }
  //  }
  //}
  .more-action {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  .ContentCategory-info-wrapper {
    background: white;
    width: 100%;
    .ContentCategory-info {
      background: #E5FDE6;
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
        }
        .ContentCategory-desc {

        }
      }
    }
  }
  &.category_parent {
    .ContentCategory-info-wrapper {
      .ContentCategory-info {
        .ContentCategory-thumbnail {
        }
        .ContentCategory-meta {
          .q-banner {
            border-color: $primary;
          }
          .ContentCategory-desc {

          }
        }
      }
    }
  }
  &.category {
    .ContentCategory-info-wrapper {
      .ContentCategory-info {
        background: #E5F2FD;
        .ContentCategory-thumbnail {
        }
        .ContentCategory-meta {
          .q-banner {
            border-color: #475F4A;
          }
          .ContentCategory-desc {

          }
        }
      }
    }
  }
}
</style>
