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
                  :create-route-name="createRouteName"
                  :table-grid-size="true"
                  :default-layout="false"
                  :show-search-button="false"
                  :show-expand-button="false"
                  :show-reload-button="false">
      <template #entity-index-table-item-cell="{inputData}">
        <post-item :post="inputData.props.row" />
      </template>
    </entity-index>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import PostItem from 'src/components/PostItem.vue'
import Breadcrumbs from 'src/components/Widgets/Breadcrumbs/Breadcrumbs.vue'
import { FormBuilderAssist } from 'quasar-form-builder'

export default {
  name: 'PostList',
  components: { PostItem, EntityIndex, Breadcrumbs },
  mixins: [mixinWidget],
  data: () => {
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
        { type: 'hidden', name: 'category', value: null }
      ],
      table: {
        columns: []
      },
      mounted: false,
      createRouteName: ''
    }
  },
  mounted() {
    this.mounted = true
    this.$store.commit('AppLayout/updateBreadcrumbs', {
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
    })
    if (this.localOptions.categoryId) {
      FormBuilderAssist.setAttributeByName(this.inputs, 'category', 'value', this.localOptions.categoryId)
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
