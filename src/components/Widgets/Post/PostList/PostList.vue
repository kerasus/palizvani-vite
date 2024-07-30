<template>
  <div class="PostList"
       :style="localOptions.style">
    <breadcrumbs class="q-mb-xl"
                 style="margin-top: 29px; margin-bottom: 19px;" />
    <q-banner class="q-mb-xl">
      یادداشت ها و مقالات
    </q-banner>
    <entity-index v-if="mounted"
                  ref="entityIndex"
                  v-model:value="inputs"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :table-grid-size="true"
                  :default-layout="false"
                  :show-search-button="false"
                  :show-expand-button="false"
                  :show-reload-button="false">
      <template #entity-index-table-item-cell="{inputData}">
        <post-item :post="getPost(inputData.props.row)" />
      </template>
    </entity-index>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { Post } from 'src/models/Post.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import PostItem from 'src/components/PostItem.vue'
import { FormBuilderAssist } from 'quasar-form-builder'
import { PostCategory } from 'src/models/PostCategory.js'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'

export default {
  name: 'PostList',
  components: { PostItem, EntityIndex, Breadcrumbs },
  mixins: [mixinWidget],
  data () {
    return {
      api: APIGateway.post.APIAdresses.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      inputs: [
        { type: 'hidden', name: 'category', value: null },
        { type: 'hidden', name: 'category__parent', value: null },
        { type: 'hidden', name: 'category__parent__parent', value: null }
      ],
      table: {
        columns: []
      },
      mounted: false,
      postCategory: new PostCategory(),
      breadcrumbs: {
        visible: true,
        loading: false,
        path: [
          {
            label: 'خانه',
            to: { name: 'Public.Home' }
          },
          {
            label: 'یادداشت ها و مقالات',
            to: { name: 'Public.Post.List' }
          }
        ]
      },
      defaultOptions: {
        categoryId: null,
        categoryCategoryId: null,
        categoryCategoryCategoryId: null,
        categoryFromQueryParams: false,
        categoryCategoryFromQueryParams: false,
        categoryCategoryCategoryFromQueryParams: false
      }
    }
  },
  computed: {
    postCategoryId () {
      if (this.localOptions.categoryFromQueryParams && this.$route.params.category_id) {
        return this.$route.params.category_id
      }

      if (this.localOptions.categoryId) {
        return this.localOptions.categoryId
      }

      return null
    }
  },
  mounted () {
    this.mounted = true
    this.$store.commit('AppLayout/updateBreadcrumbs', this.breadcrumbs)

    if (this.localOptions.categoryCategoryCategoryFromQueryParams) {
      FormBuilderAssist.setAttributeByName(this.inputs, 'category__parent__parent', 'value', this.$route.params.category_parent_parent_id)
    } else if (this.localOptions.categoryCategoryCategoryId) {
      FormBuilderAssist.setAttributeByName(this.inputs, 'category__parent__parent', 'value', this.localOptions.categoryCategoryCategoryId)
    }

    if (this.localOptions.categoryCategoryFromQueryParams) {
      FormBuilderAssist.setAttributeByName(this.inputs, 'category__parent', 'value', this.$route.params.category_parent_id)
    } else if (this.localOptions.categoryCategoryId) {
      FormBuilderAssist.setAttributeByName(this.inputs, 'category__parent', 'value', this.localOptions.categoryCategoryId)
    }

    if (this.localOptions.categoryFromQueryParams) {
      FormBuilderAssist.setAttributeByName(this.inputs, 'category', 'value', this.$route.params.category_id)
    } else if (this.localOptions.categoryId) {
      FormBuilderAssist.setAttributeByName(this.inputs, 'category', 'value', this.localOptions.categoryId)
    }

    if (this.postCategoryId) {
      this.getPostCategoryInfo(this.postCategoryId)
    }
  },
  methods: {
    getPost (data) {
      return new Post(data)
    },
    getPostCategoryInfo (postCategoryId) {
      this.postCategory.loading = true
      APIGateway.postCategory.get({ data: { id: postCategoryId } })
        .then((postCategory) => {
          this.postCategory = new PostCategory(postCategory)
          this.breadcrumbs.path.push({
            label: this.postCategory.title,
            to: { name: 'Public.PostCategory.Show', params: { category_id: postCategoryId } }
          })
          this.$store.commit('AppLayout/updateBreadcrumbs', this.breadcrumbs)
          this.postCategory.loading = false
        })
        .catch(() => {
          this.postCategory.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.PostList {
  .more-action {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
</style>
